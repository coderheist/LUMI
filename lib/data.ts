/**
 * Demo content for the Lumi template.
 *
 * Lumi is the AI support/shopping agent being sold. NOVA is the fictional
 * fashion brand used as the customer throughout. Keep the two separate:
 * NOVA owns products, orders and policies; Lumi owns retrieval, answers
 * and actions.
 *
 * Every metric here is illustrative demo data, not a factual claim.
 */

/**
 * Homepage hero and closing CTA copy. Pulled into one place — unlike every
 * other section, these two don't have a natural data shape of their own, so
 * without this they'd be the only sections with copy sitting in the JSX.
 */
export const HERO_COPY = {
  eyebrow: "AI customer support for commerce",
  headline: "Turn every customer conversation into a sale.",
  lead: "Lumi answers questions, recommends products, tracks orders and resolves support issues automatically — across every channel your customers use.",
  trustLine: "No credit card required · Setup in minutes",
} as const;

export const FINAL_CTA_COPY = {
  headline: "Let your team focus on customers. Let Lumi handle the questions.",
  lead: "Start automating your customer conversations today.",
  trustLine: "No credit card required · Setup in minutes",
} as const;

export const NAV_LINKS = [
  { label: "Product", href: "/features" },
  { label: "Solutions", href: "/use-cases" },
  { label: "Use Cases", href: "/use-cases#catalogue" },
  { label: "Resources", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
] as const;

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  colour: string;
  sizes: string[];
  material: string;
  fit: string;
  care: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "nova-linen-overshirt",
    name: "Linen Overshirt",
    price: 89,
    category: "Shirting",
    colour: "Bone",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "100% washed European linen",
    fit: "Relaxed, drops at the shoulder",
    care: "Machine wash cold, line dry",
    image: "product-linen-overshirt",
  },
  {
    id: "nova-relaxed-denim",
    name: "Relaxed Denim",
    price: 110,
    category: "Denim",
    colour: "Mid indigo",
    sizes: ["28", "30", "32", "34", "36"],
    material: "13oz organic cotton, rope-dyed indigo",
    fit: "Relaxed straight, mid rise",
    care: "Wash inside out, cold",
    image: "product-relaxed-denim",
  },
  {
    id: "nova-everyday-sneaker",
    name: "Everyday Sneaker",
    price: 125,
    category: "Footwear",
    colour: "Off white",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    material: "Full-grain leather, natural rubber sole",
    fit: "True to size",
    care: "Wipe with damp cloth",
    image: "product-everyday-sneaker",
  },
  {
    id: "nova-utility-jacket",
    name: "Soft Utility Jacket",
    price: 149,
    category: "Outerwear",
    colour: "Clay beige",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Cotton-ramie canvas",
    fit: "Boxy, layers over knitwear",
    care: "Spot clean or dry clean",
    image: "product-utility-jacket",
  },
  {
    id: "nova-black-denim",
    name: "Black Straight Denim",
    price: 110,
    category: "Denim",
    colour: "Washed black",
    sizes: ["28", "30", "32", "34", "36"],
    material: "12oz stretch-free cotton",
    fit: "Straight, high rise",
    care: "Wash inside out, cold",
    image: "product-black-denim",
  },
  {
    id: "nova-crossbody",
    name: "Minimal Crossbody",
    price: 79,
    category: "Accessories",
    colour: "Espresso",
    sizes: ["One size"],
    material: "Vegetable-tanned leather",
    fit: "Adjustable 95–115cm strap",
    care: "Condition twice yearly",
    image: "product-crossbody",
  },
  {
    id: "nova-cotton-shirt",
    name: "Oversized Cotton Shirt",
    price: 85,
    category: "Shirting",
    colour: "Pale blue",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Organic poplin, 120gsm",
    fit: "Oversized, dropped shoulder",
    care: "Machine wash cold",
    image: "product-cotton-shirt",
  },
  {
    id: "nova-neutral-knit",
    name: "Neutral Knit",
    price: 120,
    category: "Knitwear",
    colour: "Oat",
    sizes: ["XS", "S", "M", "L", "XL"],
    material: "Merino lambswool blend",
    fit: "Regular, ribbed hem",
    care: "Hand wash, dry flat",
    image: "product-neutral-knit",
  },
];

