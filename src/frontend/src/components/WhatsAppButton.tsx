import { SiWhatsapp } from "react-icons/si";

const WHATSAPP_URL =
  "https://wa.me/918248252180?text=Hello%20CONNECT%2C%20I%20am%20interested%20in%20your%20job%2Finternship%20opportunities.";

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-ocid="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full text-white transition-smooth hover:scale-110 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
      style={{
        backgroundColor: "#25D366",
        boxShadow: "0 4px 16px rgba(37,211,102,0.45)",
      }}
    >
      <SiWhatsapp size={28} aria-hidden="true" />
    </a>
  );
}
