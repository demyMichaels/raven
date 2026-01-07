// Deno Edge Function to sync WhatsApp templates from Meta API
// Deploy with: supabase functions deploy sync-whatsapp-templates

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json'
};

serve(async (req: Request) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: corsHeaders });
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!SUPABASE_URL || !SERVICE_ROLE) {
      return new Response(JSON.stringify({ error: 'Missing Supabase config' }), { status: 500, headers: corsHeaders });
    }

    const PHONE_NUMBER_ID = Deno.env.get('WHATSAPP_PHONE_NUMBER_ID');
    const WHATSAPP_TOKEN = Deno.env.get('WHATSAPP_TOKEN');
    if (!PHONE_NUMBER_ID || !WHATSAPP_TOKEN) {
      return new Response(JSON.stringify({ error: 'Missing WhatsApp credentials' }), { status: 500, headers: corsHeaders });
    }

    console.info('Starting template sync from Meta...');

    // Fetch templates from Meta API
    const metaUrl = `https://graph.facebook.com/v22.0/${PHONE_NUMBER_ID}/message_templates`;
    const metaResp = await fetch(metaUrl, {
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`
      }
    });

    if (!metaResp.ok) {
      const error = await metaResp.json();
      console.error('Meta API error:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch from Meta API', details: error }), { status: 500, headers: corsHeaders });
    }

    const metaData = await metaResp.json();
    console.info('Fetched templates from Meta:', metaData.data?.length || 0);

    // Sync templates to Supabase
    const templates = metaData.data || [];
    let synced = 0;
    let failed = 0;

    for (const template of templates) {
      try {
        // Extract parameters from template components
        const parameters = [];
        if (template.components) {
          for (const component of template.components) {
            if (component.type === 'BODY' && component.parameters) {
              for (const param of component.parameters) {
                parameters.push({
                  type: param.type,
                  name: param.name || `param_${parameters.length + 1}`,
                  default: ''
                });
              }
            }
          }
        }

        // Upsert template into database
        const upsertResp = await fetch(`${SUPABASE_URL}/rest/v1/whatsapp_templates`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SERVICE_ROLE,
            'Authorization': `Bearer ${SERVICE_ROLE}`,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            name: template.name,
            meta_template_name: template.name,
            meta_template_id: template.id,
            category: template.category || 'GENERAL',
            status: template.status || 'PENDING_MODERATION',
            message_preview: template.name,
            parameters: parameters,
            language: 'en_US',
            sync_status: 'SYNCED',
            last_synced_at: new Date().toISOString()
          })
        });

        if (upsertResp.ok) {
          synced++;
          console.info(`✓ Synced template: ${template.name}`);
        } else {
          failed++;
          const err = await upsertResp.json();
          console.error(`✗ Failed to sync ${template.name}:`, err);
        }
      } catch (err) {
        failed++;
        console.error(`✗ Error processing template ${template.name}:`, err);
      }
    }

    const result = {
      success: true,
      message: `Synced ${synced} templates, ${failed} failed`,
      synced,
      failed,
      total: templates.length
    };

    console.info('Sync complete:', result);

    return new Response(JSON.stringify(result), { 
      status: 200, 
      headers: corsHeaders 
    });

  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ 
      error: 'Internal Server Error', 
      details: String(err) 
    }), { 
      status: 500, 
      headers: corsHeaders 
    });
  }
});
