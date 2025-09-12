import { Wrench, ShoppingBag, GraduationCap, Home, Car, Utensils } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ServiceCategories = () => {
  const categories = [
    {
      id: 'plumber',
      name: 'Plumber',
      nameHindi: 'प्लंबर',
      icon: Wrench,
      description: 'Pipes, leaks, repairs',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'kirani',
      name: 'Kirani Store',
      nameHindi: 'किराना दुकान', 
      icon: ShoppingBag,
      description: 'Groceries, daily needs',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'tutor',
      name: 'Tutor',
      nameHindi: 'शिक्षक',
      icon: GraduationCap,
      description: 'Home tutoring, classes',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'electrician',
      name: 'Electrician',
      nameHindi: 'इलेक्ट्रीशियन',
      icon: Home,
      description: 'Wiring, appliances',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 'mechanic',
      name: 'Mechanic',
      nameHindi: 'मैकेनिक',
      icon: Car,
      description: 'Vehicle repairs',
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      id: 'cook',
      name: 'Cook',
      nameHindi: 'खाना बनाने वाला',
      icon: Utensils,
      description: 'Home cooking, catering',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Popular Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find trusted local service providers in your neighborhood. 
          All verified and rated by your community.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Card 
              key={category.id} 
              className="service-card cursor-pointer group hover:border-accent"
            >
              <CardContent className="p-4 text-center">
                <div className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-accent font-medium mb-2">{category.nameHindi}</p>
                <p className="text-xs text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceCategories;