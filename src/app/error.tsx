"use client";

import { Button } from "@/components/ui/button";
import { Skull } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-noir-950 flex items-center justify-center p-4">
      <div className="text-center">
        <Skull className="w-16 h-16 text-profit-negative/50 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold text-gray-800 dark:text-noir-100 mb-2">System Error</h1>
        <p className="text-gray-500 dark:text-noir-400 mb-8">Something went wrong in the execution.</p>
        <Button onClick={reset}>Try Again</Button>
      </div>
    </div>
  );
}
