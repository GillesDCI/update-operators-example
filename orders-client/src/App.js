import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import OrderList from './components/OrderList/OrderList';


function App() {
  return (
    <div className="content">
        <Navbar title="Orders - App" />

        <div class="row">
            <h1>Overview Orders</h1>
        </div>
        
        <OrderList />
    </div>
  );
}

export default App;
