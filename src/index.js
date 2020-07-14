/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss";
import "assets/demo/demo.css";
import "assets/demo/nucleo-icons-page-styles.css";
//styles by tuanhai
import "assets/css/style.css";
// pages for this kit
import LoginPage from "views/Home/LoginPage.js";
import SignUpPage from "views/Home/SignUpPage.js";
import HomePage from "views/Home/HomePage/HomePage.js";
import UserProfile from "views/Home/UserProfile.js";
import FindConsignment from "views/Home/FindConsignment.js";
import Admin from "views/Admin";

//Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allReducer from "reducers"
//Saga
import createSagaMiddleware from "redux-saga"
import rootSaga from "sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(allReducer, applyMiddleware(sagaMiddleware));
const token = localStorage.getItem("token")
sagaMiddleware.run(rootSaga);
ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Switch>
            <Route exact path="/" render={props => <HomePage {...props} />} />
            <Route path="/dang-nhap" render={props => <LoginPage {...props} />} />
            <Route path="/dang-ky" render={props => <SignUpPage {...props} />} />
            <Route path="/ho-so" render={props => <UserProfile {...props} />} />
            <Route path="/tra-cuu" render={props => <FindConsignment {...props} />} />
            {token ? 
              <Route path="/admin" render={props => <Admin {...props} />} />
            :
              <Redirect to="/" />
            }
          </Switch>
        </Switch>
      </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);
