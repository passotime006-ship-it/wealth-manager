-- SQL to create tables and enable RLS

-- Make sure we are in public schema
SET search_path TO public,pg_temp;

-- income table
CREATE TABLE IF NOT EXISTS public.income (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  amount numeric(12,2) NOT NULL,
  source text NOT NULL,
  received_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- expenses table
CREATE TABLE IF NOT EXISTS public.expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  amount numeric(12,2) NOT NULL,
  description text NOT NULL,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- holdings table
CREATE TABLE IF NOT EXISTS public.holdings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  symbol text NOT NULL,
  shares bigint NOT NULL,
  bought_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- twelve_data_feed table
CREATE TABLE IF NOT EXISTS public.twelve_data_feed (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  stock_symbol text NOT NULL,
  last_updated timestamptz DEFAULT now(),
  last_api_call timestamptz
);

-- balance table
CREATE TABLE IF NOT EXISTS public.balance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  usd_value numeric(12,2) DEFAULT 0 NOT NULL,
  date timestamptz DEFAULT now()
);

-- Enable row level security on each table
ALTER TABLE public.income ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.twelve_data_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.balance ENABLE ROW LEVEL SECURITY;

-- Policies allowing only owner to modify rows (using pg_class for table lookup)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policy p JOIN pg_class c ON p.polrelid = c.oid WHERE c.relname = 'income' AND p.polname = 'user_can_modify_incomes') THEN
    CREATE POLICY "user_can_modify_incomes" ON public.income USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policy p JOIN pg_class c ON p.polrelid = c.oid WHERE c.relname = 'expenses' AND p.polname = 'user_can_modify_expenses') THEN
    CREATE POLICY "user_can_modify_expenses" ON public.expenses USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policy p JOIN pg_class c ON p.polrelid = c.oid WHERE c.relname = 'holdings' AND p.polname = 'user_can_modify_holdings') THEN
    CREATE POLICY "user_can_modify_holdings" ON public.holdings USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policy p JOIN pg_class c ON p.polrelid = c.oid WHERE c.relname = 'twelve_data_feed' AND p.polname = 'user_can_modify_twelve_feed') THEN
    CREATE POLICY "user_can_modify_twelve_feed" ON public.twelve_data_feed USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM pg_policy p JOIN pg_class c ON p.polrelid = c.oid WHERE c.relname = 'balance' AND p.polname = 'user_can_modify_balance') THEN
    CREATE POLICY "user_can_modify_balance" ON public.balance USING (auth.uid() = user_id);
  END IF;
END$$;