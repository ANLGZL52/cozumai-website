function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, message: "Geçersiz istek" }, 400);
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  const company = String(body.company || "").trim();
  const serviceArea = String(body.service_area || "").trim();
  const summary = String(body.summary || "").trim();
  const budget = String(body.budget || "").trim();
  const start = String(body.start || "").trim();

  if (!name || !email || !phone || !summary || !serviceArea) {
    return json({ success: false, message: "Eksik alan" }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    return json({ success: false, message: "Form servisi yapılandırılmamış" }, 503);
  }

  const contactEmail = env.CONTACT_EMAIL || "anlgzl52@gmail.com";
  const text = [
    `Ad Soyad: ${name}`,
    company ? `Şirket: ${company}` : null,
    `E-posta: ${email}`,
    `Telefon: ${phone}`,
    `Alan: ${serviceArea}`,
    `Bütçe: ${budget || "—"}`,
    `Başlangıç: ${start || "—"}`,
    "",
    "Proje özeti:",
    summary,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "CozumAI Form <onboarding@resend.dev>",
      to: [contactEmail],
      reply_to: email,
      subject: `Proje talebi — ${name}`,
      text,
    }),
  });

  if (res.ok) return json({ success: true });

  return json({ success: false, message: "Mail gönderilemedi" }, 502);
}
