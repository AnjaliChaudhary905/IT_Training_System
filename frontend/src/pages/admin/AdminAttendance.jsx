
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ClipboardCheck,
  RefreshCw,
  Plus,
  X,
  Pencil,
  Search,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";

import attendanceService from "../../services/attendanceService";
import enrollmentServices from "../../services/enrollmentService";
import courseService from "../../services/courseService";

const initialFormData = {
  courseId: "",
  studentId: "",
  enrollmentId: "",
  date: new Date().toLocaleDateString("en-CA"),
  status: "present",
  remarks: "",
};

const getId = (value) => {
  if (!value) return "";
  return String(typeof value === "object" ? value._id || "" : value);
};

const getStudentName = (student) => {
  if (!student) return "Unknown student";

  const name = `${student.firstName || ""} ${
    student.lastName || ""
  }`.trim();

  return name || student.email || "Unknown student";
};

const getLocalDate = (date) => {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "";

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getStatusStyle = (status) => {
  switch (status) {
    case "present":
      return "bg-green-100 text-green-700";
    case "absent":
      return "bg-red-100 text-red-700";
    case "late":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const formatDate = (date) => {
  if (!date) return "—";

  const localDate = getLocalDate(date);

  if (!localDate) return "—";

  const [year, month, day] = localDate.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const AdminAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseEnrollments, setCourseEnrollments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [loadingEnrollments, setLoadingEnrollments] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  const [formData, setFormData] = useState({ ...initialFormData });

  const [filters, setFilters] = useState({
    courseId: "",
    studentId: "",
    status: "",
    date: "",
  });

  const fetchAttendance = useCallback(async () => {
    setLoading(true);

    try {
      const response = await attendanceService.getAllAttendance();
      setAttendance(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load attendance records."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load courses."
      );
    }
  }, []);

 useEffect(() => {
  const loadAttendance = async () => {
    await fetchAttendance();
  };

  loadAttendance();
}, [fetchAttendance]);

useEffect(() => {
  const loadCourses = async () => {
    await fetchCourses();
  };

  loadCourses();
}, [fetchCourses]);

  const filteredAttendance = useMemo(() => {
    return attendance.filter((record) => {
      const matchesCourse =
        !filters.courseId || getId(record.course) === filters.courseId;

      const matchesStudent =
        !filters.studentId || getId(record.student) === filters.studentId;

      const matchesStatus =
        !filters.status || record.status === filters.status;

      const matchesDate =
        !filters.date || getLocalDate(record.date) === filters.date;

      return (
        matchesCourse &&
        matchesStudent &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [attendance, filters]);

  const studentsForFilter = useMemo(() => {
    const uniqueStudents = new Map();

    attendance.forEach((record) => {
      if (record.student?._id) {
        uniqueStudents.set(String(record.student._id), record.student);
      }
    });

    return [...uniqueStudents.values()].sort((a, b) =>
      getStudentName(a).localeCompare(getStudentName(b))
    );
  }, [attendance]);

  const totalPresent = attendance.filter(
    (record) => record.status === "present"
  ).length;

  const totalAbsent = attendance.filter(
    (record) => record.status === "absent"
  ).length;

  const totalLate = attendance.filter(
    (record) => record.status === "late"
  ).length;

  const handleCourseChange = async (event) => {
    const courseId = event.target.value;

    setFormData((previous) => ({
      ...previous,
      courseId,
      studentId: "",
      enrollmentId: "",
    }));

    setCourseEnrollments([]);

    if (!courseId) return;

    setLoadingEnrollments(true);

    try {
      const response = await enrollmentServices.getAllEnrollments();

      const enrollments = (response.data || []).filter((enrollment) => {
        const enrollmentCourseId = getId(enrollment.course);

        return (
          enrollmentCourseId === courseId &&
          !["cancelled", "rejected"].includes(enrollment.status)
        );
      });

      setCourseEnrollments(enrollments);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to load students enrolled in this course."
      );
    } finally {
      setLoadingEnrollments(false);
    }
  };

  const handleStudentChange = (event) => {
    const studentId = event.target.value;

    const selectedEnrollment = courseEnrollments.find(
      (enrollment) => getId(enrollment.student) === studentId
    );

    setFormData((previous) => ({
      ...previous,
      studentId,
      enrollmentId: selectedEnrollment?._id || "",
    }));
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openCreateForm = () => {
    setEditingRecord(null);
    setFormData({ ...initialFormData });
    setCourseEnrollments([]);
    setShowForm(true);
  };

  const openEditForm = (record) => {
    setEditingRecord(record);

    setFormData({
      courseId: getId(record.course),
      studentId: getId(record.student),
      enrollmentId: getId(record.enrollment),
      date: getLocalDate(record.date),
      status: record.status || "present",
      remarks: record.remarks || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    if (loadingForm) return;

    setShowForm(false);
    setEditingRecord(null);
    setFormData({ ...initialFormData });
    setCourseEnrollments([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingRecord) {
      if (!formData.date || !formData.status) {
        toast.error("Please provide a date and attendance status.");
        return;
      }
    } else if (
      !formData.courseId ||
      !formData.studentId ||
      !formData.enrollmentId ||
      !formData.date
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoadingForm(true);

    try {
      if (editingRecord) {
        await attendanceService.updateAttendance(editingRecord._id, {
          date: formData.date,
          status: formData.status,
          remarks: formData.remarks,
        });

        toast.success("Attendance updated successfully.");
      } else {
        await attendanceService.createAttendance({
          courseId: formData.courseId,
          studentId: formData.studentId,
          enrollmentId: formData.enrollmentId,
          date: formData.date,
          status: formData.status,
          remarks: formData.remarks,
        });

        toast.success("Attendance marked successfully.");
      }

      setShowForm(false);
      setEditingRecord(null);
      setFormData({ ...initialFormData });
      setCourseEnrollments([]);

      await fetchAttendance();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          (editingRecord
            ? "Failed to update attendance."
            : "Failed to mark attendance.")
      );
    } finally {
      setLoadingForm(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      courseId: "",
      studentId: "",
      status: "",
      date: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Attendance Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record, review, filter, and update student attendance.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={fetchAttendance}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={17} />
            Mark Attendance
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Records
            </p>
            <ClipboardCheck className="text-blue-600" size={22} />
          </div>
          <p className="mt-3 text-3xl font-bold text-slate-800">
            {attendance.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Present</p>
          <p className="mt-3 text-3xl font-bold text-green-600">
            {totalPresent}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Absent</p>
          <p className="mt-3 text-3xl font-bold text-red-600">
            {totalAbsent}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Late</p>
          <p className="mt-3 text-3xl font-bold text-yellow-600">
            {totalLate}
          </p>
        </div>
      </div>

      {/* Filters */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Filter size={19} className="text-slate-600" />
            <h2 className="font-semibold text-slate-800">
              Filter Attendance
            </h2>
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className="self-start text-sm font-medium text-blue-600 hover:text-blue-800 sm:self-auto"
          >
            Clear filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor="filterCourse"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Course
            </label>
            <select
              id="filterCourse"
              name="courseId"
              value={filters.courseId}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All courses</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterStudent"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Student
            </label>
            <select
              id="filterStudent"
              name="studentId"
              value={filters.studentId}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All students</option>
              {studentsForFilter.map((student) => (
                <option key={student._id} value={student._id}>
                  {getStudentName(student)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filterStatus"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Status
            </label>
            <select
              id="filterStatus"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">All statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="filterDate"
              className="mb-1.5 block text-sm font-medium text-slate-700"
            >
              Date
            </label>
            <input
              id="filterDate"
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredAttendance.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {attendance.length}
          </span>{" "}
          attendance records.
        </p>
      </section>

      {/* Attendance table */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="font-semibold text-slate-800">
            Attendance Records
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 px-5 py-16 text-slate-500">
            <RefreshCw size={19} className="animate-spin" />
            Loading attendance records...
          </div>
        ) : filteredAttendance.length === 0 ? (
          <div className="flex flex-col items-center px-5 py-16 text-center">
            <Search size={32} className="mb-3 text-slate-300" />
            <p className="font-medium text-slate-700">
              No attendance records found
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters or mark attendance for a student.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Student</th>
                  <th className="px-5 py-4 font-semibold">Course</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Marked By</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAttendance.map((record) => (
                  <tr
                    key={record._id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {getStudentName(record.student)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {record.student?.email || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {record.course?.title || "—"}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-slate-600">
                      {formatDate(record.date)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                          record.status
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {getStudentName(record.markedBy)}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openEditForm(record)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Create/Edit modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {editingRecord ? "Edit Attendance" : "Mark Attendance"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {editingRecord
                    ? "Update the date, status, or remarks."
                    : "Select the course and enrolled student."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={loadingForm}
                aria-label="Close form"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              {editingRecord ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Student
                    </label>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                      {getStudentName(editingRecord.student)}
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-700">
                      Course
                    </label>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                      {editingRecord.course?.title || "—"}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <label
                      htmlFor="courseId"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Course <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="courseId"
                      value={formData.courseId}
                      onChange={handleCourseChange}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="studentId"
                      className="mb-1.5 block text-sm font-medium text-slate-700"
                    >
                      Student <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="studentId"
                      value={formData.studentId}
                      onChange={handleStudentChange}
                      required
                      disabled={
                        !formData.courseId ||
                        loadingEnrollments ||
                        courseEnrollments.length === 0
                      }
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                    >
                      <option value="">
                        {loadingEnrollments
                          ? "Loading enrolled students..."
                          : !formData.courseId
                          ? "Select a course first"
                          : courseEnrollments.length === 0
                          ? "No eligible enrollments found"
                          : "Select a student"}
                      </option>

                      {courseEnrollments.map((enrollment) => (
                        <option
                          key={enrollment._id}
                          value={getId(enrollment.student)}
                        >
                          {getStudentName(enrollment.student)}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="attendanceDate"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Attendance Date{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="attendanceDate"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="attendanceStatus"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="attendanceStatus"
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    required
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="attendanceRemarks"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Remarks
                </label>
                <textarea
                  id="attendanceRemarks"
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleFormChange}
                  rows={3}
                  maxLength={500}
                  placeholder="Add any notes about this attendance record..."
                  className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <p className="mt-1 text-right text-xs text-slate-400">
                  {formData.remarks.length}/500
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={loadingForm}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loadingForm || loadingEnrollments}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loadingForm && (
                    <RefreshCw size={16} className="animate-spin" />
                  )}
                  {loadingForm
                    ? "Saving..."
                    : editingRecord
                    ? "Save Changes"
                    : "Mark Attendance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAttendance;
