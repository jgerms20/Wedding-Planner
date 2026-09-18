import * as React from "react";

import { cn } from "@/lib/utils";

function Slider({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type="range"
      data-slot="slider"
      className={cn("h-1.5 w-full cursor-pointer rounded-full bg-muted accent-primary", className)}
      {...props}
    />
  );
}

export { Slider };
