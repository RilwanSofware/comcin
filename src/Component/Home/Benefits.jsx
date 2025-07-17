import credibility from "../../assets/credibility.svg";
import support from "../../assets/support.svg";
import logo from "../../assets/logo.svg";
import network from "../../assets/network.svg";
import financial from "../../assets/financial.svg";
import certificate from "../../assets/certificate.svg";

export default function Benefits() {
  const cards = [
    {
      type: "benefit",
      title: "Credibility & Recognition",
      description:
        "Gain national visibility and legitimacy as a verified institution under the COMCIN umbrella",
      icon: credibility,
    },
    {
      type: "benefit",
      title: "Regulatory Compliance Support",
      description:
        "Access tools and guidance to stay aligned with Nigeria's financial and cooperative regulations.",
      icon: support,
    },
    {
      type: "cta",
      icon: logo,
      subtitle:
        "Join Nigeria's Largest Network of Verified Microlenders & Cooperatives.",
      buttonText: "Become a Member",
    },
    {
      type: "benefit",
      title: "Networking & Capacity Building",
      description:
        "Connect with other institutions, attend workshops, and grow through shared knowledge and partnerships.",
      icon: network,
    },
    {
      type: "benefit",
      title: "Financial Tools & Reports",
      description:
        "Monitor your organization's transactions, payments, and invoices through an intelligent member dashboard.",
      icon: financial,
    },
    {
      type: "benefit",
      title: "Instant Certificate Issuance",
      description:
        "Receive your official COMCIN membership certificate digitally ready for printing or presentation.",
      icon: certificate,
    },
  ];

  return (
    <section id="benefits" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-maven text-3xl font-bold mb-4">
            Benefits of COMCIN Membership{" "}
          </h2>
          <p className="text-base max-w-md mx-auto text-[#4B4B4B">
            Join our coalition and unlock a range of advantages for your
            institution and the communities you serve.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl transition-all duration-300 ${
                card.type === "cta" ? "bg-primary text-white" : "bg-white"
              }`}
            >
              {card.type === "cta" ? (
                <div className="h-full flex flex-col justify-center items-center text-center">
                  <div className="w-10 h-10 mb-4">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xl mb-6">{card.subtitle}</p>
                  <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
                    {card.buttonText}
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 mb-4">
                    <img
                      src={card.icon}
                      alt={card.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3
                    className={`text-lg font-bold mb-3 ${
                      card.type === "cta" ? "text-white" : "text-[#1E1E1E]"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={
                      card.type === "cta" ? "text-white/90" : "text-gray-600"
                    }
                  >
                    {card.description}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
