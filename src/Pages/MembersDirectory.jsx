import React from "react";
import ContactHero from "../Component/ContactHero";
import Footer from "../Component/Footer";
import MembersComponent from "../Component/MemDirectory/MembersComponent";

export default function MembersDirectory() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mb-40">
        <ContactHero
          title="Membership Directory"
          description="Get responds from us in the space of an eye blink"
        />
        <MembersComponent />
      </main>

      <Footer />
    </div>
  );
}
