import React, { Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import './Styled/index.scss';
import { Todo } from "./Components/todo";
ReactDOM.render(
  <Fragment>
      <Todo/>
  </Fragment>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
