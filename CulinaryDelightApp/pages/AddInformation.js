import { View, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import style from "../styles/styles";

function AddInformation() {
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

  return (
    <View>
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
        name="Bio"
      />
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
        name="Age"
      />
    </View>
  );
}

export default AddInformation;
