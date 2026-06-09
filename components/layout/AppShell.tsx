import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 lg:block overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
