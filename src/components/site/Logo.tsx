import { cn } from "@/lib/utils";

export function AudiRings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 124 36" fill="none" className={cn("h-6 w-auto", className)} aria-hidden>
      {[18, 46, 74, 102].map((cx) => (
        <circle
          key={cx}
          cx={cx}
          cy={18}
          r={17}
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <AudiRings className="h-6 w-auto text-foreground" />
      {!compact && (
        <div className="flex items-center gap-2">
          <span className="h-4 w-px bg-border" />
          <span className="font-display text-sm font-bold uppercase tracking-[0.25em]">
            F1<span className="text-primary">.</span>
          </span>
        </div>
      )}
    </div>
  );
}
