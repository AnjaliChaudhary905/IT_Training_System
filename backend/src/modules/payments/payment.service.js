import Course from "../courses/course.model.js";
import Enrollment from "../enrollment/enrollment.model.js";
import User from "../users/user.model.js";
import Payment from "./payment.model.js";


const createPayment = async (
    studentId,
    enrollmentId,
    paymentMethod,
    transactionId
) => {

    const student = await User.findOne({
        _id: studentId,
        role: "student",
        isActive: true,
    });

    if (!student) {
        const error = new Error("Student not found");
        error.statusCode = 404;
        throw error;
    }


    const enrollment = await Enrollment.findById(enrollmentId);

    if (!enrollment) {
        const error = new Error("Enrollment not found");
        error.statusCode = 404;
        throw error;
    }


    if (
        enrollment.student.toString() !==
        studentId.toString()
    ) {
        const error = new Error(
            "You are not authorized to make payment for this enrollment"
        );
        error.statusCode = 403;
        throw error;
    }


    if (enrollment.status === "completed") {
        const error = new Error(
            "Completed enrollment has already finished"
        );
        error.statusCode = 400;
        throw error;
    }


    if (enrollment.status === "cancelled") {
        const error = new Error(
            "Cancelled enrollment cannot be paid"
        );
        error.statusCode = 400;
        throw error;
    }


    if (enrollment.status === "rejected") {
        const error = new Error(
            "Rejected enrollment cannot be paid"
        );
        error.statusCode = 400;
        throw error;
    }


    const course = await Course.findById(
        enrollment.course
    );

    if (!course) {
        const error = new Error("Course not found");
        error.statusCode = 404;
        throw error;
    }


    if (!course.isActive) {
        const error = new Error(
            "Payment cannot be made for an inactive course"
        );
        error.statusCode = 400;
        throw error;
    }


    const existingPaidPayment = await Payment.findOne({
        enrollment: enrollmentId,
        status: "paid",
    });

    if (existingPaidPayment) {
        const error = new Error(
            "This enrollment has already been paid"
        );
        error.statusCode = 409;
        throw error;
    }


    const amount = course.fee;


    const payment = await Payment.create({
        student: studentId,
        enrollment: enrollmentId,
        course: course._id,
        amount,
        paymentMethod,
        transactionId,
        status: "pending",
    });


    return await Payment.findById(payment._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        );
};


const getMyPayments = async (studentId) => {

    return await Payment.find({
        student: studentId,
    })
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .sort({
            createdAt: -1,
        });
};


const getPaymentById = async (
    paymentId,
    userId,
    role
) => {

    const payment = await Payment.findById(
        paymentId
    )
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        );


    if (!payment) {
        const error = new Error("Payment not found");
        error.statusCode = 404;
        throw error;
    }


    if (
        role === "student" &&
        payment.student._id.toString() !== userId.toString()
    ) {
        const error = new Error(
            "You are not authorized to view this payment"
        );
        error.statusCode = 403;
        throw error;
    }


    return payment;
};


const getAllPayments = async () => {

    return await Payment.find()
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        )
        .sort({
            createdAt: -1,
        });
};


const updatePaymentStatus = async (
    paymentId,
    status
) => {

    const payment = await Payment.findById(
        paymentId
    );

    if (!payment) {
        const error = new Error("Payment not found");
        error.statusCode = 404;
        throw error;
    }


    payment.status = status;


    if (status === "paid") {
        payment.paidAt = new Date();
    }


    if (status !== "paid") {
        payment.paidAt = null;
    }


    await payment.save();


    return await Payment.findById(payment._id)
        .populate(
            "student",
            "firstName lastName email phone role avatar"
        )
        .populate(
            "enrollment",
            "status progress enrollmentDate completedAt"
        )
        .populate(
            "course",
            "title description category level duration fee image isActive"
        );
};


const paymentService = {
    createPayment,
    getMyPayments,
    getPaymentById,
    getAllPayments,
    updatePaymentStatus,
};


export default paymentService;