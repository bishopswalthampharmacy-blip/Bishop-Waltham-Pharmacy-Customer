import ServiceInfo from "@/components/ourServices/ServiceInfo";
import  serviceData  from "@/data/serviceData";

export const metadata = {
  title:
    "Flu Jab & Seasonal Vaccinations Bishops Waltham | Private Vaccination Service",

  description:
    "Get treated for 7 common conditions at Bishops Waltham Pharmacy without a GP appointment. NHS Pharmacy First service.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/flu-jab/",
  },
};


export default function fluJabPage() {
    const service = serviceData["flu-jab"];


  return <ServiceInfo service={service} />;
}