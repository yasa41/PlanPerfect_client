import { useEffect, useMemo, useState } from "react";
import { useVendors } from "../../hooks/useVendor";
import VendorCard from "./VendorCard";
import EmailModal from "./EmailModel";
import ContactModal from "./ContactModel";
import { generateVendorEmail } from "../../utils/vendorEmail";

const CATEGORY_LABELS = {
  catering: "Catering",
  venue: "Venue",
  photography: "Photography",
  decoration: "Decoration",
  others: "Others",
};

export default function Vendors({ eventId }) {
  const { vendors, loading, error, fetchVendors, updateVendor, emailVendor } =
    useVendors();

  const [emailVendorData, setEmailVendorData] = useState(null);
  const [contactVendor, setContactVendor] = useState(null);

  // Fetch vendors when eventId changes
  useEffect(() => {
    if (eventId) {
      fetchVendors(eventId);
    }
  }, [eventId]);

  // Group vendors by hired status and category
  const groupedVendors = useMemo(() => {
    const grouped = { hired: [], categories: {} };
    vendors.forEach((vendor) => {
      if (vendor.isHired) {
        grouped.hired.push(vendor);
      } else {
        const category = vendor.category || "others";
        if (!grouped.categories[category]) grouped.categories[category] = [];
        grouped.categories[category].push(vendor);
      }
    });
    return grouped;
  }, [vendors]);

  if (loading) return <div>Loading vendors...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">Vendor Management</h2>

      {/* Hired vendors */}
      {groupedVendors.hired.length > 0 && (
        <section className="mb-12">
          <h3 className="text-2xl font-bold mb-4 text-green-600">
            Hired Vendors
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {groupedVendors.hired.map((vendor) => (
              <VendorCard
                key={vendor._id}
                vendor={vendor}
                setEmailVendorData={setEmailVendorData}
                setContactVendor={setContactVendor}
                updateVendor={updateVendor}
              />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
        const list = groupedVendors.categories[key];
        if (!list || list.length === 0) return null;

        return (
          <section key={key} className="mb-12">
            <h3 className="text-2xl font-bold mb-4">{label}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {list.map((vendor) => (
                <VendorCard
                  key={vendor._id}
                  vendor={vendor}
                  setEmailVendorData={setEmailVendorData}
                  setContactVendor={setContactVendor}
                  updateVendor={updateVendor}
                />
              ))}
            </div>
          </section>
        );
      })}

      {/* Email Modal */}
      {emailVendorData && (
        <EmailModal
          vendor={emailVendorData}
          draft={generateVendorEmail({})}
          onClose={() => setEmailVendorData(null)}
          onSend={async (subject, body) => {
            try {
              await emailVendor(emailVendorData._id, subject, body); // POST only
              alert("Email sent successfully!");
              setEmailVendorData(null);
            } catch (err) {
              console.error(err);
              alert("Failed to send email. Please try again.");
            }
          }}
        />
      )}

      {/* Contact Modal */}
      {contactVendor && (
        <ContactModal
          vendor={contactVendor}
          onClose={() => setContactVendor(null)}
        />
      )}
    </>
  );
}
