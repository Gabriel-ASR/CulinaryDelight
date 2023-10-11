import { StyleSheet } from "react-native";
import AddInformation from "../pages/AddInformation";

const style = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },

  topMenu: {
    height: 110,
    backgroundColor: "#1D2D44",
    display: "flex",
    paddingLeft: "5%",
    paddingRight: "5%",
    paddingTop: "8%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    width: "16%",
    aspectRatio: "1.4/1",
  },

  menu: {
    width: "10%",
    aspectRatio: "1.4/1",
  },

  contentContainer: {
    padding: 15,
    display: "flex",
    alignItems: "center",
  },

  newRecipe: {
    backgroundColor: "#1D2D44",
    borderRadius: 50,
    marginTop: 17,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "5%",
    paddingTop: "5%",
    width: "100%",
  },

  newRecipeTextNovo: {
    color: "white",
    fontFamily: "MontserratBlack",
  },

  commonText: {
    fontFamily: "MontserratMedium",
    alignSelf: "flex-start",
    marginTop: "3%",
    fontSize: 17,
  },

  commonTextColor: {
    color: "#1D2D44",
  },

  newRecipeTextPoste: {
    color: "white",
    fontSize: 20,
    fontFamily: "MontserratBlack",
  },

  loginButton: {
    backgroundColor: "#3E5C76",
    display: "flex",
    justifyContent: "center",
    paddingLeft: "4%",
    paddingRight: "4%",
    paddingTop: "3%",
    paddingBottom: "3%",
    borderRadius: 7,
  },

  loginText: {
    color: "white",
    fontFamily: "MontserratBlack",
  },

  registerText: {
    color: "white",
    fontFamily: "MontserratBlack",
  },

  recipeCard: {
    backgroundColor: "#F4F4F4",
    width: "100%",
    display: "flex",
    marginTop: "5%",
    borderRadius: 18,
    paddingRight: 17,
    paddingLeft: 17,
    paddingTop: 18,
    paddingBottom: 5,
  },

  recipeProfilePhoto: {
    width: 35,
    height: 35,
    borderBlockColor: "#1D2D44",
    borderWidth: 3,
    borderRadius: 50,
    display: "inline",
    aspectRatio: 1 / 1,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
  },

  recipeAuthor: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  recipeImage: {
    width: "100%",
    height: 170,
    backgroundColor: "blue",
    borderRadius: 25,
    marginTop: 10,
    overflow: "hidden",
  },

  cardInfoTitle: {
    fontFamily: "MontserratMedium",
    color: "#1D2D44",
    fontSize: 17,
    marginTop: 10,
  },

  infoContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },

  info: {
    fontFamily: "MontserratRegular",
    fontSize: 13,
  },

  hiperlink: {
    color: "#0083BB",
    fontFamily: "MontserratRegular",
    marginTop: 5,
  },

  darkTextColor: {
    color: "#1D2D44",
  },

  whiteTextColor: {
    color: "white",
    fontFamily: "MontserratMedium",
    marginLeft: 9,
  },

  titleContainer: {
    marginTop: 9,
    display: "flex",
    paddingLeft: 20,
  },

  title: {
    fontFamily: "MontserratBlack",
    fontSize: 28,
  },

  subTitle: {
    fontFamily: "MontserratSemiBold",
  },

  newRecipeCard: {
    backgroundColor: "#3E5C76",
    padding: 27,
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    gap: 19,
  },

  newRecipeContentContainer: {
    padding: 15,
    display: "flex",
    gap: 35,
  },

  textInput: {
    backgroundColor: "white",
    color: "#1D2D44",
    height: 40,
    paddingLeft: 15,
    borderRadius: 15,
  },

  newRecipePressable: {
    backgroundColor: "#1D2D44",
    width: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 11,
    borderRadius: 10,
  },

  newRecipePressableImage: {
    backgroundColor: "#1D2D44",
    width: "40%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 11,
    borderRadius: 10,
  },

  newRecipePressableText: {
    fontFamily: "MontserratMedium",
    color: "white",
  },

  textField: {
    backgroundColor: "white",
    color: "#1D2D44",
    height: 120,
    paddingLeft: 15,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderRadius: 15,
    textAlignVertical: "top",
  },

  inputGroup: {
    display: "flex",
    gap: 10,
  },

  pressableSubmit: {
    backgroundColor: "#1D2D44",
    width: "50%",
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    padding: 15,
    borderRadius: 15,
  },

  ingredientContainer: {
    display: "flex",
    gap: 15,
  },

  ingredientInputGroup: {
    display: "flex",
    gap: 7,
  },

  ingredientListContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },

  ingredientListItem: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 50,
    fontFamily: "MontserratMedium",
  },

  authDrawer: {
    backgroundColor: "white",
    height: "85%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    zIndex: 1,
  },

  authShadow: {
    height: "85%",
    width: "100%",
    position: "absolute",
    backgroundColor: "black",
    zIndex: 0,
    bottom: 10,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    opacity: 0.5,
  },

  authAction: {
    fontSize: 50,
    fontFamily: "MontserratBlack",
    color: "#1D2D44",
  },

  textInputContainer: {
    width: "100%",
    display: "flex",
    gap: 20,
  },

  authInput: {
    backgroundColor: "#E7E7E7",
    height: 45,
    borderRadius: 14,
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: "MontserratMedium",
  },

  authSubmit: {
    backgroundColor: "#3E5C76",
    padding: 10,
    width: "50%",
    display: "flex",
    alignItems: "center",
    borderRadius: 15,
  },

  authSubmitText: {
    fontFamily: "MontserratBlack",
    color: "white",
    fontSize: 18,
  },

  profilePicture: {
    borderWidth: 2,
    aspectRatio: 1 / 1,
    height: 50,
    borderRadius: 50,
    borderColor: "#3E5C76",
    overflow: "hidden",
  },

  profileInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  profileContentContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
    gap: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },

  profileName: {
    fontFamily: "MontserratBlack",
    color: "#1D2D44",
    fontSize: 30,
  },

  profileSubText: {
    fontFamily: "MontserratBold",
    color: "#354E72",
    fontSize: 20,
  },

  profileBio: {
    fontFamily: "MontserratRegular",
    textAlign: "center",
  },

  profilePressable: {
    backgroundColor: "#1D2D44",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 50,
  },

  imageEditButton: {
    width: 150,
    display: "flex",
    alignItems: "center",
  },

  currentRecipeContainer: {
    padding: 15,
    display: "flex",
    gap: 20,
  },

  ingredientList: {
    display: "flex",
    gap: 10,
  },

  ingredientItem: {
    fontFamily: "MontserratMedium",
    color: "#1D2D44",
    display: "flex",
    justifyContent: "center",
  },

  addInformationContainer: {
    backgroundColor: "#1D2D44",
    width: "100%",
    padding: 20,
    gap: 15,
    borderRadius: 20,
  },

  addInfoInputGroup: {
    display: "flex",
    gap: 8,
  },

  addInfoTouchable: {
    alignSelf: "center",
    backgroundColor: "#3E5C76",
    width: "50%",
    display: "flex",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
});

export default style;
