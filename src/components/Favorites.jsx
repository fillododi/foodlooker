import {useGlobalContext} from "../context";

const Favorites = () => {
    const {favorites, selectDish, removeFromFavorites} = useGlobalContext()
    return <section className="favorites">
        <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
                {favorites.map((item)=>{
                    const {idMeal: dish_id, strMealThumb: image} = item
                    return <div key={dish_id} className="favorite-item">
                        <img src={image} className="favorites-img img" onClick={()=>selectDish(dish_id, true)}/>
                        <button className="remove-btn" onClick={()=>removeFromFavorites(dish_id)}>Remove
                        </button>
                    </div>
                })}
            </div>
        </div>
    </section>
}
export default Favorites