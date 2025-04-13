// Application Defualt Routes Outlet

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import ZapChatWidget from "@/components/ZapChatWidget/ZapChatWidget";
import useAuth from "@/hooks/useAuth";

const Layout = () => {
  const { user } = useAuth();
  return (
    <>
      {/* Header */}
      <Header />
      {user && <ZapChatWidget />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
