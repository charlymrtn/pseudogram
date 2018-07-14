import React, { Component } from 'react';
import firebase from 'firebase';
import logo from './logo.svg';

import FileUpload from './FileUpload';
import './App.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      user: null,
      pictures: []
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });

    firebase.database().ref('pictures').on('child_added', snapshot =>{
      this.setState({
        pictures: this.state.pictures.concat(snapshot.val())
      });
    });
  }

  handleAuth(){
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)
        .then(result => console.log(`${result.user.email} ha iniciado sesion`))
        .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogout(){
    firebase.auth().signOut()
    .then(result => console.log(`${result.user.email} ha salido`))
    .catch(error => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleUpload(event){
    const file = event.target.files[0];
    const storageRef = firebase.storage().ref(`/fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      this.setState({
        uploadValue: percentage
      })
    }, error => {
      console.log(error.message)
    }, () => {
      storageRef.getDownloadURL()
       .then(url => {
         const record = {
           image: url,
           photoURL: this.state.user.photoURL,
           displayName: this.state.user.displayName
         };
         const dbRef = firebase.database().ref("pictures");
         const newFile = dbRef.push();
         newFile.set(record);
       });﻿
    });
  }

  renderLoginButton(){
    if (this.state.user) {
      return(
        <div className="App-intro">
          <p className="App-intro">Hola {this.state.user.displayName}</p>
          <button onClick={this.handleLogout} className="App-btn">Salir</button>


          <FileUpload onUpload={this.handleUpload}/>

          {
            this.state.pictures.map(picture => (
              <div className="App-card">
                <figure className="App-card-image">
                  <img width="320" src={picture.image} alt=""/>
                  <figCaption className="App-card-footer">
                    <img className="App-card-avatar" src={picture.photoURL} alt={picture.displayName}/>
                    <span className="App-card-name">{picture.displayName}</span>
                  </figCaption>
                </figure>

              </div>
            )).reverse()
          }
        </div>
      );
    }else {
      return(
        <button onClick={this.handleAuth}>Login with google</button>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pseudogram</h1>
        </header>
        <p className="App-intro">
          {this.renderLoginButton()}
        </p>
      </div>
    );
  }
}

export default App;
