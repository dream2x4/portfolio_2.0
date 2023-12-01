<script setup>
</script>

<template>
  <!-- Hero -->
  <div class="hero d-flex justify-content-center" id="top">
    <div class="col-10">
      <div class="hero-container">
        <h2>Hi there, I'm Dream.</h2>
        <h1>WELCOME TO MY CREATIVE UNIVERSE!</h1>
        <P style="margin-bottom: 10%;">As a multimedia designer, I bring ideas to life through a mix of visual and interactive experiences.</P>
        <section class="hiddenBottom">
          <div class="hero-btn-container d-flex" style="gap: 1rem;">
            <a class="btn" href="#about-me">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" style="margin-right: 0.5rem;">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
              LEARN MORE ABOUT ME
            </a>
            <RouterLink to="/projects" class="btn" href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16" style="margin-right: 0.5rem;">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              EXPLORE MY PORTFOLIO
            </RouterLink>
          </div>
        </section>
      </div>
    </div>
  </div>

  <!-- About me -->
  <div class="about-me" id="about-me">
    <div class="col-12 d-flex justify-content-center">
      <div class="about-me-container col-10 col-sm-8 col-lg-6">
        <h1 style="margin-bottom: 1rem;">ABOUT ME</h1>
        <section class="hiddenLeft">
          <h2 style="margin-bottom: 1rem;">“Combining creativity and imagination,<br>I bring ideas to life!”</h2>
        </section>
        <div style="margin-bottom: 2rem;">
          <p>I’m a dedicated multimedia designer, constantly learning and experimenting with new ideas to push the standards I set for myself.</p>
          <p style="margin-bottom: 2rem;">I thrive on the dynamic nature of my work. Whether it’s crafting compelling graphics, diving into web development, or exploring the possibilities of interactive media, makes each project unique and exciting.</p>
          <h2 style="margin-bottom: 1rem;">WHAT I DO?</h2>
          <div class="upper-skill-container d-flex">
            <p class="skill">Graphic Design</p>
            <p class="skill">Concept Design</p>
            <p class="skill">UX & UI Design</p>
            <p class="skill">Web Development</p>
            <p class="skill">Digital Marketing</p>
            <p class="skill">Photography & Videography</p>
            <p class="skill">Photo & Video Editing</p>
          </div>
        </div>

        <a href="https://indd.adobe.com/view/0408d30a-fe64-407f-a8c1-c22a75001176" style="width: max-content;">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 1rem;" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
              <circle cx="8" cy="8" r="8"/>
            </svg>
            VIEW CV
          </button>
        </a>

      </div>

    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

const isActive = ref(true);

// Intersection observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

onMounted(() => {
  const hiddenElements = document.querySelectorAll('.hiddenLeft, .hiddenBottom');
  hiddenElements.forEach((el) => observer.observe(el));
});
</script>


<style scoped>

header {
  background-color: #0e0e0e;
}

.hero {
  color: var(--vt-c-white-soft);
  background-color: #d8d8d7;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(../assets/img/portfolio_hero.jpg);
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;

  transition: 0.4s;
}

.hero-container {
  width: 50%;
}

.hero-btn-container {
  animation: 1s ease-out 0s 1 slideInFromBottom;
}

.btn {
  font-weight: 500;

  width: fit-content;
  color: var(--vt-c-white-soft);
  border-color: var(--vt-c-white-soft);
  border-radius: 25px;
  background-color: transparent;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 0;
}

.btn:hover {
  border-color: transparent;
  background-color: var(--vt-c-gold);
}

.about-me {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.about-me-container {
  height: 768px;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.upper-skill-container {
  display:flex;
  flex-wrap:wrap
}

.skill {
  padding:0 10px 0 0;
  transition: 0.4;
  margin-bottom: 0rem;
  padding-right: 1rem;
}

/* Scale */

@media (max-width: 992px) {
  .hero-container {
    width: 80%;
  }
}

@media (max-width: 576px){
  .hero-btn-container {
    flex-direction: column;
  }
}
</style> 