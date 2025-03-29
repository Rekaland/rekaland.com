
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DeploymentStatus = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Status Deployment Terkini</CardTitle>
        <CardDescription>Informasi mengenai deployment website saat ini</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle className="text-green-500" size={24} />
            <div>
              <p className="font-medium">Website Online</p>
              <p className="text-sm text-gray-600">Terakhir dipublikasikan: 15 Jun 2023 13:45</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 border p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Domain</p>
              <p className="font-medium">rekaland.com</p>
            </div>
            <div className="bg-gray-50 border p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Versi</p>
              <p className="font-medium">v1.2.3</p>
            </div>
            <div className="bg-gray-50 border p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-1">Lingkungan</p>
              <p className="font-medium">Production</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeploymentStatus;
