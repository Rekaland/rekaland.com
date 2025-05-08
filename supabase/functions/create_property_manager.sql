

-- Function to create a property manager
CREATE OR REPLACE FUNCTION public.create_property_manager(
  p_user_id UUID,
  p_full_name TEXT,
  p_email TEXT,
  p_phone TEXT,
  p_region TEXT,
  p_company TEXT
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert the property manager record
  INSERT INTO public.property_managers (
    user_id,
    full_name,
    email,
    phone,
    region,
    company,
    status,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    p_full_name,
    p_email,
    p_phone,
    p_region,
    p_company,
    'pending', -- Default status is pending
    now(),
    now()
  );
END;
$$;

