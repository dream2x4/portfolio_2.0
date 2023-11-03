<template>
  <!-- Portfolio detail -->
  <div class="project-section">
  
    <div class="container-p-detail" style="margin-bottom: 2rem;">
      <div class="project-detail-container d-flex justify-content-center">
        
        <!-- Left -->
        <div class="project-detail-left" v-if="selectedProject">
          <div class="project-title-hidden">
            <p style="margin: 0; color: var(--vt-c-gold); font-weight: 700;">{{ selectedProject.projectCategories }}</p>
            <h1 style="margin-bottom: 1rem;">{{ selectedProject.projectName }}</h1>
          </div>
          <img :src="`https://firebasestorage.googleapis.com/v0/b/test-project-7a051.appspot.com/o/images%2F${selectedProject.imgURL}?alt=media&token=3d8c8b75-7be5-4983-a8a8-aafce3444f88&_gl=1*us7tjp*_ga*MTA0NDAzODM4MS4xNjg1ODc1MDMz*_ga_CW55HF8NVT*MTY5ODkzMjU4NC4xMi4xLjE2OTg5MzQ0MzUuNjAuMC4w`" class="" alt="project image" style="width: 100%;">
        </div>

        <!-- Right -->
        <div class="project-detail-right" v-if="selectedProject">
          <div class="project-title">
            <p style="margin: 0; color: var(--vt-c-gold); font-weight: 700;">{{ selectedProject.projectCategories }}</p>
            <h1 style="margin-bottom: 1rem;">{{ selectedProject.projectName }}</h1>
          </div>
          <p>{{ selectedProject.projectDescription }}</p>
          <p style="font-weight: 700; margin-bottom: 0.5rem;">Tech:</p>
          <p>{{ selectedProject.projectTech }}</p>
          <p style="font-weight: 700; margin-bottom: 0.5rem;">Team:</p>
          <p>{{ selectedProject.projectTeam }}</p>
          <a :href="selectedProject.projectUrl" target="_blank">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 1rem;" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8"/>
              </svg>
              VIEW PROJECT
            </button>
          </a>
        </div>
      </div>
    </div>

    <!-- Go back -->
    <div class="back-button d-flex align-items-center">
      <button class="button" @click="goBack()">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 1rem;" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
        </svg>
        Go back
      </button>
    </div>
  </div>
</template>

<script setup>
import useProjects from '../modules/useProjects.js';
import { onMounted, ref, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { projects, getProjectsData } = useProjects();
const selectedProject = ref(null);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await getProjectsData();
});

watchEffect(() => {
  // Check if projects is an array before using find
  if (Array.isArray(projects.value)) {
    const projectId = route.params.id;
    selectedProject.value = projects.value.find(project => project.id === projectId);
  } else {
    console.error("Projects is not an array");
  }
});

//Go back
const goBack = () => {
  router.go(-1);
};
</script>



<style scoped>
.project-section {
  padding: 12rem 4rem;
}

.project-detail-container {
  gap: 2rem;
}

.project-detail-left {
  width: 60%;
}

.project-title-hidden {
  display: none;
}

.project-detail-right {
  width: 40%;
}

/* Scale */

@media (max-width: 992px) {
  .project-detail-container {
    flex-direction: column;
  }
  .project-detail-left {
    width: 100%;
  }

  .project-title {
    display: none;
  }

  .project-title-hidden {
    display: block;
  }

  .project-detail-right {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .project-section {
    padding: 12rem 2rem;
  }

  .project-detail-container {
    gap: 1rem;
  }
}
</style>
