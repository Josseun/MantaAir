<template>
  <div class="relative min-h-screen bg-white overflow-hidden font-sans">
    <Navbar />

    <main class="relative pt-16 pb-20 lg:pt-24 lg:pb-32 max-w-7xl mx-auto px-6">
      <div class="lg:grid lg:grid-cols-12 lg:gap-12 items-center">
        <div
          class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
        >
          <h1
            class="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl"
          >
            Flight booking, <br />
            <span class="text-indigo-600">reimagined for speed.</span>
          </h1>
          <p class="mt-6 text-lg text-slate-600 sm:mt-8 leading-relaxed">
            MantaAir is a next-generation travel dashboard built for the modern
            nomad. Book flights in seconds, track your journeys, and manage your
            travel expenses all in one place.
          </p>

          <div class="mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
            <button
              @click="goToStart"
              class="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-all transform hover:scale-105 shadow-xl shadow-indigo-200 cursor-pointer"
            >
              Start Exploring Free
            </button>
          </div>

          <div
            class="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium sm:justify-center lg:justify-start"
          >
            <div class="flex -space-x-2">
              <img
                class="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                src="https://i.pravatar.cc/100?img=1"
                alt=""
              />
              <img
                class="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                src="https://i.pravatar.cc/100?img=2"
                alt=""
              />
              <img
                class="w-8 h-8 rounded-full border-2 border-white bg-slate-200"
                src="https://i.pravatar.cc/100?img=3"
                alt=""
              />
            </div>
            <span>Joined by 2,000+ travelers this week</span>
          </div>
        </div>

        <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6 relative">
          <div
            class="bg-slate-100 rounded-[2.5rem] p-4 shadow-inner relative overflow-hidden"
          >
            <div
              class="bg-white rounded-[1.8rem] shadow-2xl border border-slate-200 aspect-video md:aspect-[4/3] overflow-hidden"
            >
              <div
                class="h-12 border-b border-slate-100 bg-slate-50 flex items-center px-4 gap-2"
              >
                <div class="w-3 h-3 rounded-full bg-red-400"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div class="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div class="p-6 space-y-4">
                <div
                  class="h-6 w-1/3 bg-slate-100 rounded-lg animate-pulse"
                ></div>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="h-32 bg-indigo-50 rounded-2xl border-2 border-indigo-100 flex items-center justify-center"
                  >
                    <span class="text-indigo-300 font-bold">Flight Data</span>
                  </div>
                  <div
                    class="h-32 bg-slate-50 rounded-2xl flex items-center justify-center"
                  >
                    <span class="text-slate-200 font-bold">Analytics</span>
                  </div>
                </div>
                <div class="h-24 bg-slate-50 rounded-2xl w-full"></div>
              </div>
            </div>
          </div>
          <div
            class="absolute -top-12 -right-12 w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          ></div>
          <div
            class="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"
          ></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "../components/Navbar.vue";

const router = useRouter();

const isAuthenticated = computed(() => !!localStorage.getItem("user_token"));

const goToSignup = () => router.push("/signup");
const goToLogin = () => router.push("/login");
const goToExplore = () => router.push("/login");

const goToStart = () => {
  if (isAuthenticated.value) {
    router.push("/home");
  } else {
    router.push("/login");
  }
};

const scrollToFeatures = () => {
  document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
