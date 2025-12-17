export const generateVendorEmail = ({ guests, venue, date }) => ({
  subject: "Request for Quotation",
  body: `Hello,

I hope you are doing well.

We are planning an upcoming event and would like to request a quotation.

Event Details:
• Date: ${date || "To be finalized"}
• Venue: ${venue || "To be finalized"}
• Guests: ${guests || "Approx. TBD"}

Please let us know your availability and pricing details.

Best regards,
PlanPerfect Events`,
});
