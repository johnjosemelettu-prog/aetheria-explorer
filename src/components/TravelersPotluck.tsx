import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, CalendarPlus2, Users } from 'lucide-react';

export default function TravelersPotluck() {
  return (
    <div className="min-h-screen bg-orange-50 text-orange-950 p-8">
       <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-6xl font-display font-black text-orange-600 tracking-tighter mix-blend-multiply flex items-center gap-4">
              <Utensils className="w-12 h-12 text-orange-500" />
              The Potluck
            </h1>
            <p className="text-orange-900/60 font-mono mt-4 text-sm max-w-xl">
               Missing home-cooked meals? Organize or join a potluck with fellow travelers at a local park or Airbnb.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-white p-8 rounded-3xl border border-orange-200 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <div className="text-4xl text-orange-200/50 rotate-12"><CalendarPlus2/></div>
                </div>
                <h2 className="text-2xl font-bold mb-6 text-orange-900 border-b border-orange-100 pb-4">Host a Gather</h2>
                <div className="space-y-4 font-mono text-sm">
                   <div>
                     <label className="block text-orange-600 font-bold mb-1 text-xs">LOCATION</label>
                     <input type="text" className="w-full bg-orange-50 border border-orange-200 rounded p-2 text-orange-900" value="Yoyogi Park, Tokyo" readOnly />
                   </div>
                   <div>
                     <label className="block text-orange-600 font-bold mb-1 text-xs">THEME (OPTIONAL)</label>
                     <input type="text" className="w-full bg-orange-50 border border-orange-200 rounded p-2 text-orange-900" placeholder="e.g. Comfort food from home" />
                   </div>
                   <div>
                     <label className="block text-orange-600 font-bold mb-1 text-xs">MAX CAPACITY</label>
                     <input type="number" className="w-full bg-orange-50 border border-orange-200 rounded p-2 text-orange-900" defaultValue={8} />
                   </div>
                   <button className="w-full bg-orange-500 text-white font-bold py-3 rounded mt-4 hover:bg-orange-400">PUBLISH GATHERING</button>
                </div>
             </div>

             <div className="space-y-6">
                <h3 className="font-bold text-orange-600 uppercase tracking-widest text-sm mb-4">Discover Local Potlucks</h3>

                <motion.div whileHover={{ scale: 1.02 }} className="bg-orange-100 p-6 rounded-2xl border border-orange-200 cursor-pointer shadow-sm relative">
                   <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">TODAY 6PM</div>
                   <h4 className="font-bold text-xl mb-1">Pasta Night @ Hostel 64</h4>
                   <p className="text-orange-800 text-sm mb-4">I'm making a giant batch of carbonara. Bring drinks or a side salad!</p>
                   <div className="flex justify-between items-center text-sm font-mono border-t border-orange-200/50 pt-4">
                      <div className="flex gap-2 items-center text-orange-600"><Users className="w-4 h-4"/> 4/10 Joined</div>
                      <span className="text-orange-950 font-bold hover:underline">View Needs List</span>
                   </div>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} className="bg-orange-100 p-6 rounded-2xl border border-orange-200 cursor-pointer shadow-sm relative">
                   <div className="absolute top-4 right-4 bg-orange-200 text-orange-800 text-xs font-bold px-2 py-1 rounded-full">TOMORROW</div>
                   <h4 className="font-bold text-xl mb-1">Park Picnic</h4>
                   <p className="text-orange-800 text-sm mb-4">Let's meet at the fountains. Buy something weird from 7-11 to share.</p>
                   <div className="flex justify-between items-center text-sm font-mono border-t border-orange-200/50 pt-4">
                      <div className="flex gap-2 items-center text-orange-600"><Users className="w-4 h-4"/> 12/20 Joined</div>
                      <span className="text-orange-950 font-bold hover:underline">View Needs List</span>
                   </div>
                </motion.div>
             </div>
          </div>
       </div>
    </div>
  );
}
