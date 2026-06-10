import Script from "next/script";

const pharmacySchema = {
  "@context": "https://schema.org",
  "@type": ["Pharmacy", "LocalBusiness", "MedicalBusiness"],
  name: "Bishops Waltham Pharmacy",
  description:
    "Local pharmacy offering travel vaccinations, Pharmacy First, flu jabs, NHS prescriptions in Bishops Waltham, Hampshire.",
  url: "https://bishopswalthampharmacy.co.uk",
  telephone: "+441489892499",
  email: "pharmacy.frn21@nhs.net",

  address: {
    "@type": "PostalAddress",
    streetAddress: "High Street",
    addressLocality: "Bishops Waltham",
    addressRegion: "Hampshire",
    postalCode: "SO32 1AB",
    addressCountry: "GB",
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.9558",
    longitude: "-1.2116",
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],

  availableService: [
    {
      "@type": "MedicalTherapy",
      name: "Travel Vaccinations",
    },
    {
      "@type": "MedicalTherapy",
      name: "NHS Pharmacy First Service",
    },
    {
      "@type": "MedicalTherapy",
      name: "Flu Vaccination",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",

      name: "Do you offer travel vaccinations in Bishops Waltham?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Yes — Yellow Fever, Typhoid, Hepatitis A & B, Meningitis ACWY, Rabies and antimalarials. Call 01489 892499 or book online.",
      },
    },

    {
      "@type": "Question",

      name: "What is the NHS Pharmacy First service?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "Pharmacy First lets our pharmacists treat 7 minor conditions without a GP appointment. Free for NHS patients.",
      },
    },

    {
      "@type": "Question",

      name: "Where is Bishops Waltham Pharmacy?",

      acceptedAnswer: {
        "@type": "Answer",

        text: "High Street, Bishops Waltham, Hampshire, SO32 1AB.",
      },
    },
  ],
};

export default function SchemaOrg() {
  return (
  <>
    <Script
      id="pharmacy-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(pharmacySchema),
      }}
    />

    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  </>
  );
}