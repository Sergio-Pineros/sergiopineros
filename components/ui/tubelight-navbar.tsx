"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  onSelect?: () => void;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  active?: string;
}

export function NavBar({ items, className, active }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? "");
  const current = active ?? activeTab;

  return (
    <div
      className={cn(
        "tubelight-navbar pointer-events-none fixed bottom-0 left-1/2 z-50 mb-6 -translate-x-1/2 sm:top-0 sm:bottom-auto sm:mb-0 sm:pt-6",
        className
      )}
    >
      <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-[#4a2d56]/80 bg-[#2a0134]/90 px-1 py-1 shadow-lg backdrop-blur-lg sm:gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = current === item.name;
          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={(event) => {
                setActiveTab(item.name);
                if (item.onSelect) {
                  event.preventDefault();
                  item.onSelect();
                }
              }}
              className={cn(
                "tubelight-navbar__item relative flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors sm:px-6",
                isActive && "tubelight-navbar__item--active bg-[#9d86bc]/10"
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 -z-10 w-full rounded-full bg-[#9d86bc]/10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="absolute -top-2 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-[#b9a8d0]">
                    <div className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-[#9d86bc]/20 blur-md" />
                    <div className="absolute -top-1 h-6 w-8 rounded-full bg-[#b9a8d0]/20 blur-md" />
                    <div className="absolute top-0 left-2 h-4 w-4 rounded-full bg-[#9d86bc]/20 blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
