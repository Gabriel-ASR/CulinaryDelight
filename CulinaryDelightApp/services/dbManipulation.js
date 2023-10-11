import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  query,
  doc,
  addDoc,
  collection,
  where,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { userId } from "./dbRead";
import { uploadBytes, ref, deleteObject, listAll } from "@firebase/storage";
import { updateDoc } from "firebase/firestore";

let recipeTitle;
let recipeId;
export let error;

export async function addRecipeToFirebase(
  data,
  ingredients,
  quantities,
  image
) {
  const date = new Date();

  const recipeQuery = query(
    collection(db, "receitas"),
    where("Titulo", "==", data.recipeName)
  );
  const userNameQuery = doc(db, "usuários", userId);
  const userNameResult = await getDoc(userNameQuery);
  const recipeResult = await getDocs(recipeQuery);

  userName = userNameResult.data().username;

  recipeResult.forEach((doc) => {
    recipeTitle = doc.data().Titulo;
  });

  if (recipeTitle == data.recipeName) {
    error = true;
  } else {
    const toAdd = await addDoc(collection(db, "receitas"), {
      Titulo: data.recipeName,
      Descricao: data.recipeDescription,
      Preparo: data.prepMethod,
      Autor: userName,
      IdAutor: userId,
      Ingredientes: ingredients,
      Quantidades: quantities,
      data: `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} às ${date.getHours()}:${date.getMinutes()}`,
    });

    error = false;
  }

  uploadImageToStorage(data.recipeName, image);
}

async function uploadImageToStorage(name, blobImage) {
  const recipeQuery = query(
    collection(db, "receitas"),
    where("Titulo", "==", name)
  );

  const recipeResult = await getDocs(recipeQuery);

  recipeResult.forEach((doc) => {
    recipeId = doc.id;
  });

  imageToUploadRef = ref(storage, `recipe-images/${recipeId}/${recipeId}`);

  uploadBytes(imageToUploadRef, blobImage).then((snapshot) => {
    console.log("imagem upada com sucesso.");
  });
}

export async function uploadProfileImageToStorage(name, blobImage) {
  imageToUploadRef = ref(storage, `profile-pictures/${userId}/${userId}`);

  uploadBytes(imageToUploadRef, blobImage).then((snapshot) => {
    console.log("imagem upada com sucesso.");
  });
}

export async function updateProfileBio(data) {
  const profileBio = doc(db, "usuários", userId);

  await updateDoc(profileBio, {
    Bio: data.bio,
  });
}

export async function deleteRecipeFromDatabase(id) {
  await deleteDoc(doc(db, "receitas", id));
  console.log("Deletado com sucesso");
}

export default async function addUserToFirebase({ email, password }) {
  let existingEmail;

  const userQuery = query(
    collection(db, "usuários"),
    where("email", "==", email)
  );
  const userResult = await getDocs(userQuery);

  userResult.forEach((doc) => {
    existingEmail = doc.data().email;
  });

  if (email == existingEmail) {
    error = true;
  } else {
    const toAdd = await addDoc(collection(db, "usuários"), {
      email: email,
      senha: password,
    });

    error = false;
    console.log("adicionado");

    const userQuery = query(
      collection(db, "usuários"),
      where("email", "==", email)
    );
    const userResult = await getDocs(userQuery);

    let id;

    userResult.forEach((doc) => {
      id = doc.id;
    });

    const addedUser = doc(db, "usuários", id);

    await updateDoc(addedUser, {
      Id: id,
    });
  }
}

export async function addOtherInfo(data) {
  const updatedUser = doc(db, "usuários", userId);

  await updateDoc(updatedUser, {
    status: "Ajudante",
    username: data.Name,
    Idade: data.Age,
    Bio: data.Bio,
  });

  return data.Name;
}
