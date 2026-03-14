<template>
  <div class="min-h-screen bg-slate-50 flex flex-col">
    <div class="flex flex-1 overflow-hidden">
      <aside
        class="hidden lg:block w-80 bg-white border-r border-slate-200 overflow-y-auto p-8 space-y-10"
      >
        <div>
          <h3
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4"
          >
            Sort By
          </h3>
          <div class="space-y-2">
            <button
              v-for="option in sortOptions"
              :key="option.value"
              @click="activeSort = option.value"
              class="w-full flex items-center justify-between px-4 py-3 rounded-xl border font-bold text-sm transition-all"
              :class="
                activeSort === option.value
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200'
              "
            >
              {{ option.label }}
              <span
                v-if="activeSort === option.value"
                class="w-2 h-2 rounded-full bg-indigo-600"
              ></span>
            </button>
          </div>
        </div>
        <div>
          <h3
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4"
          >
            Max Price
          </h3>
          <input
            type="range"
            v-model="maxPrice"
            :min="priceRange.min"
            :max="priceRange.max"
            step="10"
            class="w-full accent-indigo-600"
          />
          <div
            class="flex justify-between text-xs font-bold text-slate-500 mt-2"
          >
            <span>${{ priceRange.min }}</span>
            <span class="text-indigo-600">${{ maxPrice }}</span>
            <span>${{ priceRange.max }}</span>
          </div>
        </div>
        <div>
          <h3
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4"
          >
            Stops
          </h3>
          <div class="space-y-2">
            <label
              v-for="stop in stopOptions"
              :key="stop.value"
              class="flex items-center gap-3 p-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                :value="stop.value"
                v-model="selectedStops"
                class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span
                class="text-sm font-bold text-slate-600 group-hover:text-slate-900"
                >{{ stop.label }}</span
              >
            </label>
          </div>
        </div>
        <div v-if="availableAirlines.length">
          <h3
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-4"
          >
            Airlines
          </h3>
          <div class="space-y-2">
            <label
              v-for="airline in availableAirlines"
              :key="airline"
              class="flex items-center gap-3 p-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                :value="airline"
                v-model="selectedAirlines"
                class="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span
                class="text-sm font-bold text-slate-600 group-hover:text-slate-900"
                >{{ airline }}</span
              >
            </label>
          </div>
        </div>
      </aside>
      <main class="flex-1 overflow-y-auto bg-slate-50 p-8">
        <p
          v-if="!loading && flights.length"
          class="mb-6 text-sm text-slate-500 font-medium px-2"
        >
          Showing
          <span class="font-black text-slate-800">{{
            filteredAndSortedFlights.length
          }}</span>
          of {{ flights.length }} flights
          <span v-if="activeFiltersCount > 0" class="ml-2 text-indigo-600">
            ({{ activeFiltersCount }} filter{{
              activeFiltersCount > 1 ? "s" : ""
            }}
            active)
          </span>
        </p>
        <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 6"
            :key="i"
            class="h-64 bg-slate-200/50 animate-pulse rounded-[2rem]"
          ></div>
        </div>
        <div
          v-else-if="filteredAndSortedFlights.length > 0"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <FlightCard
            v-for="(flight, index) in filteredAndSortedFlights"
            :key="index"
            :flight="flight"
            @select="handleSelectFlight"
          />
        </div>
        <div
          v-else-if="
            flights.length > 0 && filteredAndSortedFlights.length === 0
          "
          class="text-center py-20"
        >
          <p class="text-2xl font-black text-slate-300 mb-2">No matches</p>
          <p class="text-slate-400 font-medium">Try adjusting your filters</p>
          <button
            @click="resetFilters"
            class="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700"
          >
            Clear Filters
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { flightService } from "@/services/amadeusApi";
import FlightCard from "@/components/FlightCard.vue";

const router = useRouter();

