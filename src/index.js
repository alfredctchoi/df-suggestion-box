import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import firebase from 'firebase'

import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'

firebase.initializeApp({
  apiKey: "AIzaSyBd4UJelzQv4SuZDKpVSKgpkJQyH0oWd9I",
  authDomain: "df-suggestion-box-6522a.firebaseapp.com",
  databaseURL: "https://df-suggestion-box-6522a.firebaseio.com",
  projectId: "df-suggestion-box-6522a",
  storageBucket: "df-suggestion-box-6522a.appspot.com",
  messagingSenderId: "159685277878"
});

ReactDOM.render(<App/>, document.getElementById('app'));