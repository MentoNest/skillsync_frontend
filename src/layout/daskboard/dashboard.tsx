import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";

export const DashBoardLayOut = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Outlet/>
      <Footer />
    </>
  );
};
