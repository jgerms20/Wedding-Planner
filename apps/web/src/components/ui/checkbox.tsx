import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, checked, ...props }: React.ComponentProps<"input">) {
  return (
    <span className="relative inline-flex size-4 shrink-0">
      <input
        type="checkbox"
        data-slot="checkbox"
        checked={checked}
        className={cn(
          "peer size-4 shrink-0 appearance-none rounded-[4px] border border-input bg-transparent shadow-xs outline-none transition-colors",
          "checked:border-primary checked:bg-primary",
          "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
      <Check className="pointer-events-none absolute inset-0 m-auto size-3 scale-0 text-primary-foreground peer-checked:scale-100" strokeWidth={3} />
    </span>
  );
}

export { Checkbox };
