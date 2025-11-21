import "react-i18next";
import type enHome from "./locales/en/home.json";
import type enAbout from "./locales/en/about.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "home";
    resources: {
      home: typeof enHome;
      about: typeof enAbout;
    };
  }
}
