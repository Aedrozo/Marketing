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
    gold: "#E8C468",
    cloud: "#F7F4EF"
  }
};

/* ---------- Team Roster (from gemhometeam.com / public profiles) ---------- */
GEM.team = [
  { name: "Megan Sawamura", role: "Mortgage Advisor · Branch Manager", nmls: "972639", onFile: "structuring your loan and leading your strategy", knownFor: "answering texts at superhuman speed", offClock: "exploring San Diego's best food spots" },
  { name: "Camryn Carroll", role: "Loan Team", nmls: "2118766", onFile: "keeping your loan moving every single day", knownFor: "turning chaos into checklists", offClock: "beach days and iced coffee" },
  { name: "Anthony Edrozo", role: "Loan Team", nmls: "2829800", onFile: "guiding you from application to keys", knownFor: "making complex numbers make sense", offClock: "golf and family time" },
  { name: "Sonny Alquizar", role: "Loan Team", nmls: "1591708", onFile: "finding the right program for your situation", knownFor: "calm answers under deadline pressure", offClock: "hoops and family BBQs" },
  { name: "Kevin Torres", role: "Loan Team", nmls: "1915366", onFile: "your first call and your last question", knownFor: "making first-time buyers feel at ease", offClock: "park days with his dog" }
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
    designBrief: "Reel: clean talking head, natural light, simple white captions (CapCut auto-captions, no bounce effects). Cover: your real photo with '3 CREDIT MYTHS' in the GEM card style. One quiet text overlay per myth — no flashy transitions."
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
    designBrief: "Reel: straight talking head at your actual desk, one clean text overlay per bucket (1 · 2 · 3 in brand blue). Professional and unhurried — this is an advisor explaining, not a TikTok effect reel."
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
    designBrief: "Reel: talking head, counting the four letters on your fingers, one word overlay per letter (P·I·T·I). Real, simple, confident. End card in the GEM card style: 'Save this for house-hunting season.'"
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

🔹 Megan Sawamura (NMLS #972639) — structuring your loan and leading your strategy. Known for answering texts at superhuman speed.
🔹 Camryn Carroll (NMLS #2118766) — keeping your loan moving every single day. Turns chaos into checklists.
🔹 Anthony Edrozo (NMLS #2829800) — guiding you from application to keys. Makes complex numbers make sense.
🔹 Sonny Alquizar (NMLS #1591708) — finding the right program for your situation. Calm answers under deadline pressure.
🔹 Kevin Torres (NMLS #1915366) — your first call and your last question. Makes first-time buyers feel at ease.

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
  },

  /* ===== EXPANDED LIBRARY ===== */
  {
    id: "edu-va-loans", pillar: "education", title: "VA loans: the benefit too many veterans never use", format: "Reel",
    hooks: [
      "Veterans: you earned a home-buying benefit most of you never use. Let's fix that.",
      "The most underused military benefit in America? The VA loan. Here's why.",
      "If you served, this might be the strongest buying tool in the market. 🇺🇸"
    ],
    caption: `If you served, you may have earned one of the strongest home-buying tools out there — and so many eligible buyers never use it. 👇

What a VA loan can offer eligible veterans, service members, and some surviving spouses:
🎖️ $0 down payment options for qualified borrowers
🎖️ No monthly mortgage insurance
🎖️ Competitive rates and flexible credit guidelines
🎖️ Limits on certain fees you can be charged
🎖️ It's reusable — this isn't a one-time benefit

Common myths:
❌ "It takes forever to close a VA loan." With a lender who knows the process, VA timelines are competitive.
❌ "Sellers won't take VA offers." A strong, verified pre-approval and an educated listing agent solve this.
❌ "I used it once, so it's gone." Entitlement can be restored and reused.

You protected home. Let's get you one. Eligibility and benefits depend on your service history and the VA's requirements — finding out where you stand takes one conversation.`,
    cta: "🇺🇸 Are you (or someone you love) a veteran with home-buying questions? DM me VA and let's walk through the benefit together.",
    hashtagKeys: ["core", "education", "firstTimeBuyer"],
    designBrief: "Reel: respectful, direct talking head. Flag or service imagery kept tasteful, not costume-y. Cover: 'THE BENEFIT YOU EARNED' white type on navy."
  },
  {
    id: "edu-self-employed", pillar: "education", title: "Self-employed? You CAN get a mortgage", format: "Carousel",
    hooks: [
      "Self-employed and told you can't get a mortgage? You were told wrong.",
      "Write-offs helping your taxes but killing your mortgage? There's another way.",
      "1099? Business owner? Here's how you actually qualify. 👇"
    ],
    caption: `The self-employed mortgage problem in one sentence: the write-offs that shrink your tax bill also shrink the income lenders see. 👇

But "harder" is not "impossible" — and it's often not even harder with the right lender:

📄 TRADITIONAL ROUTE
Two years of tax returns; lenders average your net income. Great if your returns show strong numbers.

🏦 BANK STATEMENT LOANS
For qualified borrowers, 12-24 months of bank statements can demonstrate income instead of tax returns. Your real cash flow tells the story your write-offs hide.

📈 OTHER PATHS
Asset-based qualification, co-borrowers, or DSCR loans for investment properties — the menu is bigger than most banks let on.

The worst move: assuming "no" without asking. The second worst: asking a lender who only offers one kind of loan.

You built a business. You can absolutely build home equity too.`,
    cta: "💼 Self-employed and curious what you'd qualify for? DM me BUSINESS — bring your story, not your tax returns (yet).",
    hashtagKeys: ["core", "education", "motivation"],
    designBrief: "Carousel, 5 slides: cover 'SELF-EMPLOYED? YOU CAN BUY.', one path per slide, clean iconography, gold accent for the bank-statement slide."
  },
  {
    id: "edu-dpa", pillar: "education", title: "Down payment assistance is real", format: "Reel",
    hooks: [
      "There are programs that help with your down payment — and almost nobody applies.",
      "The money is there. Most buyers just never ask. Let's talk assistance programs.",
      "What if the down payment isn't the wall you think it is? 👇"
    ],
    caption: `Let's talk about the least-used money in real estate: down payment assistance. 👇

The reality:
🔹 State and local programs exist to help eligible buyers — especially first-timers — with down payment and closing costs
🔹 Assistance can come as grants, forgivable loans, or deferred second loans depending on the program
🔹 Income limits and requirements apply, but they're often higher than people assume
🔹 California and San Diego County have had multiple programs — availability changes, which is exactly why you ask a lender who tracks them

Why don't more people use these? Two reasons: they don't know the programs exist, and the paperwork scares them off. Both are solvable — the second one is literally my job.

Every program has its own eligibility rules and funds can be limited — the only way to know what's available for YOU is to look at today's list together.`,
    cta: "🔑 Want to see what assistance you might be eligible for? DM me ASSIST and we'll check the current programs together.",
    hashtagKeys: ["core", "firstTimeBuyer", "education"],
    designBrief: "Reel: energetic talking head with text callouts. Cover: 'FREE MONEY? (kind of)' — curiosity gap, then honest explanation inside."
  },
  {
    id: "edu-investor", pillar: "education", title: "DSCR: how investors scale past their W-2", format: "Reel",
    hooks: [
      "How do investors own 5 rentals on a normal salary? This loan is the answer.",
      "The loan that qualifies the PROPERTY, not your paycheck. Investors, listen up.",
      "Your W-2 doesn't have to cap your rental portfolio. Here's why. 👇"
    ],
    caption: `Every investor hits the same wall: your income qualifies you for only so many mortgages. Here's how portfolios grow past it 👇

📈 DSCR = Debt Service Coverage Ratio.
Instead of qualifying on YOUR income, the lender looks at whether the PROPERTY'S rental income covers its own payment.

Why investors use it:
🔹 Personal tax returns typically aren't the story — the property's cash flow is
🔹 Scales with your portfolio instead of being capped by your salary
🔹 Works for long-term and, with some programs, short-term rentals

The trade-offs (because honesty):
🔸 Typically larger down payments than owner-occupied loans
🔸 Rates usually run higher than primary-residence loans
🔸 The deal has to actually pencil — which is a feature, not a bug: the loan won't let you buy a bad rental

Every program has its own requirements, and investment carries risk — this is education, not a green light. But if you've been told your W-2 is the ceiling… it isn't.`,
    cta: "🏘️ Building (or dreaming about) a rental portfolio? DM me INVEST and let's run a property's real numbers.",
    hashtagKeys: ["core", "education", "market"],
    designBrief: "Reel: confident, numbers-forward talking head. On-screen: simple 'RENT ≥ PAYMENT' equation graphic. Cover: 'QUALIFY THE PROPERTY, NOT YOU.'"
  },
  {
    id: "mkt-refi-check", pillar: "market", title: "When does a refinance actually make sense?", format: "Carousel",
    hooks: [
      "'Should I refinance?' — the honest checklist, no sales pitch.",
      "Refinancing isn't automatically smart. Here's when it actually is. 👇",
      "The refi math nobody shows you (because it sometimes says 'don't')."
    ],
    caption: `Honest refi talk — including when the answer is NO. 👇

A refinance can make sense when:
✅ The monthly savings repay your closing costs before you plan to move (the "break-even" test)
✅ You're consolidating expensive debt into one manageable payment — with a plan to not re-run the cards
✅ You need to restructure: removing someone from the loan, ending mortgage insurance, or changing your term
✅ You're funding a renovation that adds real value

It usually DOESN'T make sense when:
❌ The break-even is longer than you'll keep the home
❌ You're resetting a 30-year clock you've already paid 10 years into (without doing the full math)
❌ It's driven by a flashy ad instead of your actual numbers

The test is simple: total cost vs. total benefit, over YOUR timeline. Every situation is different — that's not a disclaimer, it's the whole point.`,
    cta: "🧮 Want the honest math on your loan? DM me REVIEW for a free annual mortgage review — even if the answer is 'stay put.'",
    hashtagKeys: ["core", "refinance", "education"],
    designBrief: "Carousel, 6 slides: cover 'SHOULD YOU REFI?', green-check slides then red-X slides, final slide the break-even formula in big type. Wealth-management restraint, gold accents."
  },
  {
    id: "personal-holiday", pillar: "personal", title: "Seasonal / holiday post", format: "Static",
    hooks: [
      "From our family to yours — Happy [Holiday]! 🏡",
      "Wishing you a home full of [warmth/light/gratitude] this [Holiday].",
      "The GEM Home Team wishes you and yours a wonderful [Holiday]!"
    ],
    caption: `From all of us at the GEM Home Team — happy [Holiday]! 🏡

[2-3 personal lines: a genuine reflection tied to the season. What this time of year means for your team, a tradition, a thank-you to clients and partners who trusted you this year.]

Whatever this season looks like at your house — loud and full, quiet and cozy, or somewhere in between — we hope it's spent somewhere that feels like HOME.

That feeling is the entire reason we do what we do.`,
    cta: "💬 Tell us below: what's your favorite tradition this time of year?",
    hashtagKeys: ["core", "local", "motivation"],
    designBrief: "Static: real team photo (seasonal setting if possible) beats any graphic. Navy border frame, small logo. Warm, human, zero sales energy — do NOT add a CTA to buy."
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
    id: "reel-payment-breakdown", title: "Where Your Payment Actually Goes (PITI)", length: "30s", difficulty: "Easy · talking head",
    audio: "Calm lo-fi or trending explainer audio",
    cover: "'WHERE DOES IT GO?' + 4 jar icons",
    scenes: [
      { time: "0-3s", shot: "Hold up 4 fingers", vo: "Your mortgage payment is actually FOUR payments. Nobody tells you this.", text: "4 PAYMENTS IN 1 🤯" },
      { time: "3-10s", shot: "Talking head, hold up 1 finger", vo: "One: principal — actually paying off your house.", text: "1. PRINCIPAL" },
      { time: "10-16s", shot: "Talking head, 2 fingers", vo: "Two: interest — the cost of borrowing.", text: "2. INTEREST" },
      { time: "16-24s", shot: "Talking head, 3 then 4 fingers", vo: "Three and four: property taxes and insurance, saved up monthly in escrow so you're never blindsided by a giant bill.", text: "3. TAXES  4. INSURANCE" },
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
    id: "reel-rent-vs-own", title: "Renting vs Owning: The 5-Year Picture", length: "35s", difficulty: "Easy · talking head",
    audio: "Calm, confident track — low under voice",
    cover: "Your photo, GEM card style: '5 YEARS OF RENT.'",
    scenes: [
      { time: "0-4s", shot: "Talking head, serious", vo: "Five years of rent at two thousand a month is one hundred twenty thousand dollars. Gone.", text: "5 YRS RENT = $120K" },
      { time: "4-14s", shot: "Talking head, slight punch-in", vo: "Renting buys flexibility — and that's worth something. But every payment builds your landlord's equity, not yours.", text: "THEIR equity, not yours" },
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
{NAME} · NMLS #{NMLS} · GEM Home Team
NEO Home Loans is a division of Better Mortgage Corporation, NMLS #{CO_NMLS} · Equal Housing Lender · nmlsconsumeraccess.org
{STATES}
This is not a commitment to lend. All loans subject to credit approval, underwriting, and program guidelines. Terms and availability subject to change. This content is for educational purposes only and is not financial advice — every situation is different.`
};

/* ---------- Ready-to-Post Library (finished graphics in assets/library/) ---------- */
GEM.library = [
  { series: "The NEO Tech Edge", items: [
    { file: "02-tinman.png", title: "Approved in minutes, not days", note: "Tinman AI speed story — pair with DM keyword START" },
    { file: "03-betsy.png", title: "Betsy — answers around the clock", note: "Tech-edge series — check the on-image keyword before posting" },
    { file: "04-total-cost-analysis.png", title: "Total Cost Analysis", note: "Advice-over-rates positioning" },
    { file: "05-managed-for-life.png", title: "Closing day is day one", note: "Mortgage managed for life — pair with DM keyword WEALTH" }
  ]},
  { series: "Buyer FAQ", items: [
    { file: "01-cover.png", title: "FAQ carousel cover", note: "Slide 1 of the FAQ carousel" },
    { file: "02-prequal-vs-preapproval.png", title: "Pre-qual vs pre-approval", note: "Pairs with the FAQ caption in Content Studio" },
    { file: "03-credit-score.png", title: "What credit score do I need?", note: "FAQ slide" },
    { file: "04-rate-shopping-credit.png", title: "Does rate shopping hurt credit?", note: "FAQ slide" }
  ]},
  { series: "Content Mix — Education & Market", items: [
    { file: "01-market-rates.png", title: "What moves your rate", note: "Evergreen market education" },
    { file: "02-market-sandiego.png", title: "San Diego market update", note: "Refresh the stats before each posting" },
    { file: "03-myth-20down.png", title: "Myth: 20% down required", note: "Pairs with the 20% myth caption" },
    { file: "04-myth-renting.png", title: "Myth: renting is always cheaper", note: "Pairs with rent-vs-own captions" },
    { file: "05-myth-wait-rates.png", title: "Myth: wait for rates to drop", note: "Pairs with the honest-take caption" },
    { file: "06-myth-prequal.png", title: "Myth: pre-qual = pre-approval", note: "Pairs with the pre-approval caption" },
    { file: "07-local-neighborhoods.png", title: "San Diego neighborhoods", note: "Local authority content" },
    { file: "08-open-house-feature.png", title: "Open house feature", note: "Swap in the current property" }
  ]},
  { series: "Realtor Partners", items: [
    { file: "09-agent-open-house.png", title: "Agent open house support", note: "Pairs with the co-branded open house caption" },
    { file: "10-agent-spotlight.png", title: "Agent partner spotlight", note: "Tag the featured agent when posting" },
    { file: "11-agent-market-brief.png", title: "Agent market brief", note: "Value-first content for agent audiences" }
  ]}
];

/* ---------- Template Autopilot: generates everything that changes on a template ---------- */
GEM.tagJoin = (keys) => {
  const tags = [];
  (keys || []).forEach(k => { if (GEM.hashtags[k]) tags.push(...GEM.hashtags[k].tags); });
  return [...new Set(tags)].slice(0, 25).join(" ");
};

GEM.autopilot = [
  {
    id: "ap-market", label: "Market Update", template: "02-market-sandiego.png",
    fields: [
      { key: "median", label: "Median home price ($)", type: "number", placeholder: "925000" },
      { key: "dom", label: "Days on market", type: "number", placeholder: "18" },
      { key: "listings", label: "Active listings", type: "number", placeholder: "2400" }
    ],
    build(v, prev) {
      const fmt = n => "$" + Number(n).toLocaleString();
      const trend = (cur, old, upGood) => {
        if (!old || !cur) return null;
        const pct = ((cur - old) / old * 100);
        if (Math.abs(pct) < 0.5) return "held steady";
        return (pct > 0 ? "up " : "down ") + Math.abs(pct).toFixed(1) + "%";
      };
      const tMedian = prev ? trend(+v.median, +prev.median) : null;
      const tDom = prev ? trend(+v.dom, +prev.dom) : null;
      const tList = prev ? trend(+v.listings, +prev.listings) : null;
      const month = new Date().toLocaleString("en-US", { month: "long" });
      const onImage = `SAN DIEGO MARKET UPDATE — ${month.toUpperCase()}\nMedian Home Price: ${fmt(v.median)}\nDays on Market: ${v.dom}\nActive Listings: ${Number(v.listings).toLocaleString()}`;
      let analysis;
      if (tMedian || tDom || tList) {
        const parts = [];
        if (tMedian) parts.push(`median price ${tMedian} from last month`);
        if (tDom) parts.push(`homes are selling in ${v.dom} days (${tDom})`);
        if (tList) parts.push(`inventory ${tList}`);
        analysis = `📊 WHAT CHANGED\n${parts.join(", ").replace(/^./, c => c.toUpperCase())}.\n\n🏠 WHAT IT MEANS\n${+v.dom <= (prev ? +prev.dom : 30) ? "Well-priced homes are moving quickly — prepared buyers with real pre-approvals have the edge." : "Homes are sitting a little longer — buyers have more room to negotiate than the headlines suggest."} ${tList && tList.startsWith("up") ? "Rising inventory means more choice." : "Tight inventory keeps well-priced homes competitive."}`;
      } else {
        analysis = `📊 THE SNAPSHOT\nMedian price ${fmt(v.median)}, homes selling in about ${v.dom} days, ${Number(v.listings).toLocaleString()} active listings.\n\n🏠 WHAT IT MEANS\nEvery neighborhood tells its own story — these county-wide numbers are the starting point, not the answer for YOUR street.`;
      }
      const caption = `Your San Diego market minute — ${month} 🎯\n\n${analysis}\n\n⚠️ County numbers ≠ your neighborhood. Want to know what this means for your zip code and your budget? That's a 15-minute conversation.\n\n📲 DM me MARKET for updates tailored to your situation.\n\n${GEM.tagJoin(["core","market","local"])}\n\n${GEM.buildDisclaimer()}`;
      return { onImage, caption, note: "Numbers save automatically — next month's post auto-writes the comparison. Sources: use your MLS or Redfin/SDAR data, and keep them current." };
    }
  },
  {
    id: "ap-openhouse", label: "Open House", template: "08-open-house-feature.png",
    fields: [
      { key: "address", label: "Property address", placeholder: "1234 Moonstone Ct, Carlsbad" },
      { key: "datetime", label: "Date & time", placeholder: "Sat 11-2 & Sun 12-3" },
      { key: "beds", label: "Beds", type: "number", placeholder: "4" },
      { key: "baths", label: "Baths", type: "number", placeholder: "3" },
      { key: "agent", label: "Hosting agent (name & brokerage)", placeholder: "Jane Smith · ABC Realty" }
    ],
    build(v) {
      const onImage = `OPEN HOUSE\n${v.address}\n${v.datetime}\n${v.beds} BED · ${v.baths} BATH\nHosted by ${v.agent}`;
      const caption = `OPEN HOUSE this weekend 🏡\n\n📍 ${v.address}\n🗓 ${v.datetime}\n🛏 ${v.beds} bed · 🛁 ${v.baths} bath\n\nHosted by ${v.agent} — and our team will make sure every "could I actually afford this?" question gets a real answer, not a guess.\n\nCan't make it in person? DM me OPEN and I'll send you the financing picture for this home before you tour anything.\n\n${GEM.tagJoin(["core","local","firstTimeBuyer"])}\n\n${GEM.buildDisclaimer()}`;
      return { onImage, caption, note: "Co-marketing reminder: share costs fairly with the agent (RESPA). Tag the agent when posting." };
    }
  },
  {
    id: "ap-justclosed", label: "Just Closed", template: "Just Closed Canva template",
    fields: [
      { key: "area", label: "Property (address or neighborhood)", placeholder: "930 Peach Ave, El Cajon" },
      { key: "clients", label: "Client first names (with permission — or leave blank)", placeholder: "The M. family" },
      { key: "loan", label: "Loan type", placeholder: "Conventional" },
      { key: "days", label: "Days to close", type: "number", placeholder: "21" }
    ],
    build(v) {
      const who = v.clients ? `${v.clients}` : "another amazing client";
      const onImage = `JUST CLOSED\n${v.area}\n${v.loan} · Closed in ${v.days} days`;
      const caption = `KEYS. IN. HAND. 🔑\n\nHuge congratulations to ${who} on closing on ${v.area}!\n\n${v.loan} financing, closed in ${v.days} days — smooth from offer to keys, exactly how it should be.\n\nWatching someone walk in a buyer and walk out an OWNER never gets old. Thank you for trusting the GEM Home Team with one of the biggest moments of your life. 🥂\n\n${v.clients ? "(Shared with our clients' permission.)\n\n" : ""}🏡 Ready for your own key day? My DMs are open — let's talk about what it takes to get you there.\n\n${GEM.tagJoin(["core","motivation","local"])}\n\n${GEM.buildDisclaimer()}`;
      return { onImage, caption, note: "Only name clients or show faces with written permission. Days-to-close claims must be accurate for this file." };
    }
  },
  {
    id: "ap-spotlight", label: "Agent Spotlight", template: "10-agent-spotlight.png",
    fields: [
      { key: "agent", label: "Agent name", placeholder: "Jane Smith" },
      { key: "brokerage", label: "Brokerage", placeholder: "ABC Realty" },
      { key: "known", label: "What they're known for", placeholder: "fierce negotiation and honest advice" },
      { key: "deal", label: "A recent win together (optional)", placeholder: "got their buyers keys in 19 days" }
    ],
    build(v) {
      const onImage = `AGENT SPOTLIGHT\n${v.agent}\n${v.brokerage}\nKnown for: ${v.known}`;
      const caption = `Agents like this make every deal better. 🤝\n\nSpotlight on ${v.agent} of ${v.brokerage} — known for ${v.known}.${v.deal ? `\n\nMost recently we ${v.deal} — the kind of teamwork clients feel at the closing table.` : ""}\n\nGreat lending only works next to great representation. If you're buying or selling and need an agent who actually fights for you, ${v.agent} is the real deal.\n\n👉 Give them a follow, and tell them the GEM Home Team sent you.\n\n${GEM.tagJoin(["core","realtor","local"])}\n\n${GEM.buildDisclaimer()}`;
      return { onImage, caption, note: "Tag the agent and their brokerage. Spotlights are relationship gold — post one every other Wednesday." };
    }
  },
  {
    id: "ap-testimonial", label: "Testimonial", template: "Client Testimonial Canva template",
    fields: [
      { key: "review", label: "Client review (verbatim)", type: "textarea", placeholder: "Paste the exact review text…" },
      { key: "client", label: "Client name (first name + last initial)", placeholder: "Sarah M." },
      { key: "source", label: "Where they left it", placeholder: "Google" }
    ],
    build(v) {
      const short = v.review.length > 220 ? v.review.slice(0, 217).replace(/\s+\S*$/, "") + "…" : v.review;
      const onImage = `★★★★★\n“${short}”\n— ${v.client}, Verified Client`;
      const caption = `Reviews like this are why we exist. 🙏\n\n“${v.review}”\n— ${v.client}, via ${v.source}\n\nEvery family's situation is different, and every one deserves a lender who treats their loan like it's their own. That's the standard here, every single file.\n\n💬 Want the same experience? Let's start with a conversation — DM me or tap the link in bio.\n\n${GEM.tagJoin(["core","motivation"])}\n\n${GEM.buildDisclaimer()}`;
      return { onImage, caption, note: "Keep the review verbatim and confirm permission to share. Long reviews: the on-image version is auto-trimmed; full text goes in the caption." };
    }
  }
];

/* ---------- Canva Templates (in your Canva account) ---------- */
GEM.canvaTemplates = [
  { name: "Just Closed — signature card", url: "https://www.canva.com/d/1V9CgDMOWqPcy1K", use: "Split layout: swap in the property photo and closing details for every closing" },
  { name: "Client Testimonial — signature card", url: "https://www.canva.com/d/fyhCABXf_aRYfdF", use: "Paste the client's verbatim review (with permission) and their first name" },
  { name: "San Diego Market Update — signature card", url: "https://www.canva.com/d/UsFRdR7p-nidDim", use: "Update the three stats monthly — median price, days on market, listings" },
  { name: "Loan Programs — signature card", url: "https://www.canva.com/d/mserdoh_q37SONk", use: "Evergreen educational post — pairs with the loan programs caption in Content Studio" }
];
GEM.canvaFolder = "https://www.canva.com/folder/FAHRfYDqxyQ";

/* ---------- DM Playbook: keyword auto-replies (ManyChat-ready) ---------- */
GEM.dmKeywords = [
  { keyword: "GUIDE", trigger: "First-time buyer guide requests",
    reply: `Hey! 🙌 Here's your free First-Time Buyer Guide: [LINK]\n\nIt covers the full timeline, what lenders actually look at, and the mistakes that delay closings.\n\nQuick question so I can point you the right way — are you hoping to buy in the next 6 months, or planning further out?` },
  { keyword: "READY", trigger: "Pre-approval intent",
    reply: `Love it — let's get you fully pre-approved so your offers actually carry weight. 🔑\n\nHere's the link to start securely: [APPLICATION LINK]\n\nIt takes about 15 minutes, and nothing hits your credit until you tell us to run it. Want me to call you first to walk through it? If so, what's the best number and time?` },
  { keyword: "CREDIT", trigger: "Credit questions",
    reply: `Good news: you don't need perfect credit to buy — and checking your own score never hurts it. 📊\n\nEvery situation is different, so the honest answer starts with a quick look at yours. Want to grab 15 minutes this week? Here's my calendar: [CALENDAR LINK]` },
  { keyword: "EQUITY", trigger: "Homeowner equity snapshot",
    reply: `Smart move — most owners have no idea what their biggest asset is worth. 🏦\n\nSend me your property address and I'll put together your free equity snapshot (no obligation, nothing pulled). You'll get: estimated value, what you owe vs. own, and what your options could look like.` },
  { keyword: "MARKET", trigger: "Market update subscription",
    reply: `You got it! 📈 I'll keep you in the loop with San Diego market updates that actually make sense.\n\nSo I can tailor it: are you currently renting, owning, or investing?` },
  { keyword: "PARTNER", trigger: "Realtor partnership",
    reply: `Let's do it. ☕ I'm always up for meeting agents who take care of their clients.\n\nHere's my calendar — grab any 20-minute slot: [CALENDAR LINK]\n\nWorst case you get a good coffee and a reliable backup lender. Best case, we close a lot of deals together.` },
  { keyword: "CALL", trigger: "Strategy call booking",
    reply: `Perfect — here's my calendar, grab whatever time works: [CALENDAR LINK]\n\n15-20 minutes, zero pressure, no credit pull. You'll leave with actual next steps whether you're buying in 30 days or 2 years. 🎯` },
  { keyword: "PROGRAMS", trigger: "Loan program questions",
    reply: `There are more ways to finance a home than most people think — FHA, VA, conventional, bank statement, DSCR, down payment assistance and more. 🧭\n\nThe right one depends on your income, goals, and timeline. Tell me a little about your situation (buying, refinancing, investing?) and I'll point you to the best-fit options.` }
];

/* ---------- DM Conversation Flows ---------- */
GEM.dmFlows = [
  { title: "New follower welcome (send within 24h)",
    script: `Hey [Name]! Thanks for the follow 🙌 I share straight-talk mortgage and San Diego market content here — no spam, promise.\n\nQuick intro: I'm with the GEM Home Team at NEO Home Loans. Are you a homeowner, hunting for your first place, or here for the market updates?` },
  { title: "Comment → DM conversion",
    script: `Saw your comment on my post about [topic] — great question, and I didn't want to leave you a half-answer in the comments.\n\n[2-3 sentence genuine answer]\n\nIf you want, I can run your actual numbers so you're working with facts instead of averages. No pressure either way!` },
  { title: "Objection: 'Rates are too high right now'",
    script: `Totally fair — nobody loves today's rates. Two honest thoughts:\n\n1) The payment matters more than the rate. If the payment fits comfortably, waiting has a cost too: rising rents and missed equity.\n\n2) If rates drop later, refinancing is an option; if prices rise while you wait, that's permanent.\n\nNo one can predict rates — but we CAN run your real numbers and see if today's payment actually works for you. Want to look together?` },
  { title: "Objection: 'Another lender quoted me lower'",
    script: `That's worth taking seriously — and I'd genuinely rather you get the best deal than win you with talk.\n\nOne ask: compare Loan Estimates, not phone quotes. The advertised rate means nothing without the fees behind it. Send me their LE and I'll give you a straight answer — if their deal is better, I'll tell you to take it. That's a promise.` },
  { title: "Objection: 'We're just looking / not ready yet'",
    script: `Perfect — 'just looking' is actually the BEST time to talk. 🙂\n\nThe families who close smoothly in spring are the ones who built the plan in winter. A 15-minute call now means when you ARE ready, you move in days, not months. Zero pressure, no credit pull — just a roadmap. Worth it?` },
  { title: "Lead qualification (3 questions, natural order)",
    script: `1) "What's your timeline looking like — months or 'someday'?"\n2) "Will this be your first purchase, or have you bought before?"\n3) "Have you talked to any lender yet about what you'd qualify for?"\n\nThen route: Ready now → pre-approval link. 3-6 months → strategy call. 6+ months → guide + market list + monthly check-in.` }
];

/* ---------- Email Studio ---------- */
GEM.emails = [
  { id: "em-new-lead", title: "New lead — instant reply", timing: "Within 5 minutes of inquiry (automate this)",
    subjects: ["Great to meet you, [First Name] — here's your next step", "[First Name], your home financing roadmap"],
    body: `Hi [First Name],\n\nThanks for reaching out — you just did the thing most people put off for months, so you're already ahead.\n\nHere's what happens next:\n\n1. GRAB A TIME: [Calendar link] — 15-20 minutes, phone or Zoom.\n2. WE TALK GOALS: timeline, budget comfort, and what you qualify for today.\n3. YOU GET A PLAN: whether that's "you're ready now" or a simple 6-month roadmap.\n\nNo credit pull until you say go. No pressure, ever. Just clarity.\n\nTalk soon,\n[SIGNATURE]` },
  { id: "em-followup", title: "No-response follow-up", timing: "Day 3 after inquiry, then day 7",
    subjects: ["Still thinking it over, [First Name]?", "Your questions, answered in 15 minutes"],
    body: `Hi [First Name],\n\nI know life gets busy — no worries at all.\n\nWhen you reached out, you had a reason. Whether that was curiosity about what you'd qualify for, a house you saw online, or just being tired of renting — the answer starts the same way: one short conversation with real numbers.\n\nHere's my calendar whenever you're ready: [Calendar link]\n\nAnd if the timing's changed, just tell me "not yet" and I'll simply check in down the road. Deal?\n\n[SIGNATURE]` },
  { id: "em-annual-review", title: "Annual mortgage review", timing: "Every client, every year (loan anniversary month)",
    subjects: ["[First Name], it's time for your annual mortgage review", "One year in your home — let's check the numbers"],
    body: `Hi [First Name],\n\nHappy loan anniversary! 🎉 Once a year, I review every client's mortgage — because your loan was right for THAT year, and life moves.\n\nIn your free 20-minute review we look at:\n• Your current equity position (this number usually surprises people)\n• Whether your rate/term still fits your goals\n• Any life changes worth planning around (renovation, move, investment, college)\n\nMost reviews end with "you're in great shape — see you next year." Some end with a move that saves real money. Either way, you'll know.\n\nGrab a time: [Calendar link]\n\n[SIGNATURE]` },
  { id: "em-review-request", title: "Post-closing review request", timing: "7-10 days after closing, while the joy is fresh",
    subjects: ["[First Name], can I ask a small favor?", "One minute of your time = the world to our team"],
    body: `Hi [First Name],\n\nSeeing you get those keys was the highlight of our month. 🔑\n\nSmall favor: would you share a sentence or two about your experience? Reviews are how families like yours find a team they can trust.\n\nLeave one here (takes about a minute): [Review link — Google/Yelp/Zillow]\n\nIf anything about your experience was less than excellent, reply to this email instead — I want to hear that directly.\n\nThank you for trusting us with your home.\n\n[SIGNATURE]` },
  { id: "em-referral", title: "Referral cultivation", timing: "60-90 days post-closing + every spring",
    subjects: ["Who do you know, [First Name]?", "The best compliment you could give us"],
    body: `Hi [First Name],\n\nHope the new place is feeling like home!\n\nQuick thought: the families we serve best almost always come from people like you. If someone in your circle is renting-but-dreaming, outgrowing their space, or relocating to San Diego — an introduction to a lender who'll actually take care of them is a genuinely valuable gift.\n\nJust reply with their name, or forward them this email. I promise the same standard you got: straight answers, real education, and a team that fights for their closing.\n\nGrateful for you,\n[SIGNATURE]` },
  { id: "em-agent-intro", title: "Realtor partner introduction", timing: "New agent outreach — personalize the first line",
    subjects: ["[Agent Name], your buyers deserve a lender who answers on Saturdays", "Coffee? (and a lender who won't embarrass you)"],
    body: `Hi [Agent Name],\n\n[Personalized line: saw your listing on X / we crossed paths at Y / Z suggested we meet.]\n\nI run marketing-grade pre-approvals and same-day turnarounds for the GEM Home Team at NEO Home Loans here in San Diego. What that means for your deals:\n\n• Weekly file updates to you and both sides — before anyone has to chase\n• Verified pre-approvals that hold up in underwriting (and in multiple-offer fights)\n• Weekend speed for weekend showings\n• Co-branded open house support, done fully RESPA-clean\n\nWorst case: coffee's on me and you gain a reliable backup lender. Calendar: [Calendar link]\n\n[SIGNATURE]` },
  { id: "em-cold-revival", title: "Cold lead revival", timing: "90+ days silent — send quarterly",
    subjects: ["[First Name], still house hunting?", "Checking in — the market's moved since we talked"],
    body: `Hi [First Name],\n\nWhen we last talked, you were thinking about [buying/refinancing]. The market's shifted since then — which might be good news for your plans.\n\nNo pitch, just an open door: if you want an updated look at your numbers, it takes 15 minutes: [Calendar link]\n\nAnd if the dream's on pause, reply "pause" and I'll check back in a few months instead.\n\n[SIGNATURE]` },
  { id: "em-rate-watch", title: "Rate-watch / market pulse (monthly list email)", timing: "Monthly to opted-in list",
    subjects: ["Your San Diego market minute — [Month]", "[Month] check-in: what buyers & owners should know"],
    body: `Hi [First Name],\n\nYour 60-second San Diego update:\n\nTHE MARKET: [2-3 sentences: inventory, competition, pricing trend — keep current and factual]\n\nFOR BUYERS: [1-2 sentences — what this means practically]\n\nFOR OWNERS: [1-2 sentences — equity/refi implications, no predictions]\n\nQuestions about your specific picture? Just reply — a human (me) reads these.\n\n[SIGNATURE]\n\nP.S. Know someone who'd want this monthly note? Forward it — they can join here: [Signup link]` }
];

/* ---------- Review & Referral Engine ---------- */
GEM.reviewEngine = {
  ask: [
    { title: "Text message ask (day of closing)", script: `[First Name]! CONGRATS again — you're officially HOME 🔑🎉 When the dust settles this week, would you mind sharing a quick review of your experience? It means everything to our small team: [Review link]` },
    { title: "In-person ask (at the closing table)", script: `"Can I ask you one favor? Families find us almost entirely through reviews from people like you. If you'd share a couple sentences about your experience this week while it's fresh, it would mean the world."` },
    { title: "The reply-to-review move", script: `Reply publicly to EVERY review within 24 hours. Formula: thank them by name → mention one specific detail of their journey (shows it's not canned) → warm send-off. Prospects read the replies as closely as the reviews.` }
  ],
  sources: ["Google Business Profile (highest SEO value — priority)", "Zillow lender profile", "Yelp", "Facebook page recommendations", "Experience.com / Birdeye if the team uses one"]
};

/* ---------- Integrations: the hands-off stack ---------- */
GEM.integrations = [
  { id: "ig-pro", name: "Instagram Professional account", how: "Instagram app → Settings → Account type & tools → Switch to professional account. Free, 2 minutes.", why: "Unlocks scheduling, analytics, and every automation below. Nothing works without this.", link: "https://www.instagram.com" },
  { id: "fb-link", name: "Facebook Page linked in Meta Business Suite", how: "business.facebook.com → Settings → Linked accounts → connect Instagram to the GEM Lending Team page.", why: "This is the legal/technical bridge that lets software post on your behalf.", link: "https://business.facebook.com" },
  { id: "scheduler", name: "Scheduler connected (Meta Business Suite / Buffer / Later / Metricool)", how: "Pick one, sign in, click 'Connect Instagram', approve the permissions. Then bulk-import the CSV from the Automation tab monthly.", why: "THE hands-off unlock: every post publishes automatically at the scheduled time.", link: "https://business.facebook.com/latest/composer" },
  { id: "manychat", name: "ManyChat DM automation", how: "manychat.com → connect Instagram → create one automation per keyword using the scripts in Leads & Email.", why: "Every 'DM me GUIDE' caption converts 24/7 — even while you sleep.", link: "https://manychat.com" },
  { id: "gbp", name: "Google Business Profile claimed & active", how: "business.google.com → claim 'GEM Lending Team - NEO Home Loans'. One consistent address, phone, and hours.", why: "The #1 driver of 'mortgage lender near me' visibility and the home of your most valuable reviews.", link: "https://business.google.com" },
  { id: "reviews", name: "Review links saved & in every post-closing flow", how: "Collect your Google / Yelp / Zillow review URLs, paste them into the Leads & Email review templates, and send after every closing.", why: "Reviews are the highest-converting marketing asset a lender has. A system beats good intentions.", link: "" },
  { id: "linkinbio", name: "Link-in-bio page live", how: "Use gemhometeam.com or a Linktree/Beacons page with: apply link, calendar link, guide download, review link.", why: "Instagram gives you ONE link. Make it route to everything.", link: "" },
  { id: "crm", name: "Email list / CRM connected", how: "Any CRM or even Mailchimp free tier: import past clients, load the 8 email sequences from Leads & Email.", why: "Past clients are your referral engine — the annual review email alone pays for the whole system.", link: "" }
];

/* ---------- Online Presence Report Card ---------- */
GEM.auditCategories = [
  { id: "instagram", label: "Instagram", checks: [
    "Handle is discoverable when someone searches your team name",
    "Bio states who you help, your NMLS ID, and has a link + CTA",
    "Posting 5+ feed posts weekly (calendar followed)",
    "Reels weekly with your face in them",
    "Stories 3+ per day with interactive stickers",
    "Every comment & DM answered within 24 hours",
    "Highlights organized (Reviews, About, FAQ, Just Closed)"
  ]},
  { id: "google", label: "Google & Reviews", checks: [
    "Google Business Profile claimed and verified",
    "10+ Google reviews",
    "Every review gets a personalized public reply within 24h",
    "Review ask is automatic after every closing",
    "Zillow lender profile has 5+ reviews",
    "Yelp page monitored and responded to"
  ]},
  { id: "website", label: "Website & SEO", checks: [
    "Site loads fast on mobile and has a clear 'start here' path",
    "NMLS IDs and Equal Housing statement visible",
    "Lead capture (calendar or application link) above the fold",
    "Team page with real photos and bios",
    "Reviews/testimonials displayed on site"
  ]},
  { id: "consistency", label: "Brand Consistency", checks: [
    "Same team name everywhere (pick ONE: GEM Home Team vs GEM Lending Team)",
    "Same logo, colors, and headshots across all platforms",
    "Same address & phone on every listing (NAP consistency)",
    "Same handle/username pattern on every platform"
  ]},
  { id: "network", label: "LinkedIn & Facebook", checks: [
    "LinkedIn profiles active with weekly reposts of your content",
    "Facebook page posting the same calendar via Meta Business Suite",
    "Nextdoor presence claimed and occasionally active",
    "Personal profiles mention the team and link out"
  ]},
  { id: "conversion", label: "Conversion System", checks: [
    "DM keyword automations live for every caption keyword",
    "Email sequences loaded and firing (new lead, follow-up, annual review)",
    "KPIs logged monthly in the dashboard",
    "Every lead gets a response within 1 hour during business hours"
  ]}
];

/* Baseline audit — public-presence findings, August 2026 */
GEM.baselineAudit = [
  { grade: "A-", area: "Website", finding: "gemhometeam.com is live with Megan's NMLS in the page title — strong foundation. Add visible lead capture + testimonials if not present." },
  { grade: "B+", area: "Facebook", finding: "GEM Lending Team page is active with correct NMLS branding. Connect it to the posting calendar so it publishes automatically alongside Instagram." },
  { grade: "B", area: "Reviews", finding: "11 Yelp reviews with strong sentiment, 5★ on Experience.com, SDVoyager press feature. Gap: Zillow/Morfi profiles thin, Google review count unverified — the review engine should push Google first." },
  { grade: "C", area: "Brand consistency", finding: "You appear as BOTH 'GEM Home Team' and 'GEM Lending Team', with two different addresses listed publicly (Willow Creek Rd, San Diego vs 662 Encinitas Blvd). Pick one name + one address everywhere — this directly affects local search ranking." },
  { grade: "D", area: "Instagram", finding: "The team's Instagram did not surface in public search results at all — your primary content channel is currently your least discoverable asset. Fix: consistent handle, NMLS + keywords in bio, then volume via the calendar." },
  { grade: "?", area: "Google Business Profile", finding: "Could not verify a claimed GBP listing from here. If unclaimed, this is the single highest-ROI 30 minutes on this list." }
];

/* ---------- KPI definitions ---------- */
GEM.kpiFields = [
  { key: "followers", label: "IG Followers" },
  { key: "leads", label: "Leads (DMs/forms)" },
  { key: "calls", label: "Strategy calls" },
  { key: "apps", label: "Applications" },
  { key: "closings", label: "Closings" }
];

/* ---------- Design System: "Top 1%" playbook ---------- */
GEM.designPlaybook = {
  principles: [
    { title: "The GEM signature card", body: "Your established carousel layout: left half full-bleed vertical photo, right half content. Eyebrow label in letter-spaced blue caps, name/headline in extra-bold, blue diamond (🔹) bullets with bold lead-ins, footer 'GEM HOME TEAM × NEO' + page counter, thin blue bar at the bottom edge. Alternate warm off-white (#F7F4EF) and navy (#0D2B36) slides through a carousel." },
    { title: "One idea per asset", body: "The top accounts never crowd a slide. One hook, one idea, one CTA. If a slide needs two ideas, it's two slides." },
    { title: "Brand block discipline", body: "Navy #0D2B36 background, white extra-bold headlines, blue #45B6E8 accents, gold #E8C468 only for 'wealth' moments. Never introduce a new color." },
    { title: "Type hierarchy", body: "Headline: extra-bold geometric sans (Montserrat/Poppins ExtraBold), 2 sizes max per slide. Letter-spaced small caps for eyebrows ('MORTGAGE LENDING' style, matching the logo)." },
    { title: "Faces win", body: "Posts with your face outperform graphics 3-5x for local service businesses. Minimum 40% of the grid should include a human." },
    { title: "Authentic over animated", body: "Nothing should look AI-generated or template-animated: no bouncing text, no stock motion graphics, no clip-art, no effects reels. Real photography, natural light, quiet text overlays, editorial restraint. If a design element could appear in anyone else's feed, it doesn't belong in yours." },
    { title: "Captions always on", body: "80%+ of reels are watched muted. Bold captions, high-contrast, safe-zone aware (nothing in bottom 15% or top 10% of frame)." },
    { title: "The 3-frame rule", body: "Cover text must be readable in the grid thumbnail. If you can't read it at postage-stamp size, it's too small." },
    { title: "White space is luxury", body: "Premium brands breathe. 15%+ margin on every card. Cramped = cheap." },
    { title: "Consistent grid rhythm", body: "Alternate: face / graphic / face / graphic. Your profile grid is the first impression — design it as one composition." }
  ],
  reelFormula: [
    "HOOK (0-3s): a pattern interrupt — bold claim, myth, or question. Text on screen from frame one.",
    "RETENTION (3-25s): deliver 2-4 fast points. Change the visual every 3-5 seconds with a punch-in or angle change — never stock effects or animation templates.",
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
