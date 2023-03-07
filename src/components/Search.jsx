import {useState} from "react";
import {useGlobalContext} from "../context";

const Search = () => {
    const {setSearchTerm, fetchRandomDish} = useGlobalContext()
    const [text, setText] = useState("")

    const handleTextChange = (event) => {
        setText(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if(text){
            setSearchTerm(text)
        }
    }

    const handleRandomDish = () =>{
        setSearchTerm('')
        setText('')
        fetchRandomDish()
    }

    return <header className="search-container">
        <form onSubmit={handleSubmit}>
            <input type="text"
                   placeholder="Type your favorite dish"
                   className="form-input"
                   value={text}
                   onChange={handleTextChange}/>
            <button type="submit" className="btn">Search</button>
            <button type="btn" className="btn btn-hipster" onClick={handleRandomDish}>Random dish</button>
        </form>
    </header>
}
export default Search