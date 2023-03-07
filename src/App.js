import './App.css';
import {useGlobalContext} from "./context";
import Dishes from './components/Dishes';
import Favorites from './components/Favorites';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
    const {showModal} = useGlobalContext()
  return (
    <main>
      <Search/>
      <Favorites/>
      <Dishes/>
      {showModal && <Modal/>}
    </main>
  );
}

export default App;
