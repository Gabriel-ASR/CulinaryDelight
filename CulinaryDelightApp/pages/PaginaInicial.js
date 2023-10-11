import {
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  RefreshControl,
} from "react-native";
import style from "../styles/styles";
import "../../assets/logo-culinary-delight.png";
import "../../assets/menu-aberto.png";
import RecipeCard from "../components/RecipeCard";
import { useEffect } from "react";
import { getProfileImages } from "../services/dbRead";
import { userId } from "../services/dbRead";
import { ImageBackground } from "react-native";
import { useState, useCallback } from "react";
import { username } from "../services/dbRead";
import TopMenu from "../components/TopMenu";

function LandingPage({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      style={style.container}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
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
        {!refreshing && <RecipeCard />}
      </View>
    </ScrollView>
  );
}

export default LandingPage;
