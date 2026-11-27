import { useEffect, useState } from "react";
import {
  Edit,
  Eye,
  UserCheck,
  UserX,
  Users,
  UserRoundCheck,
  UserRoundX,
  BadgeCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import studentServices from "../../services/studentService";

const AdminStudents = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);

        const response = await studentServices.getAllStudents();

        if (response.success) {
          setStudents(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);

        toast.error(
          error.response?.data?.message ||
            "Failed to fetch students"
        );
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);

  const handleStatusToggle = async (student) => {
    try {
      const newStatus = !student.isActive;

      const response =
        await studentServices.updateStudentStatus(
          student._id,
          newStatus
        );

      if (response.success) {
        toast.success(
          newStatus
            ? "Student activated successfully"
            : "Student deactivated successfully"
        );

        setStudents((prevStudents) =>
          prevStudents.map((item) =>
            item._id === student._id
              ? { ...item, isActive: newStatus }
              : item
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to update student status:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update student status"
      );
    }
  };

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.isActive
  ).length;

  const inactiveStudents = students.filter(
    (student) => !student.isActive
  ).length;

  const verifiedStudents = students.filter(
    (student) => student.isVerified
  ).length;

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-sm text-slate-500">
            Loading students...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* ========================================
          PAGE HEADER
      ======================================== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">

        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users
                size={20}
                className="text-blue-600"
              />
            </div>

            <span className="text-xs font-semibold tracking-widest text-blue-600 uppercase">
              Student Management
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900">
            Students
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage student accounts, profiles and access
            status.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-xs text-slate-500 mb-1">
            Total Students
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {totalStudents}
          </p>
        </div>
      </div>

      {/* ========================================
          STAT CARDS
      ======================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Students
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {totalStudents}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users
                size={20}
                className="text-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Active Students
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {activeStudents}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
              <UserRoundCheck
                size={20}
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Inactive Students
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {inactiveStudents}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
              <UserRoundX
                size={20}
                className="text-red-500"
              />
            </div>
          </div>
        </div>

        {/* Verified */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Verified Students
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-2">
                {verifiedStudents}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
              <BadgeCheck
                size={20}
                className="text-amber-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================
          STUDENT TABLE
      ======================================== */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All Students
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              View and manage registered students.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-medium text-slate-600">
            {students.length} Records
          </div>
        </div>

        {/* Empty State */}
        {students.length === 0 ? (
          <div className="py-16 text-center">

            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto">
              <Users
                size={26}
                className="text-slate-400"
              />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No students found
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              There are currently no registered students.
            </p>
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Verification
                  </th>

                  <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {students.map((student) => (

                  <tr
                    key={student._id}
                    className="hover:bg-slate-50 transition-colors"
                  >

                    {/* Student */}
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        {student.avatar ? (
                          <img
                            src={student.avatar}
                            alt={`${student.firstName} ${student.lastName}`}
                            className="w-11 h-11 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                            {student.firstName
                              ?.charAt(0)
                              ?.toUpperCase()}
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.firstName}{" "}
                            {student.lastName}
                          </p>

                          <p className="text-xs text-slate-500 mt-0.5">
                            Student
                          </p>
                        </div>

                      </div>

                    </td>

                    {/* Contact */}
                    <td className="px-6 py-4">

                      <p className="text-sm text-slate-700">
                        {student.email}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {student.phone || "No phone number"}
                      </p>

                    </td>

                    {/* Verification */}
                    <td className="px-6 py-4">

                      {student.isVerified ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                          <BadgeCheck size={14} />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-slate-100 text-slate-500 text-xs font-medium">
                          Not Verified
                        </span>
                      )}

                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">

                      {student.isActive ? (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Inactive
                        </span>
                      )}

                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">

                      <div className="flex items-center justify-end gap-2">

                        {/* View */}
                        <button
                          type="button"
                          title="View Student"
                          onClick={() =>
                            navigate(
                              `/admin/students/${student._id}`
                            )
                          }
                          className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          title="Edit Student"
                          onClick={() =>
                            navigate(
                              `/admin/students/edit/${student._id}`
                            )
                          }
                          className="w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-500 flex items-center justify-center hover:bg-slate-100 hover:text-slate-800 transition"
                        >
                          <Edit size={16} />
                        </button>

                        {/* Status */}
                        <button
                          type="button"
                          title={
                            student.isActive
                              ? "Deactivate Student"
                              : "Activate Student"
                          }
                          onClick={() =>
                            handleStatusToggle(student)
                          }
                          className={`w-9 h-9 rounded-lg border flex items-center justify-center transition ${
                            student.isActive
                              ? "border-red-200 bg-white text-red-500 hover:bg-red-50"
                              : "border-emerald-200 bg-white text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          {student.isActive ? (
                            <UserX size={16} />
                          ) : (
                            <UserCheck size={16} />
                          )}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;