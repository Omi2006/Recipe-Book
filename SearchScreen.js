import React from 'react'
import { TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Text, Button } from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import {connect} from 'react-redux'
import {goToRandom} from '../api'

import {getRecipes} from '../redux/actions'

class SearchScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        headerTitle: 'Search',
    })
    state = {
        meal: '',
        ingredient: '',
        category: '',
        area: '',
    }

    categories = [{"value": "none"},{"value":"Beef"},{"value":"Breakfast"},{"value":"Chicken"},{"value":"Dessert"},{"value":"Goat"},{"value":"Lamb"},{"value":"Miscellaneous"},{"value":"Pasta"},{"value":"Pork"},{"value":"Seafood"},{"value":"Side"},{"value":"Starter"},{"value":"Vegan"},{"value":"Vegetarian"}]
    areas = [{"value": "none"},{"value":"American"},{"value":"British"},{"value":"Canadian"},{"value":"Chinese"},{"value":"Dutch"},{"value":"Egyptian"},{"value":"French"},{"value":"Greek"},{"value":"Indian"},{"value":"Irish"},{"value":"Italian"},{"value":"Jamaican"},{"value":"Japanese"},{"value":"Kenyan"},{"value":"Malaysian"},{"value":"Mexican"},{"value":"Moroccan"},{"value":"Russian"},{"value":"Spanish"},{"value":"Thai"},{"value":"Tunisian"},{"value":"Turkish"},{"value":"Vietnamese"}]

    goToRandom = async () => {
        const result = await goToRandom()
        const recipe = result.meals[0]
        this.props.navigation.navigate('DetailsScreen', {recipe})

    }
    handleMealChange = meal => {
        this.setState({meal})
    }
    handleIngredientChange = ingredient => {
        this.setState({ingredient})
    }
    handleDropdownChange = key => val => {
        this.setState({[key]: val})
    }

    handleSubmit = async () => {
        this.props.getRecipes(this.state)
        this.props.navigation.navigate('ResultsScreen')
    }

    handleAreaChange = this.handleDropdownChange('area')
    handleCategoryChange = this.handleDropdownChange('category')

    render() {
        return(
            <KeyboardAvoidingView style={{flex: 1, backgroundColor: 'pink'}} behavior='height'>
                <Text>Here is where you choose what to search for. You may only choose one at a time. To unselect an element in a list, just choose the none value.</Text>
                <TextInput 
                style={styles.input}
                value={this.state.meal}
                onChangeText={this.handleMealChange}
                placeholder='Meal name'
                editable={this.state.ingredient === '' && (this.state.area === '' || this.state.area === 'none') && (this.state.category === '' || this.state.category === 'none')}
                placeholderTextColor='#FFFFFF'
                />
                <TextInput 
                style={styles.input}
                value={this.state.ingredient}
                onChangeText={this.handleIngredientChange}
                placeholder='Main ingredient name'
                editable={this.state.meal === '' && (this.state.area === '' || this.state.area === 'none') && (this.state.category === '' || this.state.category === 'none')}
                placeholderTextColor='#FFFFFF'
                />
                <Dropdown 
                data={this.areas}
                containerStyle={styles.dropdown}
                onChangeText={this.handleAreaChange}
                label='Food regions options'
                disabled={!(this.state.meal === '' && this.state.ingredient === '' && (this.state.category === '' || this.state.category === 'none'))}
                />
                <Dropdown 
                containerStyle={styles.dropdown}
                data={this.categories}
                onChangeText={this.handleCategoryChange}
                label='Food category options'
                disabled={!(this.state.meal === '' && this.state.ingredient === '' && (this.state.area === '' || this.state.area === 'none'))}
                />
                <TouchableOpacity onPress={this.handleSubmit} disabled={this.state.meal === '' && this.state.ingredient === '' && (this.state.area === '' || this.state.area === 'none') && (this.state.category === '' || this.state.category === 'none')}>
                    <Text style={{color:'blue', alignSelf:'center'}}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.goToRandom} >
                    <Text style={{color:'purple', alignSelf:'center'}}>Get a random meal</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: 'black',
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
    },
    dropdown: {
        paddingTop: 15
      },
})

const mapStateToProps = state => ({
    recipes: state.recipes
})

export default connect(mapStateToProps, {getRecipes})(SearchScreen)