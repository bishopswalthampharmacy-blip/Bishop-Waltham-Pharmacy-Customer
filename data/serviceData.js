// Centralized service data for ServiceInfo component

const serviceData = {
    "prescriptions": {
        title: "Prescriptions",
        slug: "prescriptions",
        subtitle: "NHS & Private Prescriptions — Fast, Accurate Dispensing",
        description: "Bishops Waltham Pharmacy dispenses NHS and private prescriptions quickly and accurately. We accept the Electronic Prescription Service (EPS), meaning your GP can send your prescription directly to us — no paper needed. We also offer prescription collection from local GP practices.",
        steps: [
            {
                title: "Step 1: Send or Bring Your Prescription",
                detail: "Your GP can send your prescription directly to us electronically via the Electronic Prescription Service (EPS) — no paper required. Alternatively, bring your paper prescription in person and we will dispense it promptly."
            },
            {
                title: "Step 2: Same-Day Dispensing",
                detail: "We aim to dispense NHS and private prescriptions on the same day wherever possible. Our team will prepare your medication accurately and efficiently so you can collect it at your convenience."
            },
            {
                title: "Step 3: Prescription Collection Service",
                detail: "We offer prescription collection from local GP practices in and around Bishops Waltham. Ask our team for details about which practices we collect from and how to set this up."
            },
            {
                title: "Step 4: New Medicine Service (NMS) Support",
                detail: "If you have recently been prescribed a new NHS medicine, our pharmacists can provide a free follow-up consultation to support you with side effects, correct usage, and any concerns you may have."
            }
        ],
        benefits: [
            "Electronic Prescription Service (EPS): Your GP sends prescriptions directly — no paper needed.",
            "Same-Day Dispensing: NHS and private prescriptions dispensed quickly and accurately.",
            "New Medicine Service: Free support consultations for patients starting new NHS medications.",
            "Prescription Collection: We collect prescriptions from local GP practices on your behalf.",
            "Repeat Prescription Management: We can help manage and coordinate your repeat prescriptions."
        ],
        image: "/assets/communityImg.webp",
        images: {
            hero: "/assets/communityImg.jpg",
            main: "/assets/communityImg.jpg"
        },
        faqs: [
            {
                q: "Can I collect my prescription at Bishops Waltham Pharmacy?",
                a: "Yes. We accept electronic prescriptions (EPS) sent directly by your GP, as well as paper prescriptions. We also offer prescription collection from local GP practices. Contact us on 01489 892499 for more details."
            },
            {
                q: "What is the Electronic Prescription Service (EPS)?",
                a: "EPS allows your GP to send your prescription directly to us electronically — no paper prescription is needed. Simply nominate Bishops Waltham Pharmacy as your preferred pharmacy with your GP practice."
            },
            {
                q: "Do you dispense private prescriptions?",
                a: "Yes, we dispense both NHS and private prescriptions quickly and accurately. Bring your private prescription in and our team will advise on availability and pricing."
            },
            {
                q: "What is the New Medicine Service (NMS)?",
                a: "The New Medicine Service is a free NHS consultation available to patients who have recently been prescribed a new medicine. Our pharmacists provide support on correct usage, potential side effects, and any concerns. Available for asthma inhalers, blood pressure medications, type 2 diabetes medicines, anticoagulants and pain relief."
            },
            {
                q: "How do I set up repeat prescription collection?",
                a: "Contact us on 01489 892499 or visit us in store and we can help arrange repeat prescription collection from your local GP practice, making it easier to manage your regular medications."
            }
        ]
    },
    "travel-clinic": {
        title: "Travel Clinic & Vaccinations",
        slug: "travel-clinic",
        subtitle: "Comprehensive travel health services for safe journeys",
        description: "Planning a trip abroad? Our GPhC-registered pharmacists provide personalised travel health consultations including Yellow Fever, Typhoid, Hepatitis A & B, Meningitis ACWY, and antimalarial prescriptions. We follow the latest NaTHNaC guidelines. Same-week appointments available.",
        image: "/assets/tracli.webp",
        images: {
            hero: "/assets/tracli.webp",
            main: "/w2travelClinic.webp",
            vaccines: "/assets/tracli2.webp"
        },
        content: {
            whyChoose: {
                title: "Why Choose Bishops Waltham Pharmacy?",
                intro: "At Bishops Waltham Pharmacy, we understand the importance of staying healthy while traveling. Our travel clinic offers a range of services tailored to meet your specific needs:",
                points: [
                    {
                        title: "Expert Guidance",
                        detail: "Our experienced healthcare professionals are trained in travel medicine and can provide personalized recommendations based on your destination, itinerary, and medical history."
                    },
                    {
                        title: "Vaccination Services",
                        detail: "We offer a comprehensive range of travel vaccines to protect against common diseases and illnesses encountered in different parts of the world."
                    },
                    {
                        title: "Convenience",
                        detail: "Located in Bishops Waltham, our clinic provides easy access to essential travel health services, including vaccinations, travel consultations, and travel health products."
                    },
                    {
                        title: "Peace of Mind",
                        detail: "Traveling can be stressful, but knowing that you're protected against potential health risks can give you peace of mind and allow you to focus on enjoying your trip."
                    }
                ]
            },
            travelVaccines: {
                title: "Travel Vaccines: What You Need to Know",
                intro: "Vaccinations are a crucial aspect of travel health and can protect you against a range of diseases and illnesses that may be prevalent in your destination. Here are some key points to consider about travel vaccines:",
                points: [
                    {
                        title: "Disease Prevention",
                        detail: "Travel vaccines are designed to protect against diseases that are common or endemic in specific regions of the world. By getting vaccinated, you reduce your risk of contracting these diseases while traveling."
                    },
                    {
                        title: "Immunity Boost",
                        detail: "Vaccines work by stimulating your immune system to produce antibodies against specific germs. This helps your body recognize and fight off these germs if you're exposed to them in the future."
                    },
                    {
                        title: "Recommended Vaccinations",
                        detail: "The vaccines you need will depend on your destination, itinerary, and individual health factors. Common travel vaccines include those for hepatitis A and B, typhoid, rabies, and meningitis."
                    },
                    {
                        title: "Timing",
                        detail: "It's essential to plan ahead and schedule your vaccinations well in advance of your trip. Some vaccines require multiple doses or take time to become effective, so it's best to consult with a healthcare professional as early as possible."
                    },
                    {
                        title: "Side Effects",
                        detail: "Like any medical intervention, vaccines can have side effects, but these are usually mild and temporary. Serious adverse reactions are rare, and the benefits of vaccination far outweigh the risks."
                    }
                ]
            },
            importance: {
                title: "The Importance of Getting Vaccinated",
                intro: "Getting vaccinated before traveling is one of the most effective ways to protect yourself and others from preventable diseases. Here are some reasons why vaccination is essential for travelers:",
                points: [
                    {
                        title: "Personal Protection",
                        detail: "Vaccines can prevent you from contracting serious diseases that may be prevalent in your destination. This not only protects your health but also ensures you can enjoy your trip without worrying about falling ill."
                    },
                    {
                        title: "Community Health",
                        detail: "By getting vaccinated, you also contribute to community immunity, also known as herd immunity. This helps protect vulnerable individuals who may not be able to receive certain vaccines due to medical reasons."
                    },
                    {
                        title: "International Travel Requirements",
                        detail: "Some countries require proof of vaccination against certain diseases as a condition of entry. Failure to comply with these requirements could result in denial of entry or other travel restrictions."
                    },
                    {
                        title: "Peace of Mind",
                        detail: "Knowing that you're vaccinated against common travel-related diseases can give you peace of mind and allow you to focus on enjoying your trip without worrying about your health."
                    },
                    {
                        title: "Risk Reduction",
                        detail: "Traveling exposes you to various health risks, including infectious diseases. Vaccination is a proactive measure to reduce your risk of illness and ensure a safe and healthy travel experience."
                    }
                ]
            },
            destinations: {
                title: "Popular Destinations Requiring Vaccinations",
                intro: "Here are five popular travel destinations where vaccinations may be recommended or required to protect against specific diseases:",
                points: [
                    {
                        title: "Thailand",
                        detail: "Travelers to Thailand may need vaccines for hepatitis A and B, typhoid, and Japanese encephalitis, depending on their itinerary and activities."
                    },
                    {
                        title: "Brazil",
                        detail: "There are multiple vaccinations recommended for travelers to certain parts of Brazil, especially those visiting rural areas or the Amazon rainforest."
                    },
                    {
                        title: "India",
                        detail: "Vaccines for hepatitis A and B, typhoid, and Japanese encephalitis are often recommended for travellers to India, along with routine vaccinations such as measles, mumps, and rubella (MMR)."
                    },
                    {
                        title: "Kenya",
                        detail: "Travellers to Kenya may need vaccines for hepatitis A and B, and typhoid, depending on their itinerary and activities, such as safaris or rural travel."
                    },
                    {
                        title: "Vietnam",
                        detail: "Hepatitis A and B, typhoid, and Japanese encephalitis vaccines are commonly recommended for travellers to Vietnam, particularly those visiting rural areas or participating in outdoor activities."
                    }
                ]
            },
            visitClinic: {
                title: "Visit Our Travel Clinic",
                content: "At Bishops Waltham Pharmacy Travel Clinic, your health and safety are our top priorities. Our experienced team is dedicated to providing you with the highest standard of care and ensuring you have a safe and healthy travel experience. To access this service there is an initial enquiry process. This includes a form to gather some background information regarding personal vaccination history, destination of travel and how long you will be away. Following this we will get in touch to discuss any specific requirements for travelling to your chosen destination and the best options for you to stay fit and well whilst away. All details and costs will be provided to you before any treatment is given. If you have any questions please get in touch with our team."
            }
        },
        image: "/w2travelClinic.webp",
        faqs: [
            {
                q: "How far in advance should I book my travel vaccines?",
                a: "It's best to book your travel vaccinations at least 6 to 8 weeks before you travel. Some vaccines require multiple doses or take time to become fully effective, so early planning ensures you're protected before your trip."
            },
            {
                q: "Do I need a consultation before getting my vaccines?",
                a: "Yes. At Bishops Waltham Pharmacy, we begin with an initial enquiry process to gather details about your travel plans, vaccination history, and health status. Following this, we'll discuss the vaccines you may need and provide a personalised plan before administering any treatment."
            },
            {
                q: "Can I get malaria tablets at the travel clinic?",
                a: "Yes, we provide malaria prevention advice and can supply malaria tablets. The type and dosage depend on your destination, length of stay, and medical history. Our team will guide you on the most suitable option during your consultation."
            },
            {
                q: "What if I need proof of vaccination for travel?",
                a: "Some destinations require an official vaccination certificate for entry. After your vaccines are administered at Bishops Waltham Pharmacy, we can provide you with the necessary documentation to ensure you meet your travel requirements."
            },
            {
                q: "Which vaccines are most commonly recommended for travellers?",
                a: "Commonly recommended travel vaccines include hepatitis A and B, typhoid, rabies, meningitis, Japanese encephalitis, and cholera. The exact vaccines you need will depend on where you're travelling, how long you're staying, and the activities you'll be doing. Our experts will advise you during your consultation."
            }
        ]
    },
    // Add more services here as needed
    "pharmacy-first": {
        title: "Pharmacy First",
        slug: "pharmacy-first",
        subtitle: "NHS Pharmacy First Service — No GP Appointment Needed",
        description: "Bishops Waltham Pharmacy is a registered NHS Pharmacy First provider. Our qualified pharmacists can now assess and treat 7 common conditions directly — without you needing to book a GP appointment. The service is completely free for NHS patients, and you can simply walk in.",
        content: {
            howItWorks: {
                title: "How It Works?",
                content: "Simply walk into Bishops Waltham Pharmacy during opening hours and ask to be seen under Pharmacy First. You may be asked for your NHS number and GP practice details. Our qualified pharmacists will assess your condition and provide appropriate treatment or advice on the same visit — no referral or prior appointment needed. If your condition falls outside the scope of Pharmacy First, we will advise you on the most appropriate next steps."
            },
            whyItMatters: {
                title: "Why It Matters?",
                content: "Getting timely treatment for minor conditions shouldn't mean waiting weeks for a GP appointment. The NHS Pharmacy First scheme means our trained pharmacists can now assess and treat 7 common conditions directly, helping you get better faster, reducing pressure on GP practices, and keeping NHS care local and accessible in Bishops Waltham."
            },
            whatWeOffer: {
                title: "What We Offer",
                intro: "Under the NHS Pharmacy First service, our pharmacists can assess and treat:",
                services: [
                    "Sinusitis (age 12+)",
                    "Sore throat (age 5+)",
                    "Earache / Otitis media (age 1–17)",
                    "Infected insect bites (age 1+)",
                    "Impetigo (age 1+)",
                    "Shingles (age 18+)",
                    "Urinary tract infection / UTI (women aged 16–64)"
                ],
            },
            howMedicationsWork: {
                title: "How Does the Service Work?",
                intro: "Our Pharmacy First consultations are conducted in our private consultation room. Here's what to expect:",
                points: [
                    "Walk in during opening hours — no appointment or GP referral required",
                    "Our pharmacist will assess your symptoms in a private, confidential consultation",
                    "If eligible, you will receive treatment or a prescription on the same visit at no cost to NHS patients",
                    "If your condition requires further investigation, we will refer you to the appropriate service"
                ]
            },
            whoIsThisFor: {
                title: "Who Is This Service For?",
                intro: "The NHS Pharmacy First service is available to:",
                criteria: [
                    "All NHS patients registered with a GP in England",
                    "Patients presenting with one of the 7 eligible conditions listed above"
                ],
                conditions: [
                    "No GP referral required",
                    "No appointment needed — walk in",
                    "Completely free for eligible NHS patients"
                ],
                note: "You do not need a referral from your GP. Simply walk in and ask to be seen under the NHS Pharmacy First scheme."
            },
            appointmentProcess: {
                title: "What Does the Consultation Involve?",
                intro: "Your Pharmacy First consultation is private, confidential, and free from judgement. It includes:",
                process: [
                    "A brief assessment of your symptoms and medical history",
                    "A private consultation in our dedicated consultation room",
                    "Diagnosis and treatment recommendation from a qualified pharmacist",
                    "Supply of appropriate medication where clinically suitable",
                    "Advice on managing your condition and when to seek further care if needed"
                ],
                support: "If your condition does not improve or worsens after treatment, our team will advise you on the appropriate next steps, including GP referral where necessary."
            },
            whyChooseUs: {
                title: "Why Choose Bishops Waltham Pharmacy?",
                benefits: [
                    {
                        title: "Qualified Healthcare Professionals",
                        detail: "Delivered by qualified NHS-commissioned pharmacists with clinical consultation training"
                    },
                    {
                        title: "Private & Confidential",
                        detail: "Private consultation room — confidential, comfortable, and non-judgemental"
                    },
                    {
                        title: "Free NHS Service",
                        detail: "Completely free for eligible NHS patients — no charges, no referrals"
                    },
                    {
                        title: "Convenient Local Service",
                        detail: "Conveniently located on High Street, Bishops Waltham — no travel needed"
                    },
                    {
                        title: "No Appointment Needed",
                        detail: "Walk in during opening hours — no booking, no wait for a GP appointment"
                    }
                ]
            },
        },
        image: "/assets/sp1.webp",
        images: {
            hero: "/assets/expertCare.jpg",
            main: "/assets/expertCare.jpg",
            vaccines: "/assets/communityImg.jpg"
        },
        faqs: [
            {
                q: "What is the NHS Pharmacy First service?",
                a: "Pharmacy First is an NHS scheme that allows our qualified pharmacists to assess and treat 7 minor conditions without a GP appointment. The service is completely free for NHS patients. Conditions include ear infections, sore throat, sinusitis, UTIs, impetigo, shingles, and infected insect bites."
            },
            {
                q: "Do I need an appointment for Pharmacy First?",
                a: "No — you can simply walk into Bishops Waltham Pharmacy during opening hours and ask to be seen under Pharmacy First. No referral or prior booking is required."
            },
            {
                q: "Is Pharmacy First free?",
                a: "Yes. The NHS Pharmacy First service is completely free for all NHS patients registered with a GP in England. There are no consultation fees or prescription charges under this scheme for eligible patients."
            },
            {
                q: "What conditions can be treated under Pharmacy First?",
                a: "Our pharmacists can assess and treat: sinusitis (age 12+), sore throat (age 5+), earache/otitis media (age 1–17), infected insect bites (age 1+), impetigo (age 1+), shingles (age 18+), and urinary tract infections/UTIs (women aged 16–64)."
            },
            {
                q: "What do I need to bring to a Pharmacy First consultation?",
                a: "It helps to have your NHS number and GP practice details to hand, but these are not always required. Simply walk in and let us know you'd like to be seen under the NHS Pharmacy First service."
            }
        ]
    },
    "flu-jab": {
        title: "Flu Jab & Seasonal Vaccinations",
        slug: "flu-jab",
        subtitle: "Evidence-based vaccinations for all ages",
        description: "Protect yourself and your family with our annual flu vaccination service. Available to eligible NHS patients and as a private service. We also offer blood pressure checks, Covid-19 boosters and other seasonal health services — all under one roof at our High Street location.",
        content: {
            whyChoose: {
                title: "Why Choose Private Vaccinations at Bishops Waltham Pharmacy?",
                intro: "While many vaccinations are available through the NHS, some individuals may miss out due to eligibility criteria or availability. Our service ensures that you have access to crucial health protection when you need it:",
                points: [
                    {
                        title: "Professional Service",
                        detail: "We provide a professional and confidential service, administered by our trained clinical pharmacist, allowing you to access these vital vaccinations at your convenience."
                    },
                    {
                        title: "Accessibility",
                        detail: "Access crucial health protection even when you fall outside NHS eligibility criteria or when NHS appointments are not readily available."
                    },
                    {
                        title: "Convenience",
                        detail: "Book your vaccination appointments at times that suit your schedule, with flexible booking options available."
                    },
                    {
                        title: "Expert Care",
                        detail: "Our trained clinical pharmacist ensures you receive the highest standard of care and professional advice tailored to your needs."
                    }
                ]
            },
            specialistVaccinations: {
                title: "Our Specialist Immunisations Include",
                intro: "We offer a comprehensive range of specialist vaccinations to protect you and your family:",
                vaccines: [
                    {
                        title: "Shingles Vaccination",
                        detail: "Shingles is a painful and common condition that affects a significant number of adults. The Joint Committee on Vaccination and Immunisation (JCVI) and NHS recommend vaccination for at-risk age groups. Our service provides access to the shingles vaccine to ensure you are protected, even if you fall outside of the NHS eligibility criteria. For example, 60-65 year olds are recommended to have the vaccine but fall outside NHS eligibility."
                    },
                    {
                        title: "HPV Vaccination",
                        detail: "Human papilloma virus (HPV) is the most common sexually transmitted infection in humans. For most adults, it will remain asymptomatic but in some cases it will cause genital warts and even increase your risk of genital and anal cancers. Our private HPV vaccination service is a convenient service for individuals up to the age of 45 wishing to protect themselves against the risk of this disease."
                    },
                    {
                        title: "Chickenpox Vaccination",
                        detail: "While often considered a childhood illness, chickenpox can be particularly severe in adults and can have serious complications. Our private chickenpox vaccination service is available for those who were not vaccinated as a child or who wish to protect themselves and their family members."
                    },
                    {
                        title: "Pneumonia Vaccination",
                        detail: "The pneumonia vaccine is recommended for at-risk groups, including the elderly and those with chronic health conditions, to prevent pneumococcal infections. We offer this vaccine to help safeguard your respiratory health throughout the year but pneumonia cases often spike in the winter months."
                    },
                    {
                        title: "RSV Vaccination",
                        detail: "Respiratory Syncytial Virus (RSV) is a common respiratory virus that can cause severe illness, especially in older adults and infants. Our seasonal RSV vaccination can help protect you from serious infection and its complications."
                    }
                ]
            },
            process: {
                title: "Our Vaccination Process",
                intro: "We ensure a smooth and professional vaccination experience:",
                steps: [
                    "Initial consultation to assess your vaccination needs and medical history",
                    "Professional administration of vaccines in a safe and comfortable environment",
                    "Post-vaccination care including monitoring and advice on potential side effects",
                    "Follow-up guidance on when to return for booster shots or additional doses"
                ]
            },
            benefits: {
                title: "Benefits of Our Vaccination Service",
                intro: "Choose our vaccination clinic for comprehensive health protection:",
                points: [
                    "Disease Prevention: Protects against serious and potentially life-threatening illnesses",
                    "Community Health: Helps prevent outbreaks in the community through herd immunity",
                    "Convenient Access: Easy appointments at your local pharmacy with flexible scheduling",
                    "Professional Care: Administered by qualified healthcare professionals",
                    "Comprehensive Range: Access to vaccines that may not be readily available through NHS"
                ]
            }
        },
        image: "/vaccinating.webp",
        images: {
            hero: "/vaccinating.webp",
            main: "/assets/vacci1.webp",
            vaccines: "/assets/vacci2.webp"
        },
        faqs: [
            {
                q: "Do vaccinations hurt?",
                a: "Most vaccinations cause only mild discomfort, similar to any injection. Our trained pharmacist uses techniques to minimize any discomfort during the procedure."
            },
            {
                q: "Are there side effects?",
                a: "Common side effects include soreness at the injection site or mild fever, which usually resolve quickly. We'll discuss potential side effects specific to your vaccination during your consultation."
            },
            {
                q: "Can I get multiple vaccinations at once?",
                a: "Yes, in many cases, multiple vaccinations can be given during the same visit. Our pharmacist will advise on the best approach based on your individual needs."
            },
            {
                q: "What if I'm not eligible for NHS vaccination?",
                a: "Our private vaccination service ensures you can access important vaccines even if you fall outside NHS eligibility criteria, such as age-specific requirements."
            },
            {
                q: "How do I know which vaccinations I need?",
                a: "During your consultation, our clinical pharmacist will assess your medical history, lifestyle, and risk factors to recommend the most appropriate vaccinations for your needs."
            }
        ]
    }
};

export default serviceData;
