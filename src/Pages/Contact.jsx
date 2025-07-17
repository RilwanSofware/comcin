import React from "react";
import Footer from "../Component/Footer";
import ContactHero from "../Component/ContactHero";
import ContactForm from "../Component/Contact/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mb-40">
        <ContactHero
          title="Contact Us"
          description="Get responds from us in the space of an eye blink"
        />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
}
