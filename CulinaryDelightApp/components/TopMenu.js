import { View, Image, Text, ImageBackground, Pressable } from "react-native";
import style from "../styles/styles";
import { username } from "../services/dbRead";
import { useState, useEffect } from "react";
import { getProfileImages } from "../services/dbRead";
import { userId } from "../services/dbRead";
import { logout } from "../services/dbRead";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function TopMenu() {
  const navigation = useNavigation();
  let profileImageToRender;

  const [profilePicture, setProfilePicture] = useState();

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

  function callLogout() {
    logout();
    navigation.navigate("Login");
  }
  useEffect(() => {
    async function fetchData() {
      const profileImage = await filterUserImage();
      setProfilePicture(profileImage);
    }

    fetchData();
  }, []);
  return (
    <View style={style.topMenu}>
      <Image
        style={style.logo}
        source={require("../../assets/logo-culinary-delight.png")}
      />
      <Pressable
        onPress={() => {
          callLogout();
        }}
      >
        <Text style={{ fontFamily: "MontserratBlack", color: "#ff3333" }}>
          Sair
        </Text>
      </Pressable>
      <View style={style.profileInfo}>
        <Text style={{ fontFamily: "MontserratMedium", color: "white" }}>
          {username}
        </Text>
        <View style={style.profilePicture}>
          <ImageBackground
            source={{ uri: profilePicture }}
            style={{ width: "100%", height: "100%" }}
          ></ImageBackground>
        </View>
      </View>
    </View>
  );
}

export default TopMenu;
