import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Icon: React.FC<IconProps> = ({ name, size = 20, className = '', style }) => {
  const IconComponent = (LucideIcons as any)[name];
  
  if (!IconComponent) {
    return <LucideIcons.HelpCircle size={size} className={className} style={style} />;
  }
  
  return <IconComponent size={size} className={className} style={style} />;
};
