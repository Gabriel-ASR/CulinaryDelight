import { ScrollView, View, Text, RefreshControl } from "react-native";
import RecipeCard from "../components/RecipeCard";
import TopMenu from "../components/TopMenu";
import style from "../styles/styles";
import { useCallback, useState } from "react";

function AllRecipes() {
  const [refreshing, setRefreshing] = useState();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    >
      <TopMenu />
      <View style={style.titleContainer}>
        <Text style={[style.darkTextColor, style.title]}>
          Todas as receitas
        </Text>
        <Text style={[style.darkTextColor, style.subTitle]}>
          Mavegue por todas as receitas{"\n"}e descubra qual delícia você vai
          fazer hoje!
        </Text>
      </View>
      {!refreshing && <RecipeCard />}
    </ScrollView>
  );
}

export default AllRecipes;
