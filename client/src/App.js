import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Error,
  About,
  Products,
  Citizenship
} from "./pages";
import XML from "./pages/sitemap.xml"


import i18next from 'i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Helmet } from 'react-helmet';


import 'bootstrap/dist/js/bootstrap.js'
//import 'bootstrap/dist/css/bootstrap.min.css'
import 'flag-icon-css/css/flag-icon.min.css'


i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['ru', 'en', 'tr', 'ar'],
    fallbackLng: 'ru',
    debug: false,
    // Options for language detector
    detection: {
      order: ['cookie', 'htmlTag', 'path'],
      caches: ['cookie'],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: '../assets/locales/{{lng}}/translation.json',
    },
  })



const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
)

function App() {
  return (
    <Suspense fallback={loadingMarkup}>
      <React.StrictMode>
        <div className="app">
          <Helmet>
            <title>Квартира в Турции</title>
            <meta name='description' content='Купить квартиру, недвижимость в Турции легко. Предложения от застойщиков' />
            <meta name="keywords" content="Продажа квартир недвижимости в Стамбуле, Бейликдюзю цены отзывы контакты адрес"></meta>
          </Helmet>
          <Router>
            <Navbar />
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/citizen">
                <Citizenship />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/products/:id" children={<SingleProduct />} />
              <Route component={XML} path={"/sitemap.xml"} />
              <Route path="*">
                <Error />
              </Route>
            </Switch>
            <Footer />
          </Router>
        </div>
      </React.StrictMode>
    </Suspense>
  );
}

export default App;
