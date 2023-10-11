import NewRecipe from "../pages/NewRecipe";
import LandingPage from "../pages/PaginaInicial";
import { Image, View, Text } from "react-native";
import "../../assets/logo-culinary-delight.png";
import "../../assets/nova-receita.png";
import "../../assets/perfil.png";
import MyProfile from "../pages/MyProfile";
import AllRecipes from "../pages/AllRecipes";
import MyRecipes from "../pages/MyRecipes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1D2D44",
          paddingBottom: 10,
          paddingTop: 10,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Página Inicial"
        component={LandingPage}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#3E5C76" : "white",
                  fontFamily: "MontserratBlack",
                  fontSize: 10,
                  display: focused ? "flex" : "none",
                }}
              >
                Página Inicial
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/logo-culinary-delight.png")}
                resizeMode="contain"
                style={{
                  height: 45,
                  width: 45,
                  tintColor: focused ? "#3E5C76" : "white",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Nova Receita"
        component={NewRecipe}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#3E5C76" : "white",
                  fontFamily: "MontserratBlack",
                  fontSize: 10,
                  display: focused ? "flex" : "none",
                }}
              >
                Nova Receita
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/nova-receita.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? "#3E5C76" : "white",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Meu Perfil"
        component={MyProfile}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#3E5C76" : "white",
                  fontFamily: "MontserratBlack",
                  fontSize: 10,
                  display: focused ? "flex" : "none",
                }}
              >
                Meu Perfil
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/perfil.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? "#3E5C76" : "white",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Minhas Receitas"
        component={AllRecipes}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#3E5C76" : "white",
                  fontFamily: "MontserratBlack",
                  fontSize: 10,
                  display: focused ? "flex" : "none",
                }}
              >
                Todas as Receitas
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/receitas.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? "#3E5C76" : "white",
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Todas as Receitas"
        component={MyRecipes}
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? "#3E5C76" : "white",
                  fontFamily: "MontserratBlack",
                  fontSize: 10,
                  display: focused ? "flex" : "none",
                }}
              >
                Minhas Receitas
              </Text>
            );
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../assets/minhas.png")}
                resizeMode="contain"
                style={{
                  height: 30,
                  width: 30,
                  tintColor: focused ? "#3E5C76" : "white",
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Home;
