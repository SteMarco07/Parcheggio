import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";


function PaginaAutenticazione() {

    const [mode, setMode] = useState('login');

    return (
        <>
        {mode == "login" ? <LoginForm /> : <SignupForm />}
        </>
    );
}

export default PaginaAutenticazione;