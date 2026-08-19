CREATE TABLE public.waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX waitlist_email_key ON public.waitlist (lower(email));

CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist TO anon, authenticated;
GRANT ALL ON public.waitlist TO service_role;
GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the waitlist"
  ON public.waitlist FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(email) BETWEEN 3 AND 255
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );

CREATE POLICY "Anyone can send an enquiry"
  ON public.enquiries FOR INSERT TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 255
    AND email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND char_length(message) BETWEEN 1 AND 5000
    AND (subject IS NULL OR char_length(subject) <= 200)
  );