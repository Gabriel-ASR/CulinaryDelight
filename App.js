import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { allRecipes } from "./CulinaryDelightApp/services/dbRead";
import LandingPage from "./CulinaryDelightApp/pages/PaginaInicial";
import "./assets/logo-culinary-delight.png";
import "./assets/menu-aberto.png";
import LoginPage from "./CulinaryDelightApp/pages/Login";
import RegisterPage from "./CulinaryDelightApp/pages/Registro";
import NewRecipe from "./CulinaryDelightApp/pages/NewRecipe";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "./CulinaryDelightApp/routes/Home";
import CurrentRecipe from "./CulinaryDelightApp/pages/CurrentRecipe";
import AddInformation from "./CulinaryDelightApp/pages/AddInformation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    MontserratBlack: require("./assets/fonts/Montserrat-Black.ttf"),
    MontserratBlackItalic: require("./assets/fonts/Montserrat-BlackItalic.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
    MontserratBoldItalic: require("./assets/fonts/Montserrat-BoldItalic.ttf"),
    MontserratExtraBold: require("./assets/fonts/Montserrat-ExtraBold.ttf"),
    MontserratExtraBoldItalic: require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    MontserratExtraLight: require("./assets/fonts/Montserrat-ExtraLight.ttf"),
    MontserratExtraLightItalic: require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    MontserratItalic: require("./assets/fonts/Montserrat-Italic.ttf"),
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratLightItalic: require("./assets/fonts/Montserrat-LightItalic.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratMediumItalic: require("./assets/fonts/Montserrat-MediumItalic.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratSemiBoldItalic: require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    MontserratThin: require("./assets/fonts/Montserrat-Thin.ttf"),
    MontserratThinItalic: require("./assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  if (!loaded) {
    return null;
  }

  if (AsyncStorage.getItem("Logged") == "true") {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Página Inicial">
          <Tab.Screen name="Página Inicial" component={LandingPage} />
          <Tab.Screen name="Nova Receita" componet={NewRecipe} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Receita Atual" component={CurrentRecipe} />
          <Stack.Screen name="Página Inicial" component={Home} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Registro" component={RegisterPage} />
          <Stack.Screen name="Adicionar Info" component={AddInformation} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
