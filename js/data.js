/* ============================================================
   GEM MARKETING OS — Content Library
   Gem Home Team | NEO Home Loans powered by Better
   ============================================================ */

const GEM = window.GEM || {};
window.GEM = GEM;

/* ---------- Brand ---------- */
GEM.brand = {
  name: "Gem Home Team",
  tagline: "Mortgage Lending",
  cobrand: "NEO Home Loans · powered by Better",
  colors: {
    navy: "#0D2B36",
    ink: "#081E27",
    blue: "#45B6E8",
    blueDeep: "#1E90C9",
    white: "#FFFFFF",
    mist: "#B8D4E0",
    gold: "#E8C468"
  }
};

/* ---------- Team Roster (from gemhometeam.com / public profiles) ---------- */
GEM.team = [
  { name: "Megan Sawamura", role: "Producing Branch Manager", nmls: "972639" },
  { name: "Anthony Edrozo", role: "Loan Officer", nmls: "" },
  { name: "Sonny Alquizar", role: "Loan Officer", nmls: "960861" },
  { name: "Camryn", role: "Team Member", nmls: "" },
  { name: "Kevin", role: "Team Member", nmls: "" }
];
GEM.office = "662 Encinitas Blvd, Encinitas, CA · Serving San Diego County";
GEM.links = {
  website: "https://www.gemhometeam.com",
  facebook: "https://www.facebook.com/GEMTeamMortgage",
  company: "https://neohomeloans.com"
};

/* ---------- Hashtag Library ---------- */
GEM.hashtags = {
  core: {
    label: "Core Brand (use on every post)",
    tags: ["#GemHomeTeam", "#NEOHomeLoans", "#MortgageLending", "#HomeLoans", "#MortgageExpert"]
  },
  firstTimeBuyer: {
    label: "First-Time Buyers",
    tags: ["#FirstTimeHomeBuyer", "#FirstHome", "#HomeBuyingTips", "#HouseHunting", "#NewHomeowner", "#BuyingAHouse", "#HomeBuying101", "#DreamHome", "#StopRenting", "#HomeownershipGoals"]
  },
  education: {
    label: "Mortgage Education",
    tags: ["#MortgageTips", "#Mortgage101", "#HomeLoanTips", "#MortgageEducation", "#CreditTips", "#FinancialLiteracy", "#RealEstateTips", "#MortgageBroker", "#LoanOfficer", "#MortgageAdvice"]
  },
  market: {
    label: "Market Updates",
    tags: ["#HousingMarket", "#RealEstateMarket", "#MarketUpdate", "#InterestRates", "#MortgageRates", "#RealEstateNews", "#HousingMarket2026", "#HomeValues", "#RealEstateInvesting", "#MarketTrends"]
  },
  refinance: {
    label: "Refinance & Equity",
    tags: ["#Refinance", "#HomeEquity", "#CashOutRefinance", "#HELOC", "#DebtConsolidation", "#RefinanceYourHome", "#EquityGoals", "#SmartMoney", "#HomeWealth", "#MortgageRefinance"]
  },
  local: {
    label: "Local & Community",
    tags: ["#LocalLender", "#SupportLocal", "#CommunityFirst", "#LocalRealEstate", "#ShopLocal", "#YourLocalLender", "#HometownLender", "#LocalBusiness", "#Neighborhood", "#LocalExpert"]
  },
  realtor: {
    label: "Realtor Partners",
    tags: ["#RealtorPartner", "#RealEstateAgent", "#RealtorLife", "#AgentTips", "#RealEstateTeam", "#ClosingDay", "#RealtorsOfInstagram", "#ListingAgent", "#BuyersAgent", "#RealEstatePartners"]
  },
  motivation: {
    label: "Lifestyle & Motivation",
    tags: ["#HomeGoals", "#Homeownership", "#WealthBuilding", "#AmericanDream", "#KeysToSuccess", "#ClosingDay", "#NewChapter", "#MilestoneMoment", "#HomeSweetHome", "#GenerationalWealth"]
  }
};

/* ---------- Content Pillars ---------- */
GEM.pillars = {
  education:   { label: "Education",        icon: "🎓", desc: "Teach one thing simply. Builds authority and saves.", color: "#45B6E8" },
  market:      { label: "Market Pulse",     icon: "📊", desc: "Translate rates & market news into plain English.", color: "#E8C468" },
  story:       { label: "Client Stories",   icon: "🏡", desc: "Wins, closings, and transformations. Builds trust.", color: "#7BD88F" },
  personal:    { label: "Personal Brand",   icon: "⭐", desc: "You, your team, your why. People hire people.", color: "#E88BB8" },
  engagement:  { label: "Engagement",       icon: "💬", desc: "Polls, questions, myths. Feeds the algorithm.", color: "#B79BE8" },
  realtor:     { label: "Realtor Partners", icon: "🤝", desc: "Content that makes agents want to work with you.", color: "#E8A25E" },
  offer:       { label: "Call To Action",   icon: "🚀", desc: "Direct invitations to start a conversation.", color: "#5EDAD0" }
};

