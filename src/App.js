import './App.css';
import {useGlobalContext} from "./context";
import Dishes from './components/Dishes';
import Favorites from './components/Favorites';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
    const {showModal, favorites} = useGlobalContext()
  return (
    <main>
      <Search/>
      {favorites.length > 0 && <Favorites/>}
      <Dishes/>
      {showModal && <Modal/>}
    </main>
  );
}

export default App;
