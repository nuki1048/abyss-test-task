import Board from './components/board';
import ZoomSelect from './components/zoomSelect';
import './App.css';
const App = (): JSX.Element => {
  return (
    <main>
      <ZoomSelect />
      <Board />
    </main>
  );
};

export default App;
