<template>
  <div class="d-flex flex-column justify-content-center align-items-center">
    <dialog ref="dialogg" id="dialogbox" >
      <h2>Your project has been added!</h2>
    </dialog>

    <button
      id="floatyClose"
      @click="$emit('close')"
    >
      <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem;" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
      </svg>
    </button>

    <h1 class="text-center" style="margin-top: 2rem; margin-bottom: 1rem;">ADD NEW PROJECT</h1>

   
     <!-- Edit project-->
     <p>
        <input type="text" placeholder="New project name" v-model="AddProjectData.projectName" />
      </p>

      <p>
        
        <select class="form-select" v-model="AddProjectData.projectCategories" aria-label="Default select example">
          <option value="" disabled selected hidden>Please Choose...</option>
          <option value="VisualMix">VisualMix</option>
          <option value="Web">Web</option>
          <option value="App">App</option>
          <option value="DigiStrats">DigiStrats</option>
        </select>
      </p>

      <p>
        <textarea placeholder="Add description" v-model="AddProjectData.projectDescription"></textarea>
      </p>

      <p>
        <input type="text" placeholder="Add tech" v-model="AddProjectData.projectTech" />
      </p>

      <p>
        <input type="text" placeholder="Add team" v-model="AddProjectData.projectTeam" />
      </p>

      <p>
        <input type="text" placeholder="Add url" v-model="AddProjectData.projectUrl" />
      </p>
      <!-- Image upload-->
      <p>
        <input class="mb-2 imageUpload" type="file" label="File input" @change="uploadImg">
      </p>
    <button class="btn-add" @click="firebaseAddSingleItem()"> <!-- , snackbarTest() -->
        <svg xmlns="http://www.w3.org/2000/svg" style="height: 1.5rem; width: 1.5rem; margin-right: 0.5rem;" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
        </svg>
        Add Item</button>

  </div>
</template>

<script setup>
//import useProjects from '../modules/useProjects.js';

//import { ref } from 'vue';

//Image script

/* Image upload start */

import { collection, addDoc, doc  } from "firebase/firestore";
import { getStorage, ref as fbref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onMounted , ref, reactive} from 'vue' // using reactive instead of ref, because we also use ref from firebase
import { db } from '../firebase.js'
import useProjects from '../modules/useProjects' 

const { 
  projects,
  getProjectsData, 
  AddProjectData
  //AddProjectData
} = useProjects()


// const AddProjectData = ref({
//     projectName: '',
//     projectCategories: '',
//     projectDescription: '',
//     projectTech: '',
//     projectTeam: '',
//     projectUrl: '',
//     imgURL: ''
//   })

onMounted(() => {
  getProjectsData()
})

// Add item data: title, description, image URL and have the button disabled until image is uploaded
/* let addItemData = reactive({
  AddItemDataTitle : '',
  AddItemDataDescription : '',
  imgURL: '',
  uploadBtnDisabled: true
}) */


 // Add dynamic data to Firebase Firestore
 const firebaseAddSingleItem = async() => {

    //Image input value from image upload button in AdminView.vue
    let imageName = document.querySelector(".imageUpload").value    

    console.log(imageName)
    
    //Split to array
    imageName = imageName.split("\\")
    console.log(imageName)
    
    //The element from array as name of the image
    imageName = imageName[imageName.length-1]
    console.log(imageName)

    await addDoc(collection(db, "projects"), {
      // title: AddProjectData.projectName,
      // description: AddProjectData.projectName,
      // imgURL: AddProjectData.imgURL,
      projectName: AddProjectData.value.projectName,
      projectCategories: AddProjectData.value.projectCategories,
      projectDescription: AddProjectData.value.projectDescription,
      projectTech: AddProjectData.value.projectTech,
      projectTeam: AddProjectData.value.projectTeam,
      projectUrl: AddProjectData.value.projectUrl,
      imgURL: imageName
    }
    ).then(() => {
      //  snackbar.value = true
    })
  }

const storage = getStorage();
 
// Firebase storage upload image + get download URL + enable button after image uploaded
const uploadImg = async(event) => {
  let file = event.target.files[0]; // get the file
  console.log("file", file)
// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

// Upload file and metadata to the object 'images/mountains.jpg'
const storageRef = fbref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');       
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);

      AddProjectData.value.imgURL = downloadURL // update variable imgURL and put the image URL link in it. 
    //  addItemData.uploadBtnDisabled = false // enable button after image uploaded is complete
    });
  }  
);
}

/* Image upload end */



const dialogg = ref(null);

let snackbarTest = () => {
  dialogg.value.setAttribute("open", "");
  //document.getElementById("dialogbox").setAttribute("open", "");
  setTimeout(() => { 
    dialogg.value.removeAttribute("open");
   // document.getElementById("dialogbox").removeAttribute("open");
  }, 2000);
}


</script>

<style lang="scss" scoped>

</style>



