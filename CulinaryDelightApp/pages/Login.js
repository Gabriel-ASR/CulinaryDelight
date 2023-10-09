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
import { Link } from "@react-navigation/native";

export let loginData = [];

export default function LoginPage() {
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
    loginData = data;
  };

  return (
    <View>
      <ImageBackground
        source={authBackground}
        style={{ height: "100%", display: "flex", justifyContent: "flex-end" }}
      >
        <View style={style.authDrawer}>
          <Text style={style.authAction}>Log-in</Text>
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
          <Link to={{ screen: "Registro" }} style={{ color: "#3E5C76" }}>
            Não é cadastrado ainda?
          </Link>
          <TouchableHighlight
            onPress={handleSubmit(onSubmit)}
            style={style.authSubmit}
          >
            <Text style={style.authSubmitText}>Entrar</Text>
          </TouchableHighlight>
        </View>
        <View style={style.authShadow}></View>
      </ImageBackground>
    </View>
  );
}
