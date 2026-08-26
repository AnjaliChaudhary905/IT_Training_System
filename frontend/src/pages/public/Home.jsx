
import CallToAction from "../../components/home/CallToAction";
import FeaturedCourses from "../../components/home/FeaturedCourses";
import HeroSection from "../../components/home/HeroSection";
import HighlightServices from "../../components/home/HighlightServices";
import IndustryLeaders from "../../components/home/IndustryLeaders";
import SuccessMetrics from "../../components/home/SuccessMetrics";

const Home = () => {
  return (
      <main>
        <HeroSection />
        <FeaturedCourses />
        <HighlightServices />
        <SuccessMetrics />
        <IndustryLeaders />
        <CallToAction />
      </main>
  );
};

export default Home;