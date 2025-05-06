
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock, ShoppingCart, Users } from "lucide-react";
import { ReactNode, useState, useEffect } from "react";

interface ActivityItem {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const RealTimeActivity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      icon: <Eye size={16} className="text-gray-500 mr-2" />,
      title: 'Pengunjung melihat halaman <span class="font-medium">Produk - Siap Huni</span>',
      subtitle: 'Dari Jakarta, 24 detik yang lalu'
    },
    {
      icon: <Clock size={16} className="text-gray-500 mr-2" />,
      title: 'Pengunjung menghabiskan <span class="font-medium">5 menit</span> di halaman Beranda',
      subtitle: 'Dari Surabaya, 2 menit yang lalu'
    },
    {
      icon: <ShoppingCart size={16} className="text-gray-500 mr-2" />,
      title: 'Pengunjung menambahkan properti ke <span class="font-medium">keranjang</span>',
      subtitle: 'Dari Bandung, 4 menit yang lalu'
    },
    {
      icon: <Users size={16} className="text-gray-500 mr-2" />,
      title: 'Pengguna baru <span class="font-medium">mendaftar</span>',
      subtitle: 'Dari Medan, 10 menit yang lalu'
    }
  ]);

  // Simulate update without causing flickering
  useEffect(() => {
    // Don't set up interval initially, add delay
    const initialDelay = setTimeout(() => {
      // Setup activity updates with staggered timing
      const interval = setInterval(() => {
        // Update one activity at a time to avoid full re-renders
        const randomIndex = Math.floor(Math.random() * activities.length);
        const updatedActivity = {...activities[randomIndex]};
        
        // Generate updated activity data
        const locations = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar'];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
        const randomTime = Math.floor(Math.random() * 30);
        updatedActivity.subtitle = `Dari ${randomLocation}, ${randomTime} detik yang lalu`;
        
        // Use a functional state update to avoid stale closures
        setActivities(currentActivities => {
          const newActivities = [...currentActivities];
          newActivities[randomIndex] = updatedActivity;
          return newActivities;
        });
      }, 15000); // Update every 15 seconds
      
      return () => {
        clearInterval(interval);
      };
    }, 5000); // Initial delay of 5 seconds
    
    return () => {
      clearTimeout(initialDelay);
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Aktivitas Real-time</CardTitle>
        <CardDescription>Pengunjung aktif saat ini: 42</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div 
              key={index} 
              className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md transition-all duration-500"
            >
              {activity.icon}
              <div className="flex-1">
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: activity.title }} />
                <p className="text-xs text-gray-500">{activity.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeActivity;
