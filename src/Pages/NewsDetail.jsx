import React from "react";
import ContactHero from "../Component/ContactHero";
import Footer from "../Component/Footer";
import NewsDetailComponent from "../Component/News/NewsDetailComponent";

export default function NewsDetail() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mb-40">
        <ContactHero
          title="News & Announcement"
          description="Stay updated with the latest developments in the Nigerian microfinance sector and COMCIN activities."
        />

       <NewsDetailComponent />

      </main>

      <Footer />
    </div>
  );
}
