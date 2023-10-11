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
import { useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, ImageBackground } from "react-native";
import { getProfileImages, userId } from "../services/dbRead";
import { username } from "../services/dbRead";
import { addRecipeToFirebase } from "../services/dbManipulation";
import TopMenu from "../components/TopMenu";

let ingAdded = null;
let qtdAdded = null;

export let recipeData;

export let ingredient;
export let quantity;
export let recipeImage;

export default function NewRecipe() {
  let profileImageToRender;

  const [profilePicture, setProfilePicture] = useState();

  async function filterUserImage() {
    const imageList = await getProfileImages();

    profileImageToRender = imageList
      .map((item, index) => {
        if (item.includes(userId)) {
          imageList.splice(index, 1);
          return item;
        } else {
          return null;
        }
      })
      .filter((item) => {
        if (!item) {
          return false;
        } else {
          return true;
        }
      });

    return profileImageToRender[0];
  }

  useEffect(() => {
    async function fetchData() {
      const profileImage = await filterUserImage();
      setProfilePicture(profileImage);
    }

    fetchData();
  }, []);

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

  const onSubmit = (data) => {
    if (ingredients.length < 1 || quantities.length < 1) {
      setAddIngredientError(true);
    }
    if (!blob) {
      setImageError(true);
    } else {
      recipeData = data;
      ingredient = ingredients;
      quantity = quantities;
      recipeImage = blob;

      addRecipeToFirebase(recipeData, ingredient, quantity, recipeImage);
    }
  };

  const removeItem = (toRemoveIndex) => {
    ingredients.splice(toRemoveIndex, 1);
    quantities.splice(toRemoveIndex, 1);
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
      const { uri } = result;

      blob = await fetch(uri).then((response) => response.blob());
    }
  };

  const textInput = useRef(null);

  return (
    <ScrollView>
      <TopMenu />
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
                  setIngredientError(false);
                  setQuantityError(false);
                  setAddIngredientError(false);
                } else if (!isVisible && ingAdded && qtdAdded) {
                  setIsVisible(true);
                  ingAdded = null;
                  qtdAdded = null;
                } else if (isVisible && ingAdded && !qtdAdded) {
                  setQuantityError(true);
                } else if (isVisible && qtdAdded && !ingAdded) {
                  setIngredientError(true);
                } else if (isVisible && !qtdAdded && !ingAdded) {
                  setIngredientError(true);
                  setQuantityError(true);
                } else if (!isVisible) {
                  setIsVisible(true);
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
