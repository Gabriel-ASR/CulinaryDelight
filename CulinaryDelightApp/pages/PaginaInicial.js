import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import style from "../styles/styles";
import "../../assets/logo-culinary-delight.png";
import "../../assets/menu-aberto.png";
import RecipeCard from "../components/RecipeCard";
import { useEffect } from "react";
import { getProfileImages } from "../services/dbRead";
import { userId } from "../services/dbRead";
import { ImageBackground } from "react-native";
import { useState } from "react";
import { username } from "../services/dbRead";
import TopMenu from "../components/TopMenu";

function LandingPage({ navigation }) {
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

  useEffect(() => {
    async function fetchData() {
      const profileImage = await filterUserImage();
      setProfilePicture(profileImage);
    }

    fetchData();
  }, []);

  return (
    <ScrollView style={style.container}>
      <TopMenu />
      <View style={style.contentContainer}>
        <TouchableHighlight
          style={style.newRecipe}
          onPress={() => {
            navigation.navigate("Nova Receita");
          }}
        >
          <View>
            <Text style={style.newRecipeTextNovo}>É novo aqui?</Text>
            <Text style={style.newRecipeTextPoste}>
              Poste uma nova receita!
            </Text>
          </View>
        </TouchableHighlight>
        <View
          style={{
            borderBottomColor: "#E2E2E2",
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginTop: "5%",
            width: "80%",
          }}
        ></View>
        <Text style={[style.commonText, style.commonTextColor]}>
          Receitas mais recentes:
        </Text>
        <RecipeCard />
      </View>
    </ScrollView>
  );
}

export default LandingPage;
