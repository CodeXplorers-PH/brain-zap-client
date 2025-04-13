// Application Defualt Routes Outlet

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";
import ZapChatWidget from "@/components/ZapChatWidget/ZapChatWidget";

const Layout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      <ZapChatWidget userType="elite"></ZapChatWidget>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
