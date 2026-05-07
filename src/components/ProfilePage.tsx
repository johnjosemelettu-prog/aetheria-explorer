import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Camera, 
  Save,
  Loader2,
  CheckCircle2,
  MapPin,
  Globe,
  Settings,
  Edit2
} from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { UserProfile, TravelPreferences } from '../types';
import { useTranslation } from 'react-i18next';
import FlavorDNA from './FlavorDNA';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [vibe, setVibe] = useState('');
  const [preferences, setPreferences] = useState<TravelPreferences>({
    currency: 'USD',
    language: 'en',
    timezone: 'UTC',
    units: 'metric'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth.currentUser) return;
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setProfile(data);
        setDisplayName(data.displayName || '');
        setBio(data.bio || '');
        setLocation(data.location || '');
        setVibe(data.vibe || '');
        if (data.preferences) {
          setPreferences(data.preferences);
          // Apply language preference on load
          if (data.preferences.language) {
            i18n.changeLanguage(data.preferences.language);
          }
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, [i18n]);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!auth.currentUser) return;
    setSaving(true);
    setSuccess(false);

    try {
      // Update Auth Profile
      await updateProfile(auth.currentUser, { displayName });

      // Update Firestore Profile
      const docRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(docRef, {
        displayName,
        bio,
        location,
        vibe,
        preferences,
        updatedAt: serverTimestamp()
      });

      // Apply language change immediately if it was updated
      if (preferences.language && i18n.language !== preferences.language) {
        await i18n.changeLanguage(preferences.language);
      }

      setSuccess(true);
      setIsEditingPreferences(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center">
          <Settings className="text-primary w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold">{t('profile.title')}</h1>
          <p className="text-foreground/50">{t('profile.subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="glass p-8 rounded-[32px] text-center sticky top-24">
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <img
                src={auth.currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${auth.currentUser?.uid}`}
                alt={t('auto.auto_profile_2203')}
                className="w-full h-full rounded-full border-4 border-white/10"
                referrerPolicy="no-referrer"
              />
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-xl font-bold mb-1">{displayName || 'Explorer'}</h2>
            <p className="text-sm text-foreground/40 mb-6 uppercase tracking-widest font-bold">
              {profile?.role || 'Explorer'}
            </p>
            
            <div className="space-y-4 text-left">
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Mail className="w-4 h-4" />
                {auth.currentUser?.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Calendar className="w-4 h-4" />
                {t('profile.joined')} {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'Recently'}
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground/60">
                <Shield className="w-4 h-4" />
                {t('profile.accountVerified')}
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="glass p-8 rounded-[32px] space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">{t('profile.displayName')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pl-11 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder={t('profile.placeholderName')}
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">{t('profile.location')}</label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 pl-11 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder={t('profile.placeholderLocation')}
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">{t('profile.vibe')}</label>
                <select
                  value={vibe}
                  onChange={(e) => setVibe(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="" disabled>{t('profile.selectVibe')}</option>
                  <option value="Cyberpunk">{t('auto.auto_cyberpunk_2202')}</option>
                  <option value="Minimalist">{t('auto.auto_minimalist_2201')}</option>
                  <option value="Adventurous">{t('auto.auto_adventurous_2200')}</option>
                  <option value="Sophisticated">{t('auto.auto_sophisticated_2199')}</option>
                  <option value="Wanderlust">{t('auto.auto_wanderlust_2198')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-foreground/40 ml-1">{t('profile.bio')}</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  placeholder={t('profile.placeholderBio')}
                />
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {success && !isEditingPreferences && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-400 text-sm font-bold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {t('profile.profileUpdated')}
                  </motion.div>
                )}
              </div>
              <button
                type="submit"
                disabled={saving || isEditingPreferences}
                className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {saving && !isEditingPreferences ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {t('profile.saveProfile')}
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 glass p-8 rounded-[32px]">
            <FlavorDNA />
          </div>

          {/* Preferences Section */}
          <div className="mt-8 glass p-8 rounded-[32px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                {t('profile.travelPreferences')}
              </h3>
              <button 
                onClick={() => {
                  if (isEditingPreferences) {
                    handleSave();
                  } else {
                    setIsEditingPreferences(true);
                  }
                }}
                disabled={saving && !isEditingPreferences}
                className="text-sm font-bold text-primary flex items-center gap-2"
              >
                {isEditingPreferences ? (
                  saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />
                ) : (
                  <><Edit2 className="w-4 h-4" /> {t('profile.edit')}</>
                )}
                {isEditingPreferences ? t('profile.savePreferences') : ''}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('profile.currency')}</p>
                {isEditingPreferences ? (
                  <select 
                    value={preferences.currency}
                    onChange={(e) => setPreferences({...preferences, currency: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="USD">{t('auto.auto_usd_____2197')}</option>
                    <option value="EUR">{t('auto.auto_eur_____2196')}</option>
                    <option value="GBP">{t('auto.auto_gbp_____2195')}</option>
                    <option value="JPY">{t('auto.auto_jpy_____2194')}</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold">{preferences.currency}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('profile.language')}</p>
                {isEditingPreferences ? (
                  <select 
                    value={preferences.language}
                    onChange={(e) => setPreferences({...preferences, language: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="en">{t('auto.auto_english_2193')}</option>
                    <option value="es">{t('auto.auto_espa_ol_2192')}</option>
                    <option value="fr">{t('auto.auto_fran_ais_2191')}</option>
                    <option value="ja">{t('auto.auto______japanese__2190')}</option>
                    <option value="de">{t('auto.auto_german_2189')}</option>
                    <option value="ml">{t('auto.auto_malayalam_2188')}</option>
                    <option value="ar">{t('auto.auto_arabic_2187')}</option>
                    <option value="ta">{t('auto.auto_tamil_2186')}</option>
                    <option value="hi">{t('auto.auto_hindi_2185')}</option>
                    <option value="ms">{t('auto.auto_malay_2184')}</option>
                    <option value="tl">{t('auto.auto_tagalog_2183')}</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold">{
                    preferences.language === 'en' ? 'English' : 
                    preferences.language === 'es' ? 'Español' :
                    preferences.language === 'fr' ? 'Français' :
                    preferences.language === 'ja' ? '日本語 (Japanese)' : 
                    preferences.language === 'de' ? 'German' : 
                    preferences.language === 'ml' ? 'Malayalam' : 
                    preferences.language === 'ar' ? 'Arabic' : 
                    preferences.language === 'ta' ? 'Tamil' : 
                    preferences.language === 'hi' ? 'Hindi' : 
                    preferences.language === 'ms' ? 'Malay' : 
                    preferences.language === 'tl' ? 'Tagalog' : 
                    preferences.language
                  }</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('profile.timezone')}</p>
                {isEditingPreferences ? (
                  <select 
                    value={preferences.timezone}
                    onChange={(e) => setPreferences({...preferences, timezone: e.target.value})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="UTC">{t('auto.auto_utc_2182')}</option>
                    <option value="EST">{t('auto.auto_est__utc_5__2181')}</option>
                    <option value="PST">{t('auto.auto_pst__utc_8__2180')}</option>
                    <option value="JST">{t('auto.auto_jst__utc_9__2179')}</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold">{preferences.timezone}</p>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2">{t('profile.units')}</p>
                {isEditingPreferences ? (
                  <select 
                    value={preferences.units}
                    onChange={(e) => setPreferences({...preferences, units: e.target.value as 'metric' | 'imperial'})}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
                  >
                    <option value="metric">{t('auto.auto_metric__km__kg__2178')}</option>
                    <option value="imperial">{t('auto.auto_imperial__mi__lbs__2177')}</option>
                  </select>
                ) : (
                  <p className="text-sm font-bold capitalize">{preferences.units}</p>
                )}
              </div>
            </div>
            {success && isEditingPreferences === false && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-end gap-2 text-green-400 text-sm font-bold"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t('profile.preferencesSaved')}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
