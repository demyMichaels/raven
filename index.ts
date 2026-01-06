console.info('send-whatsapp-welcome function starting (verbose logging)');
Deno.serve(async (req: Request) => {
  try {
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
    const body = await req.json().catch(() => null);
    if (!body) return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SERVICE_ROLE) return new Response(JSON.stringify({ error: 'Missing SUPABASE_URL or SERVICE_ROLE' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

    const PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const GRAPH_VERSION = Deno.env.get('WHATSAPP_GRAPH_VERSION') || 'v22.0';
    const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN');
    if (!PHONE_NUMBER_ID || !WHATSAPP_TOKEN) return new Response(JSON.stringify({ error: 'Missing WhatsApp config (PHONE_NUMBER_ID or TOKEN) in env' }), { status: 500, headers: { 'Content-Type': 'application/json' } });

    const whatsapp_number = body.whatsapp_number || body.phone || body.to;
    if (!whatsapp_number) return new Response(JSON.stringify({ error: 'Missing whatsapp_number in request body' }), { status: 400, headers: { 'Content-Type': 'application/json' } });

    const template = body.template || 'jaspers_market_plain_text_v1'; // Changed to your actual template
    const payload = body.payload || { name: body.name || 'User' };

    const WHATSAPP_API_URL = `https://graph.facebook.com/${GRAPH_VERSION}/${PHONE_NUMBER_ID}/messages`;

    // DEBUG: Check if phone number is in test numbers list
    console.info(`Attempting to send to phone: ${whatsapp_number}`);
    console.info(`Using template: ${template}`);

    // First, try to send as plain text message (works for test numbers)
    const textMessageBody = body.message || `Welcome to Raven Exam Tutor, ${payload.name || 'Student'}! We're excited to help you prepare for JAMB. Check your dashboard for personalized study tips.`;
    
    const textPayload = {
      messaging_product: 'whatsapp',
      to: whatsapp_number,
      type: 'text',
      text: {
        body: textMessageBody
      }
    };

    console.info('Trying text message first...');
    console.info('Text payload:', JSON.stringify(textPayload));

    let waResp = await fetch(WHATSAPP_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(textPayload)
    }).catch(err => {
      console.error('Fetch error calling Graph API for text message', String(err));
      return { ok: false, error: String(err) };
    });

    let waJson = null;
    let statusCode = 0;
    let usedTemplate = false;
    
    if (waResp && waResp.ok === false) {
      waJson = { error: waResp.error };
      statusCode = 0;
    } else {
      statusCode = waResp.status;
      const text = await waResp.text().catch(() => '');
      try {
        waJson = text ? JSON.parse(text) : {};
      } catch (e) {
        waJson = { text };
      }
    }

    // If text message fails, try template
    if (!waResp.ok || statusCode !== 200) {
      console.info('Text message failed, trying template...');
      
      // Build Graph API template payload
      const templatePayload = {
        messaging_product: 'whatsapp',
        to: whatsapp_number,
        type: 'template',
        template: {
          name: template,
          language: { code: 'en_US' }
          // Note: Your template might not have parameters, so don't include components if not needed
        }
      };

      console.info('Template payload:', JSON.stringify(templatePayload));

      waResp = await fetch(WHATSAPP_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(templatePayload)
      }).catch(err => {
        console.error('Fetch error calling Graph API for template', String(err));
        return { ok: false, error: String(err) };
      });

      usedTemplate = true;
      
      if (waResp && waResp.ok === false) {
        waJson = { error: waResp.error };
        statusCode = 0;
      } else {
        statusCode = waResp.status;
        const text = await waResp.text().catch(() => '');
        try {
          waJson = text ? JSON.parse(text) : {};
        } catch (e) {
          waJson = { text };
        }
      }
    }

    console.info('WhatsApp API response', JSON.stringify({ 
      status: statusCode, 
      body: waJson,
      usedTemplate: usedTemplate,
      method: usedTemplate ? 'template' : 'text'
    }));

    // Log via PostgREST RPC (best-effort)
    const rpcUrl = `${SUPABASE_URL}/rest/v1/rpc/log_whatsapp_message`;
    const rpcBody = {
      p_phone: whatsapp_number,
      p_template: usedTemplate ? template : 'text_message',
      p_payload: payload,
      p_response: waJson,
      p_status_code: statusCode,
      p_method: usedTemplate ? 'template' : 'text'
    };

    const rpcResp = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SERVICE_ROLE,
        'Authorization': `Bearer ${SERVICE_ROLE}`
      },
      body: JSON.stringify(rpcBody)
    }).catch(err => {
      console.error('RPC log error', String(err));
      return { ok: false, error: String(err) };
    });

    let rpcJson = null;
    if (rpcResp && rpcResp.ok === false) {
      rpcJson = { error: rpcResp.error };
    } else if (rpcResp && rpcResp.json) {
      rpcJson = await rpcResp.json().catch(() => ({ text: 'rpc-non-json' }));
    }

    const result = { 
      whatsapp: { 
        status: statusCode, 
        response: waJson,
        method: usedTemplate ? 'template' : 'text',
        success: statusCode === 200
      }, 
      log: rpcJson 
    };
    
    return new Response(JSON.stringify(result), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });

  } catch (err) {
    console.error('Function error', err);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error', 
      details: String(err) 
    }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
});