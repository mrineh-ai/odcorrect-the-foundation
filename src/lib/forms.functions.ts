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

    const email = data.email.toLowerCase();

    const { data: inserted, error } = await supabaseAdmin
      .from("waitlist")
      .insert({
        email,
        source: data.source ?? null,
      })
      .select("id")
      .maybeSingle();

    // 23505 = unique violation: the address is already on the list.
    if (error && error.code !== "23505") {
      console.error("waitlist insert failed", error);
      return {
        ok: false,
        message: "Something interrupted us. Please try again in a moment.",
      };
    }

    // Only welcome genuinely new entries; a repeat submission stays silent.
    if (!error && inserted) {
      try {
        const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
        await sendTemplateEmail("waitlist-welcome", email, {
          idempotencyKey: `waitlist-welcome-${inserted.id}`,
        });
      } catch (emailError) {
        console.error("waitlist welcome email failed", emailError);
      }
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

    const email = data.email.toLowerCase();

    const { data: inserted, error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        name: data.name,
        email,
        subject: data.subject ?? null,
        message: data.message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("enquiry insert failed", error);
      return {
        ok: false,
        message: "Something interrupted us. Please write to ceo@odcorrect.in instead.",
      };
    }

    try {
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      const receivedAt = new Date().toLocaleString("en-IN", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Kolkata",
      });

      // Alert the house, then acknowledge the sender.
      await sendTemplateEmail("enquiry-notification", "ceo@odcorrect.in", {
        templateData: {
          name: data.name,
          email,
          subject: data.subject ?? "",
          message: data.message,
          receivedAt: `${receivedAt} IST`,
        },
        idempotencyKey: `enquiry-notification-${inserted.id}`,
        replyTo: email,
      });

      await sendTemplateEmail("enquiry-confirmation", email, {
        templateData: { name: data.name, message: data.message },
        idempotencyKey: `enquiry-confirmation-${inserted.id}`,
        replyTo: "ceo@odcorrect.in",
      });
    } catch (emailError) {
      // The enquiry is safely stored; a delivery problem must not break the form.
      console.error("enquiry email failed", emailError);
    }

    return {
      ok: true,
      message: "Your message has been received. We reply within three working days.",
    };
  });
