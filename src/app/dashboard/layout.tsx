import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex w-full">
        {/* Side Navigation */}
        <SideNav />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 transition-all duration-300">
          <div className="p-4 lg:p-6 h-full">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
