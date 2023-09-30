import { Text, View, Image, Pressable, ScrollView, TouchableHighlight, StyleSheet } from 'react-native';
import style from '../styles/styles';
import "../../assets/logo-culinary-delight.png"
import "../../assets/menu-aberto.png"
import RecipeCard from '../components/RecipeCard';


function LandingPage() {

    return(

        <ScrollView style={style.container}>
        <View style={style.topMenu}>
          <Image style={style.logo} source={require("../../assets/logo-culinary-delight.png")}/>
          <View style={style.authentication}>
            <TouchableHighlight style={style.loginButton}><Text style={style.loginText}>Login</Text></TouchableHighlight>
            <Pressable><Text style={style.registerText}>Registre-se</Text></Pressable>
          </View>
          <Image style={style.menu} source={require("../../assets/menu-aberto.png")}/>
        </View>
        <View style={style.contentContainer}>
            <TouchableHighlight style={style.newRecipe} onPress={() => {
              }}>
            <View>
              <Text style={style.newRecipeTextNovo}>É novo aqui?</Text>
              <Text style={style.newRecipeTextPoste}>Poste uma nova receita!</Text>
            </View>
            </TouchableHighlight>
            <View style={{borderBottomColor: "#E2E2E2", borderBottomWidth: StyleSheet.hairlineWidth, marginTop: "5%", width: "80%"}}></View>
            <Text style={[style.commonText, style.commonTextColor]}>Receitas mais recentes:</Text>
            <RecipeCard/>
        </View>
      </ScrollView>
    )
} 

export default LandingPage