import React, {useContext, useEffect, useState} from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedDish, setSelectedDish] = useState(null)

    const allDishesUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    const randomDishUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

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
        dish = dishes.find((dish)=> dish.idMeal === dish_id)
        setSelectedDish(dish)
        setShowModal(true)
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
        <AppContext.Provider value={{loading, dishes, setSearchTerm, fetchRandomDish, showModal, selectedDish, selectDish}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}