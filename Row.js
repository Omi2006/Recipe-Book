import React from 'react'
import {TouchableOpacity, StyleSheet, Text, Image, View} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'

const Row = props => (
    <TouchableOpacity onPress={() => props.goToDetails(props.recipe.strMeal)}>
        <Text style={styles.title}>{props.recipe.strMeal}</Text>
        <Image source={{uri: props.recipe.strMealThumb}} style={styles.image} />
    </TouchableOpacity>
)

styles = StyleSheet.create({
    image: {
        width: 180, 
        height: 130,
        alignSelf: 'center'
    },
    title: {
        fontSize: 20,
        alignSelf: 'center'
    }
})

export default Row