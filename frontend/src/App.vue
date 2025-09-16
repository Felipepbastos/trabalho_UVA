<template>
  <div class="container">
    <h1>Clinica vida</h1>
    <router-view />
  </div>
</template>


<script>
import Login from './components/Login.vue'
import NewAppointment from './components/NewAppointment.vue'

export default {
  components: { Login, NewAppointment }
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.container {
  max-width: 400px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}
</style>
