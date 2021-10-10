import React from 'react'
import {Route,Link,Switch } from 'react-router-dom';
import Article from './Article';
import Home from './Home';  

function App() { 

  return (
    <div >
      <div className="divClass">
        <button><Link to='/home'>Home</Link></button> &nbsp;
        <button><Link to='/article'>Article</Link></button><br/> 
     </div><br/> 
          <Switch> 
              <Route path="/home" component={Home}/>
              <Route path="/article" component={Article}/>  
          </Switch> 
    </div>
  );
}

export default App;
