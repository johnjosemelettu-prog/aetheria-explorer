
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
  FlaskConical
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
      label: 'Plan ✨',
      items: [
        { label: 'AI Itinerary 🤖', href: '/itinerary-generator', icon: Bot },
        { label: 'Budgeting 📊', href: '/budget-synthesis', icon: BarChart3 },
        { label: 'Packing Helper 🎒', href: '/packing-assistant', icon: Backpack },
        { label: 'Flight Tracker ✈️', href: '/flight-status', icon: Plane },
        { label: 'Travel Insurance 🛡️', href: '/insurance', icon: ShieldCheck },
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
		{ label: 'AR Culinary Explorer', href: '/ar-culinary-explorer', icon: Camera },
		{ label: 'AR Ghost Tour', href: '/ar-ghost-tour', icon: Radio },
      ]
    },
    {
      label: 'Creative 🎨',
      items: [
        { label: 'Vision AI 📸', href: '/scanner', icon: Camera },
        { label: 'Trip Videos 🎬', href: '/video-teaser', icon: Clapperboard },
        { label: 'AI Postcards 🎨', href: '/postcard-studio', icon: Wand2 },
        { label: 'Travel Journal 📓', href: '/journal', icon: BookOpen },
		{ label: 'Generative Souvenirs', href: '/generative-souvenir-studio', icon: Wand2 },
      ]
    },
    {
      label: 'Utility 🛠️',
      items: [
        { label: 'Marketplace 🛍️', href: '/marketplace', icon: ShoppingBag },
        { label: 'My Wallet 💰', href: '/wallet', icon: Wallet },
        { label: 'eSIM Plans 📶', href: '/esim', icon: Signal },
        { label: 'Eco Footprint 🌱', href: '/carbon-synthesis', icon: Leaf },
        { label: 'SOS Button 🆘', href: '/sos', icon: Siren },
      ]
    },
	{
		label: 'Lab 🧪',
		items: [
			{ label: 'VR Adventure Trials', href: '/vr-adventure-trials', icon: FlaskConical },
			{ label: 'VR Social Meetups', href: '/vr-social-meetups', icon: FlaskConical },
			{ label: 'AI Trip Companion', href: '/ai-trip-companion', icon: FlaskConical },
			{ label: 'AI Spontaneity Engine', href: '/ai-spontaneity-engine', icon: FlaskConical },
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
