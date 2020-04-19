import React from 'react'
import {ImageBackground, Text, ScrollView, StyleSheet, Button, View, Dimensions, TouchableOpacity, Linking, Alert} from 'react-native'
import {connect} from 'react-redux'
import {addFavorite, removeFavorite} from '../redux/actions'
import {FontAwesome} from '@expo/vector-icons'

class DetailsScreen extends React.Component {

    static navigationOptions = ({navigation}) => ({
        headerTitle: navigation.getParam('recipe').strMeal,
    })
    
    showIngredients = (ingredients) => {
        return ingredients.map((pair) => {
            return (
                <Text style={styles.ingredients}>{Object.values(pair)} of {Object.keys(pair)}</Text>
            )
        })
    }
    handleStar = (meal) => {
        const found = this.props.recipes.favorites.find(recipe => recipe.strMeal === meal)
        if (found) {
            Alert.alert (
                'Item removed from favorites',
                'The recipe was removed from your favorites list.',
                [
                    {text: 'Ok', onPress: () => {}},
                ]
            )
            this.props.removeFavorite(meal)
        } else {
            this.props.addFavorite(this.props.navigation.getParam('recipe'))
        }
    }
    render() {
        const recipe = this.props.navigation.getParam('recipe')
        let ingredients = []
        for (let i = 1; i < 21; i++) {
            if (recipe['strIngredient'+i] !== null && recipe['strIngredient'+i] !== '') {
                ingredients.push({
                    [recipe['strIngredient'+i]] : recipe['strMeasure'+i]
                })
            } else {
                break
            }
        }
        return(
            <View>
                <ScrollView style={styles.scrollview}>
                    <FontAwesome.Button name='star' onPress={() => this.handleStar(recipe.strMeal)} backgroundColor='green' >Star</FontAwesome.Button>
                    <Text style={styles.title}>INFORMATION</Text>
                    {recipe.strCategory ? (<Text style={styles.other}>Category: {recipe.strCategory}</Text>) : <Text style={styles.other}>No category.</Text>}
                    {recipe.strArea ? (<Text style={styles.other}>Food type: {recipe.strArea}</Text>) : <Text style={styles.other}>No food type.</Text>}
                    <Text style={styles.title}>INGREDIENTS</Text>
                    {this.showIngredients(ingredients)}
                    <Text style={styles.title}>PREPARATION</Text>
                    {recipe.strInstructions? (<Text style={styles.instructions}>{recipe.strInstructions}</Text>) : (<Text>No instructions.</Text>)}
                    {recipe.strYoutube ? <Button color='red' title='watch the youtube video' onPress={() => Linking.openURL(recipe.strYoutube)}/> : <Text>Sorry, no youtube video for this one</Text>}
                    {recipe.strSource ? 
                        (<TouchableOpacity onPress={() => Linking.openURL(recipe.strSource)} style={{paddingTop: 20}}>
                            <Text style={{color: 'blue'}}>Source</Text>
                        </TouchableOpacity>) : <Text style={{paddingTop: 20}}>Sorry, no source for this one</Text>}
                </ScrollView>
                <ImageBackground source={{uri: recipe.strMealThumb}} style={[styles.fixed, styles.containter, {zIndex: -1}]}/>
            </View>
        )
    }
}

styles = StyleSheet.create({
    containter: {
        width: Dimensions.get("window").width, //for full screen
        height: Dimensions.get("window").height //for full screen
      },
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.4
      },
    scrollview: {
       backgroundColor: 'transparent'
    }, 
    title: {
        fontSize: 30, 
        paddingBottom: 10,
        alignSelf: 'center'
    },
    instructions: {
        paddingBottom: 15,
        paddingTop: 15,
        fontSize: 17
    },
    ingredients: {
        paddingBottom: 15,
        fontSize: 14
    },
    other: {
        paddingBottom: 5
    },
    image: {
        width: 180, 
        height: 130,
        alignSelf: 'center'
    },
})

const mapStateToProps = state => ({
    recipes: state.recipes
})

export default connect(mapStateToProps, {addFavorite, removeFavorite})(DetailsScreen)