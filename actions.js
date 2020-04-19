import {fetchRecipes} from '../api'

export const REQUEST_SENT = 'REQUEST_SENT'
export const REQUEST_SUCCESFUL = 'REQUEST_SUCCESFUL'
export const REQUEST_FAILED = 'REQUEST_FAILED'
export const ADD_FAVORITE = 'ADD_FAVORITE'
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE'

export const getRecipes = state => async dispatch => {
    dispatch({type: REQUEST_SENT})
    try {
        const data = await fetchRecipes(state.meal, state.ingredient, state.area, state.category)
        dispatch({type: REQUEST_SUCCESFUL, payload: data})
    } catch (err) {
        dispatch({type: REQUEST_FAILED, payload: err.message})
    }
}

export const addFavorite = recipe => ({
    type: ADD_FAVORITE,
    payload: recipe,
})

export const removeFavorite = recipe => ({
    type: REMOVE_FAVORITE,
    payload: recipe
})