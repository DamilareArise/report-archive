import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const [user, setUser] = useState(null);
   
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                navigate('/login')   
            }
        });
        
    }, [auth, navigate]);





    return (
        <div>Dashboard</div>
    )
}

export default Dashboard