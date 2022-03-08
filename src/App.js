import './App.less';
import LoginPane from "./pages/login";
import AdminPane from "./pages/admin";

import {HashRouter as Router,Route,Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={"/*"} element={<AdminPane/>}/>
                <Route path={"/login"} element={<LoginPane/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
