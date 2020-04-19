import React from 'react'
import {FlatList,View, StyleSheet, Text} from 'react-native'
import Row from './Row'
import _ from 'lodash'

const renderItem = ({item}) => <Row recipe={item} goToDetails={item.goToDetails}/>

const RecipeList = props => {
    if (props.recipes === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>It looks like we couldn't find a meal with the parameters you gave us. Maybe you made a typo...</Text>
            </View>
        )
    }
    let dataDict = _.keyBy(props.recipes, 'strMeal')
    let recipes = _.values(dataDict)
    recipes.map(recipe => {
        recipe.goToDetails = props.goToDetails
    })
    
    return <FlatList data={recipes} renderItem={renderItem} keyExtractor={(item) => item.strMeal} initialNumToRender={4}/>
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    error: {
        fontSize: 40,
        alignSelf: 'center'
    }
})

export default RecipeList