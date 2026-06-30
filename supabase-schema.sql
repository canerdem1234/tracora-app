-- ============================================
-- TRACORA - Güvenli Veritabanı Şeması
-- Supabase SQL Editor'da çalıştır
-- ============================================

-- 1. Abonelikler tablosu
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  plan text NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'starter', 'pro', 'agency')),
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  current_period_end timestamptz,
  query_limit_daily integer NOT NULL DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Markalar tablosu
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL CHECK (char_length(name) <= 100),
  keywords text[] NOT NULL DEFAULT '{}' CHECK (array_length(keywords, 1) <= 10),
  competitors text[] NOT NULL DEFAULT '{}' CHECK (array_length(competitors, 1) <= 5),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. AI Sorguları tablosu
CREATE TABLE IF NOT EXISTS queries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_id uuid REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
  ai_engine text NOT NULL CHECK (ai_engine IN ('chatgpt', 'perplexity', 'gemini', 'claude', 'grok')),
  prompt text NOT NULL CHECK (char_length(prompt) <= 500),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- 4. Sorgu Sonuçları tablosu
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query_id uuid REFERENCES queries(id) ON DELETE CASCADE NOT NULL UNIQUE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ai_response text,
  brand_mentioned boolean DEFAULT false,
  mention_count integer DEFAULT 0,
  sentiment text CHECK (sentiment IN ('positive', 'neutral', 'negative', null)),
  created_at timestamptz DEFAULT now()
);

-- 5. Audit log tablosu (kritik aksiyonlar)
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource text,
  details jsonb,
  ip_address text,
  created_at timestamptz DEFAULT now()
);

-- ============================================
-- INDEXLER (RLS performansı + hız)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_brands_user_id ON brands(user_id);
CREATE INDEX IF NOT EXISTS idx_queries_user_id ON queries(user_id);
CREATE INDEX IF NOT EXISTS idx_queries_brand_id ON queries(brand_id);
CREATE INDEX IF NOT EXISTS idx_results_user_id ON results(user_id);
CREATE INDEX IF NOT EXISTS idx_results_query_id ON results(query_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Kullanıcılar SADECE kendi verilerini görebilir
-- ============================================
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Subscriptions politikaları
CREATE POLICY "Kullanıcı kendi aboneliğini görebilir"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi aboneliğini oluşturabilir"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Brands politikaları
CREATE POLICY "Kullanıcı kendi markalarını görebilir"
  ON brands FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi markalarını oluşturabilir"
  ON brands FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi markalarını güncelleyebilir"
  ON brands FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi markalarını silebilir"
  ON brands FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Queries politikaları
CREATE POLICY "Kullanıcı kendi sorgularını görebilir"
  ON queries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Kullanıcı kendi sorgusunu oluşturabilir"
  ON queries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Results politikaları
CREATE POLICY "Kullanıcı kendi sonuçlarını görebilir"
  ON results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Audit logs - sadece service role yazabilir, kullanıcı sadece kendi loglarını görebilir
CREATE POLICY "Kullanıcı kendi audit loglarını görebilir"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ============================================
-- OTOMATİK ABONELİK: Yeni kullanıcı kayıt olunca free plan oluştur
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status, query_limit_daily)
  VALUES (NEW.id, 'free', 'active', 10);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();

-- ============================================
-- updated_at OTOMATİK GÜNCELLEME
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_brands_updated_at
  BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
