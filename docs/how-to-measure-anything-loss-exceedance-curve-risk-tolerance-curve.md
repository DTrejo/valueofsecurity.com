Give me the two most brilliant and clever examples of measurement from How to Measure Anything (book). Then, I want you to give me ideas for how to measure the ROI of investments in security at Chime Financial (chime.com and mobile banking app)

---

Douglas Hubbard’s *How to Measure Anything* argues that "intangibles" like security, brand, and customer trust are not only measurable but often provide the highest value for measurement because they are where our uncertainty is greatest.

### **Two Brilliant Examples from the Book**

Hubbard uses these examples to prove that you don't need a lot of data—or even precise data—to significantly reduce uncertainty.

#### **1. The "Rule of Five" (Small Sample Power)**
One of the most counterintuitive examples is how much information you can gain from an incredibly small sample. Hubbard introduces the **Rule of Five**: 
> There is a 93.75% probability that the median of a population is between the smallest and largest values in any random sample of five.

Most people assume you need thousands of data points to measure something like "customer satisfaction" or "employee morale." Hubbard proves that if you have *zero* data, even just five random observations reduce your uncertainty by more than 90%. This "clever" shortcut empowers managers to start measuring immediately rather than waiting for "big data."

#### **2. Measuring the Value of a Life (The 11-Year-Old’s Experiment)**
Hubbard highlights the story of Emily Rosa, the youngest person ever published in the *Journal of the American Medical Association* (JAMA). At age 11, she debunked "therapeutic touch" (a practice where healers claim to manipulate human energy fields without physical contact) using a simple cardboard screen. 

The brilliance here is the **Measurement Inversion**: The most important things to measure are often the ones we spend the least time on because they seem "impossible." Hubbard uses this to show that if an 11-year-old can design a controlled experiment for a complex medical claim, a business can certainly find a way to measure "security risk" or "innovation."

---

### **Measuring Security ROI for Chime Financial**

For a fintech like Chime, security isn't just a cost—it’s a product feature. If users don’t trust that their money is safe, they won't use the app. Using Hubbard's **Applied Information Economics (AIE)** framework, here is how you can measure the ROI of security:

#### **A. Calculate the "Cost of Being Wrong"**
Instead of looking at the cost of a tool, look at the **Expected Value of Including a Security Feature**.
* **The Loss Event:** Model the probability of a major breach or account takeover (ATO) wave using a Monte Carlo simulation.
* **The "Intangible" Impact:** Measure the potential **Customer Churn Rate** following a security incident. For Chime, this is critical; unlike traditional banks, a digital-only bank relies entirely on its app’s reputation. 
* **Measurement:** Survey a small sample of users (Rule of Five!) on their likelihood to leave if their account was compromised vs. if they saw a "Secured by [New Feature]" badge.

#### **B. Measure "Friction vs. Security" ROI**
Security often adds friction (e.g., more frequent MFA).
* **The Metric:** Measure the **Conversion Drop-off** caused by security hurdles.
* **The ROI:** If a new biometric security layer reduces ATOs by 20% but increases login time by 2 seconds, calculate the "Net ROI" by comparing the **fraud savings** against the **Lifetime Value (LTV)** of users who quit the app due to frustration.

#### **C. The "Security as a Marketing Asset" ROI**
* **The Hypothesis:** Better security features (like Chime’s instant "Card Lock") increase **Word of Mouth (WOM)** and user trust (Li et al., 2023).
* **Measurement:** Use A/B testing. Show one group of new users a "Security Deep Dive" during onboarding and the other a "Feature Overview." Measure the difference in **30-day retention** and **deposit volume**. The ROI is the marginal increase in revenue from the "Security-Aware" group.



