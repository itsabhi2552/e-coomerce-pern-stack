import { useParams, useNavigate } from 'react-router-dom';

function send({role}) {
    const { id } = useParams();
    const navigate = useNavigate();

    fetch(`http://localhost:3000/verifyEmail/${id}`, {
        method: 'GET',
        body: JSON.stringify()
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            localStorage.setItem('role', data.role);
            role(data.role);
            if (data.role === 'user') {
                navigate('/home');
            }
        });
}

export default send;