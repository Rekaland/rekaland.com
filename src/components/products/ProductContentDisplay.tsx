
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Check, CheckCircle, Coffee, Info, LayoutGrid, ListChecks, Package } from 'lucide-react';
import { ProductContent } from '@/hooks/useProductContent';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductContentDisplayProps {
  content: ProductContent | null;
  loading?: boolean;
  error?: string | null;
}

export const ProductContentDisplay = ({ content, loading = false, error = null }: ProductContentDisplayProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-24 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-700 mb-1">Gagal memuat konten</h3>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-700 mb-1">Konten Belum Tersedia</h3>
            <p className="text-sm text-amber-600">
              Informasi detail untuk produk ini belum tersedia saat ini. Silakan hubungi kami untuk informasi lebih lanjut.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {content.description}
        </p>
      </div>

      <Tabs defaultValue="features" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="features" className="flex items-center gap-2">
            <CheckCircle size={16} />
            Fitur Unggulan
          </TabsTrigger>
          <TabsTrigger value="specifications" className="flex items-center gap-2">
            <ListChecks size={16} />
            Spesifikasi
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <LayoutGrid size={16} />
            Ikhtisar
          </TabsTrigger>
        </TabsList>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Fitur Unggulan</CardTitle>
              <CardDescription>Keunggulan dan fitur spesial dari produk ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.features && content.features.length > 0 ? (
                  content.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="rounded-full bg-green-100 p-1 mt-0.5">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">Belum ada fitur yang ditambahkan</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specifications">
          <Card>
            <CardHeader>
              <CardTitle>Spesifikasi Detail</CardTitle>
              <CardDescription>Informasi teknis tentang produk</CardDescription>
            </CardHeader>
            <CardContent>
              {content.specifications && Object.keys(content.specifications).length > 0 ? (
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(content.specifications).map(([key, value], index) => (
                    <div key={index} className="grid grid-cols-2 py-2 border-b last:border-0">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                      <span className="text-gray-600 dark:text-gray-400">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Belum ada spesifikasi yang ditambahkan</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Ikhtisar Produk</CardTitle>
              <CardDescription>Ringkasan informasi penting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Package size={18} className="text-orange-500" />
                    Informasi Produk
                  </h3>
                  <p className="text-sm leading-relaxed">{content.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Tag Produk</h3>
                  <div className="flex flex-wrap gap-2">
                    {content.features && content.features.slice(0, 4).map((feature, index) => (
                      <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 hover:bg-orange-100">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
