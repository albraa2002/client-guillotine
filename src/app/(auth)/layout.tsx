export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-noir-gradient flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-cyber-grid bg-[length:60px_60px] opacity-30 pointer-events-none hidden dark:block" />
      {children}
    </div>
  );
}
