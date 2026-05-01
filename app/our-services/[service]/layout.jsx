export async function generateMetadata({ params }) {
  const { service } = await params
  
  return {
    alternates: {
      canonical: `https://bishopswalthampharmacy.co.uk/our-services/${service}`,
    },
  }
}

export default function ServiceLayout({ children }) {
  return children
}
