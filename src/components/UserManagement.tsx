import React, { useState, useEffect } from 'react';
import { MoreVertical, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useTranslation } from "react-i18next";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

const statusColor: Record<string, string> = {
  Active: 'bg-green-500/20 text-green-400',
  Inactive: 'bg-yellow-500/20 text-yellow-400',
  Suspended: 'bg-red-500/20 text-red-400',
};

const UserManagement: React.FC = () => {
    const { t } = useTranslation();
  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const usersList = userSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.displayName || data.name || 'Unknown',
            email: data.email || 'No Email',
            role: data.role || 'Explorer',
            status: data.status || 'Active',
          };
        });
        setUsers(usersList);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="glass rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-lg font-bold">{t('auto.auto_user_management_2895')}</h2>
        <p className="text-sm text-foreground/50 mt-1">{t('auto.auto_manage_all_users_in__2894')}</p>
      </div>

      {/* Toolbar */}
      <div className="p-4 flex items-center justify-between gap-4 border-b border-white/5">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder={t('auto.auto_filter_users____2893')}
          className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary w-full max-w-xs"
        />
        <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap">
          {t('auto.auto_add_user_2892')}
                          </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-foreground/40 uppercase text-xs tracking-widest">
                <th className="text-left px-6 py-3">{t('auto.auto_name_2891')}</th>
                <th className="text-left px-6 py-3">{t('auto.auto_email_2890')}</th>
                <th className="text-left px-6 py-3">{t('auto.auto_role_2889')}</th>
                <th className="text-left px-6 py-3">{t('auto.auto_status_2888')}</th>
                <th className="text-right px-6 py-3">{t('auto.auto_actions_2887')}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-foreground/60">{user.email}</td>
                  <td className="px-6 py-4 text-foreground/60">{user.role}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor[user.status] ?? ''}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-foreground/50 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-foreground/40">
                    {t('auto.auto_no_users_match_your__2886')}
                                                            </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
