<script setup>
import { useRouter } from 'vue-router';
import { userStore } from '@/stores/auth';
import { defineProps } from 'vue';

const props = defineProps({
  isDrawerOpen: Boolean
});

const authStore = userStore();
const { logout } = authStore;
const router = useRouter();

const items = [
  { text: 'Dashboard', icon: 'mdi-clock', route: '/home' },
  { text: 'Entradas', icon: 'mdi-view-dashboard-outline', route: '/entradas'},
  { text: 'Saídas', icon: 'mdi-view-dashboard', route: '/saidas' }
];

const userItems = [
  { text: 'Profile', icon: 'mdi-account', route: '/profile' },
  { text: 'Logout', icon: 'mdi-logout' }
];

const navigate = (route) => {
  router.push(route);
};

const handleLogout = async () => {
  await logout();
  localStorage.removeItem("token-auth");
  localStorage.removeItem("user_id");
  router.push({ path: "/" });
};
</script>

<template>
  <v-navigation-drawer :model-value="props.isDrawerOpen" app elevation="4" class="sidebar" theme="dark">
    <v-card class="mx-auto" max-width="300" flat>
      <v-row align="center" class="logo-container">
        <v-col cols="auto">
          <v-img src="../../assets/img/dashboard.png" height="40" class="logo"></v-img>
        </v-col>
        <v-col cols="auto">
          <span class="logo-text">Dashboard</span>
        </v-col>
      </v-row>

      <v-list>
        <v-list-subheader color="white">Financeiro</v-list-subheader>
        <v-list-item v-for="(item, i) in items" :key="i" @click="navigate(item.route)"
                     class="v-list-financial">
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>

      <v-list>
        <v-list-subheader color="white" >User Settings</v-list-subheader>
        <v-list-item v-for="(item, i) in userItems" :key="i"
                     @click="item.text === 'Logout' ? handleLogout() : navigate(item.route)"
                     class="v-list-user">
          <template #prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-container {
  margin-bottom: 10px;
  margin-top: 10px;
}

.logo {
  width: 40px;
  margin-left: 15px;
  margin-right: 1px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: white;
}

.sidebar {
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  color: white;
}

.v-list-financial:hover,
.v-list-user:hover {
  background-color: #686CFF;
  color: #fff;
}
</style>
