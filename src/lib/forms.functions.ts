import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const waitlistSchema = z.object({
  email: z.string().trim().email().max(255),
  source: z.string().trim().max(80).optional(),
  // Honeypot: real visitors never fill this.
  company: z.string().max(200).optional(),
});

const enquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1).max(5000),
  company: z.string().max(200).optional(),
});

export type FormResult = { ok: boolean; message: string };

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => waitlistSchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) {
      return { ok: true, message: "You are on the list." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("waitlist").insert({
      email: data.email.toLowerCase(),
      source: data.source ?? null,
    });

    // 23505 = unique violation: the address is already on the list.
    if (error && error.code !== "23505") {
      console.error("waitlist insert failed", error);
      return {
        ok: false,
        message: "Something interrupted us. Please try again in a moment.",
      };
    }

    return {
      ok: true,
      message: "You are on the list. We will write to you before the first chapter.",
    };
  });

export const sendEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }): Promise<FormResult> => {
    if (data.company) {
      return { ok: true, message: "Your message has been received." };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      email: data.email.toLowerCase(),
      subject: data.subject ?? null,
      message: data.message,
    });

    if (error) {
      console.error("enquiry insert failed", error);
      return {
        ok: false,
        message: "Something interrupted us. Please write to ceo@odcorrect.in instead.",
      };
    }

    return {
      ok: true,
      message: "Your message has been received. We reply within three working days.",
    };
  });
