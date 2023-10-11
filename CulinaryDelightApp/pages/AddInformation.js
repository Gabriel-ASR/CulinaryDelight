import { View, TextInput, Text, TouchableHighlight } from "react-native";
import { useForm, Controller } from "react-hook-form";
import style from "../styles/styles";
import { addOtherInfo } from "../services/dbManipulation";
import { dbUserQuery } from "../services/dbRead";

function AddInformation({ navigation, route }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Age: "",
      Bio: "",
      Name: "",
    },
  });

  const { loginData } = route.params;

  async function onSubmit(data) {
    await addOtherInfo(data);
    await dbUserQuery(loginData);
    navigation.navigate("Página Inicial");
  }

  return (
    <View>
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#3E5C76",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 15,
        }}
      >
        <View style={style.addInformationContainer}>
          <Text
            style={{
              color: "white",
              fontFamily: "MontserratBlack",
              fontSize: 20,
            }}
          >
            Precisamos de mais{"\n"}algumas informações...
          </Text>
          <View style={style.addInfoInputGroup}>
            <Text
              style={{
                color: "white",
                fontFamily: "MontserratMedium",
                marginLeft: 10,
              }}
            >
              Qual é seu nome?
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 35,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="Name"
            />
            {errors.Name && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Digite seu nome!
              </Text>
            )}
          </View>
          <View style={style.addInfoInputGroup}>
            <Text
              style={{
                color: "white",
                fontFamily: "MontserratMedium",
                marginLeft: 10,
              }}
            >
              Quantos anos você tem?
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: "white",
                    borderRadius: 10,
                    height: 35,
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
              name="Age"
            />
            {errors.Age && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Digite sua idade!
              </Text>
            )}
          </View>
          <View style={style.addInfoInputGroup}>
            <Text
              style={{
                color: "white",
                fontFamily: "MontserratMedium",
                marginLeft: 10,
              }}
            >
              Elabore uma bio!
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={style.textField}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  numberOfLines={10}
                />
              )}
              name="Bio"
            />
            {errors.Bio && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Digite sua bio!
              </Text>
            )}
          </View>
          <TouchableHighlight
            style={style.addInfoTouchable}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={{ fontFamily: "MontserratBlack", color: "white" }}>
              Atualizar
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}

export default AddInformation;
