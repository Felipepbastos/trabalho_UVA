<template>
  <div class="card">
    <h2>Painel Administrativo</h2>
    <ul>
      <li v-for="a in appointments" :key="a.id">
        {{ a.patient.email }} - {{ a.date }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      appointments: []
    }
  },
  async created() {
    const res = await axios.get('http://localhost:4000/admin/appointments')
    this.appointments = res.data
  }
}
</script>
