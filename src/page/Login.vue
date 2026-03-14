<template>
  <section class="w-full min-h-screen">
    <AppHeader />
    <div class="bg-gray-50 flex items-center justify-center p-6 mt-30">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login to your Booking Account
        </h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Email Address</label
            >
            <input
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
              v-model="login.email"
              type="email"
              autocomplete="email"
              required
            />
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="login.password"
              required
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              @click="handlePasswordToggle"
              class="absolute top-1/2 right-3 cursor-pointer"
            >
              <Eye v-if="showPassword" />
              <EyeClosed v-else />
            </button>
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
          >
            {{ isLoading ? "Signing in..." : "Sign in" }}
          </button>
        </form>

        <p
          v-if="message"
          class="mt-4 text-center text-sm font-medium"
          :class="isError ? 'text-red-600' : 'text-green-600'"
        >
          {{ message }}
        </p>

        <p class="mt-5 w-full flex justify-center">
          Don't have an Account?
          <router-link to="/signup" class="ml-1 text-blue-500"
            >Sign Up</router-link
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from "vue";
import { manta } from "@/services/manta";
import { useRouter } from "vue-router";
import { Eye, EyeClosed } from "lucide-vue-next";
import AppHeader from "@/components/AppHeader.vue";

const login = reactive({ email: "", password: "" });
const isLoading = ref(false);
const message = ref("");
const isError = ref(false);
const router = useRouter();

const showPassword = ref(false);

const handlePasswordToggle = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  message.value = "";
  isError.value = false;

  try {
    const response = await manta.login({
      email: login.email,
      password: login.password,
    });

    if (response.statusCode === 200) {
      message.value = response.message;
      isError.value = false;

      localStorage.setItem("user_token", response.token);
      localStorage.setItem("user_email", login.email);
      localStorage.setItem(
        "username",
        response.username || login.email.split("@")[0],
      );

      setTimeout(() => router.push("/home"), 1000);
    }
  } catch (error) {
    isError.value = true;

    message.value = error.message || "Login failed. Try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
