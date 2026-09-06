import {
  Activity,
  Ambulance,
  Atom,
  Baby,
  Bone,
  Brain,
  Cross,
  Dna,
  Droplet,
  Droplets,
  Eye,
  Flame,
  Headphones,
  HeartHandshake,
  HeartPulse,
  Ribbon,
  Scan,
  Scissors,
  ShieldAlert,
  ShieldPlus,
  Smile,
  Sparkles,
  Stethoscope,
  Wind,
} from 'lucide-react';
import React from 'react';

const iconMap = {
  HeartPulse,
  Activity,
  Droplet,
  Baby,
  ShieldAlert,
  Brain,
  Ribbon,
  Bone,
  Flame,
  Atom,
  Ambulance,
  Scissors,
  Stethoscope,
  Sparkles,
  ShieldPlus,
  Smile,
  Eye,
  Wind,
  Headphones,
  Droplets,
  Dna,
  HeartHandshake,
  Scan,
};

// Specialty specific icon customizer
export const getSpecialtyIcon = (iconName) => {
  return iconMap[iconName] || Activity;
};

const SpecialistIcon = ({ iconName, className = 'h-5 w-5', style = {} }) => {
  const IconComponent = iconMap[iconName] || Activity;
  return <IconComponent className={className} style={style} />;
};

export default SpecialistIcon;
