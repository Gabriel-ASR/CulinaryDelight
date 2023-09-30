// import { allRecipes } from "../services/dbRead"
import { Text, View, Pressable, ImageBackground } from "react-native";
import style from "../styles/styles";
import { useEffect, useState } from "react";
import queryDB, {
  allRecipes,
  downloadLinkList,
  getImages,
} from "../services/dbRead";

function RecipeCard() {
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState();
  const [images, setImages] = useState([]);

  let filteredRecipeData = [];

  async function fetchData() {
    if (info) {
      return null;
    } else {
      await queryDB();

      allRecipes.map((filteredData) => {
        filteredRecipeData.push(filteredData.data());
      });

      setInfo(filteredRecipeData);
    }
  }

  async function fetchImages() {
    if (images) {
      return null;
    } else {
      const imagesList = await getImages();

      console.log("imagesList", imagesList);
    }

    useEffect(() => {
      fetchData();
      fetchImages();
    });

    if (info && images) {
      return info.map((recipe, index) => {
        console.log(images[index]);

        return (
          <View key={index} style={style.recipeCard}>
            <View style={style.recipeAuthor}>
              <View style={style.recipeProfilePhoto}></View>
              <Text
                style={[
                  style.commonTextColor,
                  { fontFamily: "MontserratExtraBold" },
                ]}
              >
                {recipe.Autor}
              </Text>
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
                <ImageBackground resizeMode="cover"></ImageBackground>
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
                  <Pressable>
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
    } else {
      return <Text>Deu Ruim</Text>;
    }
  }
}

export default RecipeCard;
