import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin,
  Phone,
  Building,
  Search,
  Loader2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface VendorProfile {
  id: string;
  business_name: string | null;
  service_type: string | null;
  business_address: string | null;
  contact_number: string | null;
  service_cost: number | null;
  business_photos: string[] | null;
  status: string;
}

const Services = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { t } = useLanguage();
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredVendors, setFilteredVendors] = useState<VendorProfile[]>([]);

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = vendors.filter(vendor => {
        const searchLower = searchQuery.toLowerCase();
        return (
          vendor.business_name?.toLowerCase().includes(searchLower) ||
          vendor.service_type?.toLowerCase().includes(searchLower) ||
          vendor.business_address?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors(vendors);
    }
  }, [searchQuery, vendors]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('status', 'approved');

      if (error) throw error;

      setVendors(data || []);
      setFilteredVendors(data || []);
    } catch (error: any) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const VendorCard = ({ vendor }: { vendor: VendorProfile }) => {
    return (
      <Card className="service-card cursor-pointer group hover:border-accent hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {/* Business Photo */}
            {vendor.business_photos && vendor.business_photos.length > 0 && (
              <div className="w-full h-32 rounded-lg overflow-hidden">
                <img 
                  src={vendor.business_photos[0]} 
                  alt={vendor.business_name || 'Business'} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base text-foreground truncate">
                  {vendor.business_name || 'Unnamed Business'}
                </h3>
                <Badge variant="secondary" className="text-xs">
                  {vendor.service_type || 'Service'}
                </Badge>
              </div>
              
              {vendor.business_address && (
                <div className="flex items-start gap-1 text-xs text-muted-foreground mb-2">
                  <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <p className="line-clamp-2">{vendor.business_address}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3">
                {vendor.service_cost && (
                  <span className="font-semibold text-primary">
                    ₹{vendor.service_cost}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                {vendor.contact_number && (
                  <Button size="sm" className="flex-1 h-8 text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                )}
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            {searchQuery ? t('services.searchResults') : t('services.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {searchQuery 
              ? `"${searchQuery}"`
              : t('categories.description')
            }
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">{t('services.loading')}</span>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('services.noResults')}</h3>
          </div>
        )}

        {/* Services List */}
        {!loading && filteredVendors.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">{t('services.title')}</h2>
                <Badge className="bg-primary text-primary-foreground">
                  {filteredVendors.length} {filteredVendors.length === 1 ? 'service' : 'services'}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Services;