export const productById = (id: string): Product => {
  const found = PRODUCTS.find((p) => p.id === id);
  if (!found) throw new Error(`Unknown product: ${id}`);
  return found;
};

/* ---------------------------------------------------------------- Orders */

export const DEMO_ORDER = {
  reference: "NOVA-4832",
  customer: "Alex Morgan",
  email: "a.morgan@mail.com",
  placed: "12 days ago",
  carrier: "DHL Express",
  tracking: "JD014600008912345",
  window: "2:40 – 5:00 PM",
  items: [
    { product: "nova-relaxed-denim", size: "32W × 34L", qty: 1 },
    { product: "nova-linen-overshirt", size: "M", qty: 1 },
  ],
  steps: [
    { label: "Order confirmed", at: "Mar 4", state: "done" },
    { label: "Packed at Rotterdam DC", at: "Mar 5", state: "done" },
    { label: "Shipped", at: "Mar 5", state: "done" },
    { label: "Out for delivery", at: "Today", state: "active" },
    { label: "Delivered", at: "Expected today", state: "pending" },
  ],
} as const;

export const RETURN_CASE = {
  order: "NOVA-4832",
  item: "Relaxed Denim",
  size: "32W × 34L",
  price: 110,
  purchased: "12 days ago",
  windowDays: 30,
  eligible: true,
  refundTo: "Original payment method · Visa ending 4071",
  processing: "3–5 business days",
} as const;

/* --------------------------------------------------- Conversation scripts
   Each demo reads as a turn-by-turn script so the components can stream
   them. `retrieval` rows are what Lumi looked up before answering. */

export type Turn = {
  actor: "customer" | "lumi" | "human";
  text: string;
  delay?: number;
};

export const HERO_SCRIPT: Turn[] = [
  {
    actor: "customer",
    text: "Hey, I'm going to a summer dinner. What would you recommend?",
  },
  {
    actor: "lumi",
    text: "Absolutely. Based on your style, I'd recommend our Linen Overshirt with Relaxed Straight Jeans.",
  },
  { actor: "customer", text: "Do you have these in medium?" },
  { actor: "lumi", text: "Yes. Both are currently available in M." },
];

/** Plays inside the floating widget that follows the page. */
export const WIDGET_SCRIPT: Turn[] = [
  { actor: "customer", text: "Do the Relaxed Denim run small?" },
  {
    actor: "lumi",
    text: "They run true to size. If you're between sizes, most customers size down — the waist gives about a centimetre after a few wears.",
  },
  { actor: "customer", text: "Great. Do you have a 32 in stock?" },
  { actor: "lumi", text: "Yes, 32W × 34L is in stock and ships today." },
];

export const TRACKING_SCRIPT = {
  question: "Where is my order?",
  acknowledge: "Let me check that for you.",
  retrieval: [
    { source: "Order data", detail: "NOVA-4832 · Alex Morgan" },
    { source: "Carrier API", detail: "DHL Express · out for delivery" },
    { source: "Customer profile", detail: "Amsterdam, NL" },
  ],
  answer:
    "Your order is out for delivery and should arrive today between 2:40 and 5:00 PM.",
} as const;

export const RETURN_SCRIPT = {
  question: "Can I return the jeans?",
  acknowledge: "Checking your order and our return policy…",
  retrieval: [
    { source: "Order data", detail: "Relaxed Denim · purchased 12 days ago" },
    { source: "Return policy", detail: "30-day window · page 4" },
    { source: "Stock", detail: "Replacement sizes available" },
  ],
  answer:
    "Yes — your jeans are eligible for return. I can start the return for you.",
} as const;

