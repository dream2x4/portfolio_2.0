<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'

import { auth } from './firebase.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'

import router from './router'

let isLoggedIn = ref(false)

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
      console.log('User logged in', auth.currentUser)

    } else {
      isLoggedIn.value = false
      console.log('User logged out', auth.currentUser)

    }
  })
})

let logOut = () => {
  signOut(auth)
  .then(() => {
    console.log('User logged out', auth.currentUser)
    router.push('/login')
  })
  .catch((error) => {
    console.log(error)
  })
}

</script>

<template>

<header>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
      <div class="nav-container container-fluid p-0 d-flex justify-content-end">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink to="/projects">PORTFOLIO</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/contact">CONTACT</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/">ABOUT</RouterLink>
            </li>
            <!-- <li class="nav-item">
              <RouterLink to="/admin">ADMIN</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/login">LOGIN</RouterLink>
            </li> -->
            <li class="nav-item">
              <button class="nav-btn" v-if="isLoggedIn" style="padding: 0;"><RouterLink to="/admin">ADMIN</RouterLink></button>
            </li>
            <li class="nav-item">
              <button class="nav-btn" @click="logOut" v-if="isLoggedIn">LOGOUT</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <router-view v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
        <div :key="route.name">  
      <component :is="Component"></component>
      </div>
    </Transition>
  </router-view>

<!-- Footer -->
<div class="footer col-12 d-flex align-items-center justify-content-between">
    <p class="footer-text d-flex justify-content-start" style="color: var(--vt-c-white-soft);">© All rights reserved</p>

    <div class="social-links-container">
      
      <a class="social_link" href="https://github.com/dream2x4?tab=repositories">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
      </a>

      <a class="social_link" href="https://www.linkedin.com/in/thanakit-andersen-321265269">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
      </a>

    </div>

    <a class="d-flex align-items-center" href="#top">
      <p class="footer-text d-flex align-items-center justify-content-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16" style="margin-right: 1rem;">
          <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
        </svg>
        Back to top
      </p>
    </a>

  </div>
</template>

<style scoped>

/* Animation */

/*.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}*/

/* Navbar */

header {
  line-height: 1.5;
  max-height: 100vh;
  width: 100%;
  display: flex;
  padding: 1rem 0;
  
  position: absolute;
  z-index: 1;

  background-color: var(--vt-c-black);
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  display: flex;
  justify-content: flex-end;
}

nav a {
  font-family: 'GlacialIndifference';

  display: inline-block;
  padding: 0 2rem;
  font-size: 1.4rem;
}

nav a.router-link-exact-active {
  color: var(--vt-c-black);
  background-color: var(--vt-c-white-soft);
}

.nav-btn {
  font-family: 'GlacialIndifference';
  font-weight: normal;

  width: auto;
  font-size: 1.4rem;
  text-align: center;

  display: inline-block;
  padding: 0 2rem;
  color: var(--vt-c-white-soft);
  background-color: transparent;
  border: none;
}

.logout-btn:hover {
  color: var(--vt-c-gold);
}
.navbar-toggler {
color: var(--vt-c-white-soft);

  margin-right: 2rem;
  outline: none;
  border: none;
  box-shadow: none;
}

@media (min-width: 992px) {
  /* Styles for screens wider than 992px (expanded navbar) */
  .navbar-nav {
    margin-left: auto; /* Align at flex-end */
  }
}

@media (max-width: 991px) {
  /* Styles for screens 991px and narrower (collapsed navbar) */
  .navbar-nav {
    margin: 0 auto; /* Center align */
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

/* Footer */
.footer {
  background-color: var(--vt-c-black);
  padding: 2rem 2rem;
}

.footer-text {
  font-size: 1rem;
  font-family: raleway, sans-serif;
  font-weight: 400;
  font-style: normal;
  margin: 0;
}

.social_link {
  margin: 0 0.5rem;
  color: var(--vt-c-white-soft);
}

a {
  color: var(--vt-c-white-soft);
}

@media (hover: hover) {
  a:hover {
    color: var(--vt-c-gold);
  }
}

/* scale */
@media (max-width: 540px) {
  .navbar-toggler {
color: var(--vt-c-white-soft);

  margin-right: 1rem;
  outline: none;
  border: none;
  box-shadow: none;
}

  .footer {
    flex-direction: column-reverse;

    row-gap: 1rem;
  }
}
</style>
