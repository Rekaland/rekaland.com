
import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UsePropertySyncProps {
  onUpdate?: () => void;
}

export const usePropertySync = ({ onUpdate }: UsePropertySyncProps = {}) => {
  // Use refs to maintain stable channel references
  const propertiesChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const productContentsChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const onUpdateRef = useRef(onUpdate);

  // Update refs when dependencies change
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  // Setup subscription for both tables
  useEffect(() => {
    // Properties table subscription
    const propertiesChannel = supabase
      .channel('properties-sync-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'properties' }, 
        (payload) => {
          console.log('Property change detected:', payload);
          if (onUpdateRef.current) {
            onUpdateRef.current();
          }
        }
      )
      .subscribe();
      
    propertiesChannelRef.current = propertiesChannel;
    
    // Product contents table subscription
    const productContentsChannel = supabase
      .channel('product-contents-sync-channel')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'product_contents' }, 
        (payload) => {
          console.log('Product content change detected:', payload);
          if (onUpdateRef.current) {
            onUpdateRef.current();
          }
        }
      )
      .subscribe();
      
    productContentsChannelRef.current = productContentsChannel;
    
    // Cleanup function
    return () => {
      if (propertiesChannelRef.current) {
        supabase.removeChannel(propertiesChannelRef.current);
      }
      if (productContentsChannelRef.current) {
        supabase.removeChannel(productContentsChannelRef.current);
      }
    };
  }, []);

  // Function to sync a property with product_contents
  const syncPropertyWithContent = async (propertyId: string) => {
    try {
      // Get the property
      const { data: propertyData, error: propertyError } = await supabase
        .from('properties')
        .select('*')
        .eq('id', propertyId)
        .single();
        
      if (propertyError) throw propertyError;
      
      // Check if there's an existing product_content for this property
      const { data: contentData, error: contentError } = await supabase
        .from('product_contents')
        .select('*')
        .eq('product_id', propertyId);
        
      if (contentError) throw contentError;
      
      if (contentData && contentData.length > 0) {
        // Update existing content
        await supabase
          .from('product_contents')
          .update({
            title: propertyData.title,
            description: propertyData.description,
            updated_at: new Date().toISOString()
          })
          .eq('product_id', propertyId);
      } else {
        // Create new content
        await supabase
          .from('product_contents')
          .insert({
            title: propertyData.title,
            description: propertyData.description,
            product_id: propertyId
          });
      }
      
      return true;
    } catch (error) {
      console.error('Error syncing property with content:', error);
      return false;
    }
  };

  return { syncPropertyWithContent };
};
