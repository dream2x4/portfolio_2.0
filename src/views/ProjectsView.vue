<template>

  <!-- Portfolio -->
  <div class="portfolio-section">
    <h1 style="margin-bottom: 2rem;">PORTFOLIO</h1>

    <div class="d-flex" style="gap: 1rem; flex-wrap: wrap;">

      <!-- Filter -->
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="margin-bottom: 0; font-size: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
          </svg>
          Categories
        </button>
        <ul class="dropdown-menu" style="padding: 1rem;">
          <li><button type="button" class="filter-btn VisualMix" @click="$event => changeCategory('VisualMix')" value="VisualMix"><p style="font-size: 1rem; margin: 0;">VisualMix</p></button></li>
          <li><button type="button" class="filter-btn Web" @click="$event => changeCategory('Web')" value="Web"><p style="font-size: 1rem; margin: 0;">Web</p></button></li>
          <li><button type="button" class="filter-btn App" @click="$event => changeCategory('App')" value="App"><p style="font-size: 1rem; margin: 0;">App</p></button></li>
          <li><button type="button" class="filter-btn DigiStrats" @click="$event => changeCategory('DigiStrats')" value="DigiStrats"><p style="font-size: 1rem; margin: 0;">DigiStrats</p></button></li>
          <li><button type="button" class="filter-btn All" @click="$event => changeCategory('All')" value="All"><p style="font-size: 1rem; margin: 0;">All</p></button></li>
        </ul>
      </div>

      <!--Interactive Portfolio -->
      <a href="https://indd.adobe.com/view/2240f9f9-d2fb-4a22-b317-14d30e20f9df" style="width: min-content;">
        <button class="interactive">
          <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
        </svg>
          <p style="font-size: 1rem; margin: 0; text-wrap: nowrap;">View Interactive</p>
        </button>
      </a>

    </div>

    <!-- Project Cards -->
    <div class="portfolio-container d-flex" id="projects">
      <div class="portfolio d-flex">
        
        <div class="portfolio-item-container">

          <div @click="redirect(project.id)" style="cursor: pointer"
          v-for="project in filteredProjects"
          :key="project.id"
          class="portfolio-item d-flex"
          >
            <div class="portfolio-box" style="height: 100%;">

              <div class="project-content">

                <img :src="`https://firebasestorage.googleapis.com/v0/b/test-project-7a051.appspot.com/o/images%2F${project.imgURL}?alt=media&token=3d8c8b75-7be5-4983-a8a8-aafce3444f88&_gl=1*us7tjp*_ga*MTA0NDAzODM4MS4xNjg1ODc1MDMz*_ga_CW55HF8NVT*MTY5ODkzMjU4NC4xMi4xLjE2OTg5MzQ0MzUuNjAuMC4w`" class="" alt="project image" style="margin: 0; width: 100%; height: auto;">

                <div style="padding: 1rem;">

                  <p style="margin: 0; color: var(--vt-c-gold); font-weight: 700;">
                    {{ project.projectCategories }}
                  </p>

                  <h3>
                    {{ project.projectName }}
                  </h3>
                  <div class="has-text-right">
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

  </div>

</template>
  
<script setup>
  import useProjects from '../modules/useProjects.js';
  import { onMounted, ref, reactive, computed } from 'vue';
  import { useRouter } from 'vue-router';

  const isOpen = ref(false);

  // Get data
  const { projects, getProjectsData } = useProjects();

  onMounted(() => {
    getProjectsData();
  });

  // Router
  const router = useRouter();
  const redirect = (id) => {
    router.push("/projectdetail/" + id);
  };

  // Filter
  const selectedCategory = ref("All");

  const filteredProjects = computed(() => {
    if (selectedCategory.value === "All") {
      return projects.value;
    } else {
      return projects.value.filter(project => project.projectCategories === selectedCategory.value);
    }
  });

  const changeCategory = (category) => {
    selectedCategory.value = category;
  };

</script>
  
<style scoped>

.portfolio-section {
  padding: 12rem 4rem;
}

/* Filter */

.dropdown-toggle {
  color: var(--vt-c-grey);
  border-radius: 25px;
  border: none;
  background-color: var(--vt-c-white-soft);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;

  transition: 0.4s;
}

.dropdown-toggle:hover {
  color: var(--vt-c-gold);
}

.dropdown-toggle:focus {
  color: var(--vt-c-gold);
}

.dropdown-toggle:active {
  color: var(--vt-c-gold);
  background-color: var(--vt-c-white-soft);
}

.dropdown-menu {
  color: var(--vt-c-grey);
  border: none;
  background-color: var(--vt-c-white-soft);
}

.filter-btn {
  color: var(--vt-c-grey);
}

.filter-btn:hover {
  color: var(--vt-c-gold);
}

/* Interactive */

.interactive {
  color: var(--vt-c-grey);
  border-radius: 25px;
  border: none;
  background-color: var(--vt-c-white-soft);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;

  transition: 0.4s;
}

.interactive:hover {
  color: var(--vt-c-gold);
}

/* Projects */

.portfolio-container {
  margin: 0;
}

.portfolio {
  padding: 4rem 0 0 0;
  width: 100%;
}

.portfolio-box {
  background-color: #0e0e0e;
  color: var(--vt-c-white-soft);
}

.portfolio-item-container {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
}

.portfolio-item {
  display: flex;
  flex-direction: column;
  transition: 0.1s;
  width: 25%;
  padding: 6px;
}

.portfolio-item:hover {
  scale: 1.03;
}

/* Scale */

@media (max-width: 992px){
  .portfolio-item {
    width: 50%;
  }
}

@media (max-width: 576px){

  .portfolio-section {
    padding: 12rem 2rem;
  }
}
</style>
