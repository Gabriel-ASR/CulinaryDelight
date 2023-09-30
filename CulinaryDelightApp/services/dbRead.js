import {collection, getDocs, query } from "firebase/firestore"
import { db } from "./firebaseConfig";
import { storage } from "./firebaseConfig";
import { getDownloadURL, listAll, ref } from "@firebase/storage";

export let allRecipes = [];
let recipeFolderPath = [];
let recipeImagePath = [];
let tempPath = []
export let downloadLinkList = []
let i = 1

async function queryDB() {

    const receitas = await getDocs(collection(db, "receitas"))
    
      receitas.forEach((doc) => {
          allRecipes.push(doc)
      })

}


export async function getImages() {

  const recipeRef = ref(storage, 'recipe-images')

  await listAll(recipeRef).then((res) => {

    res.prefixes.map((folderRef) => {

      tempPath.push(folderRef.fullPath)

      recipeFolderPath = tempPath

    })

  }).catch((e) => {

    console.log(`log de erros ${e}`)

  })


  for (i in recipeFolderPath) {

    const imageRef = ref(storage, recipeFolderPath[i])

    await listAll(imageRef).then((imagePathRef) => {

      imagePathRef.items.map((item) => {

        recipeImagePath.push(item.fullPath)

      });

    })

    getDownloadURL(ref(storage, recipeImagePath[i])).then((url) => {
    
      downloadLinkList.push(url)

    })

  }

  return downloadLinkList

}

export default queryDB
