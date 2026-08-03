
import HeroSection from "../../components/home/HeroSection";
import CourseSearch from "../../components/home/CourseSearch";
import HighlightServices from "../../components/home/HighlightServices";
import SuccessMetrics from "../../components/home/SuccessMetrics";
import FeaturedCourses from "../../components/home/FeaturedCourses";
const Home = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      <main>
        <HeroSection />
        <CourseSearch />
        <HighlightServices />
        <SuccessMetrics />
        <FeaturedCourses />
      </main>
    </div>
  );
}
export default Home;