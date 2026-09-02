import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export interface WaitlistRow {
  id: string;
  email: string;
  source: string | null;
  created_at: string;
}

export interface EnquiryRow {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
}

export interface SubmissionsResult {
  waitlist: WaitlistRow[];
  enquiries: EnquiryRow[];
}

/**
 * Reads every form submission. Signed-in AND admin-only: the role check runs
 * as the caller (RLS applies) before any service-role read happens.
 */
export const listSubmissions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SubmissionsResult> => {
    const { data: isAdmin, error: roleError } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });

    if (roleError) {
      console.error("role check failed", roleError);
      throw new Error("Forbidden");
    }
    if (!isAdmin) {
      throw new Error("Forbidden");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [waitlist, enquiries] = await Promise.all([
      supabaseAdmin
        .from("waitlist")
        .select("id, email, source, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      supabaseAdmin
        .from("enquiries")
        .select("id, name, email, subject, message, created_at")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (waitlist.error || enquiries.error) {
      console.error("submissions read failed", waitlist.error ?? enquiries.error);
      throw new Error("Could not load submissions.");
    }

    return {
      waitlist: waitlist.data ?? [],
      enquiries: enquiries.data ?? [],
    };
  });
