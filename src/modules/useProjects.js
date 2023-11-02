import { db } from '../firebase.js'



import { ref } from 'vue'
import { collection, onSnapshot, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as fbref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const useProjects = () => {

  const projects = ref([]); // to store data from firebase
  const projectDataRef = collection(db, 'projects');

  
  const storage = getStorage();

  const AddProjectData = ref({
    projectName: '',
    projectCategories: '',
    projectDescription: '',
    projectTech: '',
    projectTeam: '',
    projectUrl: '',
    imgURL: ''
  })

  const UpdateProjectData = ref({
    projectName: '',
    projectCategories: '',
    projectDescription: '',
    projectTech: '',
    projectTeam: '',
    projectUrl: '',
    imgURL: ''
  })

  //Display aphabatical order
  function compare (a, b) {
    if ( a.projectName < b.projectName ){
      return -1;
    }
    if ( a.projectName > b.projectName ){
      return 1;
    }
    return 0;
  }

  const getProjectsData = () => {
    onSnapshot(projectDataRef, (snapshot) => {
      projects.value = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
          //projectName: doc.data().projectName,
          //projectCategories: doc.data().projectCategories
        }
      })

      //Sort array (alphabatical)
      projects.value.sort(compare)
      

    })
  }

  //Delete data
  const firebaseDeleteSingleItem = async(id) => {
    await deleteDoc(doc(db, "projects", id));
    console.log("is deleted", id)
  }

  //Add data
  const firebaseAddSingleItem = async() => {
    await addDoc(collection(db, "projects"),
      {
        projectName: AddProjectData.value.projectName,
        projectCategories: AddProjectData.value.projectCategories,
        projectDescription: AddProjectData.value.projectDescription,
        projectTech: AddProjectData.value.projectTech,
        projectTeam: AddProjectData.value.projectTeam,
        projectUrl: AddProjectData.value.projectUrl,
        imgURL: AddProjectData.value.imgURL
      }
    ).then({
    });
      
    console.log("is added") 

  }

  //Update data
  const firebaseUpdateSingleItem = async (projectId) => {
    //Image input value from image upload button in AdminView.vue
    let imageName = document.querySelector(`.id${projectId}`).value

    //Split to array
    imageName = imageName.split("\\")
    
    const projectToUpdate = projects.value.find(project => project.id === projectId);
    
    //The element from array as name of the image
    projectToUpdate.imgURL = imageName[imageName.length-1]
  
    console.log(projectToUpdate)
    console.log(projectToUpdate.imgURL)

    if (projectToUpdate) {
      await updateDoc(doc(projectDataRef, projectId), {
        projectName: projectToUpdate.projectName,
        projectCategories: projectToUpdate.projectCategories,
        projectDescription: projectToUpdate.projectDescription,
        projectTech: projectToUpdate.projectTech,
        projectTeam: projectToUpdate.projectTeam,
        projectUrl: projectToUpdate.projectUrl,
        imgURL: projectToUpdate.imgURL
      });
  
      console.log("Item updated successfully:", projectId);
    } else {
      console.error("Project not found:", projectId);
    }
  }

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
        UpdateProjectData.value.imgURL = downloadURL
      });
    }  
  );
  }
  
  

  return {
    getProjectsData,
    projects,
    firebaseDeleteSingleItem,
    firebaseAddSingleItem,
    AddProjectData,
    firebaseUpdateSingleItem,
    UpdateProjectData,
    uploadImg
  }
}

export default useProjects;