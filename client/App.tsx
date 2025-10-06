import "./global.css";
import "./lib/patchResizeObserver";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Hydropower from "./pages/services/Hydropower";
import ProjectDetail from "./pages/projects/ProjectDetail";
import Article from "./pages/blog/Article";
import MediumVoltage from "./pages/services/MediumVoltage";
import Sollatek from "./pages/services/Sollatek";
import Layout from "./components/site/Layout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminNewToday from "./pages/admin/AdminNewToday";
import AdminActiveAdmins from "./pages/admin/AdminActiveAdmins";
import AdminChatbotSessions from "./pages/admin/AdminChatbotSessions";
import AdminTeam from "./pages/admin/AdminTeam";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminAuthLayout from "./components/admin/AdminAuthLayout";
import AdminAppLayout from "./components/admin/AdminAppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/hydropower" element={<Hydropower />} />
            <Route
              path="/services/medium-voltage"
              element={<MediumVoltage />}
            />
            <Route path="/services/sollatek" element={<Sollatek />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin-rank" element={<AdminAuthLayout />}>
            <Route index element={<AdminLogin />} />
            <Route path="signup" element={<AdminSignup />} />
            <Route path="*" element={<AdminLogin />} />
          </Route>
          <Route path="/admin-rank/dashboard" element={<AdminAppLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="recent" element={<AdminSubmissions />} />
            <Route path="new-today" element={<AdminNewToday />} />
            <Route path="active-admins" element={<AdminActiveAdmins />} />
            <Route path="team" element={<AdminTeam />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
