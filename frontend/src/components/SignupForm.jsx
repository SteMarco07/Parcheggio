import { useStore } from "../store.jsx";


function SignupForm() {

    const { setAuthMode } = useStore();

    return (
        <>
            <h1 className="text-3xl font-bold">Registrazione</h1>
            <div className="flex flex-horizontal gap-2">
                <p>Hai già un account?</p>
                <a href="#" role="button" className="link link-primary" onClick={(e) => { e.preventDefault(); setAuthMode(0); }}>Accedi</a>
            </div>
        </>
    )

}

export default SignupForm;