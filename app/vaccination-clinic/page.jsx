import ServiceInfo from "@/components/ourServices/ServiceInfo";
import  serviceData  from "@/data/serviceData";

export const metadata = {
  title:
    "Vaccination Clinic Bishops Waltham | Flu, Travel & Private Vaccinations",

  description:
    "Get flu jabs, travel vaccines, and private vaccinations at Bishops Waltham Pharmacy. GPhC-registered pharmacists, convenient local appointments.",

  alternates: {
    canonical:
      "https://bishopswalthampharmacy.co.uk/vaccination-clinic/",
  },
};


export default function VaccinationClinicPage() {
    const service = serviceData["vaccination-clinic"];


  return <ServiceInfo service={service} />;
}