export const DISCOVERY_SCRIPT = {
  question: "I need a minimalist outfit for a weekend in Paris.",
  answer: "Try these three pieces — they work as one outfit.",
  picks: [
    { product: "nova-cotton-shirt", match: 94 },
    { product: "nova-relaxed-denim", match: 91 },
    { product: "nova-everyday-sneaker", match: 88 },
  ],
} as const;

export const FIT_SCRIPT = {
  question: "I'm 6'1 and normally wear 32x32. Which size should I take?",
  retrieval: [
    { source: "Size guide", detail: "Relaxed Denim · inseam runs 1cm short" },
    { source: "Return data", detail: "Customers 6'0–6'2 size up in length" },
  ],
  answer: "Based on your measurements, I'd recommend 32W × 34L.",
} as const;

export const POLICY_SCRIPT = {
  question: "Do you ship to Dubai?",
  passage:
    "International delivery is available to 34 countries. Orders to the United Arab Emirates ship DDP with duties and taxes included, and typically arrive within 4–6 working days.",
  citation: "Shipping policy · page 2 · International delivery",
  answer:
    "Yes — we ship to Dubai. Duties are included in the price, and delivery usually takes 4 to 6 working days.",
} as const;

/* ------------------------------------------------------------- Inbox load */

export const INBOUND_QUESTIONS = [
  "Where is my order?",
  "Do you have this in Medium?",
  "Can I return this?",
  "Which jeans fit loose?",
  "Do you ship to Dubai?",
  "Is this available in black?",
] as const;

export const INBOX_LOAD = [
  { label: "New conversations", value: 143 },
  { label: "Unanswered", value: 37 },
  { label: "Return requests", value: 12 },
  { label: "Product questions", value: 24 },
  { label: "Abandoned carts", value: 8 },
] as const;

/* ------------------------------------------------------------ Trust strip */

export const CUSTOMER_BRANDS = [
  "NOVA",
  "Morrow",
  "Aster",
  "Common Goods",
  "Northline",
  "Luma",
] as const;

export const HEADLINE_METRICS = [
  { value: "24/7", label: "Support coverage" },
  { value: "70%+", label: "Conversations automated" },
  { value: "<30s", label: "Average first response" },
  { value: "+18%", label: "Assisted conversion" },
] as const;

/* --------------------------------------------------------------- Use cases */

export const USE_CASES = [
  {
    slug: "product-discovery",
    title: "Product discovery",
    question: "Find me something under $150 for a weekend trip.",
    answer: "Recommends a complete outfit from the live NOVA catalogue.",
    detail:
      "Lumi reads the catalogue, filters on price and availability, then puts together pieces that actually work together.",
    capability: "Reads catalogue, stock and price",
  },
  {
    slug: "order-tracking",
    title: "Order tracking",
    question: "Where is my order?",
    answer: "Checks the order record and the carrier, then gives live status.",
    detail:
      "No ticket, no waiting. Lumi looks up the order, asks the carrier and answers with the delivery window.",
    capability: "Reads orders and carrier status",
  },
  {
    slug: "returns",
    title: "Returns and exchanges",
    question: "I need to return my jeans.",
    answer: "Checks eligibility against policy, then starts the return.",
    detail:
      "Lumi confirms the purchase date against the return window and creates the return without a human touching it.",
    capability: "Takes action in your systems",
  },
  {
    slug: "size-and-fit",
    title: "Size and fit",
    question: "I'm 6'1. Which fit should I choose?",
    answer: "Uses the size guide and real return data to recommend a size.",
    detail:
      "Fit questions are the biggest driver of returns. Lumi answers them before the order, not after.",
    capability: "Reads size guides and return history",
  },
  {
    slug: "policy-questions",
    title: "Policy questions",
    question: "Do you ship internationally?",
    answer: "Answers from your shipping policy and cites the source.",
    detail:
      "Every policy answer links back to the document it came from, so your team can check what customers were told.",
    capability: "Cites the document it used",
  },
  {
    slug: "human-handoff",
    title: "Human handoff",
    question: "I need help with something unusual.",
    answer: "Recognises the limit and transfers with full context.",
    detail:
      "When Lumi cannot resolve something, it hands over a summary, the order and the full history — not a cold transfer.",
    capability: "Knows when to stop",
  },
] as const;

