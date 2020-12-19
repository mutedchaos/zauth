import { API } from '@vicion/zauth-api'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import fetchAdapter from './fetchAdapter'
import reportWebVitals from './reportWebVitals'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body, html {
    padding: 0;
    margin: 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }`

API.base.configure({
  baseURL: process.env.REACT_APP_API_ROOT,
  makeRequest: fetchAdapter,
})

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
