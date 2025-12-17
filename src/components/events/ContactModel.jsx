import { X, Phone, Mail } from "lucide-react";

export default function ContactModal({ vendor, onClose }) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-[420px] relative shadow-xl">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-center">
          Contact {vendor.name}
        </h3>

        {/* Phone */}
        {vendor.phoneNo && (
          <div className="flex items-center gap-4 p-4 border rounded-lg mb-4">
            <Phone className="text-brown" />
            <a
              href={`tel:${vendor.phoneNo}`}
              className="text-lg font-medium hover:underline"
            >
              {vendor.phoneNo}
            </a>
          </div>
        )}

        {/* Email */}
        {vendor.email && (
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <Mail className="text-brown" />
            <a
              href={`mailto:${vendor.email}`}
              className="text-lg font-medium hover:underline break-all"
            >
              {vendor.email}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
