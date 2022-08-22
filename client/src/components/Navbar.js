import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:5000/logout');
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <nav>
            <span>
                <button onClick={Logout}>로그 아웃</button>
            </span>
        </nav>
    );
}

export default Navbar;