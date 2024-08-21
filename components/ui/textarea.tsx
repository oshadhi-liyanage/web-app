import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex h-full w-full rounded-md border-2 border-input border-purple-700 bg-background px-3 py-2 text-sm ring-offset-background placeholder:italic placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 ",
          className
        )}
        placeholder="Paste the text..."
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
