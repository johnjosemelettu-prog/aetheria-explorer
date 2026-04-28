import React, { useState } from 'react';
import { CheckCircle, Clock, XCircle, CheckSquare } from 'lucide-react';

const statusStyle: Record<string,string> = {
  Confirmed: 'bg-blue-500/20 text-blue-400',
  Pending: 'bg-yellow-500/20 text-yellow-400',
  Completed: 'bg-green-500/20 text-green-400',
  Cancelled: 'bg-red-500/20 text-red-400',
};
const StatusIcon = ({ s }: { s: string }) => {
  if (s==='Confirmed') return <CheckCircle className="w-3 h-3"/>;
  if (s==='Pending') return <Clock className="w-3 h-3"/>;
  if (s==='Completed') return <CheckSquare className="w-3 h-3"/>;
  return <XCircle className="w-3 h-3"/>;
};

const initial = [
  { id:'b1', service:'Culinary Time Machine', user:'ExplorerAlice', date:'2026-04-28', status:'Confirmed' },
  { id:'b2', service:'AR Ghost Tours', user:'TravelerBob', date:'2026-04-29', status:'Pending' },
  { id:'b3', service:'AI Dream Trip Planner', user:'WandererCharlie', date:'2026-04-30', status:'Completed' },
  { id:'b4', service:'VR Pre-Trip Scout', user:'SoloSam', date:'2026-05-01', status:'Confirmed' },
  { id:'b5', service:'Local Hero Connect', user:'AdventurerEve', date:'2026-05-02', status:'Cancelled' },
];

const BookingManager: React.FC = () => {
  const [bookings, setBookings] = useState(initial);
  const fulfill = (id: string) => setBookings(bs => bs.map(b => b.id===id ? { ...b, status:'Completed' } : b));
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5">
        <h2 className="text-lg font-bold">Booking & Fulfillment Center</h2>
        <p className="text-sm text-foreground/50 mt-1">Manage bookings and fulfillment status.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-foreground/40 text-xs uppercase tracking-widest">
            <th className="text-left px-6 py-3">Service</th><th className="text-left px-6 py-3">User</th><th className="text-left px-6 py-3">Date</th><th className="text-left px-6 py-3">Status</th><th className="text-right px-6 py-3">Action</th>
          </tr></thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors">
                <td className="px-6 py-4 font-medium">{b.service}</td>
                <td className="px-6 py-4 text-foreground/60">{b.user}</td>
                <td className="px-6 py-4 text-foreground/40">{b.date}</td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 w-fit px-2 py-1 rounded-full text-xs font-semibold ${statusStyle[b.status]}`}>
                    <StatusIcon s={b.status}/>{b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {b.status !== 'Completed' && b.status !== 'Cancelled' &&
                    <button onClick={()=>fulfill(b.id)} className="px-3 py-1.5 border border-white/10 text-xs font-semibold rounded-lg hover:bg-white/10 transition-colors">Fulfill</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BookingManager;
