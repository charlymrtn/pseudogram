import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyB-HT6a_Ul2aAjHR7uVxwM33AAsxdKUphs",
    authDomain: "pseudogram-1b052.firebaseapp.com",
    databaseURL: "https://pseudogram-1b052.firebaseio.com",
    projectId: "pseudogram-1b052",
    storageBucket: "pseudogram-1b052.appspot.com",
    messagingSenderId: "28532419100"
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
