import './App.scss'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Category from './containers/Category';
import Products from './containers/Products';
import Orders from './containers/Orders';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Users from './containers/Users';

import ProtectedRoute from './components/ProtectedRoutes'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser, getUsers, isUserSignedIn } from './actions';


function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.user.users)


  useEffect(() => {
    if (!user.authenticate) {
      dispatch(isUserSignedIn());
    }

  }, [dispatch, user.authenticate]);

  useEffect(() => {
    if (user.authenticate) {
      dispatch(getUsers())
    }
  }, [dispatch, user.authenticate])


  return (
    <div className="container">
      <Switch>
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/category" component={Category} />
        <ProtectedRoute path="/products" component={Products} />
        <ProtectedRoute path="/orders" component={Orders} />
        <ProtectedRoute path="/users" component={Users} />


        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  )
}

export default App;
