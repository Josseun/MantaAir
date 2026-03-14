<template>
  <section class="w-full min-h-screen">
    <AppHeader />
    <div class="flex-col bg-gray-50 flex items-center justify-center p-6">
      <div class="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create your Booking Account
        </h2>

        <form @submit.prevent="handleSignup" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Username</label
            >
            <input
              v-model="formData.username"
              type="text"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="johndoe123"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Email Address</label
            >
            <input
              v-model="formData.email"
              type="email"
              required
              class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="john@example.com"
            />
          </div>

          <div class="relative">
            <label class="block text-sm font-medium text-gray-700"
              >Password</label
            >
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              required
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
            {{ isLoading ? "Creating Account..." : "Sign Up" }}
          </button>
        </form>

        <p class="mt-5 w-full flex justify-center">
          Have an existing account?
          <router-link to="/login" class="ml-1 text-blue-500"
            >Login</router-link
          >
        </p>
        <p
          v-if="message"
          class="mt-4 text-center text-sm font-medium"
          :class="isError ? 'text-red-600' : 'text-green-600'"
        >
          {{ message }}
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

const formData = reactive({ name: "", username: "", email: "", password: "" });
const router = useRouter();
const isLoading = ref(false);
const isError = ref(false);
const message = ref("");

const showPassword = ref(false);

const handlePasswordToggle = () => {
  showPassword.value = !showPassword.value;
};

const handleSignup = async () => {
  isLoading.value = true;
  message.value = "";
  isError.value = false;

  try {
    const response = await manta.signup(formData);

    if (response.statusCode === 201) {
      message.value = response.message;
      isError.value = false;

      localStorage.setItem("user_token", response.token);
      localStorage.setItem("username", response.username || formData.username);
      localStorage.setItem("user_name", formData.name);
      localStorage.setItem("user_email", formData.email);
      localStorage.setItem("member_since", new Date().toISOString());

      setTimeout(() => router.push("/home"), 1000);
    }
  } catch (error) {
    isError.value = true;

    message.value = error.message || "Signup failed. Try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
