<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <input v-model="email" placeholder="email" />
      <input v-model="password" type="password" placeholder="password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const email = ref('');
const password = ref('');

async function submit() {
  try {
    const r = await api.post('/api/auth/login', { email: email.value, password: password.value });
    localStorage.setItem('accessToken', r.data.accessToken);
    localStorage.setItem('refreshToken', r.data.refreshToken);
    window.location.href = '/';
  } catch (e) {
    alert('Login failed');
  }
}
</script>