/* ---------- Topic Library ----------
   Each topic: id, pillar, title, format, hooks[], caption, cta, hashtagKeys[], designBrief
   {NAME} {NMLS} {HANDLE} {STATE} are replaced from Settings.
------------------------------------- */
GEM.topics = [

  /* ===== EDUCATION ===== */
  {
    id: "edu-credit-myths", pillar: "education", title: "3 credit myths costing buyers money", format: "Reel",
    hooks: [
      "Your credit score is NOT the reason you can't buy a home. This is. 👇",
      "3 credit myths your parents taught you (that are costing you thousands)",
      "STOP checking your credit score on those free apps. Here's why."
    ],
    caption: `Let's bust these once and for all 👇

❌ MYTH 1: "Checking my own credit hurts my score."
Truth: Checking your own credit is a soft pull. It does NOT lower your score. Check it as often as you want.

❌ MYTH 2: "I need to pay off ALL my debt first."
Truth: Lenders look at your debt-to-income ratio, not whether you're debt-free. Many buyers qualify with car payments and student loans.

❌ MYTH 3: "I need perfect credit to buy."
Truth: Many loan programs allow much lower scores than people assume. The only way to know where you stand is a real conversation — not a guess.

The buyers who win aren't the ones with perfect finances. They're the ones who got their questions answered early.`,
    cta: "🔑 Not sure where you stand? Send me the word CREDIT and let's map it out — zero pressure, zero obligation.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "Reel: talking-head with bold kinetic captions. Cover frame: navy background, huge white text '3 CREDIT MYTHS', myth #1 teased in blue. On-screen text flips ❌→✅ per myth."
  },
  {
    id: "edu-down-payment", pillar: "education", title: "You don't need 20% down", format: "Carousel",
    hooks: [
      "The 20% down payment rule is dead. Here's what buyers are actually putting down.",
      "Waiting to save 20%? Read this before you wait another year.",
      "The most expensive myth in real estate: '20% down or nothing.'"
    ],
    caption: `The #1 reason renters think they can't buy? The 20% myth. 👇

Here's the reality:
🔹 Many first-time buyers put down far less than 20%
🔹 Some loan programs allow low down payment options for qualified buyers
🔹 Down payment assistance programs exist in many states
🔹 20% avoids mortgage insurance — but mortgage insurance isn't the villain it's made out to be. It's the cost of getting in the game years sooner.

While you're saving for "perfect," you're paying 100% interest on your rent. 🏠

Every situation is different — the right move is running YOUR real numbers, not a rule of thumb from 1985.`,
    cta: "💬 Want to know what you'd actually need? DM me the word DOWN and I'll walk you through your options.",
    hashtagKeys: ["core", "firstTimeBuyer", "education"],
    designBrief: "Carousel, 6 slides. Slide 1: giant '20%' with red slash on navy. Slides 2-5: one stat per slide, blue accent bar left. Slide 6: CTA card with headshot + logo. Consistent margins, Montserrat-style extra-bold."
  },
  {
    id: "edu-preapproval", pillar: "education", title: "Pre-qualified vs pre-approved", format: "Reel",
    hooks: [
      "Pre-qualified and pre-approved are NOT the same thing. One of them wins houses.",
      "Why sellers ignored your offer (it's probably this piece of paper)",
      "The 10-minute mistake that kills offers in a competitive market"
    ],
    caption: `In a competitive market, this one difference wins or loses houses 👇

📄 PRE-QUALIFIED
An estimate based on what you tell a lender. No documents verified. Sellers know this — it carries very little weight.

✅ PRE-APPROVED
Your income, assets, and credit are actually reviewed. It tells the seller: "This buyer is real, and this deal will close."

When a listing gets multiple offers, agents call the buyers whose financing is solid FIRST.

Getting pre-approved early also means:
🔹 You know your real budget before you fall in love with a house
🔹 You can move fast when the right one hits the market
🔹 Surprises get solved months before they can kill a deal`,
    cta: "🏡 House hunting this year? Let's get you fully pre-approved before you tour a single home. DM me READY to start.",
    hashtagKeys: ["core", "firstTimeBuyer", "education"],
    designBrief: "Reel: split-screen VS format. Left side grey 'PRE-QUAL', right side blue 'PRE-APPROVED' with checkmarks stacking. End card: logo + 'DM READY'."
  },
  {
    id: "edu-closing-costs", pillar: "education", title: "Closing costs explained in 60 seconds", format: "Reel",
    hooks: [
      "Nobody explains closing costs until it's too late. 60 seconds, let's go.",
      "What are you ACTUALLY paying for at closing? Breaking it down.",
      "Closing costs aren't one fee. They're this. 👇"
    ],
    caption: `"Wait… what are all these fees?" — every first-time buyer at the closing table who wasn't prepped. Let's fix that now. 👇

Closing costs generally fall into 3 buckets:

1️⃣ LENDER & SERVICE FEES
Origination, appraisal, credit report, title work — the cost of making the loan happen.

2️⃣ PREPAIDS
Property taxes, homeowners insurance, and interest collected up front to open your escrow account. This isn't a "fee" — it's your own future bills, pre-funded.

3️⃣ ESCROW & TITLE
The neutral third parties who make sure money and ownership transfer safely.

💡 Pro tip: You'll get a Loan Estimate early in the process that lays out every line item — and I walk my clients through it page by page so nothing at the closing table is a surprise.`,
    cta: "📋 Want a plain-English walkthrough before you buy? DM me COSTS and I'll send you my closing-cost breakdown.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "Reel: whiteboard-style motion graphics or talking head with 3 animated buckets filling. Big numerals 1-2-3 in brand blue on navy."
  },
  {
    id: "edu-rate-vs-apr", pillar: "education", title: "Interest rate vs APR", format: "Carousel",
    hooks: [
      "Rate and APR are not the same number. Here's the one that matters.",
      "The 4-letter word lenders hope you never ask about: APR.",
      "Comparing lenders by rate alone? You're reading the wrong number."
    ],
    caption: `Two lenders quote you the "same rate." One loan still costs thousands more. How? 👇

📌 INTEREST RATE = the cost of borrowing the money.
📌 APR = the rate PLUS lender fees and certain costs, expressed as a yearly percentage.

That's why APR is almost always higher than the rate — and why it's the better tool for comparing offers apples-to-apples.

🔍 When you shop lenders:
🔹 Compare Loan Estimates, not ads
🔹 Look at the APR next to the rate
🔹 Ask what fees are built into that number

A flashy low rate with heavy fees can cost more than a slightly higher rate with none. The math — not the marketing — is what matters.`,
    cta: "🧮 Already have a quote? I'm happy to give you a second set of eyes — no pressure, no obligation. DM me COMPARE.",
    hashtagKeys: ["core", "education", "market"],
    designBrief: "Carousel, 5 slides. Slide 1: 'RATE ≠ APR' massive type. Middle slides: clean definition cards with icon chips. Final: 'DM COMPARE' CTA with logo lockup."
  },
  {
    id: "edu-house-hack", pillar: "education", title: "House hacking 101", format: "Reel",
    hooks: [
      "How 25-year-olds are buying homes and living nearly free. It's called house hacking.",
      "Your first home can pay for itself. Here's the strategy nobody taught you.",
      "Rent out the basement. Live upstairs. Let tenants help with the mortgage. Let me explain."
    ],
    caption: `House hacking = buying a home and letting rental income help cover your housing cost. 👇

The play:
🏠 Buy a duplex, triplex, or a home with a basement suite
🔑 Live in one unit (owner-occupied financing can mean lower down payments for qualified buyers)
💵 Rent the other unit(s) — that income offsets your monthly payment

Why it's powerful:
🔹 You build equity while someone helps pay your mortgage
🔹 You learn landlording with training wheels
🔹 In a few years, move out, keep it as a rental, repeat

It's not for everyone — being a live-in landlord is a real job. But for the right buyer, it's the cheat code to starting a real estate portfolio in your 20s.`,
    cta: "🧠 Curious if house hacking could work for you? DM me HACK and let's run a real scenario together.",
    hashtagKeys: ["core", "education", "motivation"],
    designBrief: "Reel: B-roll of duplex exteriors + captions. Cover: 'LIVE (almost) FREE' huge white type, blue underline swipe. Fast cuts, trending audio, captions always on."
  },
  {
    id: "edu-escrow", pillar: "education", title: "What is escrow, actually?", format: "Reel",
    hooks: [
      "You pay it every month and probably can't explain it. Escrow, explained.",
      "Escrow: the most confusing word in your mortgage, explained like you're 12.",
      "Where does your mortgage payment actually GO every month? 👇"
    ],
    caption: `Your monthly mortgage payment isn't just your loan. It's usually 4 things — remember PITI: 👇

🅿️ PRINCIPAL — pays down what you borrowed
🅸 INTEREST — the cost of borrowing it
🆃 TAXES — your property taxes, saved up monthly
🅸 INSURANCE — your homeowners insurance, saved up monthly

Those last two go into your ESCROW account. Think of it as a forced savings account your lender manages, so you never get hit with a giant tax bill you forgot about.

📬 Once a year you'll get an escrow analysis. If taxes or insurance went up, your payment adjusts. That's why a "fixed" mortgage payment can still change slightly — the LOAN part is fixed, the taxes and insurance aren't.`,
    cta: "❓Got a mortgage question you've been embarrassed to ask? Drop it below or DM me — I'll answer, no judgment. 👇",
    hashtagKeys: ["core", "education"],
    designBrief: "Reel: 4 animated jars filling (P-I-T-I) on navy background. Bold single-word overlays. End: 'Save this for house-hunting season.'"
  },

  {
    id: "edu-loan-programs", pillar: "education", title: "Every loan program explained (carousel)", format: "Carousel",
    hooks: [
      "There are at least 9 ways to finance a home. You've probably only heard of 2.",
      "FHA? VA? DSCR? Jumbo? Here's every loan type in plain English. Save this.",
      "The right loan program can change everything. Here's the full menu 👇"
    ],
    caption: `Most buyers only know about "a mortgage." There's a whole menu 👇

🏛️ FHA — flexible credit guidelines, popular with first-time buyers
🎖️ VA — for eligible veterans and service members; strong benefits
🏠 CONVENTIONAL — the classic; many down payment options for qualified buyers
📄 BANK STATEMENT — for self-employed borrowers who write off income
💧 HELOC — a line of credit against your equity
🔄 REFINANCE — restructure the loan you already have
🏰 JUMBO — for higher-priced homes above conforming limits
📈 DSCR — investor loans qualified on the property's rental income
🤝 DPA — down payment assistance programs, where available

No program is "best" — there's only the one that fits YOUR income, goals, and timeline. That's the entire value of working with a team that offers all of them: we fit the loan to you, not you to the loan.

Every program is subject to qualification and guidelines — this is the map, not the approval. 🗺️`,
    cta: "🧭 Curious which lane fits you? DM me PROGRAMS and I'll walk you through your best options.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "10-slide carousel matching your existing loan-carousel series: cover slide + one program per slide, navy card, program name in extra-bold white, one-line plain-English definition, blue icon chip, GEM × NEO badge bottom-right, EHO logo on final CTA slide."
  },
  {
    id: "edu-faq-carousel", pillar: "education", title: "Buyer FAQ: the questions everyone asks", format: "Carousel",
    hooks: [
      "The 3 questions every single buyer asks me (answered honestly)",
      "Your top mortgage FAQs — answered in one save-able post.",
      "Asked constantly, answered rarely. Let's fix that 👇"
    ],
    caption: `The questions I answer every single week — saved here so you have them forever 👇

❓ "What's the difference between pre-qualified and pre-approved?"
Pre-qual is an estimate from a conversation. Pre-approval means your documents were actually verified — it's the one that wins offers.

❓ "Will shopping for rates hurt my credit?"
Multiple mortgage inquiries within a short shopping window are typically treated as ONE inquiry by scoring models. Shopping smart is allowed — and encouraged.

❓ "What credit score do I actually need?"
Lower than you think for many programs. The bigger factors: your full picture — income, debts, savings, and history. One number never tells the whole story.

Save this post. Send it to the friend who keeps asking Google instead of a professional. 📌`,
    cta: "❓Have a question that's not here? Drop it below — it might become next week's post.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "4-slide FAQ carousel matching your existing series: cover with 'BUYER FAQ' headline, one Q&A per slide, question in blue, answer in white, generous margins, GEM × NEO badge."
  },

  /* ===== MARKET PULSE ===== */
  {
    id: "mkt-weekly-update", pillar: "market", title: "60-second market update", format: "Reel",
    hooks: [
      "Your 60-second housing market update — no jargon, promise.",
      "What this week's market news ACTUALLY means for buyers 👇",
      "Everyone's talking about the market. Here's what matters this week."
    ],
    caption: `Here's your no-jargon market minute 🎯

📊 WHAT'S HAPPENING
[Insert this week's headline: rate movement, inventory shift, local trend]

🏠 WHAT IT MEANS FOR BUYERS
[Plain-English translation: more/less competition, negotiating room, urgency level]

💰 WHAT IT MEANS FOR OWNERS
[Equity implications, refi considerations, selling conditions]

The market rewards people who are PREPARED before it moves — not the ones reacting after.

⚠️ Remember: national headlines ≠ your neighborhood. If you want to know what this means for YOUR zip code and YOUR budget, that's a 15-minute conversation.`,
    cta: "📲 Want these updates personalized to your situation? DM me MARKET and I'll keep you in the loop.",
    hashtagKeys: ["core", "market", "local"],
    designBrief: "Reel: news-desk energy. Lower-third graphic with 'MARKET MINUTE' badge in gold. 3 chapter cards: BUYERS / OWNERS / BOTTOM LINE. Keep every stat sourced and current before posting."
  },
  {
    id: "mkt-rate-anxiety", pillar: "market", title: "Marry the house, date the rate?", format: "Reel",
    hooks: [
      "'Marry the house, date the rate' — smart strategy or dangerous advice? Honest take:",
      "Should you wait for rates to drop? Here's the math nobody shows you.",
      "Everyone waiting for rates to drop is missing this one thing 👇"
    ],
    caption: `Honest take, because you deserve better than a slogan 👇

The phrase "marry the house, date the rate" assumes you can refinance later if rates drop. Sometimes that works out. But here's the full picture:

✅ THE TRUTH IN IT
If you buy a home you can comfortably afford TODAY, a future refinance is upside, not a rescue plan.

⚠️ THE RISK IN IT
Nobody can promise rates will drop. A payment you can only afford "after the refi" is a payment you can't afford.

🎯 THE REAL STRATEGY
Buy when: the payment works on today's numbers, you plan to stay long enough to build equity, and your life is ready for it. The best time to buy is when YOUR numbers work — not when a headline says so.

That's it. That's the whole secret.`,
    cta: "🧮 Want to see what 'comfortable' actually looks like for you? DM me NUMBERS — we'll run it together.",
    hashtagKeys: ["core", "market", "education"],
    designBrief: "Talking-head reel, direct to camera, minimal cuts — this one is a trust builder. Captions on. Cover: 'HONEST TAKE' stamp over navy."
  },
  {
    id: "mkt-equity-report", pillar: "market", title: "Homeowners are sitting on record equity", format: "Carousel",
    hooks: [
      "Your house might be your biggest bank account. Most owners never check the balance.",
      "Homeowners: you might be richer than you think. Let's talk equity.",
      "The wealth gap between renters and owners, in one number 👇"
    ],
    caption: `Quick question: do you know how much equity you have in your home right now? 👇

Most homeowners don't — and it's often their single largest asset.

🏦 EQUITY = your home's current value minus what you owe.

Why it matters:
🔹 It's real wealth you've built, payment by payment
🔹 It can potentially be used for renovations, debt consolidation, or investment — every situation is different
🔹 Knowing your number helps you make smarter decisions about selling, staying, or improving

Homeownership isn't just shelter. Historically, it's been one of the most reliable wealth-building tools for everyday families — not because of magic, but because of forced savings + time.

You can't make a smart move with a number you've never seen.`,
    cta: "📊 Want a no-obligation equity snapshot of your home? DM me EQUITY and I'll put one together for you.",
    hashtagKeys: ["core", "refinance", "market"],
    designBrief: "Carousel, 5 slides. Slide 1: 'DO YOU KNOW YOUR NUMBER?' over a home illustration. Use gold accent for wealth theme. Final slide: EQUITY keyword CTA."
  },

  /* ===== CLIENT STORIES ===== */
  {
    id: "story-first-home", pillar: "story", title: "First-time buyer closing story", format: "Reel",
    hooks: [
      "They were told 'no' by two lenders. Here's how they got their keys anyway. 🔑",
      "From 'we'll never own a home' to closing day in [X] months. Their story 👇",
      "POV: You just handed keys to a family who thought this day would never come."
    ],
    caption: `This is why I do this. 🔑

[CLIENT STORY — customize: e.g., "When A. and J. first called me, they'd already been turned down once. They assumed that was the end of the story. It wasn't — it was just the wrong starting point."]

Here's what we did together:
🔹 [Step 1 — e.g., built a credit game plan]
🔹 [Step 2 — e.g., found a loan program that actually fit their situation]
🔹 [Step 3 — e.g., got fully pre-approved so their offer stood out]

[Timeframe] later — keys in hand. 🏡

A "no" from one lender is not a "no" from the industry. It just means you haven't found the person willing to build the plan yet.

(Shared with my clients' permission — their story, told with pride.)`,
    cta: "💬 If you've been told 'not yet' — I'd love to be your second opinion. DM me PLAN.",
    hashtagKeys: ["core", "motivation", "firstTimeBuyer"],
    designBrief: "Reel: closing-day footage (keys, door, happy clients — WITH written permission), emotional trending audio, minimal text. Cover: 'THEY WERE TOLD NO.' White serif over dark photo."
  },
  {
    id: "story-closing-day", pillar: "story", title: "Closing day photo drop", format: "Static",
    hooks: [
      "Another family HOME. 🔑",
      "This smile is the whole job. Congratulations, [Client]!",
      "SOLD on their future. Welcome home! 🏡"
    ],
    caption: `KEYS. IN. HAND. 🔑🎉

Huge congratulations to [Client names] on closing on their [first home / new home / investment property]!

[1-2 personal lines: what made this deal special, an obstacle overcome, a fun detail about the family.]

Watching someone walk into a house as a buyer and walk out as an OWNER never, ever gets old.

Thank you for trusting the Gem Home Team with one of the biggest moments of your life. Enjoy every square foot. 🥂

(Posted with our clients' permission.)`,
    cta: "🏡 Ready for your own key day? My DMs are open — let's talk about what it takes to get you there.",
    hashtagKeys: ["core", "motivation", "local"],
    designBrief: "Static or 3-photo carousel: clients holding keys/SOLD sign. Add subtle navy border frame with small Gem logo bottom-right. Real photos beat stock 100% of the time."
  },
  {
    id: "story-testimonial", pillar: "story", title: "Client review spotlight", format: "Static",
    hooks: [
      "Reviews like this are why we exist. 🙏",
      "Don't take my word for it — take theirs. 👇",
      "This message made my whole week."
    ],
    caption: `I could talk about service all day — but our clients say it better. 🙏

[PASTE ACTUAL REVIEW — with permission. Keep it verbatim; authenticity reads.]

— [Client first name + last initial]

Every family's situation is different, and every one deserves a lender who treats their loan like it's their own. That's the standard here, every single file.

Thank you, [Client name], for the kind words and for trusting our team.`,
    cta: "💬 Want the same experience? Let's start with a conversation — DM me or tap the link in bio.",
    hashtagKeys: ["core", "motivation"],
    designBrief: "Static: review text on clean navy card, large quotation mark in brand blue, 5 gold stars, client first name + last initial. Logo bottom center. Keep text short — crop long reviews."
  },

  /* ===== PERSONAL BRAND ===== */
  {
    id: "personal-why", pillar: "personal", title: "Why I do mortgages", format: "Reel",
    hooks: [
      "Nobody grows up dreaming of being a loan officer. Here's why I chose this anyway.",
      "The real reason I got into mortgage lending 👇",
      "I'll be honest about why I do this job."
    ],
    caption: `Real talk for a second. 👇

[YOUR STORY — customize: e.g., "I watched my parents get taken advantage of on their first mortgage. Nobody explained anything. They signed what they were told to sign. I remember the stress in our house — and I remember thinking it shouldn't work that way."]

That's what this job actually is to me:
🔹 Making sure no family signs something they don't understand
🔹 Turning the most stressful purchase of your life into a plan
🔹 Being the person I wish my family had in their corner

The loan is the product. The TRUST is the job.

If you've made it this far — thanks for being here. This account exists to make home financing make sense. 🤝`,
    cta: "👋 New here? Drop a 🏡 in the comments and introduce yourself — I read every one.",
    hashtagKeys: ["core", "motivation", "local"],
    designBrief: "Talking-head reel, natural light, direct eye contact, zero gimmicks. Subtle background music. Cover: candid photo + 'MY WHY' small caps. Vulnerability = reach on this format."
  },
  {
    id: "personal-dayinlife", pillar: "personal", title: "Day in the life", format: "Reel",
    hooks: [
      "A realistic day in the life of a mortgage lender (no Lambo, sorry)",
      "What I actually do all day so your loan closes on time 👇",
      "5AM to 9PM: a real day fighting for my clients' closings"
    ],
    caption: `What does a lender actually DO all day? Glad you asked 👇

☀️ [Morning — e.g., rate check + reviewing overnight files]
📞 [Midday — e.g., strategy calls with buyers, updates to agents]
🔍 [Afternoon — e.g., chasing conditions, solving problems before clients ever see them]
🌙 [Evening — e.g., pre-approval calls for families who work 9-5s]

The part you don't see on Instagram: 80% of this job is preventing problems you'll never know existed. A smooth closing isn't luck — it's hundreds of small saves.

That's the standard. Every file. Every family.`,
    cta: "🎥 Want more behind-the-scenes? Follow along — and if you're planning a purchase this year, you know where to find me.",
    hashtagKeys: ["core", "motivation", "local"],
    designBrief: "Reel: fast POV b-roll montage (coffee, desk, calls, car, sunset) with timestamp overlays. Trending audio. Authentic > polished."
  },
  {
    id: "personal-team", pillar: "personal", title: "Meet the team", format: "Carousel",
    hooks: [
      "The faces behind every smooth closing 👇",
      "It takes a team to close a loan on time. Meet ours.",
      "You work with a TEAM here, not a call center. Meet everyone."
    ],
    caption: `When you work with GEM Home Team, you get exactly that — a TEAM. 🤝

👑 Megan Sawamura — Producing Branch Manager (NMLS #972639). [1-2 lines: superpower, fun fact]
⭐ Anthony Edrozo — Loan Officer. [1-2 lines]
⭐ Sonny Alquizar — Loan Officer. [1-2 lines]
⭐ Camryn — [role + 1-2 lines]
⭐ Kevin — [role + 1-2 lines]

Why it matters to you:
🔹 Someone always knows the status of your file
🔹 Questions get answered in hours, not days
🔹 Nothing falls through the cracks between "offer accepted" and "keys in hand"

Big-bank technology, small-team accountability. That's the model — and it's powered by our partnership with NEO Home Loans and Better. 💎`,
    cta: "👋 Say hi in the comments — and if you're starting your home journey, any one of us is ready to help.",
    hashtagKeys: ["core", "local", "motivation"],
    designBrief: "Carousel: one clean portrait per slide on navy card, name + role in white/blue, fun-fact chip in gold. Consistent crop and lighting across all portraits."
  },

  /* ===== ENGAGEMENT ===== */
  {
    id: "eng-this-or-that", pillar: "engagement", title: "This or That: dream home edition", format: "Story",
    hooks: [
      "Dream home THIS or THAT — go with your gut 👇",
      "Settle this: which one are you choosing?",
      "Your dream home says a lot about you. Prove it 👇"
    ],
    caption: `Gut check — no overthinking allowed 👇

🏙️ Modern new build  vs  🏡 Character fixer-upper
🌊 Big backyard      vs  🛁 Dream kitchen
🏔️ Mountain views    vs  🚶 Walk to everything
🚗 3-car garage      vs  🏠 Guest suite

Drop your picks in the comments (mine: [your picks] — don't judge me).

Fun fact: knowing your true non-negotiables BEFORE you shop saves buyers weeks of touring homes that were never "the one." It's step one of the buyer consult I do with every client.`,
    cta: "📝 Want my full 'define your dream home' worksheet? DM me DREAM and it's yours, free.",
    hashtagKeys: ["core", "motivation", "engagement" in GEM.hashtags ? "engagement" : "firstTimeBuyer"],
    designBrief: "Story series: 4 poll stickers, one matchup each, split-screen photos. Repost results next day. Also works as a comment-bait static post."
  },
  {
    id: "eng-myth-poll", pillar: "engagement", title: "True or False mortgage quiz", format: "Story",
    hooks: [
      "90% of people get question 3 wrong. Mortgage quiz — GO 👇",
      "True or False: you need 20% down to buy a house. Let's see who's been paying attention.",
      "Quick mortgage quiz. No googling. 👇"
    ],
    caption: `Pop quiz! Answer before you scroll 👇

1️⃣ T or F: Checking your own credit lowers your score.
2️⃣ T or F: You need 20% down to buy a home.
3️⃣ T or F: Pre-qualified and pre-approved mean the same thing.
4️⃣ T or F: A 30-year fixed payment can never change.

ANSWERS:
1️⃣ FALSE — self-checks are soft pulls. Check away.
2️⃣ FALSE — many programs allow much lower down payments for qualified buyers.
3️⃣ FALSE — pre-approval is verified; pre-qual is an estimate. Sellers know the difference.
4️⃣ FALSE — your loan portion is fixed, but taxes and insurance in escrow can change.

How'd you do? Score yourself in the comments 👇 (4/4 gets bragging rights.)`,
    cta: "🧠 Want to actually master this stuff before you buy? DM me QUIZ for my free first-time buyer guide.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "Story: 4 quiz stickers, answer reveals after each. Feed version: carousel with Q on one slide, A on next. Gamified = shares."
  },
  {
    id: "eng-ask-me", pillar: "engagement", title: "Ask me anything about mortgages", format: "Story",
    hooks: [
      "No dumb questions allowed to go unanswered today. AMA 👇",
      "What do you WISH someone would explain about mortgages? Ask me. Seriously.",
      "Judgment-free mortgage Q&A. The question box is open 👇"
    ],
    caption: `The question box is OPEN. 📬

Ask me ANYTHING about:
🔹 Buying your first home
🔹 Credit and qualifying
🔹 Rates, refinancing, equity
🔹 The stuff you're "embarrassed" to ask (I promise someone else is wondering too)

No question is too basic. The mortgage industry runs on jargon on purpose — confusion keeps people passive. My whole job is the opposite.

I'll answer every single question in my stories this week. 👇`,
    cta: "❓Drop your question below or shoot it to me in a DM — anonymous questions welcome.",
    hashtagKeys: ["core", "education"],
    designBrief: "Story: question sticker on clean navy card 'ASK ME ANYTHING 🏡'. Answer each Q as its own story with text overlay. Save best answers to a Highlight called Q&A."
  },

  /* ===== REALTOR PARTNERS ===== */
  {
    id: "rp-agent-value", pillar: "realtor", title: "What agents should demand from a lender", format: "Reel",
    hooks: [
      "Realtors: if your lender isn't doing these 4 things, we should talk.",
      "Agents — your lender is either winning you deals or losing them. Here's the test.",
      "4 things listing agents secretly check before taking your buyer's offer seriously 👇"
    ],
    caption: `Agents, your buyer's lender is part of YOUR reputation. Here's the minimum standard you should demand 👇

1️⃣ COMMUNICATION BEFORE YOU ASK
Weekly file updates to you, your buyer, and the listing side — without anyone chasing.

2️⃣ REAL PRE-APPROVALS
Verified income, assets, and credit — so your offers carry weight and your deals don't die in underwriting.

3️⃣ SPEED WHEN IT COUNTS
Same-day pre-approval turnarounds for weekend showings. Offers don't wait for Monday.

4️⃣ PROBLEM-SOLVING, NOT EXCUSES
When something breaks at hour eleven, you need a lender who calls with a solution, not a delay.

That's the standard our team runs on every file. Your clients' experience with the lender reflects on YOU — partner with people who protect that.`,
    cta: "🤝 Agents: DM me PARTNER and let's grab coffee. Worst case, you get a good coffee and a backup lender.",
    hashtagKeys: ["core", "realtor"],
    designBrief: "Reel: direct-to-camera, confident pace, numbered text overlays. Cover: 'AGENTS: RAISE YOUR STANDARD.' Also cut into a carousel for LinkedIn."
  },
  {
    id: "rp-cobrand-market", pillar: "realtor", title: "Co-branded open house support", format: "Static",
    hooks: [
      "Agents: your open house, our financing table. Buyers get answers on the spot.",
      "The open house upgrade that converts lookers into buyers 👇",
      "What if every visitor at your open house left knowing what they could afford?"
    ],
    caption: `Open house visitors have two questions: "Do I love it?" and "Could I actually get it?" 🏡

Most open houses only answer the first one.

When we partner on your open house:
🔹 Co-branded flyers with financing scenarios for THAT home
🔹 On-site or on-call answers for payment and program questions
🔹 Every serious visitor can leave with a pre-approval appointment booked

You host. We handle the "can I afford this" conversation. Buyers get clarity, you get actionable leads instead of sign-in sheet ghosts.

(All co-marketing is done in line with RESPA rules — costs shared fairly, everything above board. That protects you too.)`,
    cta: "📅 Have a listing coming up? DM me OPEN and let's build the plan for your next open house.",
    hashtagKeys: ["core", "realtor", "local"],
    designBrief: "Static: split layout — agent headshot + your headshot with 'BETTER TOGETHER' type. Navy background, both logos. Professional, not salesy."
  },

  /* ===== CALL TO ACTION ===== */
  {
    id: "cta-buyer-guide", pillar: "offer", title: "Free first-time buyer guide", format: "Static",
    hooks: [
      "I put everything a first-time buyer needs to know in one free guide. Want it?",
      "Stop googling 'how to buy a house' at 1AM. I made you something better.",
      "The guide I wish every buyer read BEFORE calling a lender 👇"
    ],
    caption: `I got tired of watching buyers piece together their education from random internet advice. So I built the guide I wish everyone had. 📘

INSIDE THE FREE GUIDE:
🔹 The complete home-buying timeline, step by step
🔹 What lenders actually look at (credit, income, assets — demystified)
🔹 How much you really need saved — and what counts
🔹 The questions to ask ANY lender before you commit
🔹 Mistakes that delay closings — and how to avoid every one

No fluff. No 40-page sales pitch. Just the playbook, written in plain English.

It's free because an educated buyer is a confident buyer — and confident buyers make better decisions for their families.`,
    cta: "📲 DM me the word GUIDE and I'll send it straight over.",
    hashtagKeys: ["core", "firstTimeBuyer", "education"],
    designBrief: "Static: 3D mockup of the guide cover on navy, 'FREE GUIDE' badge in gold, bullet highlights. Clean, premium, zero clutter."
  },
  {
    id: "cta-consult", pillar: "offer", title: "Book a strategy call", format: "Reel",
    hooks: [
      "15 minutes with a lender now saves months of confusion later. Here's how it works.",
      "What actually happens on a 'strategy call' with me (it's not a sales pitch)",
      "The first step to buying a home isn't Zillow. It's this. 👇"
    ],
    caption: `Let me demystify the "talk to a lender" step, because it stops way too many people 👇

WHAT A STRATEGY CALL IS:
🔹 15-20 minutes, phone or Zoom
🔹 We talk goals, timeline, and your current picture
🔹 You leave with actual next steps — whether that's "you're ready now" or "here's your 6-month plan"

WHAT IT'S NOT:
❌ A hard credit pull (not unless/until YOU say go)
❌ A commitment to anything
❌ A sales pitch

Whether you're buying in 30 days or 2 years, the best time to build the plan is now. The families who close smoothly in the spring are the ones who called in the winter.`,
    cta: "📞 Ready for your roadmap? DM me CALL or tap the link in my bio to grab a time that works.",
    hashtagKeys: ["core", "firstTimeBuyer", "motivation"],
    designBrief: "Reel: talking head + screen-record of booking calendar. Cover: 'IT'S NOT A SALES PITCH.' Disarming honesty is the angle."
  },
  {
    id: "cta-referral", pillar: "offer", title: "Know someone buying this year?", format: "Static",
    hooks: [
      "The best compliment you can give me is an introduction. 🤝",
      "Know someone renting who dreams of owning? Tag them below 👇",
      "Your referral changes someone's whole year. Maybe their whole life."
    ],
    caption: `Real talk: this business runs on trust, and trust travels through people like YOU. 🤝

If someone in your life is:
🏠 Dreaming about their first home
💍 Newly married and ready to nest
👶 Outgrowing their current space
💼 Relocating for work
💰 Wondering what their equity could do

…an introduction to a lender who will actually take care of them is one of the most valuable things you can give them.

I promise every person you send my way gets the same standard: straight answers, real education, and a team that fights for their closing like it's our own.`,
    cta: "💬 Tag them below, or send them my profile. I'll take exceptional care of them — that's a promise.",
    hashtagKeys: ["core", "local", "motivation"],
    designBrief: "Static: warm photo of you mid-conversation/handshake, headline 'SEND THEM SOMEONE WHO CARES.' Minimal text, human feel."
  }
];

