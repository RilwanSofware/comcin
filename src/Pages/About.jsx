import React from "react";
import ContactHero from "@/Component/ContactHero";
import Footer from "@/Component/Footer";
import AboutFirstSection from "@/Component/AboutUs/AboutFirstSection";
import MeetMinds from "@/Component/AboutUs/MeetMinds";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mb-40">
        <ContactHero
          title="About Us"
          description="Get responds from us in the space of an eye blink"
        />

        <AboutFirstSection />
        <MeetMinds />
      </main>

      <Footer />
    </div>
  );
}
