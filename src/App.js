import './App.css';
import Dishes from './components/Dishes';
import Favorites from './components/Favorites';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
  return (
    <main>
      <Search/>
      <Favorites/>
      <Dishes/>
      <Modal/>
    </main>
  );
}

export default App;
