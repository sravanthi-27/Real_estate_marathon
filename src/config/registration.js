/** All dropdown / option data used by the registration flow AND the validation schemas. */

export const STEPS = [
  { id: 'participant', label: 'Participant Details' },
  { id: 'family', label: 'Family' },
  { id: 'community', label: 'Community' },
  { id: 'medical', label: 'Medical' },
  { id: 'running', label: 'Running' },
  { id: 'review', label: 'Review & Pay' },
];

export const CATEGORIES = [
  { id: '3k', label: '3K Fun Run', short: '3K', km: 3, minAge: 5, wave: 'WAVE 04', reporting: '04:20 AM', start: '05:30 AM' },
  { id: '5k', label: '5K Community Run', short: '5K', km: 5, minAge: 8, wave: 'WAVE 03', reporting: '04:20 AM', start: '05:45 AM' },
  { id: '10k', label: '10K Professional Run', short: '10K', km: 10, minAge: 15, wave: 'WAVE 02', reporting: '04:00 AM', start: '06:00 AM' },
  { id: '21k', label: 'Half Marathon (21.097 km)', short: '21K', km: 21.097, minAge: 18, wave: 'WAVE 01', reporting: '03:30 AM', start: '05:30 AM' },
];

export const GENDERS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

export const BLOOD_GROUPS = [
  { value: 'O+', label: 'O Positive (O+)' }, { value: 'O-', label: 'O Negative (O-)' },
  { value: 'A+', label: 'A Positive (A+)' }, { value: 'A-', label: 'A Negative (A-)' },
  { value: 'B+', label: 'B Positive (B+)' }, { value: 'B-', label: 'B Negative (B-)' },
  { value: 'AB+', label: 'AB Positive (AB+)' }, { value: 'AB-', label: 'AB Negative (AB-)' },
];

export const NATIONALITIES = [
  ['IN', 'Indian'], ['US', 'United States'], ['GB', 'United Kingdom'], ['AE', 'United Arab Emirates'],
  ['SG', 'Singapore'], ['AU', 'Australia'], ['CA', 'Canada'], ['DE', 'Germany'], ['FR', 'France'],
  ['JP', 'Japan'], ['LK', 'Sri Lanka'], ['NP', 'Nepal'], ['BD', 'Bangladesh'], ['SA', 'Saudi Arabia'],
  ['QA', 'Qatar'], ['KW', 'Kuwait'], ['OM', 'Oman'], ['MY', 'Malaysia'], ['NZ', 'New Zealand'], ['OTHER', 'Other'],
].map(([code, name]) => ({ value: code, label: `${name} (${code})` }));

export const TSHIRT_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const EMERGENCY_RELATIONSHIPS = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Colleague', 'Other'].map((v) => ({ value: v, label: v }));

export const FAMILY_RELATIONSHIPS = ['Spouse / Life Partner', 'Son', 'Daughter', 'Father', 'Mother', 'Sibling', 'Other'].map((v) => ({ value: v, label: v }));

export const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry',
].map((v) => ({ value: v, label: v }));

export const COMMUNITIES = [
  'Prestige High Fields', 'My Home Bhooja', 'Aparna Sarovar Zenith', 'Rajapushpa Atria', 'Lanco Hills',
].map((v) => ({ value: v, label: v }));
export const COMMUNITY_OTHER = 'other';

export const PROPERTY_TYPES = [
  { value: 'high-rise', title: 'High-Rise Apartment', description: 'Tower / gated community' },
  { value: 'villa', title: 'Gated Luxury Villa', description: 'Villa community' },
  { value: 'independent', title: 'Independent House', description: 'Standalone house' },
  { value: 'township', title: 'Residential Township', description: 'Integrated mega townships' },
];

export const COMMUNITY_ROLES = [
  { value: 'owner', label: 'Resident Owner & Squad Participant', description: 'Own a home here and run with the squad', badge: 'Popular' },
  { value: 'tenant', label: 'Resident Tenant', description: 'Rent a home in this community' },
  { value: 'rwa', label: 'RWA Executive Committee Member', description: 'President, secretary or committee member', badge: 'Lead' },
  { value: 'sports', label: 'Society Sports Coordinator / Lead', description: 'Organise the community squad', badge: 'Lead' },
];

export const HEALTH_CHECKUPS = [
  { value: 'cleared', title: 'Cleared by MD / MBBS', description: 'Health checkup within the last 6 months' },
  { value: 'active', title: 'Regular active runner', description: 'Self-certified physically fit' },
];

export const LONGEST_DISTANCES = [
  { value: 'none', label: 'None yet' }, { value: '3k', label: '3K' }, { value: '5k', label: '5K' },
  { value: '10k', label: '10K' }, { value: '21k', label: '21K (Half Marathon)' }, { value: '42k', label: '42K (Full Marathon)' },
];

export const PACER_GROUPS = [
  { value: 'p90', title: '1 Hour 30 Mins Pacer Bus', description: '~4:15 /km', badge: 'Fast' },
  { value: 'p120', title: '2 Hours Pacer Bus', description: '~5:40 /km' },
  { value: 'p150', title: '2 Hours 30 Mins Pacer Bus', description: '~7:05 /km', badge: 'Popular' },
  { value: 'p180', title: '3 Hours Pacer Bus', description: '~8:30 /km' },
  { value: 'own', title: 'Run at my own pace', description: 'No pacer needed' },
];

export const BANKS = [
  { value: 'HDFC', label: 'HDFC Bank', description: 'Popular' }, { value: 'SBI', label: 'State Bank of India', description: 'Popular' },
  { value: 'ICICI', label: 'ICICI Bank', description: 'Popular' }, { value: 'AXIS', label: 'Axis Bank' },
  { value: 'KOTAK', label: 'Kotak Mahindra Bank' }, { value: 'PNB', label: 'Punjab National Bank' },
  { value: 'BOB', label: 'Bank of Baroda' }, { value: 'YES', label: 'Yes Bank' },
];

export const PAYMENT_METHODS = [
  { value: 'upi', title: 'Instant UPI & QR', description: 'Google Pay, PhonePe, Paytm, any UPI app', badge: 'Recommended' },
  { value: 'card', title: 'Credit / Debit Card', description: 'Visa, Mastercard, RuPay, Amex' },
  { value: 'netbanking', title: 'Net Banking', description: 'All major Indian banks' },
];
