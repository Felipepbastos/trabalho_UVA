<template>
  <div>
    <h2>Novo Agendamento</h2>
    <form @submit.prevent="submit">
      <input v-model="cep" placeholder="CEP" @blur="fetchCep" />
      <input v-model="street" placeholder="Rua" />
      <input type="datetime-local" v-model="scheduledAt" />
      <input type="number" v-model.number="duration" />
      <button>Agendar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const cep = ref('');
const street = ref('');
const scheduledAt = ref('');
const duration = ref(30);

async function fetchCep() {
  if (!cep.value) return;
  try {
    const r = await api.get(`/api/cep/${cep.value}`);
    street.value = r.data.logradouro || '';
  } catch(e) { console.error(e); }
}

async function submit() {
  try {
    await api.post('/api/appointments', {
      scheduledAt,
      durationMinutes: duration
    });
    alert('Agendado');
    window.location.href = '/';
  } catch(e) {
    alert(e.response?.data?.error || 'Erro');
  }
}
</script>
