<template>
  <div class="page-background flex items-start">
    <BaseSidebar />

    <main :class="`main bg-gray-100 w-full`">
      <BaseHeader />

      <div class="base-padding bg-gray-100 p-6 h-full">
        <div class="page bg-white rounded-md">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.page-background {
  height: 100vh;
}
.main {
  transition: all ease-in-out 0.4s;
  height: 100vh;
  margin-left: 260px;
  @media (max-width: 1024px) {
    margin-left: 0;
  }
}

.page {
  height: 100%;
}
</style>