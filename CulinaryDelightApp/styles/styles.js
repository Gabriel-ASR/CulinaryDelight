import { StyleSheet } from "react-native";

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
    },

    logo: {
        width: "16%",
        aspectRatio: "1.4/1"
    },

    menu: {
        width: "10%",
        aspectRatio: "1.4/1"
    },

    contentContainer: {
        padding: 15,
        display: "flex",
        alignItems: "center"
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
        width: "100%"
    },

    newRecipeTextNovo: {
        color: "white",
        fontFamily: "MontserratBlack"
    },

    commonText: {
        fontFamily: "MontserratMedium",
        alignSelf: "flex-start",
        marginTop: "3%",
        fontSize: 17
    },

    commonTextColor: {
        color: "#1D2D44",
    },

    newRecipeTextPoste: {
        color: "white",
        fontSize: 20,
        fontFamily: "MontserratBlack" 
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

    authentication: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",
        gap: 20
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
        width: 30,
        height: 30,
        borderBlockColor: "#1D2D44",
        borderWidth: 3,
        borderRadius: 50,
        display: "inline"
    },

    recipeAuthor: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    recipeImage: {
        width: "100%",
        height: 170,
        backgroundColor: "blue",
        borderRadius: 25,
        marginTop: 10
    },

    cardInfoTitle: {
        fontFamily: "MontserratMedium",
        color: "#1D2D44",
        fontSize: 17,
        marginTop: 10
    },

    infoContainer: {
        paddingLeft: 15,
        paddingRight: 15
    },

    info: {
        fontFamily: "MontserratRegular",
        fontSize: 13
    },

    hiperlink: {
        color: "#0083BB",
        fontFamily: "MontserratRegular",
        marginTop: 5
    }
})

export default style