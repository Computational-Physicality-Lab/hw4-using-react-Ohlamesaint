import React, { FC } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import { Outlet } from "react-router-dom";

interface RootLayoutProps {
  cartNumber: number
}

const RootLayout: FC<RootLayoutProps> = ({cartNumber}) => (
  <div>
    <Header cartNumber={Number(cartNumber)}/>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;
