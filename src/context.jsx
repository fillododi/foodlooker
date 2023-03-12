import React, {useContext, useEffect, useState} from "react";

const AppContext = React.createContext();
const allDishesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomDishUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'
const getFavoritesFromLocalStorage = () => {
    let favorites = localStorage.getItem('favorites')
    if(favorites){
        favorites = JSON.parse(localStorage.getItem('favorites'))
    }
    else {
        favorites = []
    }
    return favorites
}

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedDish, setSelectedDish] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    const fetchDishes = async (url) => {
        setLoading(true)
        try{
            const response = await fetch(url)
            const data = await response.json()
            if(data.meals){
                setDishes(data.meals)
            } else {
                setDishes([])
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const fetchRandomDish = () =>{
        fetchDishes(randomDishUrl)
    }

    const selectDish = (dish_id, isFavorite) =>{
        let dish
        if(isFavorite){
            dish = favorites.find((dish)=>dish.idMeal === dish_id)
        } else {
            dish = dishes.find((dish)=> dish.idMeal === dish_id)
        }
        setSelectedDish(dish)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavorites = (dish_id) =>{
        const dish = dishes.find((dish)=>dish.idMeal === dish_id)
        const alreadyFavorite = favorites.find((dish)=>dish.idMeal === dish_id)
        if(alreadyFavorite) return
        const updatedFavorites = [...favorites, dish]
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
    const removeFromFavorites = (dish_id) =>{
        const updatedFavorites = favorites.filter((dish)=>dish.idMeal != dish_id)
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    useEffect(()=>{
        fetchDishes(allDishesUrl)
    },[])

    useEffect(()=>{
        if(!searchTerm){
            return
        } else {
            const selectedDishUrl = allDishesUrl + searchTerm
            fetchDishes(selectedDishUrl)
        }
    }, [searchTerm])

    return (
        <AppContext.Provider value={{
            loading, dishes, setSearchTerm, fetchRandomDish,
            showModal, selectedDish, selectDish, closeModal,
            addToFavorites, removeFromFavorites, favorites
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}