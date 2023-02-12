import { useGlobalContext } from "../context"

const Dishes = () => {
    const context = useGlobalContext();
    console.log(context);

    return("Dishes")
}
export default Dishes