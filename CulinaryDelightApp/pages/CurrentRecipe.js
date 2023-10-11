import { ImageBackground, View, Text, ScrollView } from "react-native";
import style from "../styles/styles";
import TopMenu from "../components/TopMenu";

function CurrentRecipe({ route }) {
  const {
    Autor,
    Descricao,
    Ingredientes,
    Preparo,
    Quantidades,
    Titulo,
    data,
    image,
  } = route.params;

  return (
    <ScrollView>
      <TopMenu />
      <View style={{ height: 200 }}>
        <ImageBackground
          source={{ uri: image }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <View style={style.currentRecipeContainer}>
        <View style={style.tituloContainer}>
          <Text style={{ color: "#3E5C76", fontFamily: "MontserratMedium" }}>
            receita de
          </Text>
          <Text
            style={{
              color: "#1D2D44",
              fontFamily: "MontserratBlack",
              fontSize: 40,
            }}
          >
            {Titulo}
          </Text>
          <Text
            style={{
              color: "#3E5D77",
              fontFamily: "MontserratMedium",
              fontSize: 13,
            }}
          >
            postado no dia {data}
          </Text>
          <Text
            style={{
              color: "#5681a6",
              fontFamily: "MontserratMedium",
              fontSize: 10,
            }}
          >
            por {Autor}
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: "#3E5C76",
              fontFamily: "MontserratBlack",
              fontSize: 20,
            }}
          >
            Ingredientes:
          </Text>
        </View>
        <View style={style.ingredientList}>
          {Ingredientes.map((item, index) => {
            return (
              <Text style={style.ingredientItem}>
                • {item} - {Quantidades[index]}
              </Text>
            );
          })}
        </View>
        <View>
          <Text style={{ color: "#1D2D44", fontFamily: "MontserratMedium" }}>
            {Descricao}
          </Text>
        </View>
        <Text
          style={{
            color: "#3E5C76",
            fontFamily: "MontserratBlack",
            fontSize: 20,
          }}
        >
          Modo de preparo:
        </Text>
        <Text style={{ color: "#1D2D44", fontFamily: "MontserratMedium" }}>
          {Preparo}
        </Text>
      </View>
    </ScrollView>
  );
}

export default CurrentRecipe;
