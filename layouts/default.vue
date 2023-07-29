<template>
  <div>
    <div
      v-if="$nuxt.isOffline"
      class="fixed top-0 w-full text-white text-center py-2 text-xs"
    >
      Tidak terhubung, Periksa Jaringan Anda.
    </div>
    <NuxtPage />
  </div>
</template>
<script setup>
import axios from "axios";
const version = ref({});
const route = useRoute();

watch(route, (newV, oldV) => {
  axios.get("/api/version").then((r) => {
    if (r.data.last_build) {
      version.value = r.data;
    }
  });
  if (newV !== oldV) {
    location = location.origin + to.fullPath;
  }
});

</script>

<style>
html,
body {
  background: rgb(248 250 252);
}

body::-webkit-scrollbar,
.scroll__::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

body::-webkit-scrollbar-track,
.scroll__::-webkit-scrollbar-track {
  background: #c8d0d4;
}

body::-webkit-scrollbar-thumb,
.scroll__::-webkit-scrollbar-thumb {
  background-color: #00345e;
  border-radius: 20px;
  border: 3px solid #00345e;
}

.bars__ {
  position: relative;
  left: 230px;
  transition: width 1s ease-in-out;
}

/* mobile */
@media only screen and (max-width: 480px) {
  .margin-bar {
    margin-left: 0px;
  }
}

/* desktop */
@media only screen and (min-width: 1200px) {
  .margin-bar {
    margin-left: 230px;
  }
}

.page-enter-active {
  transition: all 0.2s ease-in;
}
.page-leave-active {
  transition: all 0.2s ease-out;
}
.page-enter-from, .page-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: trangrayY(10px);
  opacity: 0;
}

.select2 {
  width: 100% !important;
}
</style>