/* ---------------------------------------------------------------- Channels */

export const CHANNELS = [
  { name: "Website", note: "Embedded widget" },
  { name: "WhatsApp", note: "Business API" },
  { name: "Instagram", note: "DMs and comments" },
  { name: "Email", note: "Shared inbox" },
  { name: "Voice", note: "Inbound calls" },
  { name: "Helpdesk", note: "Agent console" },
] as const;

export const RELAY_STEPS = [
  {
    channel: "Website",
    actor: "customer" as const,
    text: "Is the Linen Overshirt back in my size?",
    note: "Started on the product page",
  },
  {
    channel: "Website",
    actor: "lumi" as const,
    text: "Not yet — restock lands Thursday. Want me to message you when it does?",
    note: "Read stock and restock date",
  },
  {
    channel: "WhatsApp",
    actor: "lumi" as const,
    text: "The Linen Overshirt is back in M. Shall I hold one for you?",
    note: "Same conversation, new channel",
  },
  {
    channel: "WhatsApp",
    actor: "customer" as const,
    text: "Yes please — and can I pay on delivery?",
    note: "Payment terms need a human",
  },
  {
    channel: "Helpdesk",
    actor: "human" as const,
    text: "Hi Alex, Priya here. I can set that up for you.",
    note: "Escalated with full history",
  },
] as const;

/* --------------------------------------------------------------- Knowledge */

export const KNOWLEDGE_SOURCES = [
  { name: "Product catalogue", kind: "Shopify sync", count: "412 products" },
  { name: "Return policy", kind: "PDF", count: "6 pages" },
  { name: "Shipping policy", kind: "PDF", count: "4 pages" },
  { name: "Size guide", kind: "Spreadsheet", count: "38 rows" },
  { name: "FAQ", kind: "Help centre", count: "74 articles" },
  { name: "Brand guidelines", kind: "PDF", count: "22 pages" },
  { name: "Customer data", kind: "API", count: "Live" },
] as const;

/* ------------------------------------------------------------------ Handoff */

export const HANDOFF = {
  customer: "Alex Morgan",
  order: "NOVA-4832",
  issue: "Exchange request — size M to L",
  summary:
    "Customer wants to exchange size M for L. Product is eligible and the replacement is in stock.",
  confidence: "Below action threshold — payment terms are not in policy",
  attached: ["Conversation history", "Order NOVA-4832", "Customer profile", "Return eligibility"],
} as const;

/* ---------------------------------------------------------------- Analytics */

export const ANALYTICS_METRICS = [
  { label: "Automation rate", value: 72, suffix: "%", delta: "+14 pts" },
  { label: "Resolution rate", value: 89, suffix: "%", delta: "+6 pts" },
  { label: "Customer satisfaction", value: 4.8, suffix: "/5", delta: "+0.3" },
  { label: "Assisted revenue", value: 42.8, prefix: "$", suffix: "K", delta: "+22%" },
] as const;

/** Twelve weeks of conversation volume, split by who resolved it. */
export const VOLUME_SERIES = [
  { week: "W1", automated: 362, escalated: 188 },
  { week: "W2", automated: 410, escalated: 176 },
  { week: "W3", automated: 455, escalated: 171 },
  { week: "W4", automated: 498, escalated: 165 },
  { week: "W5", automated: 540, escalated: 158 },
  { week: "W6", automated: 602, escalated: 152 },
  { week: "W7", automated: 655, escalated: 149 },
  { week: "W8", automated: 701, escalated: 143 },
  { week: "W9", automated: 764, escalated: 138 },
  { week: "W10", automated: 812, escalated: 134 },
  { week: "W11", automated: 878, escalated: 131 },
  { week: "W12", automated: 941, escalated: 127 },
] as const;

