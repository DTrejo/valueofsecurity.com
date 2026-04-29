In the United States, "per violation" is a legal term of art. In the context of a data breach, it almost never refers to the single hacking event itself. Instead, **one violation = one person's data compromised.**

If you have a single security lapse that exposes a database of 10,000 people, the government treats that as **10,000 individual violations.**

Here is the updated 2026 breakdown of how these situational fines and multipliers scale per person.

---

## 1. HIPAA Situational Fines (Health Data)
*Effective as of the January 28, 2026, inflation adjustment.* These fines apply **per individual record** exposed, up to an annual cap for identical violations.

| Situation (Culpability) | Fine per Individual Record (Min) | Fine per Individual Record (Max) | Annual Cap (Per Provision) |
| :--- | :--- | :--- | :--- |
| **Tier 1: No Knowledge** | **$145** | **$73,011** | $2,190,294 |
| **Tier 2: Reasonable Cause** | **$1,461** | **$73,011** | $2,190,294 |
| **Tier 3: Willful Neglect (Corrected)** | **$14,602** | **$73,011** | $2,190,294 |
| **Tier 4: Willful Neglect (Uncorrected)** | **$73,011** | **$2,190,294** | $2,190,294 |

> **Key takeaway:** If you lose 100 records under "Reasonable Cause," your starting fine is $146,100 ($1,461 x 100).

---

## 2. California (CCPA/CPRA) Multipliers
California uses a flat-rate multiplier. In 2026, the baseline fines were adjusted upward for inflation.

| Violation Type | Fine per Affected Person | Legal Trigger |
| :--- | :--- | :--- |
| **Negligent Breach** | **$2,663** | General security failure (e.g., no MFA). |
| **Intentional Breach** | **$7,988** | Ignoring a known vulnerability. |
| **Minor's Data (<16)** | **$7,988** | **Automatic High-Tier** regardless of intent. |
| **Statutory Damages** | **$107 – $799** | Amount individuals can sue for in class actions. |

---

## 3. Federal & Biometric Specialty Fines
Some laws focus on the specific sensitivity of the field (like children's data or fingerprints).

| Law / Data Type | Fine per Person (Violation) | Notes for 2026 |
| :--- | :--- | :--- |
| **COPPA (Under 13s)** | **$53,088** | Massive "per child" penalty for unauthorized collection. |
| **BIPA (Biometrics)** | **$1,000 – $5,000** | Fined per person, per "method" (e.g., face vs fingerprint). |
| **Neural Data** | **$2,500 – $20,000** | New 2026 tier for brain-wearable data (CA/NY). |

---

## 4. The "Math of a Breach" Example
To visualize how the government calculates the total bill, consider a single company that suffers **one** hack:

**The Scenario:** One laptop is stolen containing a spreadsheet of **500 customers**.
* **Case A (General Data):** 500 people x $2,663 (CCPA) = **$1,331,500**
* **Case B (Minor Data):** 500 kids x $7,988 (CCPA) = **$3,994,000**
* **Case C (Health Data):** 500 patients x $14,602 (HIPAA Tier 3) = **$7,301,000**



### **Summary of Situational Multipliers**
1.  **Encryption Multiplier (0x):** If the data is encrypted to NIST standards, the fine is almost always **$0** because no "readable" person-level data was lost.
2.  **Cure Multiplier (0.1x - 0.5x):** Notifying the AG and fixing the leak within 30 days can often drop the "per person" fine to the minimum statutory level.
3.  **The "Repeat Offender" Multiplier:** If you have a breach of the same data type within 3 years, the government often waives the "Minimum" fine and moves straight to the "Maximum" per person.