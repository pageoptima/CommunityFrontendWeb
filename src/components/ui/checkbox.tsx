"use client";

import * as React from "react";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer size-4 shrink-0 cursor-pointer rounded border border-[#8aa7a4] bg-white text-[#0b625d] shadow-xs transition-[color,box-shadow,border-color] outline-none focus-visible:ring-2 focus-visible:ring-[#0b625d]/30 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-[#0b625d] data-[state=checked]:bg-[#0b625d]",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-white transition-none"
        data-slot="checkbox-indicator"
      >
        <Check className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
