import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import { PRIMARY_NAV_ITEMS } from "@/constants/navigation";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { cn } from "@/lib/utils";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [pendingTarget, setPendingTarget] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const profileQuery = useProfile();
  const profile = profileQuery.data;

  const RESUME_LINK =
    profile?.resume_url ||
    "https://www.linkedin.com/in/vedansh-chandak-842943290/overlay/1783153129745/single-media-viewer/?profileId=ACoAAEaeSPIB2_F4YNh4BBJmyUVqrY_WTfIoaOo";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!pendingTarget || location.pathname !== "/") {
      return;
    }

    const targetElement = document.getElementById(
      pendingTarget
    );

    if (targetElement) {
      requestAnimationFrame(() => {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    setPendingTarget(null);
    setIsOpen(false);
  }, [location.pathname, pendingTarget]);

  const handleHomeClick = () => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSectionClick = (target) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      setPendingTarget(target);
      navigate("/");
      return;
    }

    const targetElement =
      document.getElementById(target);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleResumeClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        isScrolled
          ? "border-border/60 bg-background/80 shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={handleHomeClick}
            className="group inline-flex items-center gap-3 text-left transition-opacity hover:opacity-80"
          >
            <span className="flex size-10 items-center justify-center rounded-2xl border border-border/60 bg-background/80 text-sm font-semibold shadow-sm backdrop-blur">
              {profile?.name?.slice(0, 1) ?? "V"}
            </span>

            <span className="hidden sm:block">
              <span className="block text-sm font-semibold leading-none">
                {profile?.name ?? "Vedansh Chandak"}
              </span>

              <span className="mt-1 block text-xs text-muted-foreground">
                {profile?.title ??
                  "Full Stack Engineer"}
              </span>
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 rounded-full border border-border/60 bg-background/70 p-1 shadow-sm backdrop-blur md:flex">
            {PRIMARY_NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() =>
                  item.type === "home"
                    ? handleHomeClick()
                    : handleSectionClick(item.target)
                }
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                  item.type === "home" &&
                    "text-foreground"
                )}
              >
                {item.label}
              </button>
            ))}

            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              Resume
              <ArrowUpRight className="size-4" />
            </a>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={RESUME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleResumeClick}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur"
            >
              Resume
            </a>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={() =>
                setIsOpen((current) => !current)
              }
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -12,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                y: -12,
                height: 0,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="overflow-hidden md:hidden"
            >
              <div className="mb-4 rounded-3xl border border-border/60 bg-background/90 p-3 shadow-lg backdrop-blur-xl">
                <div className="flex flex-col gap-2">
                  {PRIMARY_NAV_ITEMS.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        item.type === "home"
                          ? handleHomeClick()
                          : handleSectionClick(
                              item.target
                            )
                      }
                      className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}

export default Navbar;