/* Fix accidental expression in hashtagKeys (defensive) */
GEM.topics.forEach(t => { t.hashtagKeys = t.hashtagKeys.filter(k => typeof k === "string" && GEM.hashtags[k]); });

/* ---------- Reel Script Library ---------- */
GEM.reels = [
  {
    id: "reel-credit-myths", title: "3 Credit Myths (Busted)", length: "30-40s", difficulty: "Easy · talking head",
    audio: "Trending upbeat audio, low volume under voice",
    cover: "Navy card · '3 CREDIT MYTHS' in white extra-bold · myth #1 teased in blue",
    scenes: [
      { time: "0-3s", shot: "Tight talking head, direct eye contact", vo: "Your credit score is NOT why you can't buy a home — these myths are.", text: "3 CREDIT MYTHS ❌" },
      { time: "3-12s", shot: "Same, small punch-in", vo: "Myth one: checking your own credit hurts it. False — self-checks are soft pulls. Check it daily if you want.", text: "MYTH 1: self-checks hurt ❌" },
      { time: "12-22s", shot: "Cut to slight angle change", vo: "Myth two: you must be debt-free to qualify. Lenders look at your debt-to-income ratio — car payments and student loans don't automatically stop you.", text: "MYTH 2: must be debt-free ❌" },
      { time: "22-32s", shot: "Back to center, energy up", vo: "Myth three: you need perfect credit. Many programs allow lower scores than people assume — the only way to know is to actually ask.", text: "MYTH 3: perfect credit ❌" },
      { time: "32-38s", shot: "Smile, point to caption", vo: "Send me the word CREDIT and let's find out where you actually stand.", text: "DM 'CREDIT' 📲" }
    ]
  },
  {
    id: "reel-payment-breakdown", title: "Where Your Payment Actually Goes (PITI)", length: "30s", difficulty: "Easy · talking head + graphics",
    audio: "Calm lo-fi or trending explainer audio",
    cover: "'WHERE DOES IT GO?' + 4 jar icons",
    scenes: [
      { time: "0-3s", shot: "Hold up 4 fingers", vo: "Your mortgage payment is actually FOUR payments. Nobody tells you this.", text: "4 PAYMENTS IN 1 🤯" },
      { time: "3-10s", shot: "Graphic: jar 1 fills", vo: "One: principal — actually paying off your house.", text: "1️⃣ PRINCIPAL" },
      { time: "10-16s", shot: "Graphic: jar 2 fills", vo: "Two: interest — the cost of borrowing.", text: "2️⃣ INTEREST" },
      { time: "16-24s", shot: "Graphic: jars 3-4 fill", vo: "Three and four: property taxes and insurance, saved up monthly in escrow so you're never blindsided by a giant bill.", text: "3️⃣ TAXES 4️⃣ INSURANCE" },
      { time: "24-30s", shot: "Talking head close", vo: "That's PITI. Now you know more than most homeowners. Follow for more of this.", text: "P.I.T.I. ✅ FOLLOW ➕" }
    ]
  },
  {
    id: "reel-first-time-steps", title: "Buy Your First Home in 5 Steps", length: "45s", difficulty: "Medium · b-roll + VO",
    audio: "Cinematic inspiring track",
    cover: "'FIRST HOME IN 5 STEPS' over key-in-door photo",
    scenes: [
      { time: "0-3s", shot: "B-roll: hand opening front door, sunlight", vo: "Buying your first home comes down to five steps. Save this.", text: "SAVE THIS 📌" },
      { time: "3-11s", shot: "B-roll: coffee + laptop", vo: "Step one: talk to a lender FIRST — before Zillow, before open houses. Know your real budget.", text: "1. LENDER FIRST" },
      { time: "11-19s", shot: "B-roll: documents/phone", vo: "Step two: get fully pre-approved. Verified docs. This is what makes sellers take you seriously.", text: "2. PRE-APPROVAL ✅" },
      { time: "19-27s", shot: "B-roll: touring homes with agent", vo: "Step three: shop with a great agent — inside your budget, with your non-negotiables locked.", text: "3. SHOP SMART 🏡" },
      { time: "27-36s", shot: "B-roll: signing table", vo: "Step four: offer, inspect, appraise — your team handles the chaos; you make the decisions.", text: "4. OFFER → CLOSE" },
      { time: "36-45s", shot: "B-roll: keys handed over, hug", vo: "Step five: keys. And it all started with one conversation. That part's on you.", text: "5. KEYS 🔑 DM 'READY'" }
    ]
  },
  {
    id: "reel-rent-vs-own", title: "Renting vs Owning: The 5-Year Picture", length: "35s", difficulty: "Medium · talking head + graphics",
    audio: "Dramatic-but-clean trending audio",
    cover: "'5 YEARS OF RENT' with rising stack graphic",
    scenes: [
      { time: "0-4s", shot: "Talking head, serious", vo: "Five years of rent at two thousand a month is one hundred twenty thousand dollars. Gone.", text: "5 YRS RENT = $120K 💸" },
      { time: "4-14s", shot: "Graphic: two columns build", vo: "Renting buys flexibility — and that's worth something. But every payment builds your landlord's equity, not yours.", text: "THEIR equity, not yours" },
      { time: "14-26s", shot: "Talking head", vo: "Owning flips it: part of every payment comes back to you as equity, and a fixed loan means the biggest bill of your life stops rising.", text: "EQUITY = money you keep" },
      { time: "26-35s", shot: "Warm close", vo: "Renting isn't wrong — but it should be a choice, not a life sentence. Want to see your real numbers? DM me the word MATH.", text: "DM 'MATH' 🧮" }
    ]
  },
  {
    id: "reel-day-in-life", title: "Day In The Life: Mortgage Lender", length: "30s", difficulty: "Easy · POV b-roll",
    audio: "Trending day-in-my-life audio",
    cover: "Candid coffee shot + '5AM: it begins'",
    scenes: [
      { time: "0-4s", shot: "POV: alarm, coffee brewing", vo: "(text only)", text: "5:45AM — rates drop. My phone knows before I do." },
      { time: "4-9s", shot: "POV: desk, dual monitors", vo: "(text only)", text: "8AM — reviewing files so closings don't slip" },
      { time: "9-15s", shot: "POV: on phone, pacing", vo: "(text only)", text: "11AM — telling a family they're APPROVED 🎉" },
      { time: "15-21s", shot: "POV: car, driving", vo: "(text only)", text: "2PM — surprise at the closing table? Not on my watch" },
      { time: "21-30s", shot: "POV: sunset, laptop closes", vo: "(text only)", text: "8PM — one more pre-approval for a family that works days. Worth it. 🔑" }
    ]
  },
  {
    id: "reel-agent-hook", title: "For Realtors: The Lender Test", length: "30s", difficulty: "Easy · talking head",
    audio: "Confident beat, low",
    cover: "'AGENTS: THE LENDER TEST' bold on navy",
    scenes: [
      { time: "0-4s", shot: "Direct to camera, confident", vo: "Realtors — grade your lender in thirty seconds. Ready?", text: "THE LENDER TEST 📋" },
      { time: "4-11s", shot: "Punch in", vo: "Do they update you weekly without being chased?", text: "☑️ Updates BEFORE you ask" },
      { time: "11-18s", shot: "Angle change", vo: "Are their pre-approvals actually verified — or just letters?", text: "☑️ REAL pre-approvals" },
      { time: "18-24s", shot: "Punch in", vo: "Can they turn a pre-approval on a Saturday for your weekend showing?", text: "☑️ Weekend speed" },
      { time: "24-30s", shot: "Smile", vo: "Less than three checks? Let's get coffee. DM me PARTNER.", text: "DM 'PARTNER' ☕" }
    ]
  },
  {
    id: "reel-equity-check", title: "When Did You Last Check Your Equity?", length: "25s", difficulty: "Easy · talking head",
    audio: "Curiosity-driven trending audio",
    cover: "'CHECK YOUR BALANCE 🏦' over home photo",
    scenes: [
      { time: "0-4s", shot: "Talking head, curious tone", vo: "You check your bank account weekly. When did you last check your home equity?", text: "YOUR BIGGEST ACCOUNT 🏦" },
      { time: "4-12s", shot: "Punch in", vo: "Home values move. Your balance drops with every payment. That gap? That's YOUR money — and most owners have no idea what it is.", text: "VALUE − LOAN = EQUITY" },
      { time: "12-19s", shot: "Angle change", vo: "Knowing your number changes decisions: renovate or move, consolidate or wait, sell or hold. Every situation is different.", text: "KNOWLEDGE = OPTIONS" },
      { time: "19-25s", shot: "Close", vo: "DM me the word EQUITY and I'll put together your free snapshot. Takes me minutes, could change your plans.", text: "DM 'EQUITY' 📊" }
    ]
  },
  {
    id: "reel-myth-flip", title: "POV: Everything You Knew Was Wrong", length: "20s", difficulty: "Easy · text-driven",
    audio: "Trending 'plot twist' audio",
    cover: "'WAIT... WHAT?' reaction frame",
    scenes: [
      { time: "0-5s", shot: "Reaction face to camera", vo: "(text only)", text: "POV: a lender just told you that you DON'T need 20% down…" },
      { time: "5-10s", shot: "Hold reaction, eyebrow raise", vo: "(text only)", text: "…that your student loans don't automatically disqualify you…" },
      { time: "10-15s", shot: "Slow smile", vo: "(text only)", text: "…and that checking your own credit doesn't hurt it." },
      { time: "15-20s", shot: "Shrug + point at caption", vo: "(text only)", text: "Everything else they told you wrong is in my caption 👇" }
    ]
  }
];

