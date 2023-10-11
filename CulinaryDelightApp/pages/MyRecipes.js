import { View, Text, ScrollView, RefreshControl } from "react-native";
import TopMenu from "../components/TopMenu";
import style from "../styles/styles";
import RecipeCard from "../components/RecipeCard";
import { useState, useCallback } from "react";

function MyRecipes() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <TopMenu></TopMenu>
      <View style={style.titleContainer}>
        <Text style={[style.darkTextColor, style.title]}>Suas Receitas</Text>
        <Text style={[style.darkTextColor, style.subTitle]}>
          reveja suas receitas ou adicione {"\n"} novas.
        </Text>
      </View>
      <View>{!refreshing && <RecipeCard filter={true} />}</View>
    </ScrollView>
  );
}

export default MyRecipes;
