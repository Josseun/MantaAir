<template>
  <footer class="bg-slate-900 text-white">
    <div class="max-w-6xl mx-auto px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div class="lg:col-span-1">
          <div
            @click="goToHome"
            class="flex items-center gap-2 mb-4 cursor-pointer"
          >
            <div
              class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
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
            <span class="font-black text-white tracking-tight text-lg"
              >MantaAir</span
            >
          </div>
          <p class="text-slate-400 text-sm leading-relaxed mb-6">
            Next-generation flight booking built for modern travelers. Book
            fast, fly smart.
          </p>
          <div class="flex items-center gap-3">
            <a
              href="#"
              class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
            >
              <svg
                class="w-4 h-4 text-slate-400 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
            >
              <svg
                class="w-4 h-4 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
            <a
              href="#"
              class="w-9 h-9 rounded-xl bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
            >
              <svg
                class="w-4 h-4 text-slate-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3
            class="font-black text-sm uppercase tracking-widest text-slate-400 mb-5"
          >
            Company
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >About Us</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Careers</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Press</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Blog</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="font-black text-sm uppercase tracking-widest text-slate-400 mb-5"
          >
            Product
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/ExplorePage"
                class="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                Explore Flights
              </router-link>
            </li>
            <li>
              <router-link
                to="/dashboard"
                class="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                My Trips
              </router-link>
            </li>
            <li>
              <router-link
                to="/profile"
                class="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                My Profile
              </router-link>
            </li>
            <li>
              <span
                class="text-slate-600 text-sm font-medium flex items-center gap-2"
              >
                Live Tracker
                <span
                  class="bg-indigo-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full tracking-widest"
                  >PRO</span
                >
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3
            class="font-black text-sm uppercase tracking-widest text-slate-400 mb-5"
          >
            Support
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Help Center</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Privacy Policy</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Terms of Service</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-slate-400 text-sm font-medium transition-colors cursor-not-allowed"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="border-t border-slate-800">
      <div
        class="max-w-6xl mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <p class="text-slate-500 text-xs font-medium">
          © 2026 MantaAir. All rights reserved.
        </p>
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <p class="text-slate-500 text-xs font-medium">
            All systems operational
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isAuthenticated = computed(() => !!localStorage.getItem("user_token"));

const goToHome = () => {
  if (isAuthenticated.value) {
    router.push("/home");
  } else {
    router.push("/");
  }
};

const navigateTo = (path) => {
  if (isAuthenticated.value) {
    router.push(path);
  } else {
    router.push("/login");
  }
};
</script>
