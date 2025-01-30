import { supabase } from "@/integrations/supabase/client";

export const generateWebsiteContent = async (prompt: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-website', {
      body: { prompt }
    });

    if (error) throw error;

    return data.generatedText;
  } catch (error) {
    console.error('Error generating website content:', error);
    throw error;
  }
};