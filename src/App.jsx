import { Routes, Route } from "react-router-dom";
import Login from "./pages/LoginPage";
import SignIn from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/LandingPage";
import EventPage from "./pages/EventPage";
import InvitationGenerator from "./pages/GenerateInvite";
import YourEventsPage from "./components/events/YourEvent";

function App() {
  return (
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignIn/>}/>
       <Route path="/landing" element={<LandingPage/>}/>
       <Route path="/event/:eventId" element={<EventPage />} /> 
              <Route path="/invite" element={<InvitationGenerator/>}/>
                <Route path="/your-events" element={<YourEventsPage/>}/>

    </Routes>
  );
}

export default App;
