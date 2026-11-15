import {
  Activity, ArrowLeftRight, Award, Banknote, BadgeCheck, Briefcase, Building2, Calendar, CalendarPlus, Camera, Check, CheckCircle2, ChevronDown, ChevronLeft, Crown,
  ChevronRight, Clock, CreditCard, Download, Droplets, Dumbbell, Eye, Facebook, FileText, Flag, Footprints, Globe, Handshake, Heart,
  HeartPulse, Info, Instagram, Landmark, Leaf, Lightbulb, Linkedin, Loader2, Lock, Mail, MapPin, Medal, Megaphone, Menu, MessageCircle,
  Mountain, Music2, Network, Pencil, Phone, Plus, QrCode, Recycle, Rocket, Search, ShieldCheck, ShoppingBag, Shirt, Smartphone, Sprout, Star, Stethoscope,
  Store, Target, Ticket, Trash2, TreePine, TrendingUp, Trophy, Upload, Users, Utensils, X, Youtube, AlertCircle, ArrowRight, Zap, Gift, Ribbon,
} from 'lucide-react';

const ICONS = {
  activity: Activity, 'arrow-left-right': ArrowLeftRight, award: Award, banknote: Banknote, 'badge-check': BadgeCheck, briefcase: Briefcase, building: Building2, calendar: Calendar,
  'calendar-plus': CalendarPlus, camera: Camera, check: Check, 'check-circle': CheckCircle2, 'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft, 'chevron-right': ChevronRight, crown: Crown, clock: Clock, 'credit-card': CreditCard, download: Download,
  droplets: Droplets, dumbbell: Dumbbell, eye: Eye, facebook: Facebook, 'file-text': FileText, flag: Flag, footprints: Footprints,
  globe: Globe, handshake: Handshake, heart: Heart, 'heart-pulse': HeartPulse, info: Info, instagram: Instagram, landmark: Landmark,
  leaf: Leaf, lightbulb: Lightbulb, linkedin: Linkedin, loader: Loader2, lock: Lock, mail: Mail, 'map-pin': MapPin, medal: Medal,
  megaphone: Megaphone, menu: Menu, message: MessageCircle, mountain: Mountain, music: Music2, network: Network, pencil: Pencil, phone: Phone, plus: Plus,
  'qr-code': QrCode, recycle: Recycle, rocket: Rocket, search: Search, shield: ShieldCheck, 'shopping-bag': ShoppingBag, shirt: Shirt,
  smartphone: Smartphone, sprout: Sprout, star: Star, stethoscope: Stethoscope, store: Store, target: Target, ticket: Ticket,
  trash: Trash2, tree: TreePine, 'trending-up': TrendingUp, trophy: Trophy, upload: Upload, users: Users, utensils: Utensils,
  x: X, youtube: Youtube, alert: AlertCircle, 'arrow-right': ArrowRight, zap: Zap, gift: Gift, ribbon: Ribbon,
};

export default function Icon({ name, size = 20, ...props }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} aria-hidden="true" {...props} />;
}
