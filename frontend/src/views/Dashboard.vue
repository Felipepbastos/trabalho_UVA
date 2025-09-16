<template>
  <div>
    <h1>Dashboard</h1>
    <router-link to="/new">Novo agendamento</router-link>
    <ul>
      <li v-for="a in appointments" :key="a.id">
        {{ new Date(a.scheduledAt).toLocaleString() }} - {{ a.status }} <span v-if="a.rainForecast">(Chuva prevista)</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
const appointments = ref([]);

onMounted(async ()=>{
  const r = await api.get('/api/appointments');
  appointments.value = r.data;
});
</script>
