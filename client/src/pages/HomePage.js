import React from "react";
import {
  FeaturedProducts,
  Jumbotron,
  Services,
  Contact,
  LowerAnnouncement,

  // Slider
} from "../components";
import { Helmet } from "react-helmet";


const HomePage = () => {
  return (
    <main>
      <Helmet>
        <title>Istanbul-expert главная</title>
        <meta name="description" content="Наши услуги Популярная недвижимость Отзывы" />
        <meta name="keywords" content="istanbul-expert вся недвижимость связаться с нами" />
      </Helmet>
      <LowerAnnouncement />
      <Jumbotron />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default HomePage;
