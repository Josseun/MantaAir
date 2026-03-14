<template>
  <nav
    class="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-30"
  >
    <RouterLink to="/home" class="flex items-center gap-2">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </div>
        <span class="font-black text-slate-900 tracking-tight text-lg"
          >MantaAir</span
        >
      </div>
    </RouterLink>

    <div class="hidden md:flex items-center gap-1">
      <RouterLink
        to="/home"
        v-if="isAuthenticated"
        class="px-4 py-2 rounded-xl text-sm font-bold transition-all"
        :class="
          $route.path === '/home'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        "
      >
        Home
      </RouterLink>
      <RouterLink
        to="/ExplorePage"
        v-if="isAuthenticated"
        class="px-4 py-2 rounded-xl text-sm font-bold transition-all"
        :class="
          $route.path === '/ExplorePage'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        "
      >
        Explore
      </RouterLink>
      <RouterLink
        v-if="isAuthenticated"
        to="/dashboard"
        class="px-4 py-2 rounded-xl text-sm font-bold transition-all"
        :class="
          $route.path === '/dashboard'
            ? 'bg-indigo-50 text-indigo-600'
            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
        "
      >
        My Trips
      </RouterLink>
    </div>

    <div class="flex items-center gap-3">
      <template v-if="!isAuthenticated">
        <RouterLink
          to="/login"
          class="px-4 py-2 text-sm font-bold hidden lg:block md:block text-slate-600 hover:text-slate-900 transition"
        >
          Login
        </RouterLink>
        <RouterLink
          to="/signup"
          class="px-4 py-2 bg-indigo-600 hidden lg:block md:block text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition shadow-sm"
        >
          Sign Up
        </RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/profile" class="flex items-center gap-2 group">
          <div
            class="w-9 h-9 rounded-full bg-indigo-100 border-2 border-indigo-200 shadow-sm flex items-center justify-center font-black text-indigo-600 text-sm hover:bg-indigo-600 hover:text-white transition-colors"
          >
            {{ userInitial }}
          </div>
        </RouterLink>
        <button
          @click="handleLogout"
          class="px-4 py-2 text-sm font-bold text-slate-400 hover:text-red-500 transition cursor-pointer"
        >
          Logout
        </button>
      </template>
    </div>

    <button
      @click="mobileOpen = !mobileOpen"
      class="md:hidden p-2 text-slate-400 hover:text-slate-900 transition"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path v-if="!mobileOpen" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        <path v-else stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </nav>

  <div
    v-if="mobileOpen"
    class="md:hidden bg-white border-b border-slate-200 px-8 py-4 space-y-2"
  >
    <RouterLink
      @click="mobileOpen = false"
      to="/home"
      v-if="isAuthenticated"
      class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
      >Home</RouterLink
    >
    <RouterLink
      @click="mobileOpen = false"
      to="/ExplorePage"
      v-if="isAuthenticated"
      class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
      >Explore</RouterLink
    >
    <RouterLink
      @click="mobileOpen = false"
      v-if="isAuthenticated"
      to="/dashboard"
      class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
      >My Trips</RouterLink
    >
    <RouterLink
      @click="mobileOpen = false"
      v-if="!isAuthenticated"
      to="/login"
      class="block px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
      >Login</RouterLink
    >
    <RouterLink
      @click="mobileOpen = false"
      v-if="!isAuthenticated"
      to="/signup"
      class="block px-4 py-3 rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50"
      >Sign Up</RouterLink
    >
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const mobileOpen = ref(false);

const isAuthenticated = computed(() => !!localStorage.getItem("user_token"));

const userName = ref(localStorage.getItem("username") || "User");

onMounted(() => {
  const savedName = localStorage.getItem("username");
  if (savedName) userName.value = savedName;
});

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase();
});

const handleLogout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("username");
  localStorage.removeItem("user_email");
  router.push("/");
};
</script>
