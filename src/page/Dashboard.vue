<template>
  <div class="min-h-screen bg-slate-50">
    <main class="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-8">
      <header class="mb-8">
        <h2 class="text-3xl font-extrabold text-gray-900">
          {{ userName }} Dashboard
        </h2>
        <p class="text-gray-500 mt-2">
          Manage your appointments and bookings below.
        </p>
      </header>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-black text-slate-900 tracking-tight">
            My Trips
          </h1>
          <p class="text-slate-400 font-medium mt-1">
            All your booked flights in one place
          </p>
        </div>
        <router-link
          to="/ExplorePage"
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm px-5 py-2.5 rounded-full transition-colors"
        >
          + Book Flight
        </router-link>
      </div>

      <!-- LOADING STATE -->
      <div v-if="isLoading" class="flex flex-col gap-4">
        <div
          v-for="i in 3"
          :key="i"
          class="bg-white rounded-[1.5rem] border border-slate-200 p-6 animate-pulse"
        >
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-slate-100 rounded-xl"></div>
            <div class="flex-1 flex flex-col gap-2">
              <div class="h-4 bg-slate-100 rounded-full w-1/3"></div>
              <div class="h-3 bg-slate-100 rounded-full w-1/4"></div>
            </div>
            <div class="h-8 bg-slate-100 rounded-full w-24"></div>
          </div>
        </div>
      </div>

      <!-- ERROR STATE -->
      <div
        v-else-if="errorMessage"
        class="bg-red-50 border border-red-100 rounded-[1.5rem] p-8 text-center"
      >
        <p class="text-4xl mb-3">⚠️</p>
        <p class="font-black text-red-600 mb-1">Failed to load trips</p>
        <p class="text-sm text-red-400 mb-5">{{ errorMessage }}</p>
        <button
          @click="fetchBookings"
          class="bg-red-600 hover:bg-red-700 text-white font-black text-sm px-6 py-2.5 rounded-full transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else-if="bookings.length === 0"
        class="bg-white border-2 border-dashed border-slate-200 rounded-[1.75rem] py-20 flex flex-col items-center justify-center text-center"
      >
        <p class="text-5xl mb-4">🧳</p>
        <p class="font-black text-slate-900 text-xl mb-1">No trips yet</p>
        <p class="text-slate-400 text-sm mb-6">
          Your booked flights will appear here
        </p>
        <router-link
          to="/ExplorePage"
          class="bg-slate-900 hover:bg-indigo-600 text-white font-black text-sm px-6 py-3 rounded-full transition-colors"
        >
          Book your first flight
        </router-link>
      </div>

      <!-- TRIPS LIST -->
      <div v-else class="flex flex-col gap-4">
        <p class="text-xs font-black text-slate-400 uppercase tracking-widest">
          {{ bookings.length }} trip{{ bookings.length > 1 ? "s" : "" }} found
        </p>

        <div
          v-for="(trip, index) in bookings"
          :key="index"
          class="bg-white rounded-[1.5rem] border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all p-6"
        >
          <div class="flex items-center gap-5 flex-wrap">
            <!-- Airline Badge -->
            <div
              class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-sm flex-shrink-0"
            >
              {{ trip.airline }}
            </div>

            <!-- Route + Passenger -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <span class="text-xl font-black text-slate-900">{{
                  trip.flightfrom
                }}</span>
                <svg
                  class="w-4 h-4 text-indigo-400 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                  />
                </svg>
                <span class="text-xl font-black text-slate-900">{{
                  trip.flightto
                }}</span>
              </div>
              <p class="text-xs text-slate-400 font-semibold">
                {{ trip.firstname }} {{ trip.lastname }} · {{ trip.flightdate }}
              </p>
            </div>

            <!-- Booking Ref -->
            <div class="hidden md:block text-center flex-shrink-0">
              <p
                class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1"
              >
                Ref
              </p>
              <p class="text-xs font-black text-slate-600 tracking-widest">
                {{
                  trip.bookingref || "MTA-" + String(index + 1).padStart(5, "0")
                }}
              </p>
            </div>

            <!-- Price -->
            <div class="text-right flex-shrink-0">
              <p
                class="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1"
              >
                Price
              </p>
              <p class="font-black text-indigo-600">${{ trip.flightprice }}</p>
            </div>

            <!-- Status Badge -->
            <div class="flex-shrink-0">
              <span
                :class="
                  trip.status === 'confirmed'
                    ? 'bg-green-50 text-green-600'
                    : trip.status === 'cancelled'
                      ? 'bg-red-50 text-red-500'
                      : 'bg-slate-100 text-slate-500'
                "
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-full uppercase tracking-widest"
              >
                <span
                  :class="
                    trip.status === 'confirmed'
                      ? 'bg-green-500'
                      : trip.status === 'cancelled'
                        ? 'bg-red-400'
                        : 'bg-slate-400'
                  "
                  class="w-1.5 h-1.5 rounded-full"
                ></span>
                {{ trip.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
    
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { manta } from "@/services/manta";

const userName = ref(localStorage.getItem("username") || "Traveler");

const bookings = ref([]);
const isLoading = ref(false);
const errorMessage = ref("");

const fetchBookings = async () => {
  isLoading.value = true;

  try {
    const userid = localStorage.getItem("username");
    const result = await manta.getAllBookings(userid);
    bookings.value = Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    errorMessage.value = error.message || "Failed to fetch saved data";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchBookings();
});
</script>