### **References**
* Hubbard, D. W. (2010). *How to Measure Anything: Finding the Value of "Intangibles" in Business*. Wiley. [https://doi.org/10.1002/9781118983836](https://doi.org/10.1002/9781118983836)
    * *Cited by: 1688*
* Li, Y., Ma, X., Li, Y., Li, R., & Liu, H. (2023). How does platform's fintech level affect its word of mouth from the perspective of user psychology? *Frontiers in Psychology*, *14*. [https://doi.org/10.3389/fpsyg.2023.1085587](https://doi.org/10.3389/fpsyg.2023.1085587)
    * *Cited by: 13*

Would you like to see a sample Monte Carlo setup for a specific security threat, like credential stuffing attacks?

By the way, to unlock the full functionality of all Apps, enable [Gemini Apps Activity](https://myactivity.google.com/product/gemini).

---

Explain Applied Information Economics (AIE) Approach: Loss Exceedance Curve

---

The **Loss Exceedance Curve (LEC)** is the cornerstone of Douglas Hubbard’s Applied Information Economics (AIE) approach. While traditional risk assessments use a "High/Medium/Low" heatmap, the LEC uses quantitative probability to show you exactly how much skin you have in the game.

### **What is a Loss Exceedance Curve?**
An LEC is a graph that shows the probability that a loss will exceed a certain dollar amount. It answers the question: *"What are the odds that we lose more than $X in a single year?"*

In AIE, we don't try to predict a single "point estimate" (e.g., "This breach will cost exactly $5M"). Instead, we acknowledge our uncertainty and map out a range of possibilities.



### **The Three Key Components**

| Component | Definition | Why it Matters |
| :--- | :--- | :--- |
| **Probability (Y-axis)** | The likelihood (0% to 100%) of an event occurring. | It visualizes "tail risk"—the scary, low-probability but high-impact events. |
| **Loss Magnitude (X-axis)** | The total cost of the impact (monetary). | It forces you to define what a "catastrophic" loss actually looks like. |
| **The Curve** | A downward sloping line showing cumulative probability. | As the dollar amount increases, the probability of exceeding it decreases. |

---

### **How AIE Builds the Curve**

Hubbard’s approach follows a specific sequence to ensure the curve is statistically sound rather than just a "best guess":

1.  **Calibrated Estimates:** Instead of asking experts for one number, AIE asks for a **90% Confidence Interval** (a lower bound and an upper bound). For example: "I am 90% sure the cost of a data breach at Chime would be between $10M and $100M."
2.  **Monte Carlo Simulation:** A computer runs thousands of "what-if" scenarios based on those ranges. It randomly picks values from the distributions to see how often different levels of loss occur.
3.  **Plotting the LEC:** The results of the simulation are plotted. You might find that there is a **20% chance** of losing more than **$20M**, but only a **2% chance** of losing more than **$200M**.

---

### **The "Risk Tolerance" Comparison**
The most "brilliant" part of the LEC is when you overlay it with a **Risk Tolerance Curve** (often called a "Risk Appetite" line). 

* **If your LEC is above your Risk Tolerance:** You are over-exposed. You need to invest in more security or insurance to "pull" the curve down.
* **If your LEC is below your Risk Tolerance:** You might be over-spending on security. You are effectively "too safe," and that capital might be better spent on growth or product innovation.

[Image comparing a Loss Exceedance Curve to a Risk Tolerance line]

### **Why this is better than "Risk Heatmaps"**
Standard $5 \times 5$ color-coded heatmaps are statistically "noisy" and often lead to poor decision-making because "High" for one person is "Medium" for another. The LEC provides a **financial common language** between the Security Team (who understands threats) and the CFO (who understands dollars).

Does this explanation help you see how you might apply this to a specific threat, like a phishing campaign or a system outage?

---

How do you create a Risk Tolerance Curve?

---

Creating a **Risk Tolerance Curve** (also known as a Risk Appetite Curve) is the process of defining the "line in the sand" for your organization. While the Loss Exceedance Curve (LEC) tells you what *could* happen, the Risk Tolerance Curve tells you what you are *willing* to let happen.

Here is the step-by-step process for building one using the AIE framework:

---

### **1. Identify the "Unacceptable" Thresholds**
You begin by asking decision-makers (usually the Board or the CFO) a series of "forced choice" questions. You aren't asking "How much risk do you like?" (the answer is always "none"). Instead, you ask about specific probabilities of loss.

* **The "One-in-Ten" Rule:** "What is the maximum amount of money we are willing to lose in a single year with a 10% probability?"
* **The "Catastrophe" Rule:** "What is the maximum amount we can lose with a 1% probability (the 100-year event) before the company's survival is at risk?"

### **2. Plot the Anchor Points**
You take these specific dollar amounts and their associated probabilities and plot them on the same axes as your LEC:
* **Y-axis:** Probability of Exceedance (e.g., 5%, 10%, 20%)
* **X-axis:** Loss Magnitude (in Dollars)

For example, Chime leadership might decide:
* We can tolerate a **10% chance** of losing **$5M** (operational noise).
* We can only tolerate a **1% chance** of losing **$50M** (significant capital hit).

### **3. Draw the Curve (The Boundary)**
Connect these points to create a downward-sloping curve. 
* **The Area Under the Curve:** This is your **"Safe Zone."** If your actual risk (the LEC) falls here, your current security controls are adequate.
* **The Area Above the Curve:** This is the **"Danger Zone."** If your LEC crosses into this area, you are carrying more risk than the organization has authorized.



---

### **4. Perform the "Sanity Check" (Utility Analysis)**
Hubbard suggests a clever way to validate if the curve is real or just a guess: **The Certainty Equivalent Test.**

Ask the stakeholder: *"If you could pay a fixed insurance premium of $X to completely eliminate the risk of a $50M loss occurring with 2% probability, would you do it?"* * If they say **yes**, the "cost" of the risk is higher than $X. 
* If they say **no**, their tolerance is actually higher than they first claimed. 

This moves the curve from a theoretical exercise to a practical financial limit.

### **5. Compare LEC to Risk Tolerance**
This is the final "aha!" moment in AIE. You overlay the two curves. 

* **The Gap:** The space between your actual risk (LEC) and your tolerance curve represents your **Risk Exposure.** * **The Decision:** If the LEC is significantly above the tolerance curve at the $20M mark, you now have a quantitative justification to spend up to the value of that gap on new security measures (like enhanced encryption or fraud detection AI).

[Image comparing Loss Exceedance Curve and Risk Tolerance Curve showing a gap]

### **Why this matters for Chime**
In fintech, your "catastrophe" point (the 1% probability) might be the loss of your banking license or a total collapse of user trust. By defining this curve, the security team can stop asking for "more budget" and start saying, *"Our current risk of a license-threatening event is 5%, but our policy says it must be under 1%. We need $X to bridge that gap."*

To get started, would you like to know which specific stakeholders usually provide the best "calibrated" data for the Risk Tolerance Curve?

---

but, do we really need to ask these questions? chime is a public company , we know the revenue, we know how much we invest in security today.

---

It’s a fair question—especially now that Chime is a public company (ticker: **CHYM**) and has released its FY2025 financials. You can see the **$2.2B revenue**, the **89% gross margins**, and the general buckets of R&D and OpEx. 

However, Applied Information Economics (AIE) argues that **top-line data is not risk tolerance.** Knowing how much you spend on a security team is just looking at the "receipt." It doesn’t tell you if that receipt was for a bulletproof vest or a raincoat.

Here is why you still need to ask those specific "forced choice" questions to define a tolerance curve:

---

### **1. Budgets are "Anchor Bias," not Strategy**
If Chime spends **$100M** on security today, that number was likely decided based on last year’s budget + 10%, or a percentage of revenue common in fintech. 
* **The AIE view:** That $100M is an *input*, not a *limit*. Without a Risk Tolerance Curve, you don't know if that $100M is actually buying you the protection you need for a "tail risk" event (like a total platform outage) that could wipe out 50% of your market cap in a week.

### **2. Public Filings are Vague about "Appetite"**
Chime’s **10-K** or **S-1** filings will list "Cybersecurity" as a risk factor, saying things like *"a breach could have a material adverse effect."* * **The Board's job:** "Material" is a legal term, but for a CFO, it’s a sliding scale. You need to ask the questions to find the **Inflection Point**. For example: "At what dollar loss does our stock price experience a permanent 20% valuation drop?" That specific number ($50M? $500M?) defines the curve's shape.

### **3. The "Equity vs. Security" Tradeoff**
Now that Chime is public, investors are watching **GAAP profitability** (which Chime expects to hit in 2026).
* Every dollar spent on security is a dollar taken away from net income.
* If you don't define your tolerance, you’ll likely succumb to **"Analysis Paralysis"**—over-spending when a scary headline hits the news and under-spending when the pressure to hit quarterly earnings kicks in. The curve acts as a "governor" to keep spending rational.

### **4. Risk is Exponential, not Linear**
Revenue grows linearly, but security risk is often a **Power Law**. 
* A 10% increase in Chime’s user base (now at **9.5 million active members**) might increase the "Expected Loss" from fraud by 100% because the platform becomes a more attractive target for organized crime. 
* You can't derive that from a revenue statement; you can only find it by asking, *"What is the probability of a 1-in-100 year event that we are willing to accept to maintain our 22% growth rate?"*

---

### **AIE Summary for Chime**
| Data Source | What it tells you | What it MISSES |
| :--- | :--- | :--- |
| **Public Financials** | How much we *did* spend. | If that spend was enough to prevent a $1B catastrophe. |
| **Security Metrics** | How many attacks we *blocked*. | The financial impact of the one attack we *missed*. |
| **Risk Tolerance Curve** | The maximum loss we *can afford*. | **Nothing.** This is the missing link that connects security to the balance sheet. |

[Image comparing Chime's public financial data vs. a private Risk Tolerance Curve]

By asking those "forced choice" questions, you move from **"Security as a Cost Center"** to **"Security as a Capital Allocation Strategy."** Since Chime is scaling its "MyPay" and "Instant Loan" products (which hit **$40B** in origination volume in 2025), the risk profile has shifted from "simple banking" to "credit risk + security risk." Does it make sense why a simple revenue-based budget might fail to capture that complexity?

---

It is nice to know that your company is more secure than competitors, and thus an unattractive target for the bad guys, greatly reducing chances of security issues.

Assuming all security teams are equally talented (big assumption), then we do just want to compare security investment vs revenue vs industry benchmarks, right?

---

It is a tempting logical shortcut, but Douglas Hubbard would call that the **"Benchmarking Trap."** Comparing security investment to industry benchmarks or revenue percentages is one of the most common ways companies make sub-optimal decisions.

Here is why that logic fails under the Applied Information Economics (AIE) lens:

### **1. The "Safety is Relative" Fallacy**
You mentioned that being more secure than competitors makes you an "unattractive target." While true for opportunistic "script kiddies," it is often false for high-value targets like Chime.
* **The Reality:** If you are a leading fintech with **$2.2B in revenue** and **9.5 million active members**, you aren't just competing against other banks for safety; you are competing against the **reward** you represent to organized crime. 
* **AIE Point:** A predator doesn't just look for the "weakest gazelle." If the "strongest gazelle" is carrying a massive diamond, the predator will work harder to catch that one. You must measure the **threat incentive**, not just your relative peer standing.

### **2. Benchmarks are "Average of Errors"**
Industry benchmarks tell you what the *average* company is doing. 
* **The Problem:** Most companies do not use quantitative risk modeling. If you base your budget on an average of companies that are all guessing, you are just "consistently wrong."
* **Chime Context:** As Chime scales **MyPay** (which reached a **$400M revenue run rate** in 2025), its risk profile changes from a simple debit processor to a lender. Peer benchmarks for "retail neobanks" will drastically under-represent the security needs of a firm doing high-velocity credit origination.

### **3. The "Revenue %" Myth**
Linking security spend to a percentage of revenue assumes that risk grows linearly with income. It doesn't.
* **The Nonlinear Jump:** If Chime grows revenue by 20%, but that growth comes from a new feature that integrates with 50 third-party APIs, the **attack surface** might have grown by 500%. 
* **AIE Approach:** You should invest until the **Information Value** of the next dollar spent no longer reduces the **Expected Loss** by more than one dollar. 

---

### **A Better Way: The "Security ROI" Calculation**

Instead of asking "What does Chase spend?", Hubbard suggests asking: 

> **$Return = (Expected Loss_{Before}) - (Expected Loss_{After}) - Cost of Control$**

To do this at Chime, you'd look at your **2025 transaction loss rate (which was a stellar 1% for MyPay)**. 
1.  **Model the Tail Risk:** Use your 2025 PV (Purchase Volume) of **$134B**. What is the 1% probability event of a systemic fraud breach? 
2.  **Estimate Mitigation:** If a **$10M** investment in "Next-Gen AI Fraud Detection" reduces the probability of a **$200M** breach from 2% to 1%, that investment has an expected savings of **$2M per year**. 
3.  **The Verdict:** If the annual cost of the tool is less than $2M, it’s a "Go." If you just used a benchmark, you might have skipped it because "no one else is using it yet."

### **Summary Table: Benchmarking vs. AIE**

| Metric | Benchmarking Approach | AIE Approach (Hubbard) |
| :--- | :--- | :--- |
| **Budget Driver** | "Peers spend 6% of IT on security." | "This $5M spend reduces our $50M tail-risk by 30%." |
| **Success Metric** | "We are in the top quartile of NIST scores." | "Our Loss Exceedance Curve is below our Risk Tolerance." |
| **View of Peers** | "We are safer than Neobank X." | "Is our security high enough to offset the *reward* of attacking us?" |

[Image comparing a peer benchmark bar chart vs. an AIE ROI calculation]

By moving away from benchmarks and toward **Expected Value**, Chime can justify the massive R&D spends needed to protect its path to GAAP profitability in 2026. 

Since you’re thinking about the "bad guys'" perspective, would you like to explore how to model the **"Cost to Attack"** vs. the **"Value of the Haul"** for a specific Chime feature?

---

Tell me about expected opportunity loss

---

In Douglas Hubbard’s **Applied Information Economics (AIE)**, **Expected Opportunity Loss (EOL)** is a "double-check" metric used to determine if you are making the right decision under uncertainty. 

While most people focus on the risk of losing money (Expected Loss), EOL focuses on the **risk of being wrong**. It is the cost of choosing the "wrong" path because you lacked enough information to see the "right" one.

---

### **1. The Core Definition**
EOL is the expected value of the "regret" you would feel if you chose Option A when Option B was actually better. It is calculated by:
1.  Identifying the scenarios where your chosen decision is the wrong one.
2.  Calculating the magnitude of the loss in those specific scenarios.
3.  Multiplying that loss by the probability of those scenarios occurring.

> **Simple Example:** You decide *not* to invest in a new fraud detection tool. If a massive breach occurs, your "opportunity loss" is the savings that tool would have provided. If you *do* invest but no breach occurs, your EOL is the cost of the tool that yielded no return.

---

### **2. EOL as the "Value of Information"**
This is where Hubbard’s brilliance shines. EOL is mathematically equivalent to the **Expected Value of Perfect Information (EVPI)**. 

If your EOL for a specific decision is **$100,000**, it means that even if you had a magic crystal ball that could tell you the future perfectly, that information would only be worth **$100,000**. 

* **Rule of Thumb:** You should never spend more on a measurement (or a study) than the EOL of the decision it is meant to inform.



---

### **3. Application: Chime’s "MyPay" Feature**
Let’s apply this to Chime’s 2025 rollout of "MyPay" (instant payroll access). Chime had to decide how much to invest in aggressive credit-limit security.

* **Decision A:** High-security hurdles (Slows down user growth).
* **Decision B:** Low-security hurdles (Speeds up growth but risks fraud).

**The EOL of Choosing "High Security":**
If the "Low Security" path was actually safe, Chime's EOL is the **forfeited revenue** from users who quit the app because the hurdles were too high. Based on Chime’s 2025 growth, this could be millions in Lifetime Value (LTV).

**The EOL of Choosing "Low Security":**
If the "Low Security" path leads to a 5% fraud rate (vs. the current 1%), the EOL is the **excess fraud loss** that could have been prevented.

---

### **4. Why EOL is Better than "Expected Value" Alone**
AIE uses EOL to highlight where your uncertainty is most dangerous. 
* **The "Hole" in the Data:** If your EOL is high, it tells you: *"Stop deciding and start measuring."*
* **The "Measurement Trigger":** Hubbard argues that we often measure things that are easy to measure (like server uptime) even though they have an EOL of near zero, while we ignore "brand trust" which might have an EOL in the millions.

[Image showing EOL as the area of "regret" in a probability distribution]

### **Summary: EOL for Decision Makers**
If you are a Chime executive looking at a new $20M security budget:
1.  **Ask:** "What is the EOL if we *don't* spend this and get breached?"
2.  **Ask:** "What is the EOL if we *do* spend this and the threat was overblown?"
3.  **Act:** Whichever path has the **lowest EOL** is the mathematically superior choice, regardless of your gut feeling.

Does this shift how you think about the "cost" of making a decision at a high-growth company like Chime?

---

How do I figure out Value of information?

---

In Douglas Hubbard’s approach, **Expected Value of Information (EVI)** is the ultimate "BS detector" for your measurement budget. It tells you exactly how much you should be willing to pay for more data before you actually make a decision.

If you are at Chime trying to decide whether to buy a **$500k security tool**, and the Value of Information regarding that tool's effectiveness is only **$50k**, you shouldn't buy the tool—and you shouldn't even spend time "researching" it further.

Here is the step-by-step math to figure it out:

---

### **1. Calculate the "Expected Opportunity Loss" (EOL)**
As we discussed, EOL is the "Cost of Being Wrong." To get the Value of Information, you must first determine how much money you stand to lose if you make the wrong choice.

* **Scenario:** Chime is considering a new biometric login system to prevent Account Takeovers (ATO).
* **The Choice:** * **Option A:** Implement the system (Cost: $2M).
    * **Option B:** Status quo (Cost: $0).
* **The Uncertainty:** Will ATOs actually decrease enough to offset the $2M cost?

### **2. Define the "Perfect Information" Scenario**
Imagine a "Perfect Expert" who can tell you with 100% certainty whether the tool will succeed or fail.
* If the Expert says it will **fail**, you save **$2M** by not buying it.
* If the Expert says it will **succeed**, you gain **$5M** in fraud savings.

### **3. The EVPI Formula**
The **Expected Value of Perfect Information (EVPI)** is the average EOL across all possible scenarios.

$$EVPI = \sum (Probability \text{ of being wrong} \times \text{Cost of being wrong})$$

**Example Calculation:**
1.  Suppose there is a **30% chance** that the tool will fail to stop enough fraud to cover its cost.
2.  In that "Failure" scenario, you have wasted **$2M**.
3.  **EVPI = 0.30 \times \$2,000,000 = \$600,000.**

> **The Result:** You should be willing to spend up to **$600,000** on a pilot program, a deep-dive study, or a consultant to get "perfect" clarity. If a consultant asks for $700k, they are mathematically a bad investment.



---

### **4. Adjust for "Imperfect" Information (EVI)**
In the real world, no measurement is perfect. A pilot program or a survey only gives you *partial* clarity. 
* If a measurement is 50% "better" than your current guess, the **Expected Value of Information (EVI)** is roughly 50% of the EVPI.
* In the Chime example, if a 2-week pilot (costing $50k) gives you 50% more certainty, its value is **$300,000** ($600k \times 0.5$). 
* **The ROI of that measurement is 6x ($300k value / $50k cost).**

---

### **5. The "Information Inversion" Phenomenon**
This is the most "clever" part of the book. Hubbard found that in almost every business case:
* Companies spend the **most** time measuring things with **low EVI** (like precisely tracking the $10/month cost of a server).
* Companies spend the **least** time measuring things with **high EVI** (like the probability of a major security breach or the "intangible" value of user trust).



### **How to do this at Chime (Practical Steps):**
1.  **Run a Monte Carlo:** Model your security project.
2.  **Sensitivity Analysis:** Ask the model, "Which variable (e.g., 'Threat Frequency' or 'Tool Effectiveness') is causing the most uncertainty in my ROI?"
3.  **Calculate EVPI for that variable:** If the EVPI is high, that is where your team should spend their week—not on more coding, but on **measuring that specific variable.**

Would you like to try a "back-of-the-envelope" EVPI calculation for a specific problem you're facing right now?