import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import Icon from '@/components/Icon'
import { useContent } from '@/context/ContentContext'

const sections = [
  {
    title: '1. Who we are',
    body: [
      'Ramesh Solar Services provides solar consultation, sales, installation, maintenance and after-sales services in Madhya Pradesh, India. This privacy policy explains how we handle personal information collected through this website and during our customer interactions.',
    ],
  },
  {
    title: '2. Information we collect',
    body: [
      'When you submit an enquiry, we collect the information you provide: your full name, mobile number, city, property type, approximate monthly electricity bill, solar requirement, optional message and your consent confirmation.',
      'We may also receive information you choose to share with us by phone, WhatsApp, email or in person, such as site details, electricity consumer details or project requirements.',
      'Our web server may process standard technical information required to deliver and secure the website, such as request logs. We do not use invasive advertising trackers on this website.',
    ],
  },
  {
    title: '3. Why we use your information',
    body: [
      'We use your information to respond to your enquiry, understand your requirements, arrange a consultation or site inspection, prepare a quotation, provide requested services, maintain service records, communicate about your project and meet legal or regulatory obligations.',
      'We may contact you by phone, call, SMS, WhatsApp or email in relation to your enquiry or service request. We do not use your information for unrelated marketing without an appropriate basis.',
    ],
  },
  {
    title: '4. Consent and lawful processing',
    body: [
      'Where consent is required, we ask for it before using your information for the stated purpose. You may withdraw consent at any time by contacting us, subject to legal and contractual requirements. Withdrawing consent may affect our ability to respond to or continue a service.',
      'We process information only for purposes that are lawful, relevant and necessary for the service or relationship you have requested.',
    ],
  },
  {
    title: '5. Sharing information',
    body: [
      'We do not sell your personal information. We may share the minimum necessary information with service providers who support our operations, such as technology hosting, communication tools, installation teams, DISCOM or government-portal processes where relevant, and professional advisers. Such sharing is limited to the purpose for which it is needed.',
      'We may disclose information if required by law, a court order, a government authority or to protect our legal rights and the safety of our customers or staff.',
    ],
  },
  {
    title: '6. How long we keep information',
    body: [
      'We retain enquiry and customer information for as long as needed to respond to the request, provide services, maintain records and meet legal obligations. Retention periods may vary depending on the nature of the relationship. We delete or anonymise information when it is no longer required.',
    ],
  },
  {
    title: '7. Security',
    body: [
      'We use reasonable technical and organisational measures to protect personal information, including restricted admin access, hashed passwords for administrative accounts, secure authentication cookies and input validation. No internet transmission or storage system is completely secure, but we work to protect your information against unauthorised access, alteration or disclosure.',
      'The admin area is restricted to authorised personnel. Please do not share your login credentials with anyone.',
    ],
  },
  {
    title: '8. Cookies and local storage',
    body: [
      'This website uses an essential, HttpOnly authentication cookie for authorised admin sessions. The public website does not require advertising cookies. If we introduce analytics or other optional cookies in future, we will update this policy and provide appropriate choices where required.',
    ],
  },
  {
    title: '9. Your choices and rights',
    body: [
      'Subject to applicable law, you may request access to your personal information, ask for correction of inaccurate information, request deletion where appropriate, or raise a concern about how your information is used. To make a request, contact us using the details below. We may need to verify your identity before acting on a request.',
    ],
  },
  {
    title: '10. Children',
    body: [
      'Our website and services are intended for adults and organisations. We do not knowingly collect personal information from children. If you believe a child has provided information, please contact us so we can address it.',
    ],
  },
  {
    title: '11. Third-party links and messaging',
    body: [
      'This website may link to third-party platforms such as WhatsApp, government portals or brand websites. Their privacy practices are governed by their own policies. Once you leave our website or communicate through a third-party platform, their terms and privacy policy apply.',
    ],
  },
  {
    title: '12. Updates to this policy',
    body: [
      'We may update this privacy policy to reflect changes in our practices, technology or legal requirements. The latest version will be posted on this page with an updated date.',
    ],
  },
]

export default function Privacy() {
  const { contact } = useContent()

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="How Ramesh Solar Services collects, uses, stores and protects personal information submitted through this website and during customer interactions."
        path="/privacy-policy"
        image="/images/about-solar.jpg"
      />
      <PageHero
        eyebrow="Legal"
        title="Privacy,"
        accent="explained clearly."
        description="How we collect, use and protect the information you share with Ramesh Solar Services."
        image="/images/about-solar.jpg"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="section bg-mist">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-3xl border border-forest-900/10 bg-white p-6">
                <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-forest-500">
                  On this page
                </p>
                <nav className="mt-4 space-y-2" aria-label="Privacy policy sections">
                  {sections.map((section) => (
                    <a
                      key={section.title}
                      href={`#${section.title.split('.')[0].replace(/\s/g, '-')}`}
                      className="block text-xs font-semibold leading-5 text-ink/50 transition hover:text-forest-800"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 border-t border-forest-900/8 pt-4">
                  <p className="text-[0.65rem] font-semibold text-ink/40">Last updated</p>
                  <p className="mt-1 text-xs font-extrabold text-forest-900">5 November 2026</p>
                </div>
              </div>
              <div className="mt-3 rounded-3xl border border-forest-900/10 bg-forest-900 p-6 text-white">
                <Icon name="ShieldCheck" size={22} className="text-solar-400" />
                <p className="mt-3 text-sm font-extrabold">Questions about your data?</p>
                <p className="mt-2 text-xs leading-5 text-white/55">
                  Contact us at{' '}
                  <a href={`mailto:${contact.email}`} className="break-all text-solar-300 underline">
                    {contact.email}
                  </a>
                </p>
              </div>
            </aside>

            <div className="rounded-5xl border border-forest-900/10 bg-white p-6 shadow-soft sm:p-9 lg:p-10">
              <div className="space-y-9">
                {sections.map((section) => (
                  <section
                    key={section.title}
                    id={section.title.split('.')[0].replace(/\s/g, '-')}
                    className="scroll-mt-32"
                  >
                    <h2 className="font-display text-2xl text-forest-900 sm:text-[1.7rem]">
                      {section.title}
                    </h2>
                    <div className="mt-3 space-y-3">
                      {section.body.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-ink/60">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}

                <section id="13-contact" className="scroll-mt-32 rounded-3xl bg-mist p-6">
                  <h2 className="font-display text-2xl text-forest-900">13. Contact us</h2>
                  <p className="mt-3 text-sm leading-7 text-ink/60">
                    For privacy questions or requests, contact Ramesh Solar Services:
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <p className="flex items-center gap-2 text-ink/60">
                      <Icon name="Phone" size={15} className="text-forest-600" />
                      {contact.phone}
                    </p>
                    <p className="flex items-center gap-2 text-ink/60">
                      <Icon name="Mail" size={15} className="text-forest-600" />
                      {contact.email}
                    </p>
                    <p className="flex items-center gap-2 text-ink/60">
                      <Icon name="MapPin" size={15} className="text-forest-600" />
                      {contact.address}
                    </p>
                  </div>
                  <Link to="/contact" className="btn-dark btn-sm mt-5">
                    Contact us
                    <Icon name="ArrowRight" size={15} />
                  </Link>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
