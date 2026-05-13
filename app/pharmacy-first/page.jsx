import ServiceInfo from "@/components/ourServices/ServiceInfo";
import  serviceData  from "@/data/serviceData";

export const metadata = {
  title:
    "Pharmacy First Service Bishops Waltham | No GP Appointment Needed",

  description:
    "Get treated for 7 common conditions at Bishops Waltham Pharmacy without a GP appointment. NHS Pharmacy First service.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/pharmacy-first/",
  },
};


export default function PharmacyFirstPage() {
    const service = serviceData["pharmacy-first"];


  return <ServiceInfo service={service} />;
}