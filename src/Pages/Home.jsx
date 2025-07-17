import Benefits from "../Component/Home/Benefits";
import Footer from "../Component/Footer";
import Hero from "../Component/Home/Hero";
import HowToJoin from "../Component/Home/HowToJoin";
import MemberDirectory from "../Component/Home/MemberDirectory";
import MissionVision from "../Component/Home/MissionVision";
import News from "../Component/Home/News";
import Testimonials from "../Component/Home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-grow mb-40">
        <Hero />
        <MissionVision id="about" />
        <Benefits id="benefits" />
        <HowToJoin id="join" />
        <MemberDirectory id="members" />
        <News id="news" />
        <Testimonials id="testimonials" />
      </main>
      <Footer />
    </div>
  );
}
