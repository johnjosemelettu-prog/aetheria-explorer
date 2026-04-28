
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MoreVertical } from 'lucide-react';

const mockUsers = [
  { id: 'user_1', name: 'Alice', email: 'alice@example.com', role: 'Explorer', status: 'Active' },
  { id: 'user_2', name: 'Bob', email: 'bob@example.com', role: 'Partner', status: 'Active' },
  { id: 'user_3', name: 'Charlie', email: 'charlie@example.com', role: 'Admin', status: 'Inactive' },
  { id: 'user_4', name: 'David', email: 'david@example.com', role: 'Explorer', status: 'Active' },
  { id: 'user_5', name: 'Eve', email: 'eve@example.com', role: 'Partner', status: 'Suspended' },
];

const UserManagement: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage all users in the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center justify-between">
                    <Input placeholder="Filter users..." className="max-w-sm" />
                    <Button>Add User</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        user.status === 'Active' ? 'bg-green-100 text-green-800' :
                                        user.status === 'Inactive' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {user.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default UserManagement;
