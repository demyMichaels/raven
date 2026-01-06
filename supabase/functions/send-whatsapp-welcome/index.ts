import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_ID");
const ACCESS_TOKEN = Deno.env.get("WHATSAPP_ACCESS_TOKEN");
const TEMPLATE_NAME = Deno.env.get("WHATSAPP_TEMPLATE_NAME") || "jaspers_market_plain_text_v1";

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { whatsapp_number, name, course, institution, score } = await req.json();

    // Validate inputs
    if (!whatsapp_number) {
      return new Response(
        JSON.stringify({ error: "Missing whatsapp_number" }),
        { status: 400 }
      );
    }

    if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
      console.error("WhatsApp credentials not configured");
      return new Response(
        JSON.stringify({ error: "WhatsApp service not configured" }),
        { status: 500 }
      );
    }

    // Send WhatsApp message via Meta API
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: whatsapp_number,
          type: "template",
          template: {
            name: TEMPLATE_NAME,
            language: {
              code: "en_US",
            },
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("WhatsApp API error:", data);
      return new Response(
        JSON.stringify({
          success: false,
          error: data.error?.message || "Failed to send message",
        }),
        { status: response.status }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Welcome message sent successfully",
        messageId: data.messages?.[0]?.id,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
});
