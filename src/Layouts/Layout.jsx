// Application Defualt Routes Outlet

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Outlet, useLocation } from "react-router-dom";
import ZapChatWidget from "@/components/ZapChatWidget/ZapChatWidget";
import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const Layout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [chat, setChat] = useState(true);
  console.log(location?.pathname);

  useEffect(() => {
    const isQuizPage = location.pathname.startsWith("/quiz");
    setChat(!isQuizPage);
  }, [location?.pathname]);
  return (
    <>
      {/* Header */}
      <Header />
      {user && chat && <ZapChatWidget />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
