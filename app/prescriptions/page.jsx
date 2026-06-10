import ServiceInfo from "@/components/ourServices/ServiceInfo";
import  serviceData  from "@/data/serviceData";

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
    const service = serviceData["prescriptions"];


  return <ServiceInfo service={service} />;
}