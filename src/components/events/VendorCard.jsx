import { Instagram, Phone, Mail, Check } from "lucide-react";

export default function VendorCard({
  vendor,
  setEmailVendorData,
  setContactVendor,
  updateVendor,
}) {
  return (
    <div
      className={`border rounded-xl overflow-hidden ${
        vendor.isHired ? "border-green-500" : ""
      }`}
    >
      <img
        src={vendor.imageUrl || "/bg2.jpg"}
        className="h-64 w-full object-cover"
      />

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold">{vendor.name}</h3>
        <p className="text-sm opacity-80">{vendor.details}</p>

        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4">
            {vendor.websiteUrl && (
              <a href={vendor.websiteUrl} target="_blank">
                <Instagram />
              </a>
            )}
            <button onClick={() => setContactVendor(vendor)}>
              <Phone />
            </button>
            <button onClick={() => setEmailVendorData(vendor)}>
              <Mail />
            </button>
          </div>

          <button
            onClick={() =>
              updateVendor(vendor._id, !vendor.isHired)
            }
            className={`px-3 py-1 rounded text-sm flex gap-1 ${
              vendor.isHired
                ? "bg-green-600 text-white"
                : "bg-gray-200"
            }`}
          >
            <Check size={14} />
            {vendor.isHired ? "Hired" : "Mark Hired"}
          </button>
        </div>
      </div>
    </div>
  );
}
