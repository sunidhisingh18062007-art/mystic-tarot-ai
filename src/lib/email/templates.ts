const baseStyle = `
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #0f0a1a; color: #e2d9f3; }
  .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .header { text-align: center; padding: 30px 0; }
  .header h1 { color: #a855f7; font-size: 28px; margin: 0; }
  .header p { color: #9ca3af; margin-top: 8px; }
  .content { background: linear-gradient(135deg, #1a1030 0%, #0f0a1a 100%); border: 1px solid rgba(168,85,247,0.2); border-radius: 16px; padding: 32px; margin: 20px 0; }
  .button { display: inline-block; background: linear-gradient(135deg, #a855f7, #6366f1); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; margin: 20px 0; }
  .footer { text-align: center; padding: 20px 0; color: #6b7280; font-size: 12px; }
`;

function wrapTemplate(content: string) {
  return `<!DOCTYPE html>
<html>
<head><style>${baseStyle}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>✨ Mystic Tarot AI</h1>
      <p>Your cosmic guide to self-discovery</p>
    </div>
    ${content}
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Mystic Tarot AI. All rights reserved.</p>
      <p>You received this email because you're a member of Mystic Tarot AI.</p>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Welcome email for new users.
 */
export function welcomeEmail(name: string) {
  return wrapTemplate(`
    <div class="content">
      <h2 style="color: #c084fc; margin-top: 0;">Welcome, ${name}! 🌟</h2>
      <p>The stars have aligned to bring you here. Welcome to Mystic Tarot AI — your personal cosmic companion for self-discovery and spiritual growth.</p>
      <p>Here's what you can explore:</p>
      <ul style="line-height: 2;">
        <li>🃏 <strong>Daily Card Readings</strong> — Start each day with cosmic guidance</li>
        <li>🔮 <strong>AI-Powered Interpretations</strong> — Deep, personalized insights</li>
        <li>📔 <strong>Tarot Journal</strong> — Track your spiritual journey</li>
        <li>⭐ <strong>Multiple Spreads</strong> — Celtic Cross, Love, Career, and more</li>
      </ul>
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">Begin Your Journey →</a>
      </div>
    </div>
  `);
}

/**
 * Payment receipt email.
 */
export function paymentReceiptEmail({
  name,
  plan,
  amount,
  currency,
  date,
  receiptUrl,
}: {
  name: string;
  plan: string;
  amount: number;
  currency: string;
  date: string;
  receiptUrl?: string;
}) {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);

  return wrapTemplate(`
    <div class="content">
      <h2 style="color: #c084fc; margin-top: 0;">Payment Confirmed 💫</h2>
      <p>Thank you, ${name}! Your payment has been successfully processed.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="border-bottom: 1px solid rgba(168,85,247,0.2);">
          <td style="padding: 12px 0; color: #9ca3af;">Plan</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600;">${plan}</td>
        </tr>
        <tr style="border-bottom: 1px solid rgba(168,85,247,0.2);">
          <td style="padding: 12px 0; color: #9ca3af;">Amount</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600;">${formattedAmount}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #9ca3af;">Date</td>
          <td style="padding: 12px 0; text-align: right; font-weight: 600;">${date}</td>
        </tr>
      </table>
      ${receiptUrl ? `<div style="text-align: center;"><a href="${receiptUrl}" class="button">View Receipt</a></div>` : ""}
    </div>
  `);
}

/**
 * Daily tarot card email.
 */
export function dailyTarotEmail({
  name,
  cardName,
  isReversed,
  interpretation,
  affirmation,
}: {
  name: string;
  cardName: string;
  isReversed: boolean;
  interpretation: string;
  affirmation: string;
}) {
  return wrapTemplate(`
    <div class="content">
      <h2 style="color: #c084fc; margin-top: 0;">Your Daily Card 🃏</h2>
      <p>Good morning, ${name}! Here's your cosmic guidance for today.</p>
      <div style="text-align: center; padding: 24px; background: rgba(168,85,247,0.1); border-radius: 12px; margin: 20px 0;">
        <h3 style="color: #e9d5ff; font-size: 24px; margin: 0;">
          ${cardName} ${isReversed ? "(Reversed)" : ""}
        </h3>
      </div>
      <p style="line-height: 1.8;">${interpretation}</p>
      <div style="padding: 16px; background: rgba(99,102,241,0.1); border-left: 3px solid #6366f1; border-radius: 0 8px 8px 0; margin: 20px 0;">
        <p style="margin: 0; font-style: italic;">✨ "${affirmation}"</p>
      </div>
      <div style="text-align: center;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/daily" class="button">See Full Reading →</a>
      </div>
    </div>
  `);
}
