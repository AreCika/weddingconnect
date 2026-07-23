"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail } from "lucide-react";
import { HibiscusIcon } from "@/components/decor/ornaments";

type InvitationGateProps = {
  brideName: string;
  groomName: string;
  onOpen: () => void;
};

function initial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

/**
 * Cover screen guests see first, modelled on the "tap to open" gate common
 * to Malaysian e-invites. It also doubles as the user gesture that unlocks
 * background-music autoplay, which browsers otherwise block.
 */
export function InvitationGate({ brideName, groomName, onOpen }: InvitationGateProps) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    onOpen();
  }

  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 overflow-hidden bg-background px-6 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--secondary)_0%,_var(--background)_70%)] opacity-70" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex flex-col items-center gap-6"
          >
            <div className="flex size-24 items-center justify-center rounded-full border border-primary/40 font-script text-4xl text-primary">
              {initial(brideName)}&amp;{initial(groomName)}
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-serif text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Together With Family
              </p>
              <h1 className="font-script text-4xl text-primary sm:text-5xl">
                {brideName} &amp; {groomName}
              </h1>
              <p className="font-serif text-sm text-muted-foreground">
                request the pleasure of your company
              </p>
            </div>

            <motion.button
              type="button"
              onClick={handleOpen}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(161,98,7,0.35)", "0 0 0 14px rgba(161,98,7,0)"] }}
              transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
              className="mt-2 flex items-center gap-2 rounded-full border border-primary bg-primary px-7 py-3 font-serif text-sm uppercase tracking-[0.2em] text-primary-foreground"
            >
              <Mail className="size-4" />
              Open Invitation
            </motion.button>

            <HibiscusIcon className="size-6 text-primary/50" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
