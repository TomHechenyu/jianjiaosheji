import React from 'react';
import axios from 'axios'
import './App.css';
import Tabber from './components/tabbar'
class App extends React.Component{
  render(){
    return <div className="toBottom">
      App
        {this.props.children}
        <Tabber></Tabber>
    </div>
  }
  componentDidMount(){
    axios({
      url:'/v2/page?pageId=1&tabId=1&currentPage=1&pageSize=8&_=1569414452380'
    }).then(res=>{
      console.log(res.data)
    })
  }
}


export default App;
