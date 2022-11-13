import AuthForm from "./auth/authForm";
import MainNav from "./mainNav/mainNavigation";
import Profile from "./profile/profile";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <MainNav>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </MainNav>
  );
}

export default App;
