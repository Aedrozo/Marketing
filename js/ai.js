/* ============================================================
   GEM MARKETING OS — AI Writing Engine (Claude API)
   Optional: requires the user's own Anthropic API key (Settings).
   The key is stored only in this browser's localStorage and is
   sent only to api.anthropic.com. Costs bill to the user's key.
   ============================================================ */

(function () {
  const GEM = window.GEM;

  GEM.aiAvailable = function () {
    return !!(GEM.getSettings().apiKey || "").trim();
  };

  function brandSystemPrompt() {
    const s = GEM.getSettings();
    return `You are the marketing copywriter for GEM Home Team, a mortgage lending team in San Diego (NEO Home Loans, a division of Better Mortgage Corporation, NMLS #330511). The team: Megan Sawamura (NMLS #972639), Camryn Carroll, Anthony Edrozo, Sonny Alquizar, Kevin Torres.

VOICE: Warm, direct, educational, honest — a trusted advisor, never a salesperson. Plain English, no jargon. Confident but humble. Some emoji are fine in captions (Instagram norm) but keep it professional, never cartoonish.

STYLE RULES:
- Hook in the first line that stops the scroll
- Short paragraphs and scannable structure
- End with ONE clear call to action, usually a DM keyword
- Every situation framed as individual ("every situation is different")

COMPLIANCE RULES (absolute — never violate):
- NEVER state specific interest rates, APRs, payment amounts, or down payment amounts/percentages
- NEVER guarantee approval or outcomes ("guaranteed", "everyone qualifies")
- NEVER claim "lowest/best/cheapest rates" or "free/no-cost" loans
- NEVER imply government affiliation or use false urgency ("act now", "rates about to jump")
- NEVER predict rate movements as fact
- Testimonial content must note permission and avoid implying typical results
- Educational framing always; this is not financial advice

OUTPUT: Return ONLY the requested copy, no preamble, no explanations, no markdown headers. The app appends the licensing disclosure footer automatically — do not write one.${s.name ? `\nThe person posting is ${s.name}.` : ""}`;
  }

  /**
   * Generate marketing copy with Claude.
   * @param {string} instruction - what to write
   * @returns {Promise<string>} the generated text
   * @throws {Error} with a user-readable message
   */
  GEM.aiGenerate = async function (instruction) {
    const key = (GEM.getSettings().apiKey || "").trim();
    if (!key) {
      throw new Error("Add your Claude API key in Settings to enable AI writing.");
    }
    let resp;
    try {
      resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-opus-5",
          max_tokens: 2048,
          output_config: { effort: "low" },
          system: brandSystemPrompt(),
          messages: [{ role: "user", content: instruction }]
        })
      });
    } catch (e) {
      throw new Error("Couldn't reach the Claude API from this page. AI writing works on your live site (aedrozo.github.io/Marketing) or when the app is opened directly — not inside embedded previews.");
    }
    if (!resp.ok) {
      const body = await resp.json().catch(() => null);
      const msg = body && body.error && body.error.message ? body.error.message : `HTTP ${resp.status}`;
      if (resp.status === 401) throw new Error("That API key was rejected. Double-check it in Settings (keys start with sk-ant-).");
      if (resp.status === 429) throw new Error("Rate limited by the Claude API — wait a minute and try again.");
      throw new Error("Claude API error: " + msg);
    }
    const data = await resp.json();
    if (data.stop_reason === "refusal") {
      throw new Error("Claude declined to write this one — try rephrasing the request.");
    }
    const text = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim();
    if (!text) throw new Error("The AI returned an empty response — try again.");
    return text;
  };
})();
