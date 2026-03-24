import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/+233551105055";

export default function WhatsAppButton() {
  return (
    <Link
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WiredWorld on WhatsApp"
      className="fixed bottom-5 left-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg transition-all duration-200 hover:bg-[#1ebe5d] hover:shadow-xl active:scale-95"
    >
      <WhatsappLogoIcon className="size-5 shrink-0" weight="fill" />
      <span className="text-sm font-medium hidden sm:inline">Chat with us</span>
    </Link>
  );
}
