// Hero.jsx
import Header from "./Header";
import bgImage from "../assets/contactbg.png";

export default function ContactHero({ title, description }) {
  return (
    <section
      className="relative min-h-[40vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute top-8 left-0 right-0 z-50">
        <Header />
      </div>
      <div className="container relative mx-auto px-4 pt-32 pb-20 z-10 h-full flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-maven font-bold mb-6 text-white leading-tight">
          {title}
        </h1>

        <p className="text-base mb-8 text-white max-w-md">{description} </p>
      </div>
    </section>
  );
}
