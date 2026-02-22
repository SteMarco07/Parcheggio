
import { useStore } from "../store.jsx";

function LoginForm() {

    const { setAuthMode } = useStore();

    return (
        <>
            <h1 className="text-3xl font-bold">Accesso</h1>
            <div className="flex flex-horizontal gap-2">
                <p>Non hai un account?</p>
                <a href="#" role="button" className="link link-primary" onClick={(e) => { e.preventDefault(); setAuthMode(1); }}>Registrati</a>

            </div>
        </>
    );

}

export default LoginForm;