export const TOP_QUESTIONS = [
  { question: "Where is my order?", share: 28, resolved: 97 },
  { question: "Size and fit advice", share: 21, resolved: 88 },
  { question: "Return or exchange", share: 17, resolved: 93 },
  { question: "Stock and restock dates", share: 14, resolved: 91 },
  { question: "Shipping and duties", share: 11, resolved: 85 },
  { question: "Order changes", share: 9, resolved: 64 },
] as const;

/* ----------------------------------------------------------------- Security */

export const SECURITY_FEATURES = [
  {
    title: "Encryption in transit and at rest",
    detail: "TLS 1.3 on every connection, AES-256 for stored conversations.",
  },
  {
    title: "Role-based access",
    detail: "Scope agents, knowledge and customer data per team and per region.",
  },
  {
    title: "Data residency controls",
    detail: "Pin processing and storage to EU or US regions.",
  },
  {
    title: "Retention windows",
    detail: "Set how long conversations and customer records are kept.",
  },
  {
    title: "Audit logs",
    detail: "Every retrieval, action and handoff is recorded and exportable.",
  },
  {
    title: "No training on your data",
    detail: "Your catalogue and conversations are never used to train shared models.",
  },
] as const;

export const COMPLIANCE_TAGS = ["SOC 2 controls", "GDPR tooling", "DPA available", "SSO / SAML"] as const;

/* ------------------------------------------------------------------ Stories */

export const STORIES = [
  {
    brand: "NOVA",
    sector: "Premium lifestyle fashion",
    quote:
      "Fit and delivery questions used to eat the whole morning. Now the team only sees the conversations that need a person.",
    person: "Priya Raman",
    role: "Head of Customer Experience",
    before: { label: "Conversations automated", value: "38%" },
    after: { label: "Conversations automated", value: "72%" },
    image: "editorial-duo",
  },
  {
    brand: "Morrow",
    sector: "Footwear",
    quote:
      "Lumi answers sizing from our own return data, so we stopped guessing and started recommending.",
    person: "Daniel Okafor",
    role: "Director of Ecommerce",
    before: { label: "First response", value: "4h 12m" },
    after: { label: "First response", value: "24s" },
    image: "editorial-male",
  },
  {
    brand: "Aster",
    sector: "Knitwear and accessories",
    quote:
      "Every answer cites the policy it came from. That was the thing that got it past our legal team.",
    person: "Mara Lindqvist",
    role: "Operations Lead",
    before: { label: "Return-related tickets", value: "1,240/mo" },
    after: { label: "Return-related tickets", value: "310/mo" },
    image: "editorial-female-walking",
  },
] as const;

/* ------------------------------------------------------------ ROI calculator
   The business model behind the /pricing calculator, in one place — a buyer
   retargeting this template to a different vertical only needs to edit here,
   not hunt through the component. */

/** Stated plainly next to the result, because a calculator that hides its
 *  assumptions is just a number generator. */
export const ROI_ASSUMPTIONS = {
  minutesPerConversation: 6,
  lumiAutomationCeiling: 0.72,
  assistedPurchaseRate: 0.04,
} as const;

export const ROI_INPUTS = [
  {
    key: "conversations",
    label: "Conversations per month",
    min: 500,
    max: 40000,
    step: 500,
    initial: 6000,
    format: (value: number) => value.toLocaleString("en-GB"),
  },
  {
    key: "cost",
    label: "Support cost per hour",
    min: 12,
    max: 90,
    step: 1,
    initial: 28,
    format: (value: number) => `$${value}`,
  },
  {
    key: "aov",
    label: "Average order value",
    min: 25,
    max: 600,
    step: 5,
    initial: 140,
    format: (value: number) => `$${value}`,
  },
  {
    key: "automation",
    label: "Conversations you automate today",
    min: 0,
    max: 70,
    step: 1,
    initial: 22,
    format: (value: number) => `${value}%`,
  },
] as const;

