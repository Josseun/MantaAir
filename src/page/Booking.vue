<template>
  <div class="min-h-screen bg-slate-50">
    <!-- HEADER -->
    <div
      class="bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-4 sticky top-0 z-30"
    >
      <button
        @click="router.back()"
        class="p-2 hover:bg-slate-100 rounded-xl transition-colors"
      >
        <svg
          class="w-5 h-5 text-slate-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-width="2.5" d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
      </button>
      <div class="flex-1">
        <h1 class="font-black text-slate-900 text-lg">Passenger Details</h1>
        <p class="text-xs text-slate-400 font-medium">
          Fill in your details to complete booking
        </p>
      </div>
      <!-- Step indicator -->
      <div class="flex items-center gap-2">
        <div
          class="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-black"
        >
          1
        </div>
        <div class="w-8 h-px bg-slate-200"></div>
        <div
          class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-400 text-xs font-black"
        >
          2
        </div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6">
      <!-- FLIGHT SUMMARY CARD -->
      <div
        class="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6"
      >
        <p
          class="text-xs font-black text-slate-400 uppercase tracking-widest mb-5"
        >
          Your Selected Flight
        </p>

        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Airline -->
          <div class="flex items-center gap-3">
            <div
              class="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-sm"
            >
              {{ flightSummary.airline }}
            </div>
            <div>
              <p class="font-black text-slate-900">
                Flight {{ flightSummary.airline }}
              </p>
              <p class="text-xs text-slate-400 font-semibold mt-0.5">
                {{ flightSummary.date }}
              </p>
            </div>
          </div>

          <!-- Route -->
          <div class="flex items-center gap-4">
            <div class="text-center">
              <p class="text-2xl font-black text-slate-900 leading-none">
                {{ flightSummary.from }}
              </p>
              <p class="text-xs text-slate-400 font-semibold mt-1">Departure</p>
            </div>
            <div class="flex flex-col items-center gap-1">
              <svg
                class="w-5 h-5 text-indigo-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
                />
              </svg>
            </div>
            <div class="text-center">
              <p class="text-2xl font-black text-slate-900 leading-none">
                {{ flightSummary.to }}
              </p>
              <p class="text-xs text-slate-400 font-semibold mt-1">Arrival</p>
            </div>
          </div>

          <!-- Price -->
          <div class="text-right">
            <p
              class="text-xs text-slate-400 font-bold uppercase tracking-widest"
            >
              Total Price
            </p>
            <p class="text-2xl font-black text-indigo-600">
              ${{ flightSummary.price }}
            </p>
          </div>
        </div>
      </div>

      <!-- PASSENGER FORM -->
      <div
        class="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm p-6"
      >
        <p
          class="text-xs font-black text-slate-400 uppercase tracking-widest mb-6"
        >
          Passenger Information
        </p>

        <div class="flex flex-col gap-5">
          <!-- Full Name -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >First Name</label
              >
              <input
                v-model="form.firstName"
                type="text"
                placeholder="As on passport"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >Last Name</label
              >
              <input
                v-model="form.lastName"
                type="text"
                placeholder="As on passport"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <!-- DOB + Gender -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >Date of Birth</label
              >
              <input
                v-model="form.dob"
                type="date"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >Gender</label
              >
              <select
                v-model="form.gender"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              >
                <option value="" disabled>Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Passport Number -->
          <div class="flex flex-col gap-1.5">
            <label
              class="text-xs font-black text-slate-600 uppercase tracking-widest"
              >Passport Number</label
            >
            <input
              v-model="form.passport"
              type="text"
              placeholder="e.g. A12345678"
              class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all uppercase"
            />
          </div>

          <!-- Phone + Email -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >Phone Number</label
              >
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+234 800 000 0000"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label
                class="text-xs font-black text-slate-600 uppercase tracking-widest"
                >Email Address</label
              >
              <input
                v-model="form.email"
                type="email"
                placeholder="your@email.com"
                class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- ERROR MESSAGE -->
      <p
        v-if="errorMessage"
        class="text-sm text-red-500 font-semibold text-center"
      >
        {{ errorMessage }}
      </p>

      <!-- SUBMIT BUTTON -->
      <button
        @click="handleSubmit"
        :disabled="isLoading"
        class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black text-base rounded-[1.25rem] transition-colors shadow-lg shadow-indigo-200"
      >
        {{ isLoading ? "Saving..." : "Continue to Payment →" }}
      </button>

      <!-- Note -->
      <p class="text-center text-xs text-slate-400 font-medium">
        🔒 Your details are encrypted and secure
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { manta } from "@/services/manta";

const router = useRouter();

const flight = ref(null);

const form = ref({
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  passport: "",
  phone: "",
  email: "",
});

const isLoading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

onMounted(() => {
  const stored = sessionStorage.getItem("selectedFlight");

  if (!stored) {
    router.push("/ExplorePage");
    return;
  }
  flight.value = JSON.parse(stored);
});

const firstSegment = computed(
  () => flight.value?.itineraries?.[0]?.segments?.[0],
);
const lastSegment = computed(() => {
  const segments = flight.value?.itineraries?.[0]?.segments || [];
  return segments[segments.length - 1];
});

const flightSummary = computed(() => ({
  airline: firstSegment.value?.carrierCode || "--",
  from: firstSegment.value?.departure?.iataCode || "--",
  to: lastSegment.value?.arrival?.iataCode || "--",
  date: firstSegment.value?.departure?.at?.split("T")[0] || "--",
  price: flight.value?.price?.total || "0.00",
}));

const handleSubmit = async () => {
  const { firstName, lastName, dob, gender, passport, phone, email } =
    form.value;
  if (
    !firstName ||
    !lastName ||
    !dob ||
    !gender ||
    !passport ||
    !phone ||
    !email
  ) {
    errorMessage.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const bookingData = {
      firstname: firstName,
      lastname: lastName,
      dob: dob,
      gender: gender,
      passport: passport,
      phone: phone,
      email: email,
      flightfrom: flightSummary.value.from,
      flightto: flightSummary.value.to,
      flightdate: flightSummary.value.date,
      flightprice: flightSummary.value.price,
      airline: flightSummary.value.airline,
      status: "confirmed",
      userid: localStorage.getItem("username"),
    };
    console.log("Sending bookingData:", JSON.stringify(bookingData));

    await manta.createBooking(bookingData);

    sessionStorage.setItem("bookingData", JSON.stringify(bookingData));
    successMessage.value = "Booking successful 🎉";
    router.push("/ConfirmationPage");
  } catch (error) {
    errorMessage.value = error.message || "Booking failed. Try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
