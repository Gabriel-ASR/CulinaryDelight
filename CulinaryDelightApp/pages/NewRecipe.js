import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { useForm, Controller, set } from "react-hook-form";
import { BsPlus } from "react-icons/bs";
import style from "../styles/styles";
import { useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";

let ingAdded = null;
let qtdAdded = null;

export let recipeData;

export let ingredient;
export let quantity;
export let recipeImage;

export default function NewRecipe() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipeName: "",
      prepMethod: "",
      recipeDescription: "",
    },
  });

  const [ingredients, setIngredients] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [isVisible, setIsVisible] = useState();
  const [addIngredientError, setAddIngredientError] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);
  const [quantityError, setQuantityError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [image, setImage] = useState(null);

  const onSubmit = (data) => {
    if (ingredients.length == 0 || quantities.length == 0) {
      setAddIngredientError(true);
    }
    if (!image) {
      setImageError(true);
    } else {
      recipeData = data;
      ingredient = ingredients;
      quantity = quantities;
      recipeImage = image;
    }
  };

  const removeItem = (toRemoveIndex) => {
    console.log("ingredientes antes", ingredients);
    console.log("quantidades antes", quantities);
    ingredients.splice(toRemoveIndex, 1);
    quantities.splice(toRemoveIndex, 1);
    console.log("after splice", ingredients);
    setIngredients(ingredients.slice());
    setQuantities(quantities.slice());
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageError(false);
    }
  };

  const textInput = useRef(null);

  return (
    <ScrollView>
      <View style={style.topMenu}>
        <Image
          style={style.logo}
          source={require("../../assets/logo-culinary-delight.png")}
        />
        <View style={style.authentication}>
          <TouchableHighlight style={style.loginButton}>
            <Text style={style.loginText}>Login</Text>
          </TouchableHighlight>
          <Pressable>
            <Text style={style.registerText}>Registre-se</Text>
          </Pressable>
        </View>
        <Image
          style={style.menu}
          source={require("../../assets/menu-aberto.png")}
        />
      </View>
      <View style={style.newRecipeContentContainer}>
        <View style={style.titleContainer}>
          <Text style={[style.darkTextColor, style.title]}>Nova Receita</Text>
          <Text style={[style.darkTextColor, style.subTitle]}>
            poste uma nova receita deliciosa{"\n"}para que todos vejam!
          </Text>
        </View>
        <View style={style.newRecipeCard}>
          <View style={style.inputGroup}>
            <Text style={style.whiteTextColor}>
              Qual é o nome da sua receita?
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
                  style={style.textInput}
                />
              )}
              name="recipeName"
            />
            {errors.recipeName && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Digite o nome da receita!
              </Text>
            )}
          </View>
          <View style={style.inputGroup}>
            <Text style={style.whiteTextColor}>
              Quais ingredientes sua receita tem?
            </Text>
            {ingredients.map((ingrediente, index) => {
              print(ingrediente);
              return (
                <View key={index} style={style.ingredientListContainer}>
                  <Text style={style.ingredientListItem}>{ingrediente}</Text>
                  <Text style={style.ingredientListItem}>
                    {quantities[index]}
                  </Text>
                  <Pressable onPress={() => removeItem(index)}>
                    <Text>✖</Text>
                  </Pressable>
                </View>
              );
            })}
            {isVisible && (
              <View style={style.ingredientContainer}>
                <View style={style.ingredientInputGroup}>
                  <Text style={style.whiteTextColor}>Ingrediente:</Text>

                  <TextInput
                    style={style.textInput}
                    onChangeText={(data) => {
                      ingAdded = data;
                      setIngredientError(false);
                    }}
                  ></TextInput>
                  {ingredientError && (
                    <Text
                      style={{
                        fontFamily: "MontserratMedium",
                        color: "#ff3333",
                        marginLeft: 10,
                      }}
                    >
                      Digite o ingrediente!
                    </Text>
                  )}
                </View>
                <View style={style.ingredientInputGroup}>
                  <Text style={style.whiteTextColor}>Quantidade:</Text>
                  <TextInput
                    style={style.textInput}
                    keyboardType="numeric"
                    onChangeText={(data) => {
                      qtdAdded = data;
                      setQuantityError(false);
                    }}
                  ></TextInput>
                  {quantityError && (
                    <Text
                      style={{
                        fontFamily: "MontserratMedium",
                        color: "#ff3333",
                        marginLeft: 10,
                      }}
                    >
                      Digite a quantidade!
                    </Text>
                  )}
                </View>
              </View>
            )}
            <Pressable
              style={style.newRecipePressable}
              onPress={() => {
                if (isVisible && ingAdded && qtdAdded) {
                  setIsVisible(false);
                  setIngredients((ingredientsList) => [
                    ...ingredientsList,
                    ingAdded,
                  ]);
                  setQuantities((quantitiesList) => [
                    ...quantitiesList,
                    qtdAdded,
                  ]);
                  console.log("ing e qtd", ingredients, quantities);
                  setIngredientError(false);
                  setQuantityError(false);
                  setAddIngredientError(false);
                } else if (!isVisible && ingAdded && qtdAdded) {
                  setIsVisible(true);
                  ingAdded = null;
                  qtdAdded = null;
                  console.log("ing e qtd", ingAdded, qtdAdded);
                } else if (isVisible && ingAdded && !qtdAdded) {
                  setQuantityError(true);
                  console.log("ing e qtd", ingAdded, qtdAdded);
                } else if (isVisible && qtdAdded && !ingAdded) {
                  setIngredientError(true);
                  console.log("ing e qtd", ingAdded, qtdAdded);
                } else if (isVisible && !qtdAdded && !ingAdded) {
                  setIngredientError(true);
                  setQuantityError(true);
                  console.log("ing e qtd", ingAdded, qtdAdded);
                } else if (!isVisible) {
                  setIsVisible(true);
                  console.log("ing e qtd", ingAdded, qtdAdded);
                }
              }}
            >
              <Text style={style.newRecipePressableText}>+ Adicionar</Text>
            </Pressable>
            {addIngredientError && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Adicione pelo menos um ingrediente!
              </Text>
            )}
            {errors.password && (
              <Text style={style.whiteTextColor}>
                Adicione os ingredientes!
              </Text>
            )}
          </View>
          <View style={style.inputGroup}>
            <Text style={style.whiteTextColor}>
              Escolha a foto da capa de sua receita:
            </Text>
            <Pressable
              onPress={pickImage}
              style={style.newRecipePressableImage}
            >
              <Text style={style.newRecipePressableText}>+ escolher foto</Text>
            </Pressable>
            {imageError && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Adicione uma foto!
              </Text>
            )}
          </View>
          <View style={style.inputGroup}>
            <Text style={style.whiteTextColor}>
              Descreva a forma de preparo:
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
                />
              )}
              name="prepMethod"
            />
            {errors.prepMethod && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Adicione a forma de preparo!
              </Text>
            )}
          </View>
          <View style={style.inputGroup}>
            <Text style={style.whiteTextColor}>
              Adicione uma descrição bem chamativa:
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
                />
              )}
              name="recipeDescription"
            />
            {errors.recipeDescription && (
              <Text
                style={{
                  fontFamily: "MontserratMedium",
                  color: "#ff3333",
                  marginLeft: 10,
                }}
              >
                Adicione a descrição da receita!
              </Text>
            )}
          </View>
          <TouchableHighlight
            onPress={handleSubmit(onSubmit)}
            style={style.pressableSubmit}
          >
            <Text
              style={{
                fontFamily: "MontserratBlack",
                color: "white",
                fontSize: 16,
              }}
            >
              Adicionar
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
}