/* ------------------------------------------------------------------ Pricing */

/**
 * Price is given for both billing cycles so the toggle in <PricingPlans>
 * has something to switch to — annual is the usual ~20% discount, expressed
 * as a monthly-equivalent figure since that is what sits next to "Starter"
 * and "Growth" either way. Scale has no numeric price in either cycle, so
 * both sides read the same.
 */
export const PLANS = [
  {
    name: "Starter",
    price: { monthly: "$49", annual: "$39" },
    cadence: { monthly: "per month", annual: "per month, billed annually" },
    audience: "For small brands getting their first agent live.",
    cta: "Start free",
    featured: false,
    includes: [
      "1,000 AI conversations / month",
      "Website and email",
      "5 knowledge sources",
      "Core analytics",
      "Email support",
    ],
    limits: "Human handoff to one shared inbox",
  },
  {
    name: "Growth",
    price: { monthly: "$149", annual: "$119" },
    cadence: { monthly: "per month", annual: "per month, billed annually" },
    audience: "For ecommerce teams running support as a channel.",
    cta: "Start free",
    featured: true,
    includes: [
      "10,000 AI conversations / month",
      "All channels including WhatsApp and Instagram",
      "Unlimited knowledge sources",
      "Actions: returns, exchanges, order edits",
      "Full analytics and revenue attribution",
      "Priority support",
    ],
    limits: "Handoff routing with team rules",
  },
  {
    name: "Scale",
    price: { monthly: "Custom", annual: "Custom" },
    cadence: { monthly: "annual", annual: "annual" },
    audience: "For larger brands with compliance and volume requirements.",
    cta: "Talk to sales",
    featured: false,
    includes: [
      "Volume conversation pricing",
      "Data residency and retention controls",
      "SSO / SAML and audit log export",
      "Custom actions and private integrations",
      "Named support engineer",
    ],
    limits: "Sandbox and staging environments",
  },
] as const;

/** Shown next to the toggle — the saving is computed from the two Starter
 *  prices above rather than hand-typed, so it can't drift out of sync. */
export const ANNUAL_DISCOUNT = Math.round(
  (1 - Number(PLANS[0].price.annual.replace("$", "")) / Number(PLANS[0].price.monthly.replace("$", ""))) * 100,
);

export const PLAN_MATRIX = [
  { feature: "AI conversations", starter: "1,000 / mo", growth: "10,000 / mo", scale: "Volume pricing" },
  { feature: "Channels", starter: "Website, email", growth: "All channels", scale: "All channels" },
  { feature: "Knowledge sources", starter: "5", growth: "Unlimited", scale: "Unlimited" },
  { feature: "Actions in your systems", starter: "—", growth: "Returns, exchanges, order edits", scale: "Custom actions" },
  { feature: "Analytics", starter: "Core", growth: "Full + attribution", scale: "Full + warehouse export" },
  { feature: "Human handoff", starter: "Shared inbox", growth: "Routing rules", scale: "Routing + SLAs" },
  { feature: "Integrations", starter: "Shopify", growth: "Shopify, helpdesk, CRM", scale: "Private integrations" },
  { feature: "Security", starter: "Standard", growth: "SSO", scale: "SSO, residency, audit export" },
] as const;

/* -------------------------------------------------------------- Integrations */

