import { useEffect, useState } from "react";

export default function RegistrationNoticeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show modal automatically when page loads
    setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
            📢 NOTICE OF REGISTRATION REQUIREMENTS
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 text-gray-700 text-sm leading-relaxed">
          <p>
            The registration process for <strong>COMCIN</strong> is divided into{" "}
            <strong>three (3) stages</strong>. All intending registrants are advised
            to read carefully and prepare the required details and documents before
            beginning the registration.
          </p>

          {/* Stage 1 */}
          <section>
            <h3 className="font-semibold text-lg">STAGE 1 – INSTITUTION RECORDS</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Institution Name</strong> – As stated in registration documents.</li>
              <li><strong>Institution Type</strong> – NGO, Company, Cooperative, etc.</li>
              <li><strong>Date of Establishment</strong> – Provide official date.</li>
              <li><strong>Registration Number</strong> – Issued by CAC or relevant authority.</li>
              <li><strong>Email Address</strong> – Valid and active (verification may be sent).</li>
              <li><strong>Phone Number</strong> – Reachable, include country code if applicable.</li>
            </ul>
          </section>

          {/* Stage 2 */}
          <section>
            <h3 className="font-semibold text-lg">STAGE 2 – KEY CONTACT PERSON DETAILS</h3>
            <p className="mt-2">Fill in the required information for your institution’s key contact person accurately.</p>
          </section>

          {/* Stage 3 */}
          <section>
            <h3 className="font-semibold text-lg">STAGE 3 – REQUIRED DOCUMENTS</h3>
            <p className="mt-2">Upload the following (≤ 10MB each, clear & valid):</p>
            <ol className="list-decimal list-inside mt-2 space-y-2">
              <li>
                <strong>CAC Certificate</strong> – Valid CAC registration document.<br />
                Accepted formats: <em>PDF, JPG, PNG</em>.
              </li>
              <li>
                <strong>Operational License</strong> – Valid license/permit.<br />
                Accepted formats: <em>PDF, JPG, PNG</em>.
              </li>
              <li>
                <strong>Evidence of Payment</strong> – Receipt or bank transfer confirmation.<br />
                Accepted formats: <em>PDF, JPG, PNG</em>.
              </li>
            </ol>
          </section>

          {/* Important note */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 text-sm">
            ⚠ <strong>Important:</strong> Incomplete or incorrect submissions may delay
            approval. Ensure all details match official records and uploads are legible.
          </div>

          <p className="mt-4 font-semibold">Signed: <br /> Management</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => setOpen(false)}
            className="bg-white text-base text-green-700 font-bold px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
