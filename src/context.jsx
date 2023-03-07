import React, {useContext, useEffect, useState} from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [dishes, setDishes] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

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
        <AppContext.Provider value={{loading, dishes, setSearchTerm, fetchRandomDish}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}