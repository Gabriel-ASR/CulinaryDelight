// import { allRecipes } from "../services/dbRead"
import { Text, View, Pressable, ImageBackground } from "react-native";
import style from "../styles/styles";
import { useEffect, useState } from "react";
import getRecipesList, {
  getImages,
  getProfileImages,
  recipeIdList,
  userId,
} from "../services/dbRead";
import { Link, useNavigation } from "@react-navigation/native";
import { deleteRecipeFromDatabase } from "../services/dbManipulation";

function RecipeCard({ filter }) {
  const navigation = useNavigation();

  const [recipeList, setRecipeList] = useState();

  async function fetchRecipesList() {
    const recipesList = await getRecipesList();
    const profilePictures = await fetchProfileImages();

    const images = await fetchImages();
    const data = recipesList.map((filteredData, index) => {
      const result = filteredData.data();

      return {
        ...result,
        image: images,
        profile: profilePictures,
        id: recipeIdList[index],
      };
    });

    setRecipeList(data);
  }

  async function fetchImages() {
    const imagesList = await getImages();

    return imagesList;
  }

  async function fetchProfileImages() {
    const profileImagesList = await getProfileImages();

    return profileImagesList;
  }

  useEffect(() => {
    fetchRecipesList();
  }, []);

  if (filter) {
    return recipeList?.map((recipe, index) => {
      if (recipe.IdAutor == userId) {
        const profileImageToRender = recipe.profile
          .map((url) => {
            let profileImage;

            if (url.includes(recipe.IdAutor)) {
              profileImage = url;
              return profileImage;
            }
          })
          .filter((url) => url != null);

        const imageToRender = recipe.image
          .map((url) => {
            let Image;

            if (url.includes(recipe.id)) {
              Image = url;
              return Image;
            }
          })
          .filter((url) => url != null);

        console.log(imageToRender);

        return (
          <View key={index} style={style.recipeCard}>
            <View style={style.recipeAuthor}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <View style={style.recipeProfilePhoto}>
                  <ImageBackground
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: profileImageToRender[0] }}
                  ></ImageBackground>
                </View>
                <Text
                  style={[
                    style.commonTextColor,
                    { fontFamily: "MontserratExtraBold" },
                  ]}
                >
                  {recipe.Autor}
                </Text>
              </View>
              <View>
                <Pressable
                  style={{ justifySelf: "flex-end" }}
                  onPress={() => {
                    deleteRecipeFromDatabase(recipe.id);
                  }}
                >
                  <Text>Excluir Receita</Text>
                </Pressable>
              </View>
            </View>
            <Text
              style={[
                style.commonTextColor,
                { fontFamily: "MontserratBlack", fontSize: 35 },
              ]}
            >
              {recipe.Titulo}
            </Text>
            <Text
              style={[
                style.commonTextColor,
                { fontFamily: "MontserratMedium", fontSize: 12 },
              ]}
            >
              {recipe.data}
            </Text>
            <View style={style.recipeInformationContainer}>
              <View style={style.recipeImage}>
                <ImageBackground
                  style={{ width: "100%", height: "100%" }}
                  source={{
                    uri: imageToRender[0],
                  }}
                />
              </View>
              <Text></Text>
              <View style={style.infoContainer}>
                <View>
                  <Text style={style.cardInfoTitle}>Descrição</Text>
                  <Text style={style.info}>{recipe.Descricao}</Text>
                </View>
                <View>
                  <Text style={style.cardInfoTitle}>
                    Lista de Ingredientes:
                  </Text>
                  <Text style={style.info}>
                    {recipe.Ingredientes.map((ingrediente) => {
                      return `${ingrediente}; `;
                    })}
                  </Text>
                  <Pressable
                    onPress={() => {
                      navigation.navigate("Receita Atual", {
                        Autor: recipe.Autor,
                        Descricao: recipe.Descricao,
                        Ingredientes: recipe.Ingredientes,
                        Preparo: recipe.Preparo,
                        Quantidades: recipe.Quantidades,
                        Titulo: recipe.Titulo,
                        data: recipe.data,
                        image: imageToRender[0],
                      });
                    }}
                  >
                    <Text style={style.hiperlink}>ver receita...</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        );
      }
    });
  }

  return recipeList?.map((recipe, index) => {
    const profileImageToRender = recipe.profile
      .map((url) => {
        let profileImage;

        if (url.includes(recipe.IdAutor)) {
          profileImage = url;
          return profileImage;
        }
      })
      .filter((url) => url != null);

    const imageToRender = recipe.image
      .map((url) => {
        let Image;

        if (url.includes(recipe.id)) {
          Image = url;
          return Image;
        }
      })
      .filter((url) => url != null);

    console.log(imageToRender);

    return (
      <View key={index} style={style.recipeCard}>
        <View style={style.recipeAuthor}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Pressable
              style={style.recipeProfilePhoto}
              onPress={() => {
                navigation.navigate("Perfil", { nome: recipe.Autor });
              }}
            >
              <ImageBackground
                style={{ width: "100%", height: "100%" }}
                source={{ uri: profileImageToRender[0] }}
              ></ImageBackground>
            </Pressable>
            <Text
              style={[
                style.commonTextColor,
                { fontFamily: "MontserratExtraBold" },
              ]}
            >
              {recipe.Autor}
            </Text>
          </View>
        </View>
        <Text
          style={[
            style.commonTextColor,
            { fontFamily: "MontserratBlack", fontSize: 35 },
          ]}
        >
          {recipe.Titulo}
        </Text>
        <Text
          style={[
            style.commonTextColor,
            { fontFamily: "MontserratMedium", fontSize: 12 },
          ]}
        >
          {recipe.data}
        </Text>
        <View style={style.recipeInformationContainer}>
          <View style={style.recipeImage}>
            <ImageBackground
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: imageToRender[0],
              }}
            />
          </View>
          <Text></Text>
          <View style={style.infoContainer}>
            <View>
              <Text style={style.cardInfoTitle}>Descrição</Text>
              <Text style={style.info}>{recipe.Descricao}</Text>
            </View>
            <View>
              <Text style={style.cardInfoTitle}>Lista de Ingredientes:</Text>
              <Text style={style.info}>
                {recipe.Ingredientes.map((ingrediente) => {
                  return `${ingrediente}; `;
                })}
              </Text>
              <Pressable
                onPress={() => {
                  navigation.navigate("Receita Atual", {
                    Autor: recipe.Autor,
                    Descricao: recipe.Descricao,
                    Ingredientes: recipe.Ingredientes,
                    Preparo: recipe.Preparo,
                    Quantidades: recipe.Quantidades,
                    Titulo: recipe.Titulo,
                    data: recipe.data,
                    image: imageToRender[0],
                  });
                }}
              >
                <Text style={style.hiperlink}>ver receita...</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View>
          <Text></Text>
        </View>
      </View>
    );
  });
}

export default RecipeCard;
