import React, {
    useEffect,
    useRef,
    useState,
  } from 'react';
  
  import {
    Home,
    User,
    Code2,
    Briefcase,
    Music2,
    Mail,
  } from 'lucide-react';
  
  interface SectionItem {
    id: string;
    label: string;
    icon: React.ElementType;
  }
  
  const sections: SectionItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code2 },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'music', label: 'Music', icon: Music2 },
    { id: 'contact', label: 'Connect', icon: Mail },
  ];
  
  const RAIL_HEIGHT_DESKTOP = 440;
  const RAIL_HEIGHT_MOBILE = 320;
  
  export default function SectionRail() {
    const railRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
  
    const positionsRef = useRef<number[]>([]);
    const tickingRef = useRef(false);
  
    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);
  
    /*
     * Calculate where every section begins.
     *
     * This is NOT done on every scroll frame.
     */
    const calculatePositions = () => {
      positionsRef.current = sections.map((section) => {
        const element = document.getElementById(section.id);
  
        if (!element) return 0;
  
        return (
          element.getBoundingClientRect().top +
          window.scrollY
        );
      });
    };
  
    useEffect(() => {
      calculatePositions();
  
      const handleResize = () => {
        calculatePositions();
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener(
          'resize',
          handleResize
        );
      };
    }, []);
  
    useEffect(() => {
      const updateRail = () => {
        const positions = positionsRef.current;
  
        if (
          !positions.length ||
          !markerRef.current ||
          !progressRef.current
        ) {
          tickingRef.current = false;
          return;
        }
  
        const viewportPoint =
          window.scrollY + window.innerHeight * 0.45;
  
        /*
         * Find the current section.
         */
        let currentIndex = 0;
  
        for (let i = 0; i < positions.length; i++) {
          if (viewportPoint >= positions[i]) {
            currentIndex = i;
          }
        }
  
        /*
         * Find smooth progress between the current
         * section and the next section.
         */
        let progress = currentIndex;
  
        if (currentIndex < positions.length - 1) {
          const start = positions[currentIndex];
          const end = positions[currentIndex + 1];
  
          const distance = end - start;
  
          if (distance > 0) {
            const localProgress =
              (viewportPoint - start) / distance;
  
            progress =
              currentIndex +
              Math.min(
                Math.max(localProgress, 0),
                1
              );
          }
        }
  
        /*
         * Convert progress into rail percentage.
         */
        const percentage =
          sections.length > 1
            ? (progress /
                (sections.length - 1)) *
              100
            : 0;
  
        /*
         * IMPORTANT:
         *
         * We directly modify transform here instead
         * of calling setState every frame.
         *
         * This keeps your 3D website much smoother.
         */
        const railHeight = railRef.current?.clientHeight ?? 0;

const markerY =
  (percentage / 100) * railHeight;

markerRef.current.style.transform =
  `translate3d(-50%, ${markerY}px, 0)`;
  
        progressRef.current.style.height =
          `${percentage}%`;
  
        /*
         * Only update React when the actual
         * active section changes.
         */
        const roundedIndex = Math.min(
          Math.round(progress),
          sections.length - 1
        );
  
        setActiveIndex((previous) =>
          previous === roundedIndex
            ? previous
            : roundedIndex
        );
  
        tickingRef.current = false;
      };
  
      const handleScroll = () => {
        if (!tickingRef.current) {
          tickingRef.current = true;
  
          window.requestAnimationFrame(
            updateRail
          );
        }
  
        setVisible(window.scrollY > 50);
      };
  
      window.addEventListener(
        'scroll',
        handleScroll,
        { passive: true }
      );
  
      updateRail();
  
      return () => {
        window.removeEventListener(
          'scroll',
          handleScroll
        );
      };
    }, []);
  
    const activeSection =
      sections[activeIndex] || sections[0];
  
    const ActiveIcon = activeSection.icon;
  
    const handleClick = (id: string) => {
      const element =
        document.getElementById(id);
  
      if (!element) return;
  
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    };
  
    return (
      <aside
        aria-label="Portfolio section navigation"
        className={`
          fixed
          left-3
          sm:left-5
          md:left-7
          top-1/2
          -translate-y-1/2
          z-40
          transition-opacity
          duration-500
          ${
            visible
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <div
          ref={railRef}
          className="
            relative
            h-[320px]
            sm:h-[380px]
            md:h-[440px]
            w-16
          "
        >
  
          {/* Main vertical spine */}
          <div
            className="
              absolute
              left-1/2
              top-0
              bottom-0
              -translate-x-1/2
              w-[4px]
              rounded-full
              bg-[#1A1A1A]/12
            "
          />
  
          {/* Gold scroll progress */}
          <div
            ref={progressRef}
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              w-[4px]
              rounded-full
              bg-[#B9914A]
            "
          />
  
          {/* Fixed section markers */}
          {sections.map(
            (section, index) => {
              const position =
                sections.length > 1
                  ? (index /
                      (sections.length - 1)) *
                    100
                  : 0;
  
              const isActive =
                index === activeIndex;
  
              const isPassed =
                index < activeIndex;
  
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    handleClick(section.id)
                  }
                  aria-label={`Go to ${section.label}`}
                  className="
                    absolute
                    left-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    z-20
                    group
                  "
                  style={{
                    top: `${position}%`,
                  }}
                >
                  <span
                    className={`
                      block
                      rounded-full
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? 'h-3 w-3 bg-[#B9914A] opacity-0'
                          : isPassed
                          ? 'h-2 w-2 bg-[#B9914A]/60'
                          : 'h-2 w-2 bg-[#1A1A1A]/25'
                      }
                    `}
                  />
                </button>
              );
            }
          )}
  
          {/* Moving active marker */}
          <div
            ref={markerRef}
            className="
              absolute
              left-1/2
              top-0
              -translate-x-1/2
              -translate-y-1/2
              z-30
              will-change-transform
            "
            style={{
              transform:
                'translate3d(-50%, 0px, 0)',
            }}
          >
  
            {/* Active label */}
            <div
              key={activeSection.id}
              className="
                absolute
                right-full
                mr-4
                top-1/2
                -translate-y-1/2
                whitespace-nowrap
                rounded-full
                border
                border-[#1A1A1A]/10
                bg-[#F5F2ED]/95
                backdrop-blur-lg
                px-4
                py-2
                shadow-sm
                animate-[railLabelIn_350ms_ease-out]
              "
            >
              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[0.2em]
                  font-bold
                  text-[#1A1A1A]
                "
              >
                {activeSection.label}
              </span>
            </div>
  
            {/* Active icon */}
            <button
              type="button"
              onClick={() =>
                handleClick(
                  activeSection.id
                )
              }
              aria-label={`Current section: ${activeSection.label}`}
              className="
                relative
                flex
                h-12
                w-12
                sm:h-14
                sm:w-14
                items-center
                justify-center
                rounded-full
                border
                border-[#1A1A1A]
                bg-[#1A1A1A]
                text-white
                shadow-xl
                transition-transform
                duration-300
                hover:scale-110
              "
            >
  
              {/* Gold outer ring */}
              <span
                className="
                  absolute
                  inset-[-5px]
                  rounded-full
                  border
                  border-[#B9914A]/40
                "
              />
  
              {/* Subtle pulse */}
              <span
                className="
                  absolute
                  inset-[-9px]
                  rounded-full
                  border
                  border-[#B9914A]/10
                  animate-pulse
                "
              />
  
              <ActiveIcon
                key={activeSection.id}
                size={20}
                strokeWidth={2}
                className="
                  relative
                  z-10
                "
              />
            </button>
          </div>
        </div>
      </aside>
    );
  }