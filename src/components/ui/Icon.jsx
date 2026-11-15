import {
  Activity, ArrowLeftRight, Award, Banknote, BadgeCheck, BookOpen, Briefcase, Building2, Calendar, CalendarPlus, Camera, Check, CheckCircle2, ChevronDown, ChevronLeft, Compass, Crown, Flame, GraduationCap, House,
  ChevronRight, Clock, CreditCard, Download, Droplets, Dumbbell, Eye, Facebook, Filter, FileText, Flag, Footprints, Gift as GiftIcon, Globe, Handshake, Heart,
  HeartPulse, Info, Instagram, Landmark, Leaf, Lightbulb, Linkedin, Loader2, Lock, Mail, MapPin, Medal, Megaphone, Menu, MessageCircle, MessagesSquare, Monitor,
  Mountain, Music2, Network, PanelsTopLeft, PartyPopper, Pencil, Phone, Plus, QrCode, Recycle, Rocket, Search, Settings, ShieldCheck, ShoppingBag, Shirt, Smartphone, Sprout, Star, Stethoscope,
  Store, Tags, Target, Ticket, Trash2, TreePine, TrendingUp, Trophy, Upload, UserRound, Users, Utensils, X, Youtube, AlertCircle, ArrowRight, Zap, Ribbon,
} from 'lucide-react';

const ICONS = {
  activity: Activity, 'arrow-left-right': ArrowLeftRight, award: Award, banknote: Banknote, 'badge-check': BadgeCheck, briefcase: Briefcase, building: Building2, calendar: Calendar,
  'calendar-plus': CalendarPlus, camera: Camera, check: Check, 'check-circle': CheckCircle2, 'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft, 'chevron-right': ChevronRight, crown: Crown, 'graduation-cap': GraduationCap, 'book-open': BookOpen, clock: Clock, 'credit-card': CreditCard, download: Download,
  droplets: Droplets, dumbbell: Dumbbell, eye: Eye, facebook: Facebook, filter: Filter, 'file-text': FileText, flag: Flag, footprints: Footprints, compass: Compass,
  globe: Globe, handshake: Handshake, heart: Heart, 'heart-pulse': HeartPulse, info: Info, instagram: Instagram, landmark: Landmark,
  leaf: Leaf, lightbulb: Lightbulb, linkedin: Linkedin, loader: Loader2, lock: Lock, mail: Mail, 'map-pin': MapPin, medal: Medal, flame: Flame, house: House,
  megaphone: Megaphone, menu: Menu, message: MessageCircle, 'messages-square': MessagesSquare, monitor: Monitor, mountain: Mountain, music: Music2, network: Network, 'panels-top-left': PanelsTopLeft, 'party-popper': PartyPopper, pencil: Pencil, phone: Phone, plus: Plus, settings: Settings,
  'qr-code': QrCode, recycle: Recycle, rocket: Rocket, search: Search, shield: ShieldCheck, 'shopping-bag': ShoppingBag, shirt: Shirt,
  smartphone: Smartphone, sprout: Sprout, star: Star, stethoscope: Stethoscope, store: Store, target: Target, ticket: Ticket,
  tags: Tags, trash: Trash2, tree: TreePine, 'trending-up': TrendingUp, trophy: Trophy, upload: Upload, 'user-round': UserRound, users: Users, utensils: Utensils,
  x: X, youtube: Youtube, alert: AlertCircle, 'arrow-right': ArrowRight, zap: Zap, gift: GiftIcon, ribbon: Ribbon,
};

export default function Icon({ name, size = 20, ...props }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp size={size} aria-hidden="true" {...props} />;
}
