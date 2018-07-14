import React, { Component } from 'react';

class FileUpload extends Component{
  constructor(){
    super();
    this.state = {
      uploadValue: 0
    };

  }

  render(){
    return(
      <div>
        <br/>
        <progress value={this.state.uploadValue} max="100"></progress>
        <br/>
        <input type="file" onChange={this.props.onUpload}></input>
        <br/>
        <img width="320" src={this.state.picture} alt=""/>
      </div>
    )
  }
}

export default FileUpload;
