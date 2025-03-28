
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const UserManagement = () => {
  const [users] = useState([
    { id: 1, name: "Budi Santoso", email: "budi@example.com", role: "user", status: "Active", joined: "12 Apr 2023", transactions: 3 },
    { id: 2, name: "Admin User", email: "gueadmin", role: "admin", status: "Active", joined: "5 Jan 2023", transactions: 0 },
    { id: 3, name: "Siti Nurbaya", email: "siti@example.com", role: "user", status: "Active", joined: "23 May 2023", transactions: 1 },
    { id: 4, name: "Ahmad Hidayat", email: "ahmad@example.com", role: "user", status: "Inactive", joined: "7 Jun 2023", transactions: 0 },
    { id: 5, name: "Linda Wijaya", email: "linda@example.com", role: "user", status: "Active", joined: "19 Mar 2023", transactions: 2 }
  ]);
  
  const [transactionHistory] = useState([
    { id: 1, user: "Budi Santoso", property: "Vila Asri Bali", amount: "Rp 1,2 M", date: "15 Apr 2023", status: "Completed" },
    { id: 2, user: "Siti Nurbaya", property: "Kavling Premium Jakarta", amount: "Rp 800 Jt", date: "25 May 2023", status: "Processing" },
    { id: 3, user: "Budi Santoso", property: "Rumah Type 45 Bandung", amount: "Rp 500 Jt", date: "3 Jun 2023", status: "Completed" },
    { id: 4, user: "Linda Wijaya", property: "Kavling Strategis Yogyakarta", amount: "Rp 350 Jt", date: "22 Mar 2023", status: "Completed" },
    { id: 5, user: "Linda Wijaya", property: "Apartemen Mewah Surabaya", amount: "Rp 900 Jt", date: "8 Apr 2023", status: "Cancelled" },
    { id: 6, user: "Budi Santoso", property: "Rumah Minimalis Jakarta", amount: "Rp 750 Jt", date: "17 Jun 2023", status: "Processing" }
  ]);
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-6">Kelola Pengguna</h2>
        
        <div className="bg-white rounded-md shadow mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tanggal Bergabung</TableHead>
                <TableHead>Transaksi</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joined}</TableCell>
                  <TableCell>{user.transactions}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="destructive" size="sm">Hapus</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h3 className="text-lg font-semibold mb-4">Riwayat Transaksi</h3>
        <div className="bg-white rounded-md shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Pengguna</TableHead>
                <TableHead>Properti</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionHistory.map(transaction => (
                <TableRow key={transaction.id} className="hover:bg-gray-50">
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.user}</TableCell>
                  <TableCell>{transaction.property}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs 
                      ${transaction.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Detail</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
