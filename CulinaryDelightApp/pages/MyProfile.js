import {
  Button,
  View,
  Text,
  ImageBackground,
  TouchableHighlight,
  Pressable,
  ScrollView,
} from "react-native";
import TopMenu from "../components/TopMenu";
import { fetchUserData } from "../services/dbRead";
import { useEffect, useState, useCallback } from "react";
import style from "../styles/styles";
import { getProfileImages } from "../services/dbRead";
import { userId } from "../services/dbRead";
import { Controller, useForm } from "react-hook-form";
import { TextInput, Image, RefreshControl } from "react-native";
import {
  updateProfileBio,
  uploadProfileImageToStorage,
} from "../services/dbManipulation";
import * as ImagePicker from "expo-image-picker";

function MyProfile() {
  const [infoDisplay, setInfoDisplay] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [editMode, setEditMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  let blob;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
    },
  });

  async function retrieveInfo() {
    setInfoDisplay(await getUserInfo());
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await retrieveInfo();
    await fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function onSubmit(data) {
    setEditMode(false);
    updateProfileBio(data);
  }

  async function getUserInfo() {
    const userInfo = await fetchUserData();
    return userInfo;
  }

  async function filterUserImage() {
    const imageList = await getProfileImages();

    profileImageToRender = imageList
      .map((item, index) => {
        if (item.includes(userId)) {
          imageList.splice(index, 1);
          return item;
        } else {
          return null;
        }
      })
      .filter((item) => {
        if (!item) {
          return false;
        } else {
          return true;
        }
      });

    return profileImageToRender[0];
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result;

      blob = await fetch(uri).then((response) => response.blob());

      uploadProfileImageToStorage(infoDisplay.username, blob);
    }
  };

  async function fetchData() {
    const profileImage = await filterUserImage();
    setProfilePicture(profileImage);
  }

  useEffect(() => {
    fetchData();
    retrieveInfo();
  }, []);

  if (infoDisplay) {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TopMenu />
        <View style={style.titleContainer}>
          <Text style={[style.darkTextColor, style.title]}>Seu perfil</Text>
          <Text style={[style.darkTextColor, style.subTitle]}>
            Mude sua foto de perfil, escreva sua bio {"\n"} e diga a todos que
            você é um ótimo cozinheiro!
          </Text>
        </View>
        <View style={style.profileContentContainer}>
          <View style={{ width: 150 }}>
            <View
              style={[
                style.profilePicture,
                {
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                },
              ]}
            >
              <ImageBackground
                source={{ uri: profilePicture }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></ImageBackground>
            </View>
            {editMode && (
              <Pressable style={style.imageEditButton} onPress={pickImage}>
                <Text
                  style={{ color: "#3E5C76", fontFamily: "MontserratBold" }}
                >
                  Trocar foto de perfil
                </Text>
              </Pressable>
            )}
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={style.profileName}>{infoDisplay.username}</Text>
            <Text style={style.profileSubText}>
              {`${infoDisplay.Idade} anos `}
              <Text style={{ color: "#1D2D44" }}>•</Text>
              {` ${infoDisplay.status}`}
            </Text>
          </View>
          <Text
            style={{
              color: "#354E72",
              fontSize: 20,
              fontFamily: "MontserratBlack",
            }}
          >
            <Text></Text>Receitas
          </Text>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
            }}
          >
            <Text
              style={{
                color: "#354E72",
                fontFamily: "MontserratBold",
                fontSize: 16,
              }}
            >
              Bio:
            </Text>
            {!editMode && (
              <Text style={style.profileBio}>{infoDisplay.Bio}</Text>
            )}
            {editMode && (
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={infoDisplay.Bio}
                    style={[style.authInput, { width: "100%", height: 150 }]}
                    multiline={true}
                    numberOfLines={10}
                  />
                )}
                name="bio"
              />
            )}
            {errors.bio && (
              <Text
                style={{ fontFamily: "MontserratMedium", color: "#ff3333" }}
              >
                Atualize a bio!
              </Text>
            )}
            {!editMode && (
              <TouchableHighlight
                style={style.profilePressable}
                onPress={() => {
                  setEditMode(true);
                }}
              >
                <Text
                  style={{
                    fontFamily: "MontserratBlack",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Editar
                </Text>
              </TouchableHighlight>
            )}
            {editMode && (
              <TouchableHighlight
                style={style.profilePressable}
                onPress={handleSubmit(onSubmit)}
              >
                <Text
                  style={{
                    fontFamily: "MontserratBlack",
                    color: "white",
                    fontSize: 20,
                  }}
                >
                  Salvar
                </Text>
              </TouchableHighlight>
            )}
            {!editMode && (
              <Pressable>
                <Text>excluir perfil</Text>
              </Pressable>
            )}
            {editMode && (
              <Pressable
                onPress={() => {
                  setEditMode(false);
                  errors.bio = null;
                }}
              >
                <Text>cancelar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <Text>Carregando...</Text>;
  }
}

export default MyProfile;
