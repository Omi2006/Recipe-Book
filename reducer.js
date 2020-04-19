import {combineReducers} from 'redux'

import {REQUEST_SUCCESFUL, REQUEST_FAILED, ADD_FAVORITE, REMOVE_FAVORITE} from './actions'

const merge = (prev, next) => Object.assign({}, prev, next)

const recipesReducer = (state = {}, action) => {
    switch(action.type) {
        case REQUEST_SUCCESFUL: 
            return merge(state, {recipes: action.payload})
        case REQUEST_FAILED: 
            return merge(state, {err: action.payload})
        case ADD_FAVORITE: 
            return {...state, favorites: [...state.favorites, action.payload]}
        case REMOVE_FAVORITE: 
            return {
                ...state,
                favorites: [
                    ...state.favorites.filter(recipe => recipe.strMeal !== action.payload)
                ]
            }
        default:
            return state
    }
}

export const reducer = combineReducers({
    recipes: recipesReducer,
})