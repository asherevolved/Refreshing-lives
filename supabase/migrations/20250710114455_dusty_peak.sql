/*
  # Create newsletter subscriptions table

  1. New Tables
    - `newsletter_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, required)
      - `subscribed_at` (timestamp)
      - `is_active` (boolean, default true)

  2. Security
    - Enable RLS on `newsletter_subscriptions` table
    - Add policy for public to subscribe
    - Add policy for authenticated users to manage subscriptions
*/

CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for public to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for authenticated users to manage subscriptions
CREATE POLICY "Authenticated users can manage subscriptions"
  ON newsletter_subscriptions
  FOR ALL
  TO authenticated
  USING (true);