/*
# Create contact messages table

1. New Tables
- `contact_messages` stores messages submitted through the public church contact form.
- `id` is the generated unique identifier.
- `name`, `email`, `phone`, and `message` contain visitor-provided contact details.
- `created_at` records when the message was received.

2. Security
- Row level security is enabled.
- Anonymous and signed-in visitors may submit messages, but cannot read, update, or delete them.
- The public insert policy is intentionally limited to this single-tenant contact form.
- No public read access is granted because messages are private church correspondence.
*/

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.contact_messages TO anon, authenticated;

DROP POLICY IF EXISTS "Public can submit contact messages" ON public.contact_messages;
CREATE POLICY "Public can submit contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(name) BETWEEN 1 AND 120
    AND char_length(email) BETWEEN 3 AND 320
    AND char_length(message) BETWEEN 1 AND 5000
    AND (phone IS NULL OR char_length(phone) <= 40)
  );