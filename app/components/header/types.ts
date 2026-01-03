export interface NavigationLink {
  href: string;
  label: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavigationLink[];
}

export interface NavigationProps {
  links: NavigationLink[];
}
