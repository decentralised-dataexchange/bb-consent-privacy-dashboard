import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import {reactI18nextModule} from "react-i18next";
import {resources} from "./resources";

let options = {
    // order and from where user language should be detected
    order: ["cookie", "localStorage"],

    // keys or params to lookup language from
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ["localStorage", "cookie"],
    excludeCacheFor: ["cimode"] // languages to not persist (cookie, localStorage)
};


i18n
    .use(reactI18nextModule)
    .use(detector)
    .init({
        debug: false,
        lng: localStorage.getItem("i18nextLng") || "sv",
        fallbackLng: "en",
        resources: resources,
        react: {
            wait: false,
            bindI18n: "languageChanged loaded",
            bindStore: "added removed",
            nsMode: "default"
        },
        detection: options
    });
export default i18n;
