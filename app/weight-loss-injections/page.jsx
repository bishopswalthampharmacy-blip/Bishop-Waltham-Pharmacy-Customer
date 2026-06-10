import ServiceInfo from "@/components/ourServices/ServiceInfo";
import serviceData from "@/data/serviceData";

export const metadata = {
  title:
    "Weight Loss Injections Bishops Waltham | Professional Weight Management Service",

  description:
    "Clinically supported weight loss injections at Bishops Waltham Pharmacy. Professional consultations, ongoing support, and personalised weight management plans.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/weight-loss-injections/",
  },
};

export default function WeightLossInjectionsPage() {
  const service = serviceData["weight-loss-injections"];

  return <ServiceInfo service={service} />;
}

