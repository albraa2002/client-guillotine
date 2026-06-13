import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skull } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-noir-950 flex items-center justify-center p-4">
      <div className="text-center">
        <Skull className="w-16 h-16 text-guillotine-500/50 mx-auto mb-6" />
        <h1 className="text-6xl font-display font-bold text-gray-800 dark:text-noir-100 mb-2">404</h1>
        <p className="text-gray-500 dark:text-noir-400 mb-8">This page has been terminated.</p>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
