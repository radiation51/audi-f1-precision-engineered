import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AudiRings } from "./Logo";

export function BootLoader() {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3"
            >
              <AudiRings className="h-10 w-auto text-foreground" />
              <span className="h-6 w-px bg-border" />
              <span className="font-display text-lg font-bold uppercase tracking-[0.35em]">
                F1<span className="text-primary">.</span>
              </span>
            </motion.div>
            <div className="relative h-[2px] w-40 overflow-hidden rounded-full bg-border">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
                className="absolute inset-y-0 w-1/2 bg-primary"
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              Booting telemetry
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
