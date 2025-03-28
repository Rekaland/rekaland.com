
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Clock, ShoppingCart, Users } from "lucide-react";
import { ReactNode } from "react";

interface ActivityItem {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

const RealTimeActivity = () => {
  const activities: ActivityItem[] = [
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
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Aktivitas Real-time</CardTitle>
        <CardDescription>Pengunjung aktif saat ini: 42</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
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
