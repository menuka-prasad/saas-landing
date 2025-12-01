"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"
import { siteConfig } from "@/content/site"

export function ThemeToggle() {
 const {  setThemeChoice } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="dark:bg-background/30">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">{siteConfig.themeToogle.screenReadrsOnly}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setThemeChoice("light")}>
          {siteConfig.themeToogle.themes.light}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeChoice("dark")}>
          {siteConfig.themeToogle.themes.dark}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setThemeChoice("system")}>
          {siteConfig.themeToogle.themes.system}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
