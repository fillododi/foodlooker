import React, {useContext, useEffect, useState} from "react";

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [loading, setLoading] = useState(false)
    const [dishes, setDishes] = useState([])

    const allDishUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
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

    useEffect(()=>{
        fetchDishes(allDishUrl)
    }, [])

    return (
        <AppContext.Provider value={{loading, dishes}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppContext, AppProvider, useGlobalContext}