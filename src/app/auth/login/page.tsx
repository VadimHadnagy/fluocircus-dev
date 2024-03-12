'use client';
import { useState } from "react";
import "/public/css/globals.css";

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Rediriger vers la page d'accueil après la connexion réussie
                window.location.href = '/panel/dashboard';
            } else {
                const data = await response.json();
                setError(data.message); // Afficher le message d'erreur si la connexion échoue
            }
        } catch (error) {
            console.error('Erreur lors de la connexion:', error);
        }
    };

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <section className="flex flex-col h-3/6 w-4/12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-md p-5">
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 h-screen justify-center">
                    <h1 className="text-2xl text-center font-medium mb-4">Connexion</h1>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="grow" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Mot de passe" className="grow" />
                    </label>
                    {error && <p className="text-red-500">{error}</p>}
                    <input type="submit" value="Se connecter" className="bg-green-500 text-xl font-medium text-white h-14 rounded-md"/>
                </form>
                <a href="/auth/signup" className="mb-10"><p>Ou s'inscrire</p></a>
            </section>
        </main>
    );
}
