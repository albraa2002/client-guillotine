export interface EmailTemplate {
  subject: string;
  body: string;
  tone: "Professional" | "Executive" | "Formal";
}

const EMAIL_SIGNATURE = `
---
The Client Guillotine System
This is an AI-generated email template. Review before sending.
`;

export function generateRepricingEmail(
  clientName: string,
  currentRetainer: number,
  suggestedRetainer: number,
  reason: string
): EmailTemplate {
  return {
    subject: `Proposed Partnership Restructuring: ${clientName}`,
    body: `Dear ${clientName} Team,

Following our comprehensive resource analysis, we must adjust our partnership terms to reflect the actual scope of engagement.

Current Investment: $${currentRetainer.toLocaleString()}/month
Proposed Investment: $${suggestedRetainer.toLocaleString()}/month
Effective: Next billing cycle

${reason}

We remain committed to delivering exceptional results. This adjustment ensures we can dedicate the appropriate resources your account requires.

Please review and confirm by replying to this email.

Best regards,
Agency Leadership${EMAIL_SIGNATURE}`,
    tone: "Professional",
  };
}

export function generateScopeLimitationEmail(
  clientName: string,
  exceededScope: string[],
  additionalCost: number
): EmailTemplate {
  return {
    subject: `Scope Adjustment Notice: ${clientName}`,
    body: `Dear ${clientName} Team,

Our engagement has consistently exceeded the agreed scope of work.

Exceeded Areas:
${exceededScope.map((s) => `• ${s}`).join("\n")}

Additional Cost Incurred: $${additionalCost.toLocaleString()}/month

To maintain quality, we are implementing a change order process for any work outside the defined scope. All additional requests will require a separate agreement before execution.

This protects both parties and ensures clarity in deliverables.

Regards,
Operations Team${EMAIL_SIGNATURE}`,
    tone: "Formal",
  };
}

export function generateContractTerminationEmail(
  clientName: string,
  reason: string,
  noticeDays: number = 30
): EmailTemplate {
  return {
    subject: `Notice of Contract Conclusion: ${clientName}`,
    body: `Dear ${clientName} Team,

After careful evaluation, we have decided to conclude our professional relationship, effective in ${noticeDays} days, per our agreement terms.

${reason}

We will ensure a smooth transition of all materials and ongoing work during this period. A detailed handover document will be prepared.

We appreciate the opportunity to have worked together and wish you continued success.

Sincerely,
Agency Leadership${EMAIL_SIGNATURE}`,
    tone: "Executive",
  };
}

export function generateClientWarningEmail(
  clientName: string,
  issues: string[],
  consequences: string
): EmailTemplate {
  return {
    subject: `Partnership Health Notice: ${clientName}`,
    body: `Dear ${clientName} Team,

We value our partnership and want to address some concerns affecting our ability to deliver at the level you expect.

Areas of Concern:
${issues.map((i) => `• ${i}`).join("\n")}

${consequences}

We are committed to finding a solution and would like to schedule a call to discuss how we can improve this partnership.

Best regards,
Account Management${EMAIL_SIGNATURE}`,
    tone: "Professional",
  };
}

export function generateRetainerIncreaseEmail(
  clientName: string,
  currentRetainer: number,
  newRetainer: number,
  valueDelivered: string[]
): EmailTemplate {
  return {
    subject: `Partnership Growth: Updated Investment for ${clientName}`,
    body: `Dear ${clientName} Team,

As we continue to deliver results, we are adjusting our investment structure to match the expanding value we provide.

Value Delivered:
${valueDelivered.map((v) => `• ${v}`).join("\n")}

Current Investment: $${currentRetainer.toLocaleString()}/month
New Investment: $${newRetainer.toLocaleString()}/month
Effective: Next quarter

This increase reflects the additional resources, expertise, and strategic value we bring to your business.

We look forward to continuing this partnership.

Warm regards,
Agency Leadership${EMAIL_SIGNATURE}`,
    tone: "Executive",
  };
}
