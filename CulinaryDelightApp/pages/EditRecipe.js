import { ScrollView } from "react-native";
import TopMenu from "../components/TopMenu";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Pressable, TextInput } from "react-native";
import style from "../styles/styles";
import { RefreshControl } from "react-native";

function EditRecipe() {
  return (
    <ScrollView>
      <TopMenu />
      <View style={style.newRecipeCard}>
        <View style={style.inputGroup}>
          <Text style={style.whiteTextColor}>Nome da receita</Text>
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
            <Text style={style.whiteTextColor}>Adicione os ingredientes!</Text>
          )}
        </View>
        <View style={style.inputGroup}>
          <Text style={style.whiteTextColor}>
            Escolha a foto da capa de sua receita:
          </Text>
          <Pressable onPress={pickImage} style={style.newRecipePressableImage}>
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
          <Text style={style.whiteTextColor}>Descreva a forma de preparo:</Text>
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
    </ScrollView>
  );
}

export default EditRecipe;
