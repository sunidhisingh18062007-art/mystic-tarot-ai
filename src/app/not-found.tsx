"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-indigo-900/20" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center px-4"
      >
        {/* Mystical 404 */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8"
        >
          <span className="text-8xl md:text-9xl font-bold gradient-text">404</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            The Cards Cannot Find This Page
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The mystical forces have spoken — this page does not exist in our realm. 
            Perhaps the stars will guide you back to familiar territory.
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-medium rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