/* ---------- Weekly Posting Framework (drives the calendar) ----------
   Balanced top-1% mix: 4 reels, 1 carousel, 1 static, 1 engagement + daily stories
------------------------------------------------------------------- */
GEM.weekTemplate = [
  { dow: 1, pillar: "education",  format: "Reel",     time: "11:00", note: "Educational reel — highest reach slot of the week" },
  { dow: 2, pillar: "market",     format: "Reel",     time: "12:00", note: "Market pulse — record fresh, stats must be current" },
  { dow: 3, pillar: "story",      format: "Static",   time: "17:00", note: "Client story / closing photo — trust builder" },
  { dow: 4, pillar: "education",  format: "Carousel", time: "11:00", note: "Deep-dive carousel — optimized for saves" },
  { dow: 5, pillar: "personal",   format: "Reel",     time: "12:00", note: "Personal brand — people hire people" },
  { dow: 6, pillar: "engagement", format: "Story",    time: "10:00", note: "Interactive story set + casual weekend feed post" },
  { dow: 0, pillar: "offer",      format: "Reel",     time: "18:00", note: "CTA / offer — Sunday planning mindset, highest intent" }
];
/* Every 2nd Wednesday alternates to realtor-partner content; handled in app.js */

/* ---------- Daily Story Playbook ---------- */
GEM.storyPlaybook = [
  "Morning: behind-the-scenes moment (desk, coffee, first call) — humanize",
  "Midday: repost today's feed post to stories with a poll or question sticker",
  "Afternoon: one 15-second value tip to camera (answer a real client question)",
  "Evening: engagement sticker (poll / quiz / question box) — feeds the algorithm",
  "Always: reply to every DM and comment within 60 minutes when possible"
];

