import HomePage from "./components/views/HomePage";
import LoginPage from "./components/views/LoginPage"
import RegistrarNegocio from "./components/views/RegistrarNegocio";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

export default function App() {



  // const userDB = {
  //   email: "user@user.com",
  //   password: "user123"
  // }

  // const [user, setUser] = useState({name: "", email: ""});
  // const [error, setError] = useState("");

  // const Login = details => {
  //   console.log(details);

  //   if (details.email === userDB.email && details.password === userDB.password) {
  //     console.log("Logged in")
  //     setUser({
  //       name: details.name,
  //       email: details.email
  //     })
  //   } else {
  //     console.log("Details do not match!")
  //     setError("Details do not match!")
  //   }
  // }

  // const Logout = () => {
  //   console.log("Logout")
  //   setUser({name: "", email: ""})
  // }

  // return (
  //   <div className="App">
  //     {(user.email !== "") ? (
  //           <div className="welcome">
  //             <h1>Welcome, <span>{user.name}</span></h1>
  //             <button onClick={Logout}>LogOut</button>
  //           </div>
  //         ) : (
  //       <LoginForm Login={Login} error={error}/>)}
  //   </div>
  //   )  

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/registrarNegocio">
            <RegistrarNegocio />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

