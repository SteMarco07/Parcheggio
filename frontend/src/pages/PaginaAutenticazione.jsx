import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";


function PaginaAutenticazione() {

    const [mode, setMode] = useState('login');

    return (
        <>
            < div className="h-[calc(100vh-64px)] w-full px-6 py-7 flex justify-center" >
                <div className="w-[90%] lg:w-[30%] lg:min-w-120 md:w-[50%] h-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 flex flex-col items-center gap-4" >
                    <div className="flex gap-4">
                        <button className={`btn ${mode === 'login' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setMode('login')}>Login</button>
                        <button className={`btn ${mode === 'signup' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setMode('signup')}>Signup</button>
                    </div>
                    {mode == "login" ? <LoginForm /> : <SignupForm />}
                </div>
            </div>

        </>
    );
}

export default PaginaAutenticazione;