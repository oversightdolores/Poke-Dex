
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import CreatePoke from './pages/CreatePoke';
import Landing from './pages/Landing';



function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing}/> 
          <Route exact path="/home" component={Home}/>
           <Route path="/create" component={CreatePoke}/> 
          <Route exact path="/home/detail/:id" component={Detail}/>
          {/*<Route exact path="/home/detail/editar/:id" component={Editar}/>*/}
    </Switch>
  );
}

export default App;
