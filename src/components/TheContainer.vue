<script setup>
import { ref } from 'vue';
import BaseSideBar from './sideBar/BaseSideBar.vue';

const isDrawerOpen = ref(true);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>

<template>
  <div class="page-background flex items-start">
    <BaseSideBar :is-drawer-open="isDrawerOpen" @toggle-drawer="toggleDrawer" />
    <v-app-bar-nav-icon position="fixed" @click="toggleDrawer" color="white"></v-app-bar-nav-icon>
    <v-app-bar-title></v-app-bar-title>
    <main :class="`main bg-gray-100 w-full`">
      <div class="base-padding bg-gray-100 p-6 h-full">
        <div>
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.page-background {
  background-color: #212121;
  height: 100vh;
}

.main {
  transition: all ease-in-out 0.4s;
  height: 100vh;
  background-color: #1e1e1e;
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
}

.page {
  height: 100%;
}

.navbar {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.01);
  border: none;
}
</style>
