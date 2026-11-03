/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Heart, 
  MessageSquare, 
  MessageCircle, 
  Baby, 
  ShieldAlert, 
  ShieldCheck,
  EyeOff, 
  Store, 
  Coins, 
  MapPin, 
  Award, 
  Headphones, 
  Users, 
  HandHeart, 
  ChevronDown, 
  ChevronUp, 
  ChevronRight,
  Phone, 
  Mail, 
  Clock, 
  Home, 
  PiggyBank, 
  Sparkles, 
  Banknote,
  Briefcase,
  Calendar,
  CalendarCheck,
  CheckCircle,
  CheckCircle2,
  Menu,
  X,
  Compass,
  Check,
  AlertCircle,
  Car,
  Landmark,
  HeartHandshake,
  Crown,
  Smile,
  BadgePercent,
  Info,
  FileText,
  FileCheck,
  Building2,
  Lock
} from 'lucide-react';

const iconMap = {
  Heart,
  MessageSquare,
  MessageCircle,
  Baby,
  ShieldAlert,
  ShieldCheck,
  EyeOff,
  Store,
  Coins,
  MapPin,
  Award,
  Headphones,
  Users,
  HandHeart,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Phone,
  Mail,
  Clock,
  Home,
  PiggyBank,
  Sparkles,
  Banknote,
  Briefcase,
  Calendar,
  CalendarCheck,
  CheckCircle,
  CheckCircle2,
  Menu,
  X,
  Compass,
  Check,
  AlertCircle,
  Car,
  Landmark,
  HeartHandshake,
  Crown,
  Smile,
  BadgePercent,
  Info,
  FileText,
  FileCheck,
  Building2,
  Lock
};

export type IconName = keyof typeof iconMap;

interface LucideIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function LucideIcon({ name, className = '', size = 24 }: LucideIconProps) {
  const IconComponent = iconMap[name as IconName] || Sparkles;
  return <IconComponent className={className} size={size} />;
}
