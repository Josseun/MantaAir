<template>
  <header
    class="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto relative z-20"
  >
    <router-link to="/">
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

        <span class="text-xl font-bold text-slate-900 tracking-tight"
          >MantaAir</span
        >
      </div>
    </router-link>
  </header>
</template>
