import Signup from "./Signup"
import Login from "./Login"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../context/AuthContext";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from "./Homepage"
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import ClientOverview from "./ClientsOverview";
import UpdateProfile from "./UpdateProfile";
import { IoMdPulse } from "react-icons/io"


function App() {
  return (
    <>
    <Container fluid style={{backgroundColor: "coral"}}>
        <h3 style={{color:"#fff", marginLeft:"150px", backgroundColor: "coral"}}> <br/> <IoMdPulse style={{color:"black"}}/> HOOLI Hjemmetejeneste<br/></h3>
        <br/>
    </Container>
    <Container className="d-flex align-items-center justify-content-center"
    style={{ minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px"}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={
                  <PrivateRoute>
                    <Homepage />
                  </PrivateRoute> }/>
                <Route path="update-profile/*" element={
                  <PrivateRoute>
                    <UpdateProfile/>
                  </PrivateRoute> }/>
                <Route path="signup/*" element={<Signup/>} />
                <Route path="login/*" element={<Login/>} />
                <Route path="forgot-password/*" element={<ForgotPassword/>} />
                <Route path="client-overview/*" element={<ClientOverview/>} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App;
