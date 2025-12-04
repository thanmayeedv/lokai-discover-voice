import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin,
  Phone,
  Building,
  Search,
  Loader2,
  Navigation,
  Sparkles,
  Star,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useLanguage } from '@/hooks/useLanguage';
import { useGeolocation } from '@/hooks/useGeolocation';
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

interface AIRecommendations {
  featured: string[];
  categories: Record<string, string[]>;
  insights: string;
  nearbyTip: string;
}

const Services = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { t, language } = useLanguage();
  const { latitude, longitude, loading: locationLoading, error: locationError, requestLocation, permissionDenied } = useGeolocation();
  
  const [vendors, setVendors] = useState<VendorProfile[]>([]);
  const [translatedVendors, setTranslatedVendors] = useState<VendorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [translating, setTranslating] = useState(false);
  const [filteredVendors, setFilteredVendors] = useState<VendorProfile[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendations | null>(null);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);

  useEffect(() => {
    fetchVendors();
    // Auto-request location on mount
    requestLocation();
  }, []);

  // Fetch AI recommendations when vendors and location are available
  useEffect(() => {
    if (vendors.length > 0 && !searchQuery) {
      fetchRecommendations();
    }
  }, [vendors, latitude, longitude, language]);

  // Translate vendors when language changes
  useEffect(() => {
    if (vendors.length > 0) {
      translateVendors(vendors);
    }
  }, [language, vendors]);

  useEffect(() => {
    const vendorsToFilter = translatedVendors.length > 0 ? translatedVendors : vendors;
    if (searchQuery) {
      const filtered = vendorsToFilter.filter(vendor => {
        const searchLower = searchQuery.toLowerCase();
        return (
          vendor.business_name?.toLowerCase().includes(searchLower) ||
          vendor.service_type?.toLowerCase().includes(searchLower) ||
          vendor.business_address?.toLowerCase().includes(searchLower)
        );
      });
      setFilteredVendors(filtered);
    } else {
      setFilteredVendors(vendorsToFilter);
    }
  }, [searchQuery, translatedVendors, vendors]);

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendor_profiles')
        .select('*')
        .eq('status', 'approved');

      if (error) throw error;
      setVendors(data || []);
    } catch (error: any) {
      console.error('Error fetching vendors:', error);
      toast.error('Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    if (vendors.length === 0) return;
    
    try {
      setLoadingRecommendations(true);
      const response = await supabase.functions.invoke('search-services', {
        body: {
          action: 'get-recommendations',
          language,
          vendors,
          userLocation: latitude && longitude ? { latitude, longitude } : null,
        },
      });

      if (response.error) throw response.error;
      setRecommendations(response.data?.recommendations || null);
    } catch (error) {
      console.error('Recommendations error:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const translateVendors = async (vendorList: VendorProfile[]) => {
    if (language === 'en-US' || vendorList.length === 0) {
      setTranslatedVendors(vendorList);
      return;
    }

    try {
      setTranslating(true);
      const response = await supabase.functions.invoke('search-services', {
        body: {
          action: 'translate-vendors',
          language,
          vendors: vendorList,
        },
      });

      if (response.error) throw response.error;
      setTranslatedVendors(response.data?.translatedVendors || vendorList);
    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedVendors(vendorList);
    } finally {
      setTranslating(false);
    }
  };

  const getFeaturedVendors = () => {
    if (!recommendations?.featured) return [];
    const vendorList = translatedVendors.length > 0 ? translatedVendors : vendors;
    return recommendations.featured
      .map(id => vendorList.find(v => v.id === id))
      .filter(Boolean) as VendorProfile[];
  };

  const VendorCard = ({ vendor, isFeatured = false }: { vendor: VendorProfile; isFeatured?: boolean }) => {
    return (
      <Card className={`service-card cursor-pointer group hover:border-accent hover:shadow-lg transition-all duration-300 ${isFeatured ? 'ring-2 ring-primary/30 bg-primary/5' : ''}`}>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3">
            {isFeatured && (
              <div className="flex items-center gap-1 text-primary text-xs font-medium">
                <Star className="w-3 h-3 fill-current" />
                <span>Recommended</span>
              </div>
            )}
            
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

  const featuredVendors = getFeaturedVendors();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
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

        {/* Location Status Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {latitude && longitude ? (
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
              <Navigation className="w-4 h-4 text-green-500" />
              <span className="text-sm">Location detected</span>
            </Badge>
          ) : locationLoading ? (
            <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Detecting location...</span>
            </Badge>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={requestLocation}
              className="flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              {permissionDenied ? 'Enable location for better results' : 'Detect my location'}
            </Button>
          )}
          
          {recommendations && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={fetchRecommendations}
              disabled={loadingRecommendations}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loadingRecommendations ? 'animate-spin' : ''}`} />
              Refresh recommendations
            </Button>
          )}
        </div>

        {/* AI Insights */}
        {recommendations && !searchQuery && (
          <Card className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">AI Insights</h3>
                  <p className="text-muted-foreground mb-2">{recommendations.insights}</p>
                  <p className="text-sm text-primary">{recommendations.nearbyTip}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        {(loading || translating) && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">
              {translating ? t('voice.searching') : t('services.loading')}
            </span>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredVendors.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t('services.noResults')}</h3>
          </div>
        )}

        {/* Featured Recommendations */}
        {!loading && !searchQuery && featuredVendors.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-primary fill-primary" />
              <h2 className="text-2xl font-bold">Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} isFeatured />
              ))}
            </div>
          </section>
        )}

        {/* All Services List */}
        {!loading && filteredVendors.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Building className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">
                  {searchQuery ? t('services.searchResults') : 'All Services'}
                </h2>
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