export const INTEGRATIONS = [
  { name: "Shopify", kind: "Catalogue, orders, returns" },
  { name: "WooCommerce", kind: "Catalogue and orders" },
  { name: "Zendesk", kind: "Helpdesk handoff" },
  { name: "Gorgias", kind: "Helpdesk handoff" },
  { name: "Klaviyo", kind: "Lifecycle messaging" },
  { name: "WhatsApp", kind: "Business messaging" },
  { name: "Slack", kind: "Internal alerts" },
  { name: "HubSpot", kind: "CRM records" },
  { name: "Stripe", kind: "Payments and refunds" },
  { name: "Google Drive", kind: "Policy documents" },
  { name: "API", kind: "REST and GraphQL" },
  { name: "Webhooks", kind: "Events out" },
] as const;

/* ---------------------------------------------------------------------- FAQ */

export const FAQS = [
  {
    q: "How long does setup actually take?",
    a: "Connect your store, point Lumi at your policy documents, and you have a working agent in about twenty minutes. Most teams spend another day tuning tone and deciding which actions Lumi is allowed to take on its own.",
  },
  {
    q: "What happens when Lumi does not know the answer?",
    a: "It stops and hands over. Lumi passes the conversation to a person with a summary, the order record and the full history, rather than guessing or looping the customer.",
  },
  {
    q: "Can Lumi actually change things, or only answer questions?",
    a: "It can take action. Returns, exchanges, address corrections and order edits all run through permissions you set, and every action is written to the audit log.",
  },
  {
    q: "Will it sound like our brand?",
    a: "Lumi reads your brand guidelines alongside your policies. You set the voice, the things it must never say, and the moments it should always involve a person.",
  },
  {
    q: "Do you train models on our catalogue or conversations?",
    a: "No. Your data is used to answer your customers' questions and nothing else. It is never added to a shared training set.",
  },
  {
    q: "What does a conversation mean for billing?",
    a: "One customer thread in a 24-hour window, however many messages it contains and whichever channel it moves through.",
  },
] as const;

/* --------------------------------------------------------------------- Blog */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  author: { name: string; role: string };
  image: string;
  body: string[];
};

