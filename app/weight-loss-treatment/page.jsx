import ServiceInfo from "@/components/ourServices/ServiceInfo";
import serviceData from "@/data/serviceData";

export const metadata = {
  title:
    "Weight Loss Treatment Bishops Waltham | Professional Weight Management Service",

  description:
    "Clinically supported weight loss treatment at Bishops Waltham Pharmacy. Professional consultations, ongoing support, and personalised weight management plans.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/weight-loss-treatment/",
  },
};

export default function WeightLossTreatmentPage() {
  const service = serviceData["weight-loss-treatment"];

  return <ServiceInfo service={service} />;
}

