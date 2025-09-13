import { 
  Wrench, 
  ShoppingBag, 
  GraduationCap, 
  Home, 
  Car, 
  Utensils, 
  Stethoscope,
  Scissors,
  Wheat,
  Coffee,
  Shirt,
  MapPin,
  Phone,
  Star,
  Users,
  Building,
  TreePine,
  Flower,
  Fish,
  Hammer,
  PaintBucket,
  Camera,
  Music,
  Baby,
  HeartHandshake,
  Truck
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';

const Services = () => {
  const cityServices = [
    {
      id: 'plumber',
      name: 'Plumber',
      nameHindi: 'प्लंबर',
      icon: Wrench,
      description: 'Pipes, leaks, repairs',
      rating: 4.5,
      providers: 23,
      avgPrice: '₹300-800'
    },
    {
      id: 'electrician',
      name: 'Electrician',
      nameHindi: 'इलेक्ट्रीशियन',
      icon: Home,
      description: 'Wiring, appliances, repairs',
      rating: 4.3,
      providers: 18,
      avgPrice: '₹400-1000'
    },
    {
      id: 'kirani',
      name: 'Kirana Store',
      nameHindi: 'किराना दुकान',
      icon: ShoppingBag,
      description: 'Groceries, daily needs',
      rating: 4.2,
      providers: 45,
      avgPrice: '₹50-500'
    },
    {
      id: 'tutor',
      name: 'Home Tutor',
      nameHindi: 'गृह शिक्षक',
      icon: GraduationCap,
      description: 'Home tutoring, classes',
      rating: 4.6,
      providers: 32,
      avgPrice: '₹200-800/hr'
    },
    {
      id: 'doctor',
      name: 'Doctor',
      nameHindi: 'डॉक्टर',
      icon: Stethoscope,
      description: 'General practice, consultation',
      rating: 4.7,
      providers: 12,
      avgPrice: '₹200-500'
    },
    {
      id: 'mechanic',
      name: 'Auto Mechanic',
      nameHindi: 'मैकेनिक',
      icon: Car,
      description: 'Vehicle repairs, maintenance',
      rating: 4.1,
      providers: 15,
      avgPrice: '₹500-2000'
    },
    {
      id: 'tailor',
      name: 'Tailor',
      nameHindi: 'दर्जी',
      icon: Scissors,
      description: 'Clothing alteration, stitching',
      rating: 4.4,
      providers: 28,
      avgPrice: '₹100-500'
    },
    {
      id: 'chai-shop',
      name: 'Chai Shop',
      nameHindi: 'चाय की दुकान',
      icon: Coffee,
      description: 'Tea, snacks, local gathering',
      rating: 4.3,
      providers: 67,
      avgPrice: '₹10-50'
    },
    {
      id: 'carpenter',
      name: 'Carpenter',
      nameHindi: 'बढ़ई',
      icon: Hammer,
      description: 'Furniture, wood work',
      rating: 4.2,
      providers: 19,
      avgPrice: '₹300-1500'
    },
    {
      id: 'painter',
      name: 'House Painter',
      nameHindi: 'रंगसाज़',
      icon: PaintBucket,
      description: 'Interior, exterior painting',
      rating: 4.0,
      providers: 14,
      avgPrice: '₹15-30/sqft'
    },
    {
      id: 'photographer',
      name: 'Photographer',
      nameHindi: 'फोटोग्राफर',
      icon: Camera,
      description: 'Events, portraits, occasions',
      rating: 4.5,
      providers: 8,
      avgPrice: '₹2000-8000'
    },
    {
      id: 'music-teacher',
      name: 'Music Teacher',
      nameHindi: 'संगीत शिक्षक',
      icon: Music,
      description: 'Vocal, instruments, classes',
      rating: 4.6,
      providers: 11,
      avgPrice: '₹300-600/hr'
    }
  ];

  const ruralServices = [
    {
      id: 'farmer',
      name: 'Local Farmer',
      nameHindi: 'किसान',
      icon: Wheat,
      description: 'Fresh produce, vegetables',
      rating: 4.8,
      providers: 34,
      avgPrice: '₹20-100/kg'
    },
    {
      id: 'dairy',
      name: 'Dairy Products',
      nameHindi: 'डेयरी उत्पाद',
      icon: Coffee,
      description: 'Fresh milk, curd, ghee',
      rating: 4.7,
      providers: 21,
      avgPrice: '₹50-200'
    },
    {
      id: 'local-farm',
      name: 'Organic Farm',
      nameHindi: 'जैविक खेत',
      icon: TreePine,
      description: 'Organic vegetables, fruits',
      rating: 4.9,
      providers: 16,
      avgPrice: '₹30-150/kg'
    },
    {
      id: 'bangle-shop',
      name: 'Bangle Shop',
      nameHindi: 'चूड़ी की दुकान',
      icon: Flower,
      description: 'Traditional bangles, jewelry',
      rating: 4.4,
      providers: 12,
      avgPrice: '₹20-200'
    },
    {
      id: 'local-food',
      name: 'Local Food',
      nameHindi: 'स्थानीय भोजन',
      icon: Utensils,
      description: 'Traditional cuisine, snacks',
      rating: 4.6,
      providers: 25,
      avgPrice: '₹30-150'
    },
    {
      id: 'fisherman',
      name: 'Fresh Fish',
      nameHindi: 'ताज़ी मछली',
      icon: Fish,
      description: 'Daily catch, fresh seafood',
      rating: 4.5,
      providers: 8,
      avgPrice: '₹100-400/kg'
    },
    {
      id: 'village-cook',
      name: 'Village Cook',
      nameHindi: 'गाँव का रसोइया',
      icon: Utensils,
      description: 'Traditional cooking, events',
      rating: 4.7,
      providers: 9,
      avgPrice: '₹200-500'
    },
    {
      id: 'midwife',
      name: 'Midwife/Nurse',
      nameHindi: 'दाई/नर्स',
      icon: Baby,
      description: 'Healthcare, delivery care',
      rating: 4.8,
      providers: 6,
      avgPrice: '₹500-1500'
    },
    {
      id: 'village-elder',
      name: 'Village Elder',
      nameHindi: 'गाँव के बुजुर्ग',
      icon: HeartHandshake,
      description: 'Guidance, dispute resolution',
      rating: 4.9,
      providers: 4,
      avgPrice: 'Donations'
    },
    {
      id: 'transport',
      name: 'Local Transport',
      nameHindi: 'स्थानीय परिवहन',
      icon: Truck,
      description: 'Goods transport, taxi service',
      rating: 4.2,
      providers: 13,
      avgPrice: '₹100-800'
    }
  ];

  const ServiceCard = ({ service, type }: { service: any, type: 'city' | 'rural' }) => {
    const Icon = service.icon;
    return (
      <Card className="service-card cursor-pointer group hover:border-accent hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform ${
              type === 'city' ? 'bg-primary/10' : 'bg-accent/10'
            }`}>
              <Icon className={`w-6 h-6 ${type === 'city' ? 'text-primary' : 'text-accent'}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-sm text-foreground truncate">{service.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {type === 'city' ? 'City' : 'Rural'}
                </Badge>
              </div>
              
              <p className="text-xs text-accent font-medium mb-1">{service.nameHindi}</p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{service.description}</p>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{service.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-muted-foreground" />
                    <span>{service.providers}</span>
                  </div>
                </div>
                <span className="font-medium text-primary">{service.avgPrice}</span>
              </div>
              
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="flex-1 h-7 text-xs">
                  <Phone className="w-3 h-3 mr-1" />
                  Contact
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  <MapPin className="w-3 h-3" />
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
            All Services
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover trusted local service providers in your area. 
            From city conveniences to rural specialties, find what you need.
          </p>
        </div>

        {/* City Services */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Building className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">City Services</h2>
            <Badge className="bg-primary text-primary-foreground">
              {cityServices.length} services
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cityServices.map((service) => (
              <ServiceCard key={service.id} service={service} type="city" />
            ))}
          </div>
        </section>

        {/* Rural Services */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <TreePine className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Rural & Traditional Services</h2>
            <Badge className="bg-accent text-accent-foreground">
              {ruralServices.length} services
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ruralServices.map((service) => (
              <ServiceCard key={service.id} service={service} type="rural" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Services;