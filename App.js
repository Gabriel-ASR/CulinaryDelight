import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "./assets/logo-culinary-delight.png";
import "./assets/menu-aberto.png";
import RegisterPage from "./CulinaryDelightApp/pages/Registro";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./CulinaryDelightApp/routes/Home";
import CurrentRecipe from "./CulinaryDelightApp/pages/CurrentRecipe";
import AddInformation from "./CulinaryDelightApp/pages/AddInformation";
import LoginPage from "./CulinaryDelightApp/pages/Login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import Profile from "./CulinaryDelightApp/pages/Profile";

const Stack = createNativeStackNavigator();

export default function App() {
  const [logged, setLogged] = useState(false);

  function update() {
    setLogged(true);
  }
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
        <Stack.Screen name="Perfil" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
