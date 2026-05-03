"use client";
import { homeData } from "@/page-data/home/home.model";
import HomePageView from "./HomePage.view";

const HomePageController = () => {
  return <HomePageView techArsenal={homeData.techArsenal} />;
};

export default HomePageController;
