import { View, Text, ScrollView } from "react-native";
import TopMenu from "../components/TopMenu";
import style from "../styles/styles";
import RecipeCard from "../components/RecipeCard";

function MyRecipes() {
  return (
    <ScrollView>
      <TopMenu></TopMenu>
      <View style={style.titleContainer}>
        <Text style={[style.darkTextColor, style.title]}>Suas Receitas</Text>
        <Text style={[style.darkTextColor, style.subTitle]}>
          reveja suas receitas ou adicione {"\n"} novas.
        </Text>
      </View>
      <View>
        <RecipeCard filter={true} />
      </View>
    </ScrollView>
  );
}

export default MyRecipes;
