import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  author_id: string;
};

export type NewsletterSubscription = {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
};