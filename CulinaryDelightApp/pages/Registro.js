import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { ImageBackground } from "react-native";
import authBackground from "../../assets/authBackground.jpg";
import backgroundColor from "../../assets/backgroundcolor.png";
import style from "../styles/styles";
import addUserToFirebase from "../services/dbManipulation";
import { error } from "../services/dbManipulation";

export let RegData = [];

export default function RegisterPage({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    addUserToFirebase(data);
    navigation.navigate("Login");
  };

  return (
    <View>
      <ImageBackground
        source={authBackground}
        style={{ height: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <View style={style.authDrawer}>
          <Text style={style.authAction}>Registrar</Text>
          {error && <Text>Já há um usuário cadastrado com este e-mail!</Text>}
          <View style={style.textInputContainer}>
            <View>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#1D2D44",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                Email:
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={style.authInput}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text
                  style={{
                    fontFamily: "MontserratMedium",
                    color: "#ff3333",
                    marginLeft: 10,
                  }}
                >
                  O email é necessário!
                </Text>
              )}
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#1D2D44",
                  fontSize: 18,
                  marginLeft: 10,
                }}
              >
                Senha:
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={style.authInput}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text
                  style={{
                    fontFamily: "MontserratMedium",
                    color: "#ff3333",
                    marginLeft: 10,
                  }}
                >
                  A senha é necessária!
                </Text>
              )}
            </View>
          </View>
          <TouchableHighlight
            onPress={handleSubmit(onSubmit)}
            style={style.authSubmit}
          >
            <Text style={style.authSubmitText}>Registrar</Text>
          </TouchableHighlight>
        </View>
        <View style={style.authShadow}></View>
      </ImageBackground>
    </View>
  );
}
