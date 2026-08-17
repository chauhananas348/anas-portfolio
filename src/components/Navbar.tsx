import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Code,
  Music,
  User,
  Cpu,
  Briefcase,
  Mail,
  Youtube,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home', icon: User },
    { label: 'About', href: '#about', icon: Cpu },
    { label: 'Skills', href: '#skills', icon: Code },
    { label: 'Projects', href: '#projects', icon: Briefcase },
    { label: 'Music', href: '#music', icon: Music },
    {
      label: 'YouTube',
      href: 'https://www.youtube.com/@Antshailmusic/videos',
      icon: Youtube,
      external: true,
    },
    {
      label: "Let's Connect",
      href: '#contact',
      icon: Mail,
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    external?: boolean
  ) => {
    if (external) {
      setMobileMenuOpen(false);
      return;
    }

    e.preventDefault();
    setMobileMenuOpen(false);

    const targetElement = document.querySelector(href);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F5F2ED]/90 backdrop-blur-lg border-b border-[#1A1A1A]/10 shadow-md py-3.5'
          : 'bg-[#F5F2ED]/70 backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-3 group"
        >
          <img
            src="/ac-logo.png"
            alt="Anas Chauhan"
            className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover border border-[#1A1A1A]/10 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
          />

          <div className="flex flex-col">
            <span className="font-headline text-lg md:text-xl font-medium tracking-tight text-[#1A1A1A] group-hover:opacity-60 transition-opacity">
              Anas Chauhan
            </span>

            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.18em] font-semibold text-[#1A1A1A]/40">
              IT Engineering Student
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-5 text-[10px] uppercase tracking-[0.16em] font-bold">
          {navItems.map((item) => {
            const isActive =
              !item.external &&
              activeSection === item.href.substring(1);

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) =>
                  handleNavClick(e, item.href, item.external)
                }
                target={item.external ? '_blank' : undefined}
                rel={
                  item.external
                    ? 'noopener noreferrer'
                    : undefined
                }
                className={`transition-all duration-200 relative py-2.5 px-4 rounded-full border ${
                  isActive
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] font-bold'
                    : 'border-[#1A1A1A]/25 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#1A1A1A] hover:opacity-60 p-2 rounded-lg hover:bg-[#1A1A1A]/5 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F2ED] border-b border-[#1A1A1A]/10 px-6 py-4 shadow-xl">
          <div className="flex flex-col space-y-2 text-[10px] uppercase tracking-widest font-bold">
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                !item.external &&
                activeSection === item.href.substring(1);

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) =>
                    handleNavClick(e, item.href, item.external)
                  }
                  target={item.external ? '_blank' : undefined}
                  rel={
                    item.external
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white font-bold'
                      : 'text-[#1A1A1A] hover:bg-[#1A1A1A]/5'
                  }`}
                >
                  <Icon size={15} />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};