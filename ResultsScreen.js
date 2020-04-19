import React from 'react'
import {View, Text} from 'react-native'
import {connect} from 'react-redux'
import RecipeList from '../RecipesList'
import {fetchRecipes} from '../api'

class ResultsScreen extends React.Component {
    static navigationOptions = () => ({
        headerTitle: 'Results'
    })

    goToDetails = async (meal) => {
        const result = await fetchRecipes(meal, '', '', '')
        const recipe = result.meals[0]
        this.props.navigation.push('DetailsScreen', {recipe})
    }
    render() {
        return(
            <View style={{flex:1, backgroundColor: '#90ee90'}}>
                <RecipeList recipes={this.props.recipes.recipes.meals} goToDetails={this.goToDetails}/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    recipes: state.recipes,
})

export default connect(mapStateToProps)(ResultsScreen)