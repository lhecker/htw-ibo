import "./styles/main.scss";

import reactMain from "./react/main";
import vueMain from "./vue/main";

(() => {
    const pathname = location.pathname;

    if (pathname.includes("vue")) {
        vueMain();
        return;
    }

    if (pathname.includes("react")) {
        reactMain();
        return;
    }

    alert("Please include vue/react in the pathname");
})();
