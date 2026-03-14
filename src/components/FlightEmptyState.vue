<template>
  <div
    class="col-span-full py-20 flex flex-col items-center justify-center text-center animate-fade-in"
  >
    <div class="relative mb-8">
      <div
        class="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-30 scale-150"
      ></div>

      <div
        class="relative w-32 h-32 bg-white rounded-full shadow-xl flex items-center justify-center border border-slate-100"
      >
        <svg
          class="w-16 h-16 text-slate-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div
          class="absolute -top-1 -right-1 w-10 h-10 bg-red-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
      </div>
    </div>

    <h3 class="text-2xl font-black text-slate-900 mb-3">No Flights Found</h3>
    <p class="text-slate-500 max-w-sm mx-auto leading-relaxed mb-8">
      We couldn't find any active flights for that search. Try a different IATA
      code or check for scheduled flights instead.
    </p>

    <div class="flex flex-col sm:flex-row gap-4">
      <button
        @click="$emit('reset')"
        class="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
      >
        Show All Active Flights
      </button>
      <button
        @click="$emit('search-help')"
        class="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-2xl font-black text-sm hover:border-indigo-600 hover:text-indigo-600 transition-all"
      >
        View IATA Guide
      </button>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
x