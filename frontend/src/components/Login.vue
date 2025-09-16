<template>
  <div class="card">
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Senha" />
    <button @click="login">Login</button>
    <p>
        Não tem conta? <router-link to="/register">Registrar</router-link>
    </p>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        alert('Preencha todos os campos!')
        return
      }
      try {
        const res = await axios.post('http://localhost:4000/auth/login', {
          email: this.email,
          password: this.password
        })
        alert('Login realizado! Token: ' + res.data.token)
      } catch (err) {
        alert('Falha no login: ' + (err.response?.data?.message || err.message))
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
  background-color: #e3f2fd;
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
  background-color: #2196f3;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #1976d2;
}
</style>
