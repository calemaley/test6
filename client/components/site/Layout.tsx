import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import SnakeCursor from "./cursors/SnakeCursor";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SnakeCursor />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
