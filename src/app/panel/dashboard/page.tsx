'use client';

import { useEffect } from "react";

export default function Dashboard() {    
    
    const fetchToken = async () => {

        const token = localStorage.getItem('token');
        
        try {
            const response = await fetch('/api/hasToken', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Autorization': `${token}`
                },
            });

            console.log(response);

        }catch(err){
            console.error('Erreur lors de la connexion:', err);
        }
    }

    // useEffect(() => {
    //     fetchToken()
    // })

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}