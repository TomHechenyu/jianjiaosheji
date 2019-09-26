import React from 'react';
import './App.css';
import Tabber from './components/tabbar'
import store from './Rudex'

class App extends React.Component{
  state = {
    isShow:true
  }
  componentDidMount () {
    store.subscribe(()=>{
      this.setState({
        isShow:store.getState().isShow
      })
    })
  }
  render(){
    return <div className="toBottom">
        {this.props.children}
        {
          this.state.isShow?<Tabber></Tabber>:null
        }
    </div>
  }
}


export default App;
