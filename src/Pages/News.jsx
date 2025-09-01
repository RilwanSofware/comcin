import React from "react";
import ContactHero from "../Component/ContactHero";
import Footer from "../Component/Footer";
import NewsComponent from "../Component/News/NewsComponent";

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mb-40">
        <ContactHero
          title="News & Announcement"
          description="Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities."
        />
        <NewsComponent />
      </main>

      <Footer />
    </div>
  );
}