const flights = ref([]);
const loading = ref(false);
const activeSort = ref("cheapest");
const maxPrice = ref(2000);
const selectedStops = ref([]);
const selectedAirlines = ref([]);

const sortOptions = [
  { label: "Cheapest First", value: "cheapest" },
  { label: "Fastest First", value: "fastest" },
  { label: "Earliest Departure", value: "earliest" },
];

const stopOptions = [
  { label: "Direct only", value: 0 },
  { label: "1 Stop", value: 1 },
  { label: "2+ Stops", value: 2 },
];

const defaultRoutes = ["LHR", "JFK", "DXB", "CDG"];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const priceRange = computed(() => {
  if (!flights.value.length) return { min: 0, max: 2000 };
  const prices = flights.value.map((f) => parseFloat(f.price?.total || 0));
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
});

const availableAirlines = computed(() => {
  const codes = flights.value.map(
    (f) => f.itineraries?.[0]?.segments?.[0]?.carrierCode,
  );
  return [...new Set(codes)].filter(Boolean).sort();
});

const activeFiltersCount = computed(() => {
  let count = 0;
  if (selectedStops.value.length) count++;
  if (selectedAirlines.value.length) count++;
  if (maxPrice.value < priceRange.value.max) count++;
  return count;
});

const parseDuration = (durationStr = "") => {
  const hours = parseInt(durationStr.match(/(\d+)H/)?.[1] || 0);
  const mins = parseInt(durationStr.match(/(\d+)M/)?.[1] || 0);
  return hours * 60 + mins;
};

const filteredAndSortedFlights = computed(() => {
  let results = [...flights.value];

  results = results.filter(
    (f) => parseFloat(f.price?.total || 0) <= maxPrice.value,
  );

  if (selectedStops.value.length > 0) {
    results = results.filter((f) => {
      const stops = (f.itineraries?.[0]?.segments?.length || 1) - 1;
      if (selectedStops.value.includes(2))
        return selectedStops.value.includes(stops) || stops >= 2;
      return selectedStops.value.includes(stops);
    });
  }

  if (selectedAirlines.value.length > 0) {
    results = results.filter((f) => {
      const carrier = f.itineraries?.[0]?.segments?.[0]?.carrierCode;
      return selectedAirlines.value.includes(carrier);
    });
  }

  if (activeSort.value === "cheapest") {
    results.sort(
      (a, b) => parseFloat(a.price?.total) - parseFloat(b.price?.total),
    );
  } else if (activeSort.value === "fastest") {
    results.sort(
      (a, b) =>
        parseDuration(a.itineraries?.[0]?.duration) -
        parseDuration(b.itineraries?.[0]?.duration),
    );
  } else if (activeSort.value === "earliest") {
    results.sort(
      (a, b) =>
        new Date(a.itineraries?.[0]?.segments?.[0]?.departure?.at) -
        new Date(b.itineraries?.[0]?.segments?.[0]?.departure?.at),
    );
  }

  return results;
});

const resetFilters = () => {
  selectedStops.value = [];
  selectedAirlines.value = [];
  maxPrice.value = priceRange.value.max;
};

const handleSelectFlight = (flight) => {
  sessionStorage.setItem("selectedFlight", JSON.stringify(flight));
  router.push("/booking");
};

const triggerSearch = async () => {
  loading.value = true;
  flights.value = [];

  try {
    const allFlights = [];
    for (const dest of defaultRoutes) {
      try {
        const results = await flightService.searchFlightOffers({
          origin: "LOS",
          destination: dest,
          date: "2026-06-15",
          max: 30,
        });
        allFlights.push(...results);
        await delay(300);
      } catch (err) {
        console.warn(`Skipping ${dest}:`, err.message);
      }
    }
    flights.value = allFlights;
    maxPrice.value = priceRange.value.max;
  } catch (error) {
    console.error("Search failed:", error);
    flights.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  triggerSearch();
});
</script>
