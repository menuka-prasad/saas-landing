import * as faIcons from "react-icons/fa";
import * as siIcons from "react-icons/si";
import { IconType } from "react-icons";

interface DynamicIconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

export function DynamicIcon({ name, size = 24, className, color = "#000" }: DynamicIconProps) {
  // Type assertion for the icon modules
  const faIconsTyped = faIcons as { [key: string]: IconType };
  const siIconsTyped = siIcons as { [key: string]: IconType };

  let IconComponent = faIconsTyped[name];

  if (!IconComponent) {
    IconComponent = siIconsTyped[name];
  }

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in react-icons/fa or react-icons/si`);
    return null;
  }

  return <IconComponent size={size} className={className} color={color} />;
}