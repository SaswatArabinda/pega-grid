import React, { Component } from 'react';
import Dashboard from './components/_dashboard';


class App extends Component {


  componentWillMount() {
    // const oReq = new XMLHttpRequest();
    // oReq.onload = function (e) {
    //   const sRes = oReq.response; // not responseText
    //   const oRes = JSON.parse(sRes);
    //   this.setState({
    //     // data: [oRes[0]]
    //     data: oRes
    //   })
    // }.bind(this)
    // oReq.open("GET", "https://jsonplaceholder.typicode.com/comments");
    // oReq.send()

  }

  render() {
    return (
      <Dashboard/>
    );
  }
}

export default App;
