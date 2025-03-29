
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">Hubungi Kami</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <MapPin size={32} className="text-rekaland-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alamat</h3>
              <p className="text-center text-gray-600">Jl. Rekaland No. 123, Jakarta Selatan, Indonesia</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <Phone size={32} className="text-rekaland-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Telepon</h3>
              <p className="text-center text-gray-600">+62 21 1234 5678</p>
              <p className="text-center text-gray-600">+62 812 3456 7890</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex flex-col items-center justify-center pt-6">
              <Mail size={32} className="text-rekaland-orange mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-center text-gray-600">info@rekaland.com</p>
              <p className="text-center text-gray-600">sales@rekaland.com</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Kirim Pesan</CardTitle>
              <CardDescription>Isi formulir di bawah ini untuk mengirim pesan kepada kami.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name">Nama</label>
                    <Input id="name" placeholder="Nama lengkap Anda" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email">Email</label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject">Subjek</label>
                  <Input id="subject" placeholder="Subjek pesan Anda" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Pesan</label>
                  <Textarea id="message" placeholder="Tulis pesan Anda di sini..." rows={5} />
                </div>
                <Button className="w-full bg-rekaland-orange hover:bg-orange-600">Kirim Pesan</Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Jam Operasional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Clock className="text-rekaland-orange" />
                  <div>
                    <p className="font-medium">Senin - Jumat</p>
                    <p className="text-gray-600">08:00 - 17:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-rekaland-orange" />
                  <div>
                    <p className="font-medium">Sabtu</p>
                    <p className="text-gray-600">09:00 - 15:00 WIB</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-rekaland-orange" />
                  <div>
                    <p className="font-medium">Minggu & Hari Libur</p>
                    <p className="text-gray-600">Tutup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lokasi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Peta Lokasi</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
