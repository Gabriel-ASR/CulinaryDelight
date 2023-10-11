import { collection, getDocs, query, where } from "firebase/firestore";
import { db, storage, auth } from "./firebaseConfig";
import { getDownloadURL, listAll, ref } from "@firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let loggedIn = false;
export let errorMessage;
export let userId;
export let username;
export const recipeIdList = [];
let passId;
export let newUser;

export async function getRecipesList() {
  const recipesList = [];
  const receitas = await getDocs(collection(db, "receitas"));

  receitas.forEach((doc) => {
    recipesList.push(doc);
    recipeIdList.push(doc.id);
  });

  return recipesList;
}

export async function getImages() {
  const recipeRef = ref(storage, "recipe-images");

  const folderList = await listAll(recipeRef);

  const folderPathList = folderList.prefixes.map((i) => i.fullPath);

  const imageLinks = await Promise.all(
    folderPathList.map(async (folderPath) => {
      const folderRefPath = ref(storage, folderPath);

      const imageRefPathList = await listAll(folderRefPath);

      const urlList = await Promise.all(
        imageRefPathList.items.map(
          async (item) => await getDownloadURL(ref(storage, item.fullPath))
        )
      );

      return urlList;
    })
  );

  return imageLinks.map((i) => i[0]);
}

export async function getProfileImages() {
  const profileRef = ref(storage, "profile-pictures");

  const profileFolderList = await listAll(profileRef);

  const profileFolderPathList = profileFolderList.prefixes.map(
    (i) => i.fullPath
  );

  const profileImageLinks = await Promise.all(
    profileFolderPathList.map(async (folderPath) => {
      const folderRefPath = ref(storage, folderPath);

      const profileImageRefPathList = await listAll(folderRefPath);

      const urlList = await Promise.all(
        profileImageRefPathList.items.map(
          async (item) => await getDownloadURL(ref(storage, item.fullPath))
        )
      );

      return urlList;
    })
  );

  return profileImageLinks.map((i) => i[0]);
}

export async function dbUserQuery(data) {
  let passId;
  try {
    AsyncStorage.setItem("Logged", "false");
    newUser = false;
    const usernameQuery = query(
      collection(db, "usuários"),
      where("email", "==", data.email)
    );

    const usernameResult = await getDocs(usernameQuery);

    usernameResult.forEach((doc) => {
      bio = doc.data().Bio;
      userId = doc.id;
    });

    if (!bio) {
      newUser = true;
    } else {
      const userQuery = query(
        collection(db, "usuários"),
        where("email", "==", data.email)
      );
      const passQuery = query(
        collection(db, "usuários"),
        where("senha", "==", data.password)
      );

      const userResult = await getDocs(userQuery);
      const passResult = await getDocs(passQuery);

      passResult.forEach((doc) => {
        passId = doc.id;
        username = doc.data().username;
      });

      userResult.forEach((doc) => {
        userId = doc.id;
      });

      if (userId == passId && userId != null) {
        AsyncStorage.setItem("Logged", "true");
        AsyncStorage.setItem("UserId", userId);
        errorMessage = null;
      } else if (userId == null) {
        errorMessage = "Usuário não cadastrado.";
        setTimeout(() => {
          errorMessage = "";
        }, 2500);
      } else {
        errorMessage = "Usuário ou senha incorretos.";
        setTimeout(() => {
          errorMessage = "";
        }, 2500);
      }
    }
  } catch (e) {
    console.log("Log de erros: ", e);
  }

  return { novo: newUser, nome: username };
}

export async function fetchUserData() {
  const userQuery = query(
    collection(db, "usuários"),
    where("Id", "==", userId)
  );

  const userResult = await getDocs(userQuery);

  userResult.forEach((doc) => {
    userData = doc.data();
  });

  return userData;
}

export async function fetchProfileData(name) {
  const userQuery = query(
    collection(db, "usuários"),
    where("username", "==", name)
  );

  const userResult = await getDocs(userQuery);

  userResult.forEach((doc) => {
    userData = doc.data();
    console.log(userData);
  });

  return userData;
}

export function logout() {
  AsyncStorage.removeItem("Logged");
  userId == null;
  passId == null;
}

export default getRecipesList;
