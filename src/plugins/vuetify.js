import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import de from "vuetify/es5/locale/de";

Vue.use(Vuetify, {
  theme: {
    primary: "#008d58",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107"
  },
  iconfont: "md",
  lang: {
    locales: { de },
    current: "de"
  }
});
