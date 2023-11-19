import logo from './logo.svg';
import './App.css';
import ProductDetails from './components/team3/ProductDetails';

function App() {

  const queryParams = new URLSearchParams(window.location.search)
  const prodId = queryParams.get("id")
  return (
    <div>
      <ProductDetails productId={prodId}/>
    </div>
  );
}

export default App;
 