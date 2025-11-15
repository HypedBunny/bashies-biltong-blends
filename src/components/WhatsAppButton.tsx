import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "27661209331"; // Your WhatsApp business number
  const message = "Hi Bashies! I'm interested in your biltong products.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        {showTooltip && (
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg font-raleway text-sm whitespace-nowrap animate-in slide-in-from-right">
            Chat with us on WhatsApp!
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-primary rotate-45" />
          </div>
        )}

        {/* Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing rings */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
          <div className="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-50" />

          {/* Main button */}
          <div className="relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:scale-110 group-active:scale-95">
            <MessageCircle className="h-6 w-6" />
          </div>

          {/* Online indicator dot */}
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-300 border-2 border-white rounded-full animate-pulse" />
        </a>
      </div>
    </>
  );
};

export default WhatsAppButton;
