<template>
  <div
    class="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6 py-12"
  >
    <div class="max-w-lg w-full flex flex-col gap-6">
      <div class="flex flex-col items-center text-center gap-4">
        <div
          class="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <svg
            class="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">
            Booking Confirmed!
          </h1>
          <p class="text-slate-400 font-medium mt-1">
            Your flight has been successfully booked
          </p>
        </div>
      </div>

      <div class="bg-indigo-600 rounded-[1.5rem] p-6 text-white text-center">
        <p
          class="text-xs font-black uppercase tracking-widest text-indigo-200 mb-2"
        >
          Booking Reference
        </p>
        <p class="text-3xl font-black tracking-widest">{{ bookingRef }}</p>
        <p class="text-xs text-indigo-300 mt-2 font-medium">
          Save this number for check-in
        </p>
      </div>

      <div
        class="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6"
      >
        <p
          class="text-xs font-black text-slate-400 uppercase tracking-widest mb-5"
        >
          Flight Details
        </p>

        <div class="flex items-center justify-between mb-6">
          <div class="text-center">
            <p class="text-3xl font-black text-slate-900">
              {{ booking.flightfrom }}
            </p>
            <p class="text-xs text-slate-400 font-semibold mt-1">Departure</p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <svg
              class="w-6 h-6 text-indigo-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              />
            </svg>
            <p class="text-[10px] text-slate-400 font-bold">
              {{ booking.airline }}
            </p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-black text-slate-900">
              {{ booking.flightto }}
            </p>
            <p class="text-xs text-slate-400 font-semibold mt-1">Arrival</p>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-5 grid grid-cols-2 gap-4">
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Date
            </p>
            <p class="text-sm font-bold text-slate-900">
              {{ booking.flightdate }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Total Paid
            </p>
            <p class="text-sm font-black text-indigo-600">
              ${{ booking.flightprice }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Passenger
            </p>
            <p class="text-sm font-bold text-slate-900">
              {{ booking.firstname }} {{ booking.lastname }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Status
            </p>
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-600 text-xs font-black rounded-full uppercase"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              {{ booking.status }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6"
      >
        <p
          class="text-xs font-black text-slate-400 uppercase tracking-widest mb-5"
        >
          Passenger Details
        </p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Email
            </p>
            <p class="text-sm font-medium text-slate-900 truncate">
              {{ booking.email }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Phone
            </p>
            <p class="text-sm font-medium text-slate-900">
              {{ booking.phone }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Gender
            </p>
            <p class="text-sm font-medium text-slate-900 capitalize">
              {{ booking.gender }}
            </p>
          </div>
          <div>
            <p
              class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
            >
              Passport
            </p>
            <p class="text-sm font-medium text-slate-900 uppercase">
              {{ booking.passport }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4"
      >
        <svg
          class="w-5 h-5 text-blue-500 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <p class="text-sm text-blue-700 font-medium">
          A confirmation has been sent to
          <span class="font-black">{{ booking.email }}</span>
        </p>
      </div>

      <div class="flex gap-3">
        <router-link
          to="/dashboard"
          class="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-[1.25rem] transition-colors text-center"
        >
          View My Trips
        </router-link>
        <router-link
          to="/ExplorePage"
          class="flex-1 py-4 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 font-black text-sm rounded-[1.25rem] transition-colors text-center"
        >
          Book Another
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const booking = ref({});

onMounted(() => {
  const stored = sessionStorage.getItem("bookingData");
  if (!stored) {
    router.push("/ExplorePage");
    return;
  }
  booking.value = JSON.parse(stored);
});


const bookingRef = computed(() => {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return "MTA-" + random;
});
</script>
