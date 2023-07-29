import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("VueBottomSheet", VueBottomSheet, {});
});
