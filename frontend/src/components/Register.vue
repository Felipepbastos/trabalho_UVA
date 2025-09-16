<template>
  <div class="card">
    <h2>Registrar Paciente</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="register">Registrar</button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return { email: '', password: '' }
  },
  methods: {
    async register() {
      if (!this.email || !this.password) {
        alert('Preencha todos os campos!')
        return
      }
      try {
        const res = await axios.post('http://localhost:4000/auth/register', {
          email: this.email,
          password: this.password
        })
        alert(res.data.message)
      } catch (err) {
        alert('Erro: ' + (err.response?.data?.message || err.message))
      }
    }
  }
}
</script>
