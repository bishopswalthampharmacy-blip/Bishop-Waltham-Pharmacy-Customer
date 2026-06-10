
import ServiceInfo from "@/components/ourServices/ServiceInfo";
import serviceData from "@/data/serviceData";

export const metadata = {
  title:
    "Ear Microsuction Bishops Waltham | Professional Ear Wax Removal",

  description:
    "Safe and effective ear wax removal using microsuction at Bishops Waltham Pharmacy. Professional ear care appointments available locally.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/ear-microsuction/",
  },
};

export default function EarMicrosuctionPage() {
  const service = serviceData["ear-microsuction"];

  return <ServiceInfo service={service} />;
}

