import Sidebar from "./Sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex">
        {/* Sidebar (always visible) */}
        <Sidebar />
  
        {/* Main content (changes dynamically) */}
        <main className=" flex-1">{children}</main>
      </div>
    );
  }
  