import serviceData from "../../../data/serviceData"
import ServiceInfo from "../../../components/ourServices/ServiceInfo"
import Hero from "@/components/ourServices/Hero"

export async function generateStaticParams() {
    return [
        { service: 'ear-wax-removal' },
        { service: 'travel-clinic' },
        { service: 'weight-loss-injections' },
        { service: 'vaccination-clinic' },
    ]
}

export async function generateMetadata({ params }) {
    const { service: serviceKey } = await params;
    const service = serviceData[serviceKey];

    if (!service) {
        return {
            title: "Service Not Found - Bishops Waltham Pharmacy",
            description: "The requested service could not be found.",
        };
    }

    return {
        title: `${service.title} - Bishops Waltham Pharmacy`,
        description: service.description || service.subtitle,
        robots: "index, follow",
        openGraph: {
            title: `${service.title} - Bishops Waltham Pharmacy`,
            description: service.description || service.subtitle,
            type: "website",
        },
    };
}

export default async function ServicePage({ params }) {
    const { service: serviceKey } = await params;
    const service = serviceData[serviceKey]

    return (
        <main className="bg-[#F6FAFF] min-h-screen">
            <Hero service={service} />
            <ServiceInfo service={service} />
        </main>
    )
}
