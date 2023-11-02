<template>
  <!-- Add new project -->
  <div class="NavGuard d-flex flex-column justify-content-center align-items-center">
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 768px;">
      <h1 style="margin-bottom: 2rem;">ADD/EDIT PROJECTS</h1>
      <button @click="isOpen = true" style="margin-bottom: 2rem;">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
        Add New Project
      </button>

      <!-- Modal -->
      <teleport to="body">
        <div class="modal" v-if="isOpen">
          <NewProject @close="isOpen = false">

          </NewProject>
        </div>
      </teleport>

      <div>
        <input type="text" placeholder="Enter your project name" v-model="AddProjectData.projectName" >
      </div>
      <button class="btn-add" @click="firebaseAddSingleItem()">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
        Add Item
      </button>
    </div>

    <hr style="width: 100%;">

    <div class="edit-container" style="padding: 2rem 0; overflow-wrap: break-word;" v-for="project in projects" :key="project">
      <!-- Project overview -->
      <h1 style="margin-bottom: 1rem;">{{ project.projectName }}</h1>
      <p>
        ProjectID: {{ project.id  }}
      </p>
      <p>
        ProjectName: {{ project.projectName }}
      </p>
      <p>
        ProjectCategories: {{ project.projectCategories }}
      </p>
      <p>
        ProjectDescription: {{ project.projectDescription }}
      </p>
      <p>
        ProjectTech: {{ project.projectTech }}
      </p>
      <p>
        ProjectTeam: {{ project.projectTeam }}
      </p>
      <p>
        ProjectUrl: {{ project.projectUrl }}
      </p>
      <!-- Image -->
      <div>
        <!-- <img :src="project.imgURL" class="mb-2" alt="project image" style="width: 100%;"> -->
        <img :src="`https://firebasestorage.googleapis.com/v0/b/test-project-7a051.appspot.com/o/images%2F${project.imgURL}?alt=media&token=3d8c8b75-7be5-4983-a8a8-aafce3444f88&_gl=1*us7tjp*_ga*MTA0NDAzODM4MS4xNjg1ODc1MDMz*_ga_CW55HF8NVT*MTY5ODkzMjU4NC4xMi4xLjE2OTg5MzQ0MzUuNjAuMC4w`" alt="project image" style="width: 100%; margin-bottom: 1rem;">
      </div>

      <button class="btn-delete" @click="firebaseDeleteSingleItem(project.id)" style="margin-bottom: 1rem;">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/>
        </svg>
        Delete item
      </button>
     
      <!-- Edit project-->
      <p>
        <input type="text" placeholder="New project name" v-model="project.projectName" />
      </p>

      <p>
        <select class="form-select" v-model="project.projectCategories" aria-label="Default select example">
          <option value="" disabled selected hidden>Please Choose...</option>
          <option value="VisualMix">VisualMix</option>
          <option value="Web">Web</option>
          <option value="App">App</option>
          <option value="DigiStrats">DigiStrats</option>
        </select>
      </p>

      <p>
        <textarea placeholder="Add description" v-model="project.projectDescription"></textarea>
      </p>

      <p>
        <input type="text" placeholder="Add tech" v-model="project.projectTech" />
      </p>

      <p>
        <input type="text" placeholder="Add team" v-model="project.projectTeam" />
      </p>

      <p>
        <input type="text" placeholder="Add url" v-model="project.projectUrl" />
      </p>
    <!-- Image upload-->
      <p>
        <input :class="`id${project.id}`" type="file" label="File input" @change="uploadImg">
      </p>


      <button class="btn-edit" @click="firebaseUpdateSingleItem(project.id)">
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        Edit item
      </button>
    </div>
    <hr ><!-- style="width: 100%;" -->
  </div>
</template>
  
<script setup>
import NewProject from '../components/NewProject.vue';
import useProjects from '../modules/useProjects.js';
import { onMounted } from 'vue'

import { ref } from 'vue';
const isOpen = ref(false);

const { 
  projects, 
  getProjectsData, 
  firebaseDeleteSingleItem, 
  firebaseAddSingleItem ,
  AddProjectData,
  firebaseUpdateSingleItem,
  uploadImg,
  //UpdateProjectData
} = useProjects();

onMounted(() => {
  getProjectsData();
})
</script>

<style>

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal > div {
  background-color: var(--vt-c-light-grey);
  padding: 20px;
  width:90%;
  height:768px;
  top:40px;
  bottom:40px;
  position: absolute;
}

#floatyClose {
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.3rem 0.6rem;
  cursor: pointer;
  z-index:110;
}

.edit-container {
  width: 27rem;
}

@media (max-width: 576px){
  .edit-container {
    width: 16rem;
  }
}

@media (max-width: 360px){
  .edit-container {
    width: 14rem;
  }
}

</style>
