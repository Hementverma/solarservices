export const SUBSIDY_SOURCE = 'PM Surya Ghar Subsidy Page'

export const OFFICIAL_PORTAL_URL = 'https://pmsuryaghar.gov.in'

export const SUBSIDY_DISCLAIMER =
  'Subsidy amounts and eligibility are indicative and subject to current PM Surya Ghar scheme guidelines, portal approval, technical feasibility and DISCOM verification. Ramesh Solar Services does not guarantee subsidy approval or a fixed installation timeline.'

export const subsidySlabs = [
  {
    capacity: 1,
    label: '1 kW',
    amount: 30000,
    description: 'Central financial assistance for an eligible residential rooftop system.',
  },
  {
    capacity: 2,
    label: '2 kW',
    amount: 60000,
    description: 'Central financial assistance for an eligible residential rooftop system.',
  },
  {
    capacity: 3,
    label: '3 kW or above',
    amount: 78000,
    description: 'Maximum central financial assistance, capped at ₹78,000.',
  },
]

export const subsidyCapacityOptions = [1, 2, 3, 4, 5]

export const connectionTypes = ['Residential', 'Commercial', 'Industrial', 'Agricultural']

export const mpDiscoms = [
  {
    value: 'MPMKVVCL',
    label: 'MP Madhya Kshetra Vidyut Vitaran Company (Bhopal region)',
  },
  {
    value: 'MPPKVVCL',
    label: 'MP Paschim Kshetra Vidyut Vitaran Company (Indore region)',
  },
  {
    value: 'MPPoKVVCL',
    label: 'MP Poorv Kshetra Vidyut Vitaran Company (Jabalpur region)',
  },
  { value: 'Not sure', label: 'Not sure / Other' },
]

export const indianStates = [
  'Madhya Pradesh',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

export function getIndicativeSubsidy(capacity) {
  const kw = Number(capacity)
  if (!Number.isFinite(kw) || kw <= 0) return 0
  if (kw >= 3) return 78000
  if (kw >= 2) return 60000
  if (kw >= 1) return 30000
  return 0
}

export const applicationSteps = [
  {
    title: 'Apply on the official portal',
    description:
      'Register on pmsuryaghar.gov.in, select your state and DISCOM, and submit the residential rooftop application with your electricity connection details.',
    icon: 'Landmark',
  },
  {
    title: 'Complete portal approvals',
    description:
      'The application and feasibility are reviewed through the official portal and your DISCOM. Keep your consumer number, latest bill and identity details ready.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Install through a registered vendor',
    description:
      'The system must be installed with an eligible vendor registered on the national portal, using compliant components and the approved system capacity.',
    icon: 'HardHat',
  },
  {
    title: 'Net metering and commissioning',
    description:
      'Apply for net metering, complete the DISCOM inspection and commissioning process, and obtain the required meter and approval documentation.',
    icon: 'PlugZap',
  },
  {
    title: 'Bank details and subsidy release',
    description:
      'Submit the required bank account, cancelled cheque and commissioning documents. Subsidy release is processed through the official scheme channel after verification.',
    icon: 'WalletCards',
  },
]

export const subsidyFaqs = [
  {
    question: 'What is PM Surya Ghar: Muft Bijli Yojana?',
    answer:
      'It is a Government of India rooftop solar scheme for eligible residential electricity consumers. The scheme provides central financial assistance and supports the residential rooftop solar application process through the national portal. Current terms, technical requirements and approval steps should always be verified at pmsuryaghar.gov.in.',
  },
  {
    question: 'How much subsidy is available for a home?',
    answer:
      'The central financial assistance is ₹30,000 for 1 kW, ₹60,000 for 2 kW and a maximum of ₹78,000 for 3 kW or higher eligible residential capacity. The amount shown on this page is indicative and does not guarantee approval. Commercial and industrial connections are not eligible for this residential subsidy.',
  },
  {
    question: 'How is the subsidy calculated for 4 kW or 5 kW?',
    answer:
      'For eligible residential systems, the central subsidy is capped at ₹78,000. A 4 kW or 5 kW system may therefore receive the same maximum central assistance as a 3 kW system, subject to the applicable scheme rules.',
  },
  {
    question: 'Can I apply if I do not have a rooftop?',
    answer:
      'A suitable installation area is generally required. Roof condition, shading, structural safety and the approved system layout are checked before installation. A site inspection helps confirm whether your property can support rooftop solar.',
  },
  {
    question: 'Can I get the subsidy if I already received one?',
    answer:
      'A residential connection may be subject to restrictions on repeat or duplicate subsidy claims. Tell us if you have received rooftop solar assistance before, and verify your current eligibility on the official portal or with your DISCOM.',
  },
  {
    question: 'Does Ramesh Solar Services guarantee the subsidy?',
    answer:
      'No. Subsidy approval is decided by the official scheme process and the relevant authorities. We can help you understand the documents and the installation requirements, but approval, timing and final release depend on portal and DISCOM verification.',
  },
]
