import { useStore } from "../store.jsx";


function SignupForm() {

    const { setAuthMode } = useStore();

    return (
        <>
            <h1>Sezione della registrazione</h1>
            <div className="flex flex-horizontal gap-2">
                <p>Hai già un account?</p>
                <a href="#" role="button" className="link link-primary" onClick={(e) => { e.preventDefault(); setAuthMode(0); }}>Accedi</a>
            </div>
        </>
    )

}

export default SignupForm;