export const POSTS: Post[] = [
  {
    slug: "fit-questions-are-a-returns-problem",
    title: "Fit questions are a returns problem, not a support problem",
    excerpt:
      "The cheapest return to process is the one that never happens. What changes when an agent answers sizing from your own return data.",
    date: "2026-02-18",
    readingTime: "6 min",
    category: "Operations",
    author: { name: "Priya Raman", role: "Head of Customer Experience, NOVA" },
    image: "detail-denim",
    body: [
      "Most fashion brands treat sizing questions as a support cost. They arrive before the order, they are repetitive, and they are usually answered with a link to a size chart. The cost shows up somewhere else entirely: in the returns queue six weeks later.",
      "The useful signal is not the size chart. It is what previous customers with similar measurements kept and what they sent back. That data already exists in your returns table, and it is far more specific than a garment's nominal measurements.",
      "When an agent answers a fit question using return history, two things change. The customer gets a recommendation instead of a chart, and the brand stops paying twice for a question it could have answered once.",
      "The practical test is whether your agent can say why it recommended a size. If it cannot cite the size guide row and the return pattern it relied on, it is guessing, and your customers will find out at the fitting-room stage.",
    ],
  },
  {
    slug: "what-an-agent-should-refuse-to-do",
    title: "What an agent should refuse to do",
    excerpt:
      "Permissions are a design problem. A short, opinionated list of the actions worth automating and the ones worth escalating.",
    date: "2026-01-29",
    readingTime: "5 min",
    category: "Product",
    author: { name: "Jonas Eriksen", role: "Product, Lumi" },
    image: "detail-stitching",
    body: [
      "Every team that deploys a support agent eventually draws the same line twice: once in the permissions panel, and once in the escalation rules. Getting the first one wrong is expensive. Getting the second one wrong is worse, because the customer experiences it.",
      "Start with actions that are reversible and cheap to audit. Address corrections before dispatch, return creation inside the policy window, restock notifications, order status. These have a clear right answer and a clean undo.",
      "Escalate anything that touches money outside of policy, anything involving a dispute, and anything where the customer has already told you they are unhappy. Not because the model cannot phrase a reply, but because the decision is not a retrieval problem.",
      "The signal to watch is not resolution rate. It is how often a conversation that should have escalated did not. Track that number, and put it in front of the team that owns the escalation rules.",
    ],
  },
  {
    slug: "citations-are-what-got-us-past-legal",
    title: "Citations are what got us past legal",
    excerpt:
      "Why every policy answer should link back to the document and page it came from, and how that changed our rollout.",
    date: "2025-12-11",
    readingTime: "4 min",
    category: "Trust",
    author: { name: "Mara Lindqvist", role: "Operations Lead, Aster" },
    image: "editorial-duo",
    body: [
      "Our legal team had one question about automating customer answers, and it was not about accuracy in the abstract. It was: if a customer is told something incorrect, can you show us what the system was looking at when it said it?",
      "That is a product requirement, not a compliance checkbox. It means retrieval has to be inspectable, answers have to carry their sources, and the log has to keep both long enough to matter.",
      "Once every answer cited a document and a page, the conversation changed shape. Instead of debating whether to automate, we debated which documents were out of date — which turned out to be the real problem.",
      "Six weeks in, the most valuable output was not the automation rate. It was a list of eleven policy pages that contradicted each other, found by an agent that had to cite its work.",
    ],
  },
  {
    slug: "one-conversation-many-channels",
    title: "One conversation, many channels",
    excerpt:
      "Customers do not think in channels. A note on keeping context intact when a thread moves from your site to WhatsApp to a human.",
    date: "2025-11-20",
    readingTime: "5 min",
    category: "Engineering",
    author: { name: "Jonas Eriksen", role: "Product, Lumi" },
    image: "editorial-male",
    body: [
      "A customer asks about a restock on your product page, gets a notification on WhatsApp four days later, replies there, and then needs a person. To them that is one conversation. To most support stacks it is three tickets and two dead ends.",
      "Keeping it as one thread means identity has to resolve across channels, and context has to travel with the thread rather than living in the channel. That is an architecture decision you make early or pay for later.",
      "The test is simple: when the conversation reaches a human, does that person have to ask the customer to repeat anything? If the answer is yes, the context did not travel.",
    ],
  },
];

export const postBySlug = (slug: string): Post | undefined =>
  POSTS.find((p) => p.slug === slug);

/* ---------------------------------------------------------------- Changelog */

export const CHANGELOG = [
  {
    version: "2.14",
    date: "2026-03-02",
    title: "Exchange actions and restock holds",
    tag: "Feature",
    items: [
      "Lumi can now create an exchange, not just a return, when the replacement size is in stock.",
      "Restock holds: customers can reserve an incoming item for 48 hours from a conversation.",
      "Return eligibility now reads per-collection policy overrides.",
    ],
  },
  {
    version: "2.13",
    date: "2026-02-11",
    title: "Voice channel and retrieval inspector",
    tag: "Feature",
    items: [
      "Inbound voice is out of beta for Growth and Scale plans.",
      "Retrieval inspector shows every source a given answer considered, including the ones it discarded.",
      "Knowledge sync reports conflicting policy pages instead of silently preferring one.",
    ],
  },
  {
    version: "2.12",
    date: "2026-01-22",
    title: "Escalation quality reporting",
    tag: "Improvement",
    items: [
      "New report: conversations that should have escalated but did not, scored against your own rules.",
      "Handoff summaries now include the confidence reason, not just the confidence score.",
      "Reduced median first-response latency on the website widget.",
    ],
  },
  {
    version: "2.11",
    date: "2025-12-15",
    title: "Data residency controls",
    tag: "Security",
    items: [
      "Pin processing and storage to EU or US regions per workspace.",
      "Configurable retention windows for conversations and customer records.",
      "Audit log export to S3 and BigQuery.",
    ],
  },
] as const;
