'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Bot,
  Compass, 
  ShoppingBag, 
  Wallet, 
  BarChart3, 
  Camera, 
  Globe, 
  MapPin, 
  History, 
  Radio, 
  Wifi, 
  Clapperboard, 
  Wand2, 
  BookOpen, 
  Siren, 
  ShieldCheck, 
  Plane, 
  Signal, 
  Leaf, 
  Backpack, 
  Home,
  FlaskConical,
  Languages,
  User,
  Trophy,
  Star,
  Briefcase,
  Zap,
  Ticket,
  Route as RouteIcon,
  Binoculars,
  SprayCan,
  UtensilsCrossed,
  ShoppingBasket,
  PersonStanding,
  Music,
  Beaker,
  Calendar,
  PlaneTakeoff,
  Ship,
  Utensils,
  Car,
  Train,
  QrCode,
  Fingerprint,
  Scissors,
  Mic,
  Users,
  Newspaper,
  Mail,
  HelpCircle,
  Gavel,
  FileText,
  Shield,
  Lock,
  Building2,
  Handshake,
  Eye,
  GalleryVertical,
  ChefHat, 
  Ghost, 
  Bed,
  MessageSquare,
  MessageCircle,
  AlertTriangle,
  Search,
  UserCheck,
  UserPlus
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { BrandLogo } from './BrandLogo';
import { useTranslation } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { UserNav } from './UserNav';

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (pathname === '/') return null;

  const menuGroups = [
    {
      label: 'Main',
      items: [
        { label: 'Home', href: '/dashboard', icon: Home },
        { label: 'Profile', href: '/profile', icon: User },
        { label: 'Achievements', href: '/achievements', icon: Trophy },
        { label: 'Loyalty', href: '/loyalty', icon: Star },
      ]
    },
    {
      label: 'Plan ✨',
      items: [
        { label: 'AI Itinerary 🤖', href: '/itinerary-generator', icon: Bot },
        { label: 'Layover Odyssey', href: '/layover-odyssey-generator', icon: Briefcase },
        { label: 'Spontaneity Engine', href: '/spontaneity-engine', icon: Zap },
        { label: 'Budgeting 📊', href: '/budget-synthesis', icon: BarChart3 },
        { label: 'Packing Helper 🎒', href: '/dynamic-packing-list-adjuster', icon: Backpack },
        { label: 'Visa Architect 🛂', href: '/visa-architect', icon: Ticket },
        { label: 'Jet Lag Helper ✈️', href: '/biometric-jet-lag-sync', icon: Plane },
        { label: 'Dynamic Itinerary Re-planning', href: '/dynamic-itinerary-replanning', icon: RouteIcon },
        { label: '\"What If\" Scenario Planner', href: '/what-if-scenario-planner', icon: FlaskConical },
        { label: 'AI-Powered Budget Optimization', href: '/ai-budget-optimization', icon: Wallet },
        { label: 'AI-Powered Itinerary Customization', href: '/ai-itinerary-customization', icon: Bot },
      ]
    },
    {
      label: 'Explore 🗺️',
      items: [
        { label: 'Explorer Quests 🕵️‍♀️', href: '/explorer-quests', icon: Compass },
        { label: 'AR Guide ✨', href: '/guide', icon: Globe },
        { label: 'AR Navigation 📍', href: '/ar-wayfinding', icon: MapPin },
        { label: 'Local Stories 📚', href: '/local-legends', icon: History },
        { label: 'Cultural Vibes 📻', href: '/cultural-pulse', icon: Radio },
        { label: 'Audio Tours 🎧', href: '/audio-guide', icon: Wifi },
        { label: 'AR Time-Travel', href: '/ar-time-travel', icon: History },
        { label: 'AR Culinary Explorer', href: '/culinary-creator', icon: Camera },
        { label: 'AR Ghost Tour', href: '/ar-ghost-tours', icon: Ghost },
        { label: 'Pathfinder', href: '/pathfinder', icon: RouteIcon },
        { label: 'Culture Scout', href: '/culture-scout', icon: Binoculars },
        { label: 'Street Art Decoder', href: '/street-art-decoder', icon: SprayCan },
        { label: 'Menu Explorer', href: '/menu-explorer', icon: UtensilsCrossed },
        { label: 'Souvenir Storyteller', href: '/souvenir-storyteller', icon: ShoppingBasket },
        { label: 'AR Language Tutor', href: '/ar-language-tutor', icon: Languages },
        { label: 'AR Fashion Try-On', href: '/ar-fashion-try-on', icon: ShoppingBag },
        { label: 'AR Art Galleries', href: '/ar-art-galleries', icon: GalleryVertical },
        { label: 'AR Escape Rooms', href: '/ar-escape-rooms', icon: Ghost },
        { label: 'AR Celebrity Tour Guide', href: '/ar-celebrity-tour-guide', icon: UserCheck },
        { label: 'AR Historical Overlays', href: '/ar-historical-overlays', icon: History },
        { label: 'AR Language Translator', href: '/ar-language-translator', icon: Languages },
        { label: 'AR Indoor Navigation', href: '/ar-indoor-navigation', icon: MapPin },
        { label: 'Gamified Language Learning', href: '/gamified-language-learning', icon: Languages },
      ]
    },
    {
      label: 'Creative 🎨',
      items: [
        { label: 'Vision AI 📸', href: '/vision-ai-hub', icon: Camera },
        { label: 'Trip Videos 🎬', href: '/video-teaser', icon: Clapperboard },
        { label: 'AI Postcards 🎨', href: '/postcard-studio', icon: Wand2 },
        { label: 'Travel Journal 📓', href: '/journal', icon: BookOpen },
        { label: 'Generative Souvenirs', href: '/generative-souvenir-studio', icon: Wand2 },
        { label: 'Heritage Mirror', href: '/heritage-mirror', icon: PersonStanding },
        { label: 'Trip Soundtrack', href: '/trip-soundtrack-generator', icon: Music },
        { label: 'Flavor DNA', href: '/flavor-dna', icon: Beaker },
		{ label: 'Digital Art Exhibitions', href: '/digital-art-exhibitions', icon: GalleryVertical },
		{ label: 'Culinary Creator', href: '/culinary-creator', icon: ChefHat },
      ]
    },
    {
      label: 'Booking 🏨',
      items: [
        { label: 'Bookings', href: '/bookings', icon: Calendar },
        { label: 'Flights', href: '/flights', icon: PlaneTakeoff },
        { label: 'Cruises', href: '/cruises', icon: Ship },
        { label: 'Dining', href: '/dining', icon: Utensils },
        { label: 'Rentals', href: '/rentals', icon: Car },
        { label: 'Transit Connect', href: '/transit-connect', icon: Train },
        { label: 'AI Deal Hunter', href: '/ai-deal-hunter', icon: Search },
        { label: 'Real-Time Public Transit Information', href: '/real-time-public-transit-information', icon: Train },
      ]
    },
    {
      label: 'Utility 🛠️',
      items: [
        { label: 'Marketplace 🛍️', href: '/marketplace', icon: ShoppingBag },
        { label: 'My Wallet 💰', href: '/wallet', icon: Wallet },
        { label: 'eSIM Plans 📶', href: '/esim', icon: Signal },
        { label: 'Eco Footprint 🌱', href: '/mindful-travel-meditation-series', icon: Leaf },
        { label: 'SOS Button 🆘', href: '/sos', icon: Siren },
        { label: 'Translator 🌐', href: '/translator', icon: Languages },
        { label: 'Scan & Pay', href: '/scan-and-pay', icon: QrCode },
        { label: 'Biometric Sync', href: '/biometric-jet-lag-sync', icon: Fingerprint },
        { label: 'Digital Tailor', href: '/digital-tailor', icon: Scissors },
        { label: 'Haggling Coach', href: '/ai-haggling-coach', icon: Mic },
		{ label: 'Local Pal AI Chatbot', href: '/local-pal-ai-chatbot', icon: MessageCircle },
		{ label: 'Personalized Safety Alerts', href: '/personalized-safety-alerts', icon: AlertTriangle },
        { label: 'AI Lost & Found Assistant', href: '/ai-lost-and-found-assistant', icon: Search },
        { label: 'AI-Powered Real-Time Translation', href: '/ai-real-time-translation', icon: Languages },
      ]
    },
    {
        label: 'Social & Utility',
        items: [
            { label: 'Digital Nomad Network', href: '/digital-nomad-network', icon: Users },
            { label: 'AR Find My Friends', href: '/ar-find-my-friends', icon: UserPlus },
        ]
    },
    {
      label: 'VR Experiences 🕶️',
      items: [
        { label: 'VR Destination Previews', href: '/vr-previews', icon: Eye },
        { label: 'VR Adventure Trials', href: '/vr-adventure-trials', icon: FlaskConical },
        { label: 'VR Social Meetups', href: '/travel-twin', icon: Users },
        { label: 'VR Language Immersion', href: '/vr-language-immersion', icon: Languages },
        { label: 'VR Cultural Festivals', href: '/vr-cultural-festivals', icon: Music },
        { label: 'VR Hotel Tours', href: '/vr-hotel-tours', icon: Bed },
        { label: 'VR Museum and Gallery Tours', href: '/vr-museum-and-gallery-tours', icon: GalleryVertical },
        { label: 'VR Cooking Classes', href: '/vr-cooking-classes', icon: ChefHat },
        { label: 'VR Concerts and Events', href: '/vr-concerts-and-events', icon: Music },
      ]
    },
    {
      label: 'Information',
      items: [
        { label: 'News', href: '/news', icon: Newspaper },
        { label: 'Contact', href: '/contact', icon: Mail },
        { label: 'FAQ', href: '/faq', icon: HelpCircle },
        { label: 'Legal', href: '/legal', icon: Gavel },
        { label: 'Terms of Service', href: '/terms', icon: FileText },
        { label: 'Privacy Policy', href: '/privacy', icon: Shield },
        { label: 'Data Security', href: '/data-security', icon: Lock },
      ]
    },
    {
      label: 'Corporate',
      items: [
        { label: 'About Us', href: '/corporate', icon: Building2 },
        { label: 'Partners', href: '/partners', icon: Handshake },
      ]
    },
	{
		label: 'Lab 🧪',
		items: [
			{ label: 'AI Trip Companion', href: '/ai-trip-companion', icon: FlaskConical },
		]
	}
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/20 bg-background/80 backdrop-blur-xl shadow-inner">
      <SidebarHeader className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <BrandLogo size="sm" />
          <div className="flex flex-col items-start leading-none group-data-[collapsible=icon]:hidden">
            <span className="font-headline text-lg font-black tracking-tighter uppercase leading-none text-foreground">
              {t('sidebar.brand.name')}<span className="text-primary italic">AI</span>
            </span>
            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-muted-foreground mt-0.5 whitespace-nowrap">{t('sidebar.brand.tagline')}</span>
          </div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === '/dashboard'} tooltip='Home'>
                <Link href='/dashboard'>
                  <Home className={cn("h-5 w-5", pathname === '/dashboard' ? "text-primary" : "text-muted-foreground")} />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
        {menuGroups.map((group, idx) => (
          <SidebarGroup key={idx} className="mb-6">
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden px-2 mb-2">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.label}>
                      <Link href={item.href}>
                        <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-primary" : "text-muted-foreground")} />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2 border-t border-border/20">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <UserNav />
          <div className="flex flex-col items-start leading-none group-data-[collapsible=icon]:hidden">
            <p className="text-xs font-bold uppercase text-foreground">{t('sidebar.sessionVerified')}</p>
            <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest mt-0.5 flex items-center gap-1">
              <ShieldCheck className="h-2.5 w-2.5" /> {t('sidebar.neuralLinkActive')}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
