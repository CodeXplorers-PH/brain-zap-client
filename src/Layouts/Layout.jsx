// Application Defualt Routes Outlet

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="bg-background-1 pb-80">
      {/* Header */}
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </main>
  );
};

export default Layout;
