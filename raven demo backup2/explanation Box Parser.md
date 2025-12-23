You're asking for a clear distinction between **"Quantity of Heat"** (which focuses on temperature change) and **"Change of State"** (which focuses on phase change without temperature change). This is a fundamental and crucial separation in thermal physics.

Here is a breakdown comparing these two core topics.

### 📊 **Core Difference: "Quantity of Heat" vs. "Change of State"**

| Aspect | **Quantity of Heat (Sensible Heat)** | **Change of State (Latent Heat)** |
| :--- | :--- | :--- |
| **Central Idea** | Heat that causes a **change in temperature** of a substance. | Heat that causes a **change in physical state** (phase) at constant temperature. |
| **Energy Form** | **Sensible Heat** (detectable by a thermometer as a temperature change). | **Latent Heat** ("hidden" heat, as it does not cause a temperature change). |
| **Governing Formula** | `Q = m c ΔT` <br> • **Q**: Heat energy (J) <br> • **m**: Mass (kg) <br> • **c**: Specific Heat Capacity (J/kg°C) <br> • **ΔT**: Temperature change (°C) | `Q = m L` <br> • **Q**: Heat energy (J) <br> • **m**: Mass (kg) <br> • **L**: Specific Latent Heat (J/kg) |
| **Key Property** | **Specific Heat Capacity (c)**: Heat needed to raise 1 kg by 1°C. | **Specific Latent Heat (L)**: Heat needed to change 1 kg from one state to another. |
| **Primary Processes** | Heating or cooling a solid, liquid, or gas. | Melting (solid→liquid), Vaporization (liquid→gas), Boiling, Evaporation, Freezing, Condensation. |
| **Temperature** | **Changes** during the process. | **Remains constant** during the phase change. |
| **Molecular View** | Heat increases the **average kinetic energy** of molecules (they move/vibrate faster). | Heat is used to **break or form intermolecular bonds**, changing the arrangement of molecules. |
| **Typical Question** | "How much heat is needed to raise 2 kg of water from 20°C to 80°C?" | "How much heat is needed to melt 2 kg of ice at 0°C into water at 0°C?" |
| **Example from Your List** | **Q27:** Heat absorbed by copper from 20°C to 70°C. (`Q = mcΔT`) | **Q1:** Heat to change ice to water at 0°C. (`Q = mL`) |
| **Applications** | • Cooking food<br>• Designing heating systems<br>• Understanding climate (land vs. sea temperatures) | • Refrigeration (coolants absorb latent heat)<br>• Steam engines (water→steam)<br>• Weather (cloud/rain formation) |

### 💡 **The Crucial Link: Combined Problems**
Many exam questions test your understanding of the *difference* by combining both concepts. You must calculate the total heat in stages:
1.  Heat to **raise temperature** to the phase change point (`Q₁ = mcΔT`).
2.  Heat to **change state** at constant temperature (`Q₂ = mL`).
3.  (Sometimes) Heat to further **raise temperature** of the new state.

**Example (From Your List: Q20, Q53):**
> "Calculate the heat needed to convert 2 kg of ice at -2°C to water at 0°C."
> - **Stage 1 (Qty of Heat):** Warm the *ice* from -2°C to 0°C. `Q₁ = m * c_ice * ΔT`
> - **Stage 2 (Change of State):** Melt the *ice at 0°C* to *water at 0°C*. `Q₂ = m * L_fusion`
> - **Total:** `Q_total = Q₁ + Q₂`

In summary:
*   **"Quantity of Heat"** is about **changing temperature**.
*   **"Change of State"** is about **changing phase**.

Mastering when to use `Q = mcΔT` and when to use `Q = mL` is the key to solving 90% of problems in these sections. Would you like me to walk through the detailed solution for one of the combined problems (like Q20 or Q53) to illustrate this step-by-step process?






---------------------------------
explanation Box Parser
---------------------------------

