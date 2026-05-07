import { createClient } from "@supabase/supabase-js";
import type { MistakeStar } from "@/lib/types";

type Database = {
  public: {
    Tables: {
      mistakes: {
        Row: MistakeStar;
        Insert: {
          id?: string;
          text: string;
          created_at?: string;
          visible_until?: string;
        };
        Update: never;
      };
    };
  };
};

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        "X-Client-Info": "let-it-go-server",
      },
    },
  });
}
