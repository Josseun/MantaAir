<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <!-- MAIN -->
    <main class="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-12">
      <!-- GREETING -->
      <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div>
          <p
            class="text-xs font-black text-indigo-600 uppercase tracking-widest mb-2"
          >
            {{ timeOfDay }}
          </p>
          <h1
            class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3"
          >
            {{ userName }} <span class="inline-block animate-bounce">👋</span>
          </h1>
          <p class="text-slate-500 font-medium text-lg">
            Ready for your next adventure?
          </p>
        </div>

        <!-- Plane card -->
        <div class="bg-slate-900 rounded-[1.75rem] p-6 text-white">
          <div class="flex items-center gap-4 mb-6">
            <div class="flex-shrink-0 text-center">
              <p class="text-3xl font-black tracking-tight">LOS</p>
              <p class="text-xs text-slate-500 mt-1">Lagos</p>
            </div>
            <div class="flex-1 flex items-center gap-2">
              <div class="flex-1 h-px bg-slate-700"></div>
              <svg
                class="w-5 h-5 text-indigo-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                />
              </svg>
              <div class="flex-1 h-px bg-slate-700"></div>
            </div>
            <div class="flex-shrink-0 text-center">
              <p class="text-3xl font-black tracking-tight text-slate-500">
                ???
              </p>
              <p class="text-xs text-slate-600 mt-1">Anywhere</p>
            </div>
          </div>
          <router-link
            to="/ExplorePage"
            class="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm py-3 rounded-xl transition-colors"
          >
            Find my flight →
          </router-link>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <h2 class="text-lg font-black text-slate-900 tracking-tight">
          Quick Actions
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link
            to="/ExplorePage"
            class="bg-indigo-600 hover:bg-indigo-700 rounded-[1.25rem] p-5 text-white transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-200 block"
          >
            <p class="text-2xl mb-3">✈️</p>
            <p class="font-black text-sm mb-1">Browse Flights</p>
            <p class="text-xs text-indigo-200">Search from LOS</p>
          </router-link>

          <router-link
            to="/dashboard"
            class="bg-white border border-slate-200 hover:border-indigo-200 rounded-[1.25rem] p-5 text-slate-900 transition-all hover:-translate-y-1 hover:shadow-lg block"
          >
            <p class="text-2xl mb-3">🧳</p>
            <p class="font-black text-sm mb-1">My Trips</p>
            <p class="text-xs text-slate-400">View bookings</p>
          </router-link>

          <router-link
            to="/profile"
            class="bg-white border border-slate-200 hover:border-indigo-200 rounded-[1.25rem] p-5 text-slate-900 transition-all hover:-translate-y-1 hover:shadow-lg block"
          >
            <p class="text-2xl mb-3">🪪</p>
            <p class="font-black text-sm mb-1">My Profile</p>
            <p class="text-xs text-slate-400">Manage details</p>
          </router-link>

          <div
            class="bg-white border border-slate-200 rounded-[1.25rem] p-5 opacity-50 cursor-not-allowed relative"
          >
            <span
              class="absolute top-3 right-3 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest"
              >PRO</span
            >
            <p class="text-2xl mb-3">📡</p>
            <p class="font-black text-sm text-slate-900 mb-1">Live Tracker</p>
            <p class="text-xs text-slate-400">Pro feature</p>
          </div>
        </div>
      </section>

      <!-- POPULAR ROUTES -->
      <section class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-black text-slate-900 tracking-tight">
            Popular Routes from Lagos
          </h2>
          <router-link
            to="/ExplorePage"
            class="text-sm font-bold text-indigo-600 hover:opacity-70 transition-opacity"
            >See all →</router-link
          >
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <router-link
            v-for="route in popularRoutes"
            :key="route.code"
            to="/ExplorePage"
            class="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl px-5 py-4 flex items-center gap-4 transition-all hover:shadow-md group"
          >
            <span class="text-3xl flex-shrink-0">{{ route.emoji }}</span>
            <div class="flex-1 min-w-0">
              <p class="font-black text-slate-900 text-sm">{{ route.city }}</p>
              <p class="text-xs text-slate-400 font-semibold mt-0.5">
                LOS → {{ route.code }}
              </p>
            </div>
            <div class="text-right flex-shrink-0">
              <p
                class="text-[10px] text-slate-300 font-bold uppercase tracking-widest"
              >
                from
              </p>
              <p
                class="font-black text-indigo-600 text-sm group-hover:text-indigo-700"
              >
                {{ route.price }}
              </p>
            </div>
          </router-link>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const userName = ref(localStorage.getItem("username") || "Traveler");

onMounted(() => {
  const savedName = localStorage.getItem("username");
  if (savedName) userName.value = savedName;
});

const userInitial = computed(() => userName.value.charAt(0).toUpperCase());

const timeOfDay = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning,";
  if (hour < 17) return "Good afternoon,";
  return "Good evening,";
});

const popularRoutes = [
  { city: "London", code: "LHR", price: "$392", emoji: "🇬🇧" },
  { city: "New York", code: "JFK", price: "$780", emoji: "🇺🇸" },
  { city: "Dubai", code: "DXB", price: "$410", emoji: "🇦🇪" },
  { city: "Paris", code: "CDG", price: "$465", emoji: "🇫🇷" },
  { city: "Istanbul", code: "IST", price: "$330", emoji: "🇹🇷" },
  { city: "Nairobi", code: "NBO", price: "$210", emoji: "🇰🇪" },
];
</script>
