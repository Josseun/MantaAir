<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4">
    <div class="max-w-xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-black text-slate-900">My Profile</h1>
        <p class="text-slate-500 font-medium mt-1">
          Your personal account details
        </p>
      </div>

      <!-- Avatar Card -->
      <div
        class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 mb-6 flex items-center gap-6"
      >
        <div
          class="w-20 h-20 rounded-2xl bg-indigo-100 flex items-center justify-center font-black text-indigo-600 text-3xl"
        >
          {{ userInitial }}
        </div>
        <div>
          <p class="text-xl font-black text-slate-900">{{ userFullName }}</p>
          <!-- full name -->
          <p class="text-slate-500 font-medium">@{{ userName }}</p>
          <!-- username -->
          <p class="text-slate-400 text-sm">{{ userEmail }}</p>
          <!-- email -->
        </div>
      </div>

      <!-- Details Card -->
      <div
        class="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 space-y-6"
      >
        <div>
          <p
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
          >
            Full Name
          </p>
          <p class="text-slate-900 font-bold">{{ userFullName }}</p>
        </div>

        <div class="border-t border-slate-100"></div>

        <div>
          <p
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
          >
            Username
          </p>
          <p class="text-slate-900 font-bold">@{{ userName }}</p>
        </div>

        <div class="border-t border-slate-100"></div>

        <div>
          <p
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
          >
            Email Address
          </p>
          <p class="text-slate-900 font-bold">{{ userEmail }}</p>
        </div>

        <div class="border-t border-slate-100"></div>

        <div>
          <p
            class="text-xs font-black text-slate-400 uppercase tracking-widest mb-1"
          >
            Member Since
          </p>
          <p class="text-slate-900 font-bold">{{ memberSince }}</p>
        </div>
      </div>

      <!-- Logout -->
      <button
        @click="handleLogout"
        class="mt-6 w-full py-4 border-2 border-red-100 text-red-500 font-black rounded-2xl hover:bg-red-50 transition-colors"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const userFullName = ref(localStorage.getItem("user_name") || "");
const userName = ref(localStorage.getItem("username") || "User");
const userEmail = ref(localStorage.getItem("user_email") || "No email saved");
const memberSince = ref("");

onMounted(() => {
  const savedFullName = localStorage.getItem("user_name");
  if (savedFullName) userFullName.value = savedFullName;

  const savedUserName = localStorage.getItem("username");
  if (savedUserName) userName.value = savedUserName;

  const savedEmail = localStorage.getItem("user_email");
  if (savedEmail) userEmail.value = savedEmail;

  const savedDate = localStorage.getItem("member_since");
  if (savedDate) {
    memberSince.value = new Date(savedDate).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
});

const userInitial = computed(() => {
  return userName.value.charAt(0).toUpperCase();
});

const handleLogout = () => {
  localStorage.removeItem("user_token");
  localStorage.removeItem("username");
  localStorage.removeItem("user_email");
  localStorage.removeItem("member_since");
  router.push("/login");
};
</script>
