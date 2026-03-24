"use server";

export async function reportSosAction(formData: FormData) {
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;
  const address = formData.get("address") as string;
  const phone = formData.get("phone") as string;

  // Telegram webhook integration
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

  if (BOT_TOKEN && CHAT_ID) {
    const text = `🚨 *СОС! ПОТЕРЯШКА!*\n\n*Имя/Кличка:* ${name}\n*Окрас/Приметы:* ${color}\n*Где пропал:* ${address}\n*Связь:* ${phone}`;
    
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: "Markdown"
        })
      });
    } catch (e) {
      console.error("Failed to send telegram webhook", e);
    }
  }

  console.log("SOS Reported internally:", { name, color, address, phone });
  
  return { success: true };
}
