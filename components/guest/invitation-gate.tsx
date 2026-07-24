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

const CURTAIN_TRANSITION = {
  duration: 1.5,
  ease: [0.65, 0, 0.35, 1] as [number, number, number, number],
};

/** "Tap to open" cover screen (a Malaysian e-invite convention); its click also unlocks background-music autoplay, which browsers otherwise block. */
export function InvitationGate({ brideName, groomName, onOpen }: InvitationGateProps) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen(true);
    onOpen();
  }

  return (
    <AnimatePresence>
      {!open && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Left curtain panel — gradient centered on its own right edge so
              the two halves read as one continuous backdrop while closed. */}
          <motion.div
            exit={{ x: "-100%" }}
            transition={CURTAIN_TRANSITION}
            className="absolute inset-y-0 left-0 w-1/2 bg-background"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,_var(--secondary)_0%,_var(--background)_70%)] opacity-70" />
          </motion.div>

          {/* Right curtain panel — mirrored. */}
          <motion.div
            exit={{ x: "100%" }}
            transition={CURTAIN_TRANSITION}
            className="absolute inset-y-0 right-0 w-1/2 bg-background"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_50%,_var(--secondary)_0%,_var(--background)_70%)] opacity-70" />
          </motion.div>

          {/* Center content, above both panels — fades out faster so it
              doesn't linger after the curtains have parted. */}
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex h-full flex-col items-center justify-center gap-8 px-6 text-center"
          >
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
        </div>
      )}
    </AnimatePresence>
  );
}
