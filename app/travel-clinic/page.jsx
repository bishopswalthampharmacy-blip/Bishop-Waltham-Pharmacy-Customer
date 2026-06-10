import ServiceInfo from "@/components/ourServices/ServiceInfo";
import serviceData  from "@/data/serviceData";

export const metadata = {
  title:
    "Travel Clinic Bishops Waltham | Vaccinations & Travel Health Hampshire",

  description:
    "Book travel vaccinations at Bishops Waltham Pharmacy. Yellow Fever, Typhoid, Hepatitis, antimalarials & personalised travel health advice.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/travel-clinic/",
  },
};





export default function TravelClinicPage() {
    const service = serviceData["travel-clinic"];


  return <ServiceInfo service={service} />;
}