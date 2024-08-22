import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="flex flex-col min-h-screen">
      <div className="flex">
        <SideNav/>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </main>
  );
}
