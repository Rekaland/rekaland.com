
import React from "react";
import { Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type TableName = "properties" | "profiles" | "inquiries";
export type TableStatus = "pending" | "checking" | "available" | "unavailable";

export interface TableInfo {
  name: TableName;
  status: TableStatus;
}

interface ConnectedTablesStatusProps {
  tables: TableInfo[];
}

const ConnectedTablesStatus = ({ tables }: ConnectedTablesStatusProps) => {
  return (
    <div className="space-y-2">
      <Label>Tabel yang terhubung</Label>
      <div className="space-y-2">
        {tables.map((table) => (
          <div key={table.name} className="flex items-center justify-between p-3 bg-gray-50 border rounded">
            <div className="flex items-center gap-2">
              <Database size={16} />
              <span>{table.name}</span>
            </div>
            <Badge variant="outline" className={cn(
              table.status === "available" ? "bg-green-50" : 
              table.status === "checking" ? "bg-blue-50" : 
              "bg-red-50"
            )}>
              {table.status === "available" ? "Tersedia" : 
               table.status === "checking" ? "Memeriksa..." : 
               "Tidak tersedia"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConnectedTablesStatus;
