<template>
  <div
    class="bg-white rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between h-full"
  >
    <div class="p-6 pb-4 flex justify-between items-start">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
        >
          {{ airlineCode }}
        </div>
        <div>
          <h3 class="font-bold text-slate-900">Flight {{ airlineCode }}</h3>
          <p
            class="text-xs font-medium text-slate-400 uppercase tracking-tighter"
          >
            {{ isDirect ? "Direct Flight" : `${stops} Stop(s)` }}
          </p>
        </div>
      </div>

      <span
        v-if="seatsAvailable"
        class="px-3 py-1 text-[10px] font-black rounded-full uppercase bg-green-50 text-green-600"
      >
        {{ seatsAvailable }} Seats Left
      </span>
    </div>

    <div
      class="px-6 py-6 flex items-center justify-between bg-slate-50/50 flex-1"
    >
      <div class="text-left">
        <p class="text-2xl font-black text-slate-900 leading-none">
          {{ departureTime }}
        </p>
        <p class="text-sm font-bold text-slate-500 mt-1">{{ departureCode }}</p>
      </div>

      <div
        class="flex-1 px-4 flex flex-col items-center justify-center relative"
      >
        <p class="text-[10px] font-bold text-slate-400 mb-2">
          {{ formattedDuration }}
        </p>

        <div class="w-full flex items-center">
          <div class="h-[2px] w-full bg-slate-200 rounded-full"></div>
          <svg
            class="w-4 h-4 text-indigo-400 mx-2 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
            />
          </svg>
          <div class="h-[2px] w-full bg-slate-200 rounded-full"></div>
        </div>
      </div>

      <div class="text-right">
        <p class="text-2xl font-black text-slate-900 leading-none">
          {{ arrivalTime }}
        </p>
        <p class="text-sm font-bold text-slate-500 mt-1">{{ arrivalCode }}</p>
      </div>
    </div>

    <div
      class="p-6 flex items-center justify-between border-t border-slate-100 bg-white"
    >
      <div>
        <p
          class="text-[10px] text-slate-400 font-bold uppercase tracking-widest"
        >
          Total Price
        </p>
        <p class="text-xl font-black text-indigo-600">
          {{ currencySymbol }}{{ price }}
        </p>
      </div>
      <button
        @click="$emit('select', props.flight)"
        class="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl group-hover:bg-indigo-600 transition-colors shadow-md"
      >
        Select
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  flight: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["select"]);

const itineraries = computed(() => props.flight.itineraries?.[0]);
const segments = computed(() => itineraries.value?.segments || []);
const firstSegment = computed(() => segments.value[0]);
const lastSegment = computed(() => segments.value[segments.value.length - 1]);

const departureCode = computed(
  () => firstSegment.value?.departure?.iataCode || "---",
);
const arrivalCode = computed(
  () => lastSegment.value?.arrival?.iataCode || "---",
);

const airlineCode = computed(() => firstSegment.value?.carrierCode || "??");

const price = computed(() => props.flight.price?.total || "0.00");
const currencySymbol = computed(() => {
  const code = props.flight.price?.currency;
  return code === "EUR" ? "€" : code === "USD" ? "$" : code;
});

const stops = computed(() => segments.value.length - 1);
const isDirect = computed(() => stops.value === 0);
const seatsAvailable = computed(() => props.flight.numberOfBookableSeats);

const formatTime = (dateString) => {
  if (!dateString) return "--:--";
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const departureTime = computed(() =>
  formatTime(firstSegment.value?.departure?.at),
);
const arrivalTime = computed(() => formatTime(lastSegment.value?.arrival?.at));

const formattedDuration = computed(() => {
  let durationStr = itineraries.value?.duration || "";
  return durationStr
    .replace("PT", "")
    .replace("H", "h ")
    .replace("M", "m")
    .toLowerCase();
});
</script>
