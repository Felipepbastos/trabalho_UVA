<template>
  <div class="card">
    <h2>Novo Agendamento</h2>
    <input v-model="patientId" placeholder="ID do Paciente" />
    <input v-model="date" type="datetime-local" />
    <button @click="createAppointment">Criar Agendamento</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      patientId: '',
      date: ''
    }
  },
  methods: {
    async createAppointment() {
      if (!this.patientId || !this.date) {
        alert('Preencha todos os campos!')
        return
      }
      try {
        await axios.post('http://localhost:4000/appointments', {
          patientId: this.patientId,
          date: this.date
        })
        alert('Agendamento criado com sucesso!')
      } catch (err) {
        alert('Erro: ' + (err.response?.data?.message || err.message))
      }
    }
  }
}
</script>

<style>
.card {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #e8f5e9;
}

input {
  display: block;
  width: 90%;
  padding: 8px;
  margin: 10px auto;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #388e3c;
}
</style>
