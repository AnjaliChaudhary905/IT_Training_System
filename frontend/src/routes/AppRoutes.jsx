import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Instructors from "../pages/public/Instructors";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/instructors" element={<Instructors />} />
    </Routes>
  );
};

export default AppRoutes;  