function parseExplanation(text) {
const result = {
steps: [],
keyTakeaway: null
};

// Check for key takeaway patterns
const takeawayPatterns = [
/(?:key\s*takeaway|remember|note|tip|important)[:\s]+(.+?)(?=\n\n|$)/i,
/(?:therefore|hence|thus)[,:\s]+(.+?)(?=\n\n|$)/i
];

let remainingText = text;
for (const pattern of takeawayPatterns) {
const match = remainingText.match(pattern);
if (match) {
result.keyTakeaway = match[1].trim();
remainingText = remainingText.replace(match[0], '').trim();
break;
}
}

// Split by common step indicators
const stepPatterns = [
// Numbered steps: "1.", "1)", "Step 1:", etc.
/(?:^|\n)\s*(?:step\s*)?(\d+)[.):\s-]+/gi,
// Bullet points: "•", "-", "*"
/(?:^|\n)\s*[•\-\*]\s+/g,
// Sequential words: "First,", "Second,", "Then,", "Next,", "Finally,"
/(?:^|\n)\s*(?:first|second|third|fourth|fifth|then|next|finally|lastly|also|additionally)[,:\s]+/gi
];

// Try to split by numbered steps first
const numberedMatch = remainingText.match(/(?:^|\n)\s*(?:step\s*)?(\d+)[.):\s-]+/gi);

if (numberedMatch && numberedMatch.length >= 2) {
// Split by numbered pattern
const parts = remainingText.split(/(?:^|\n)\s*(?:step\s*)?\d+[.):\s-]+/i).filter(p => p.trim());
parts.forEach((part, index) => {
const cleanText = part.trim();
if (cleanText) {
result.steps.push({
number: index + 1,
text: cleanText
});
}
});
} else {
// Try splitting by sentences or line breaks
const sentences = remainingText
.split(/(?:\.\s+|\n+)/)
.map(s => s.trim())
.filter(s => s.length > 10); // Filter out very short fragments

if (sentences.length > 1) {
sentences.forEach((sentence, index) => {
// Add period back if it was removed
const text = sentence.endsWith('.') ? sentence : sentence + '.';
result.steps.push({
number: index + 1,
text: text
});
});
} else {
// Just one block of text - display as single step
result.steps.push({
number: 1,
text: remainingText.trim()
});
}
}

return result;
}

// Sanitize HTML to allow only safe formatting tags
function sanitizeHTML(html) {
// Allow only specific safe tags for formatting
const allowedTags = ['sub', 'sup', 'strong', 'em', 'b', 'i', 'u', 'br', 'span'];


// Check for key takeaway patterns
const takeawayPatterns = [
/(?:key\s*takeaway|remember|note|tip|important)[:\s]+(.+?)(?=\n\n|$)/i,
/(?:therefore|hence|thus)[,:\s]+(.+?)(?=\n\n|$)/i
];

------------------------------------------------------------------------------------
Yes, that JSON format will work perfectly! 
The explanation box will display it correctly.

However, since your current explanation is just one sentence, it will show as a single step. To get the line-by-line breakdown for your students, you can format your explanations with numbered steps like this:

Option 1: Numbered Steps
json
"explanation": "1. Dew point is the temperature at which air becomes saturated with water vapour. 2. At this temperature, the air cannot hold any more moisture. 3. Water vapour begins to condense into liquid droplets (dew). 4. This is why we see dew on grass in the early morning when temperatures drop."

Option 2: Line Breaks
json
"explanation": "Dew point is the temperature at which air becomes saturated with water vapour.\nAt this point, the air cannot hold any more moisture.\nWater vapour begins to condense into liquid droplets.\nRemember: Lower dew points mean drier air, higher dew points mean more humid air."

Option 3: Sequential Words
json
"explanation": "First, understand that air can only hold a certain amount of water vapour. Then, as temperature drops, air's capacity to hold moisture decreases. Finally, at the dew point, saturation occurs and condensation begins."

What each format produces:
Your Current Format	With Numbered Steps
Shows as 1 single step	Shows as 4 separate steps with numbered badges
The parser will automatically detect:

✅ 1. 2. 3. numbered patterns
✅ Step 1: Step 2: patterns
✅ First, Then, Finally, words
✅ Line breaks (\n)
✅ Remember: or Note: → Key Takeaway box