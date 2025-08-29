import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export type ContentItem = {
  key: string;
  title: string;
  value: string; // markdown
  dad?: string | null;
  order?: number;
  created_at?: string;
};

export const ContentService = {
  getAll: async (): Promise<ContentItem[]> => {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .order("order", { ascending: true }); // opcional: ordena pelo campo order
    if (error) throw error;
    return data || [];
  },

  createOrUpdate: async (item: ContentItem) => {
    const { error } = await supabase
      .from("content")
      .upsert(item, { onConflict: "key" });
    if (error) throw error;
  },

  delete: async (key: string) => {
    const { error } = await supabase
      .from("content")
      .delete()
      .eq("key", key);
    if (error) throw error;
  },
};
