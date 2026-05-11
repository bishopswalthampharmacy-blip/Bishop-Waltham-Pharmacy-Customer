export const metadata = {
  title:
    "NHS & Private Prescriptions Bishops Waltham | Fast Dispensing",

  description:
    "Collect your NHS or private prescription at Bishops Waltham Pharmacy. EPS accepted with fast dispensing services.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/prescriptions/",
  },
};

export default function PrescriptionsPage() {
  return (
    <main className="p-6">

      <h1>
        NHS & Private Prescriptions in Bishops Waltham
      </h1>

      <p>
        Bishops Waltham Pharmacy dispenses NHS and private
        prescriptions quickly and accurately. We accept the
        Electronic Prescription Service (EPS), allowing your
        GP to send prescriptions directly to us.
      </p>

      <h2>Our Prescription Services</h2>

      <ul>
        <li>NHS prescription dispensing</li>

        <li>Private prescription dispensing</li>

        <li>Electronic Prescription Service (EPS)</li>

        <li>Prescription collection service</li>

        <li>Repeat prescription management</li>

        <li>New Medicine Service (NMS)</li>
      </ul>

      <h2>New Medicine Service (NMS)</h2>

      <p>
        If you have recently started a new NHS medicine,
        our pharmacists can provide free follow-up support
        and guidance.
      </p>

    </main>
  );
}