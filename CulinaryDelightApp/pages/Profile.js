import { View, Text, ScrollView, ImageBackground } from "react-native";
import { fetchProfileData, getProfileImages } from "../services/dbRead";
import { useEffect, useState } from "react";
import { userId } from "../services/dbRead";
import TopMenu from "../components/TopMenu";
import style from "../styles/styles";
import getRecipesList from "../services/dbRead";

function Profile({ route }) {
  const { nome } = route.params;

  const [infoDisplay, setInfoDisplay] = useState();
  const [profilePicture, setProfilePicture] = useState();
  const [count, setCount] = useState();
  async function retrieveData(name) {
    const data = await fetchProfileData(name);
    setInfoDisplay(data);
  }

  useEffect(() => {
    async function getData() {
      await retrieveData(nome);
      await filterUserImage();
    }
    getData();
  }, []);

  if (infoDisplay) {
    async function filterUserImage() {
      const imageList = await getProfileImages();

      const profileImageToRender = imageList
        .map((item, index) => {
          if (item.includes(infoDisplay.Id)) {
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

      setProfilePicture(profileImageToRender[0]);
    }

    filterUserImage();

    async function recipeCount() {
      const recipes = await getRecipesList();

      const filteredRecipes = recipes.map((item) => {
        return item.data();
      });

      const onlyCurrentUserRecipes = filteredRecipes.map((item) => {
        if (item.Autor !== infoDisplay.username) {
          return null;
        }

        return item;
      });

      const filteredCurrentUserRecipes = onlyCurrentUserRecipes.filter(
        (item) => {
          return item != null;
        }
      );

      setCount(filteredCurrentUserRecipes.length);
    }

    recipeCount();
    return (
      <ScrollView>
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
            <Text>{count} </Text>
            {count > 1 ? "Receitas" : "Receita"}
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
            <Text style={style.profileBio}>{infoDisplay.Bio}</Text>
          </View>
        </View>
      </ScrollView>
    );
  } else {
    return <Text>Carregando..</Text>;
  }
}

export default Profile;
