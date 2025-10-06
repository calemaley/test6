import Header from "./Header";
import Footer from "./Footer";
import SiteHeader from "./Header";
import { Outlet } from "react-router-dom";
import SnakeCursor from "./cursors/SnakeCursor";
import JbrankyChatbot from "./chatbot/JbrankyChatbot";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="hidden md:block">
        <SnakeCursor />
      </div>
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <JbrankyChatbot />
    </div>
  );
}
