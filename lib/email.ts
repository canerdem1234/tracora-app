import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "Tracora <hello@tracora.ai>";
const ADMIN_EMAIL = "aydinticaret00@gmail.com";

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `[İletişim] ${data.subject || "Yeni Mesaj"} — ${data.name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0f;color:#e2e8f0;border-radius:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:32px;">
          <span style="font-size:24px;font-weight:900;background:linear-gradient(135deg,#6366f1,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Tracora</span>
        </div>
        <h2 style="color:#fff;margin:0 0 24px;font-size:20px;">Yeni İletişim Formu Mesajı</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="padding:10px 0;color:#94a3b8;font-size:13px;width:100px;">İsim</td>
            <td style="padding:10px 0;color:#fff;font-size:14px;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#94a3b8;font-size:13px;">E-posta</td>
            <td style="padding:10px 0;color:#6366f1;font-size:14px;"><a href="mailto:${escapeHtml(data.email)}" style="color:#6366f1;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding:10px 0;color:#94a3b8;font-size:13px;">Konu</td>
            <td style="padding:10px 0;color:#fff;font-size:14px;">${escapeHtml(data.subject) || "—"}</td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:20px;background:#13131a;border-radius:8px;border:1px solid rgba(255,255,255,0.08);">
          <p style="color:#94a3b8;font-size:12px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">Mesaj</p>
          <p style="color:#e2e8f0;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
        <p style="color:#475569;font-size:12px;margin-top:32px;text-align:center;">Bu mesajı Tracora iletişim formu üzerinden aldınız.</p>
      </div>
    `,
  });
}

export async function sendWaitlistConfirmation(email: string) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: "Tracora Bekleme Listesine Katıldınız! 🎉",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0f;color:#e2e8f0;border-radius:12px;">
        <div style="text-align:center;margin-bottom:32px;">
          <span style="font-size:32px;font-weight:900;background:linear-gradient(135deg,#6366f1,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Tracora</span>
        </div>
        <div style="text-align:center;margin-bottom:32px;">
          <div style="font-size:48px;margin-bottom:16px;">🎉</div>
          <h1 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 12px;">Listedesiniz!</h1>
          <p style="color:#94a3b8;font-size:15px;line-height:1.6;margin:0;">
            Tracora bekleme listesine başarıyla kaydoldunuz.<br>
            Erken erişim açıldığında sizi ilk haber verenler arasında olacağız.
          </p>
        </div>
        <div style="background:#13131a;border:1px solid rgba(99,102,241,0.3);border-radius:12px;padding:24px;margin-bottom:24px;">
          <h3 style="color:#6366f1;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 16px;">Neler Alacaksınız?</h3>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#e2e8f0;font-size:14px;">
              <span style="color:#10b981;">✓</span> İlk 100 kullanıcıya özel <strong>%40 ömür boyu indirim</strong>
            </li>
            <li style="display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#e2e8f0;font-size:14px;">
              <span style="color:#10b981;">✓</span> 10+ AI motorunda marka görünürlüğü izleme
            </li>
            <li style="display:flex;align-items:center;gap:10px;margin-bottom:12px;color:#e2e8f0;font-size:14px;">
              <span style="color:#10b981;">✓</span> Slack & Teams anlık bildirimler
            </li>
            <li style="display:flex;align-items:center;gap:10px;color:#e2e8f0;font-size:14px;">
              <span style="color:#10b981;">✓</span> HubSpot & Salesforce CRM entegrasyonu
            </li>
          </ul>
        </div>
        <div style="text-align:center;">
          <a href="https://tracora.ai" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#06b6d4);color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-weight:700;font-size:15px;">
            tracora.ai'yı Ziyaret Et
          </a>
        </div>
        <p style="color:#334155;font-size:12px;text-align:center;margin-top:32px;">
          Bu maili almak istemiyorsanız bize <a href="mailto:hello@tracora.ai" style="color:#475569;">hello@tracora.ai</a> adresinden yazabilirsiniz.
        </p>
      </div>
    `,
  });
}

export async function sendWaitlistAdminNotification(newEmail: string, totalCount?: number) {
  return resend.emails.send({
    from: FROM_ADDRESS,
    to: ADMIN_EMAIL,
    subject: `🔔 Yeni Waitlist Kaydı: ${newEmail}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0f;color:#e2e8f0;border-radius:12px;">
        <h2 style="color:#fff;margin:0 0 16px;">Yeni Bekleme Listesi Kaydı</h2>
        <div style="background:#13131a;border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;margin-bottom:16px;">
          <p style="color:#94a3b8;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.05em;">E-posta</p>
          <p style="color:#6366f1;font-size:16px;font-weight:600;margin:0;">${escapeHtml(newEmail)}</p>
        </div>
        ${totalCount ? `<p style="color:#94a3b8;font-size:13px;">Toplam waitlist sayısı: <strong style="color:#fff;">${totalCount}</strong></p>` : ""}
        <a href="https://tracora.ai/aydin/waitlist" style="display:inline-block;background:#6366f1;color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;margin-top:16px;">
          Admin Panelinde Gör
        </a>
      </div>
    `,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
