
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Success from "./pages/Success";

import { BrowserRouter as Router, Route , Switch, Redirect} from "react-router-dom";

const App = () => {
  const user=true;

  return (
  <Router>
    <Switch>
      <Route path="/" exact>  <Home />   </Route>

     
      <Route path="/login" >   {user?<Redirect to="/" /> : <Login />}   </Route>

      <Route path="/register">  {user?<Redirect to="/" /> : <Register />}     </Route>

      <Route path="/cart">  <Cart />   </Route>

      <Route path="/success">  <Success />   </Route>

      <Route path="/products/:category" >  <ProductList />   </Route>

      <Route path="/product/:id">  <Product />   </Route> 
    </Switch>
  </Router>
  
  );
};

export default App;