import logo from './logo.svg';
import './App.css';
import AppNavbar from './NumberNavbar';
import AppHomePage from './NumberHomePage'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <AppHomePage />
      
    </div>
  );
}

export default App;
