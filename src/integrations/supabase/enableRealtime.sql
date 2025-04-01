
-- Enable row level security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policies for properties
CREATE POLICY "Enable read access for all users" ON "public"."properties"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."properties"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only" ON "public"."properties"
AS PERMISSIVE FOR UPDATE
TO authenticated
USING (true);

-- Enable publication for realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.properties;
ALTER PUBLICATION supabase_realtime ADD TABLE public.settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.inquiries;

-- Enable replica identity
ALTER TABLE public.properties REPLICA IDENTITY FULL;
ALTER TABLE public.settings REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.inquiries REPLICA IDENTITY FULL;
