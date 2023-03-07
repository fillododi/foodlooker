import { useGlobalContext } from "../context"
import {BsHandThumbsUp} from "react-icons/bs";

const Dishes = () => {
    const {loading, dishes, selectDish} = useGlobalContext();

    if(loading){
        return <section className="section">
            <h4>Loading...</h4>
        </section>
    }

    if (dishes.length < 1){
        return <section className="section">
            <h4>No dishes found</h4>
        </section>
    }

    return <section className="section-center">
        {dishes.map((dish)=>{
            const {idMeal: dish_id, strMeal: dish_name, strMealThumb: dish_image} = dish
            return <article className="dish" key={dish_id}>
                <img src={dish_image} className="img" onClick={()=> selectDish(dish_id)}/>
                <footer>
                    <h5>{dish_name}</h5>
                    <button className="like-btn"><BsHandThumbsUp></BsHandThumbsUp></button>
                </footer>
            </article>
        })}
    </section>
}
export default Dishes