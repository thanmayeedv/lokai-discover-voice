import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language } = await req.json();

    if (!query || query.trim() === '') {
      return new Response(JSON.stringify({ translatedQuery: '', originalQuery: query }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Received search query:', query, 'Language hint:', language);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a translation and search query optimizer for a local services marketplace in India.
Your task is to:
1. Detect if the input is in Kannada, Hindi, or English
2. Translate the query to English if it's not already in English
3. Extract the key service terms for search (like "plumber", "electrician", "tutor", "kirana", "chai", "food", "doctor", etc.)
4. Return ONLY the translated/optimized English search term(s), nothing else.

Examples:
- "ಪ್ಲಂಬರ್" → "plumber"
- "प्लम्बर" → "plumber"
- "ಹತ್ತಿರದ ಕಿರಾಣಿ ಅಂಗಡಿ" → "kirana shop"
- "नजदीकी किराना दुकान" → "kirana shop"
- "ಟ್ಯೂಟರ್" → "tutor"
- "शिक्षक" → "tutor teacher"
- "ಚಾಯ್ ಅಂಗಡಿ" → "chai shop tea"
- "खाना" → "food"
- "ಡಾಕ್ಟರ್" → "doctor"
- "plumber near me" → "plumber"

Return only the search terms, no explanations.`
          },
          {
            role: 'user',
            content: query
          }
        ],
        max_tokens: 50,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const translatedQuery = data.choices?.[0]?.message?.content?.trim() || query;

    console.log('Translated query:', translatedQuery);

    return new Response(JSON.stringify({ 
      translatedQuery, 
      originalQuery: query,
      detected: translatedQuery !== query 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search-services function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      translatedQuery: '',
      originalQuery: '' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
