/* ============================================================
   GEM MARKETING OS — Compliance Engine
   Screens copy against NMLS / Reg Z (TILA) / Reg N (MAP Rule) /
   UDAAP-style advertising rules and builds the disclosure footer.
   NOTE: This is a guardrail tool, not legal advice. Final review
   always belongs to your company compliance department.
   ============================================================ */

(function () {
  const GEM = window.GEM;

  /* Build the standard disclosure footer from user settings */
  GEM.buildDisclaimer = function (settings) {
    const s = settings || GEM.getSettings();
    return GEM.complianceRules.disclaimerTemplate()
      .replace("{NAME}", s.name || "[Your Name]")
      .replace("{NMLS}", s.nmls || "[Your NMLS #]")
      .replace("{CO_NMLS}", s.companyNmls || "[Company NMLS #]")
      .replace("{STATES}", s.states ? `Licensed in ${s.states}.` : "");
  };

  /**
   * Check a block of text.
   * Returns { status: 'pass'|'warn'|'fail', findings: [{level, label, why, id}] }
   * Levels: 'fail' (prohibited / missing required), 'warn' (trigger/caution)
   */
  GEM.checkCompliance = function (text, opts) {
    opts = opts || {};
    const findings = [];
    const rules = GEM.complianceRules;

    // Prohibited phrases — hard fails
    rules.prohibited.forEach(r => {
      if (r.pattern.test(text)) findings.push({ level: "fail", id: r.id, label: r.label, why: r.why });
    });

    // Reg Z triggering terms — warnings (require disclosures if kept)
    rules.triggers.forEach(r => {
      if (r.pattern.test(text)) findings.push({ level: "warn", id: r.id, label: r.label, why: r.why });
    });

    // Cautions
    rules.cautions.forEach(r => {
      if (r.pattern.test(text)) findings.push({ level: "caution", id: r.id, label: r.label, why: r.why });
    });

    // Unfilled data placeholders — AI is instructed to never invent numbers,
    // so [X]%-style placeholders must be replaced with verified figures before posting
    if (/\[(X|AMOUNT|MONTH|YEAR|DATE|RATE|PRICE|NUMBER|N|CITY|SOURCE)[^\]]*\]/i.test(text)) {
      findings.push({
        level: "warn", id: "placeholder",
        label: "Unfilled data placeholder",
        why: "Replace every [bracketed placeholder] with real, verified figures (and cite the source where relevant) before posting — generated content never invents data."
      });
    }

    // Required elements — only enforced when checking a full/final post
    if (!opts.skipRequired) {
      rules.required.forEach(r => {
        if (!r.pattern.test(text)) findings.push({ level: "fail", id: "missing-" + r.id, label: "Missing: " + r.label, why: r.why });
      });
    }

    let status = "pass";
    if (findings.some(f => f.level === "fail")) status = "fail";
    else if (findings.length) status = "warn";

    return { status, findings };
  };

  /* Suggested rewrites for common violations */
  GEM.complianceFixes = {
    "guarantee": "Replace with: “Many buyers are surprised by what they can qualify for — let’s look at your options.”",
    "best-lowest": "Replace with: “competitive rates” or drop the comparison entirely — lead with service.",
    "no-cost": "Replace with: “Ask me how closing-cost options work — there are several ways to structure them.”",
    "gov-affil": "Describe the program factually: “FHA loans are a popular option for…” without implying endorsement or deadlines.",
    "pre-approved-blast": "Replace with: “Find out what you could be approved for — it starts with one conversation.”",
    "advice-overreach": "Reframe as education: “For some homeowners X makes sense — every situation is different. Let’s review yours.”",
    "rate": "Remove the specific rate, or run the post through compliance with full Reg Z disclosures (APR shown at least as prominently).",
    "payment": "Speak in concepts, not dollars: “a payment that fits your budget” — or add full Reg Z disclosures.",
    "downpayment": "Use ranges/qualitative language: “lower down payment options exist for qualified buyers.”",
    "term": "Keep the term educational, or detach it from offer language.",
    "urgency": "Reframe: preparation over panic — “the best-prepared buyers started early.”",
    "prediction": "Use conditional framing: “IF rates drop…” / “no one can predict rates.”",
    "testimonial": "Confirm written permission, keep the client’s words verbatim, and avoid implying typical results.",
    "missing-nmls": "Add your NMLS ID (auto-added by the Fix button).",
    "missing-ehl": "Add “Equal Housing Lender.” (auto-added by the Fix button)."
  };

  /* Auto-fix: append the compliant footer if required elements are missing */
  GEM.autoFix = function (text) {
    const result = GEM.checkCompliance(text);
    const missingRequired = result.findings.some(f => f.id === "missing-nmls" || f.id === "missing-ehl");
    if (missingRequired) {
      return text.trimEnd() + "\n\n" + GEM.buildDisclaimer();
    }
    return text;
  };
})();
