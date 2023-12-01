<template>
  <!-- Login -->
  <div class="d-flex flex-column justify-content-center align-items-center" style="height: 100vh;">
    <h1 style="margin-bottom: 2rem;">LOGIN</h1>
    <p style="margin: 0;">Username:</p>
    <input class="field" type="text" placeholder="Enter your Username" v-model="email" />
    <p style="margin: 0;">Password:</p>
    <input type="password" placeholder="Enter your Password" v-model="password" />
    <p v-if="errMsg"> {{ errMsg }}</p>
    <button @click="logIn">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
        </svg>
      Login
    </button>
  </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { auth } from '../firebase.js'
  import { signInWithEmailAndPassword } from 'firebase/auth';
  
  import router from '../router'
  
  let email = ref ('')
  let password = ref ('')
  const errMsg = ref ('')
  
  let logIn = () => {
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("test data", data)
      router.push('/admin')
    })
    .catch((error) => {
      switch(error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email address format."
          break;
        case "auth/user-disabled":
          errMsg.value = "This user has been disabled."
          break;
        case "auth/user-not-found":
          errMsg.value = "User not found."
          break;
        case "auth/wrong-password":
          errMsg.value = "Invalid password."
          break;
        default:
          errMsg.value = "An undefined error occured."
      }
    })
  }
</script>
  
<style scoped>
</style>