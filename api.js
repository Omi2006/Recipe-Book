export const fetchRecipes = async (name, ingredient, area, category) => {
    if (name) {
        const results = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        const recipes = await results.json()
        return recipes
    }
    else if (ingredient) {
        ingredient = ingredient.replace(/ /g, '_')
        const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        const recipes = await results.json()
        return recipes
    }
    else if (area !== 'none' && area) {
        const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
        const recipes = await results.json()
        return recipes
    }
    else if (category !== 'none' && category) {
        const results = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        const recipes = await results.json()
        return recipes
    }
}

export const goToRandom = async () => {
    const results = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    const recipe = await results.json()
    return recipe
}