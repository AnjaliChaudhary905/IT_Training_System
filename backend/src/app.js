import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/error.middleware.js";
import userRoutes from "./modules/users/user.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import courseRoutes from "./modules/courses/course.routes.js"
import instructorRoutes from "./modules/instructor/instructor.routes.js"
import studentRoutes from "./modules/student/student.routes.js"
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/courses",courseRoutes);
app.use("/api/instructor",instructorRoutes);
app.use("/api/students",studentRoutes)

app.use(errorHandler);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "IT Training Management System API is running ",
  });
});

export default app;