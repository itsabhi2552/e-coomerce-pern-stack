import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default ({role}) => {
    const navigate = useNavigate();
    localStorage.clear();
    
    useEffect(() => {
        role('no');
        navigate('/');
    }, []);
};