/* ---------- Compliance Rulebook ---------- */
GEM.complianceRules = {
  required: [
    { id: "nmls", label: "NMLS ID present", pattern: /nmls\s*#?\s*\d+/i,
      why: "Most state regulators and the SAFE Act require your NMLS ID on advertising, including social media profiles and promotional posts." },
    { id: "ehl", label: "Equal Housing statement", pattern: /equal\s+housing\s+(lender|opportunity)/i,
      why: "HUD/fair-lending standards expect the Equal Housing Lender (or Opportunity) statement or logo on mortgage advertising." }
  ],
  triggers: [
    { id: "rate", label: "Specific interest rate mentioned", pattern: /\b\d{1,2}(\.\d{1,3})?\s*%(?!\s*down)/i,
      why: "Under Regulation Z (TILA §1026.24), advertising a specific rate requires stating the APR at least as prominently. Triggering terms require full additional disclosures (terms of repayment, down payment, etc.). Safest: keep specific rates out of social posts, or route them through your compliance-approved rate template." },
    { id: "payment", label: "Specific payment amount", pattern: /\$\s?\d[\d,]*(\.\d{2})?\s*(\/|per\s*)?(mo|month)/i,
      why: "A stated monthly payment is a Reg Z triggering term — it requires additional disclosures (APR, repayment terms, amount financed). Avoid specific payment amounts in organic posts." },
    { id: "downpayment", label: "Specific down payment amount/percent", pattern: /\b(\d{1,2}(\.\d+)?%|\$\s?\d[\d,]*)\s*(down\b|down payment)/i,
      why: "Stating a down payment amount or percentage is a Reg Z triggering term requiring further disclosures. Speak in ranges and 'programs exist' language instead." },
    { id: "term", label: "Loan term used as an offer", pattern: /\b(15|20|30)[- ]?year\b.{0,40}\b(rate|apr|offer|special|only|lock)\b/i,
      why: "Repayment period paired with an offer can act as a triggering term under Reg Z. Educational mentions are fine; promotional pairing needs disclosures." }
  ],
  prohibited: [
    { id: "guarantee", label: "Approval guarantee", pattern: /\bguarantee(d)?\s*(approval|to\s*(be\s*)?approve|financing|loan)\b|\beveryone\s+(qualifies|is\s+approved)\b/i,
      why: "Guaranteeing approval is deceptive advertising (UDAAP / Reg N — the MAP Rule). No approval can be guaranteed before underwriting." },
    { id: "best-lowest", label: "'Lowest/best rates' claim", pattern: /\b(lowest|best|cheapest)\s+(rate|rates|pricing|payment)\b/i,
      why: "Unsubstantiated superiority claims ('lowest rates') are deceptive under UDAAP unless you can prove them at all times. Use 'competitive' instead." },
    { id: "no-cost", label: "'No cost / free' loan claim", pattern: /\b(no[- ]cost|free)\s+(loan|refinance|refi|mortgage|closing)\b|closing\s+costs?\s+(are\s+)?(free|waived)\b/i,
      why: "'No-cost' and 'free' loan claims are heavily scrutinized — costs are typically financed or priced into the rate. If costs exist in any form, this is deceptive." },
    { id: "gov-affil", label: "Implied government affiliation", pattern: /\b(government|federal|hud|fha|va)[- ]?(approved\s+lender|backed\s+offer|program\s+deadline|notice|stimulus)\b/i,
      why: "Implying government affiliation or urgency ('federal program deadline') violates Reg N / MAP Rule. Describe programs factually without implying endorsement." },
    { id: "pre-approved-blast", label: "'You are pre-approved' to an audience", pattern: /\byou('re| are)\s+(already\s+)?pre[- ]?approved\b/i,
      why: "Telling an audience they're 'pre-approved' when no credit decision exists is deceptive. Firm-offer language has strict FCRA requirements." },
    { id: "advice-overreach", label: "Financial/investment advice framing", pattern: /\b(you should|everyone should)\s+(refinance|buy now|pull( out)? equity|invest)\b/i,
      why: "Blanket directives can constitute unfair advice. Frame as education + 'every situation is different' + invitation to a personal review." }
  ],
  cautions: [
    { id: "testimonial", label: "Testimonial content", pattern: /\b(review|testimonial|client said|5[- ]star)\b/i,
      why: "Testimonials must be genuine, shared with permission, and not imply everyone gets the same results. Keep the client's words verbatim." },
    { id: "urgency", label: "Urgency pressure", pattern: /\b(act now|don'?t wait|last chance|before it'?s too late|rates? (are )?about to (rise|jump|spike))\b/i,
      why: "Manufactured urgency and rate predictions can be deemed deceptive. You cannot predict rate movements — frame around preparation, not panic." },
    { id: "prediction", label: "Rate/market prediction", pattern: /\brates?\s+(will|are going to)\s+(drop|fall|rise|jump)\b/i,
      why: "Predicting rates as fact is misleading. Use 'if rates drop' / 'no one can predict' framing." }
  ],
  disclaimerTemplate: (s) =>
`—
{NAME} · NMLS #{NMLS}
GEM Home Team · NEO Home Loans, powered by Better Mortgage Corporation · NMLS #{CO_NMLS}
Equal Housing Lender. {STATES}
This is not a commitment to lend. All loans subject to credit approval, underwriting, and program guidelines. Terms and availability subject to change. This content is for educational purposes only and is not financial advice — every situation is different.`
};

/* ---------- Canva Templates (in your Canva account) ---------- */
GEM.canvaTemplates = [
  { name: "Just Closed — celebration post", url: "https://www.canva.com/d/oLMubFz42AQBH5a", use: "Swap in the property photo, address, and your headshot for every closing" },
  { name: "Client Testimonial spotlight", url: "https://www.canva.com/d/RMce03x3LA6ZTgf", use: "Paste the client's verbatim review (with permission) and their first name" },
  { name: "San Diego Market Update", url: "https://www.canva.com/d/qz6HF6RTcGZL7PG", use: "Update the three stats monthly — median price, days on market, listings" },
  { name: "Loan Programs, Explained", url: "https://www.canva.com/d/_E2FJkrNR574e-5", use: "Evergreen educational post — pairs with the loan programs caption in Content Studio" }
];
GEM.canvaFolder = "https://www.canva.com/folder/FAHRfYDqxyQ";

/* ---------- Design System: "Top 1%" playbook ---------- */
GEM.designPlaybook = {
  principles: [
    { title: "One idea per asset", body: "The top accounts never crowd a slide. One hook, one idea, one CTA. If a slide needs two ideas, it's two slides." },
    { title: "Brand block discipline", body: "Navy #0D2B36 background, white extra-bold headlines, blue #45B6E8 accents, gold #E8C468 only for 'wealth' moments. Never introduce a new color." },
    { title: "Type hierarchy", body: "Headline: extra-bold geometric sans (Montserrat/Poppins ExtraBold), 2 sizes max per slide. Letter-spaced small caps for eyebrows ('MORTGAGE LENDING' style, matching the logo)." },
    { title: "Faces win", body: "Posts with your face outperform graphics 3-5x for local service businesses. Minimum 40% of the grid should include a human." },
    { title: "Captions always on", body: "80%+ of reels are watched muted. Bold captions, high-contrast, safe-zone aware (nothing in bottom 15% or top 10% of frame)." },
    { title: "The 3-frame rule", body: "Cover text must be readable in the grid thumbnail. If you can't read it at postage-stamp size, it's too small." },
    { title: "White space is luxury", body: "Premium brands breathe. 15%+ margin on every card. Cramped = cheap." },
    { title: "Consistent grid rhythm", body: "Alternate: face / graphic / face / graphic. Your profile grid is the first impression — design it as one composition." }
  ],
  reelFormula: [
    "HOOK (0-3s): a pattern interrupt — bold claim, myth, or question. Text on screen from frame one.",
    "RETENTION (3-25s): deliver 2-4 fast points. Change the visual every 3-5 seconds (punch-in, angle, graphic).",
    "PAYOFF (final 5s): one clear CTA — a DM keyword beats a link every time.",
    "CAPTION: hook line repeated, value expanded, CTA + keyword, hashtags, compliance footer."
  ],
  cadence: "7 feed posts/week (4 reels, 1 carousel, 1 static, 1 engagement) + 3-5 stories/day + reply to every comment/DM within 60 min. This is the exact cadence of top-1% producer accounts.",
  tools: [
    { name: "Canva Pro", use: "All static + carousel design from your Brand Kit templates" },
    { name: "CapCut", use: "Reel editing — auto-captions, punch-ins, trending templates" },
    { name: "Meta Business Suite", use: "Free official scheduler for Instagram + Facebook" },
    { name: "Buffer / Later / Metricool", use: "CSV bulk-import scheduling (export from the Automation tab)" },
    { name: "ManyChat", use: "DM keyword automation — auto-deliver your GUIDE/EQUITY/READY responses" }
  ]
};
