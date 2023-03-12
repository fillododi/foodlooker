import {useGlobalContext} from "../context";

const Modal = () => {
    const {selectedDish, closeModal} = useGlobalContext()
    const {strMealThumb: image, strMeal: name, strInstructions: text, strSource: source} = selectedDish
    return <aside className="modal-overlay">
        <div className="modal-container">
            <img src={image} alt={name} className="img modal-img"/>
            <div className="modal-content">
                <h4>{name}</h4>
                <p>How to Cook:</p>
                <p>{text}</p>
                <a href={source} target="_blank">Original Source</a>
                <button onClick={closeModal} className="btn btn-hipster close-btn">Close</button>
            </div>
        </div>
    </aside>
}
export default Modal