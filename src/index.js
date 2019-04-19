import React from 'react'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser';
import "./styles/bootstrap"
import './index.css'
import App from './App'
import { isDevelopment } from './config'
import * as serviceWorker from './serviceWorker'

if(!isDevelopment) {
  Sentry.init({
    dsn: "https://363f35f7768a444999b84c23af0d0d1d@sentry.io/1442506"
   });
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
