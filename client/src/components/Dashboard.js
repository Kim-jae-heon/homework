import React, {useState, useEffect} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    
    const axiosJWT = axios.create();

    useEffect(() => {
        const refreshToken = async () => {
            try {
                const response = await axios.get('http://localhost:5000/token');
                setToken(response.data.accessToken);
                const decoded = jwt_decode(response.data.accessToken);
                setName(decoded.userName);
                setExpire(decoded.exp);
            } catch (error) {
                console.error(error);
                navigate('/');
            }
        };   
        
        refreshToken();
    },[axiosJWT, navigate, token]);

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwt_decode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    useEffect(() => {
        const getUsers = async () => {
            try{
                const response = await axiosJWT.get('http://localhost:5000/users', { 
                    headers: {
                            authorization: `Bearer ${token}`
                        },   
                });
                setUsers(response.data);
            } catch (error) {
                console.error(error);
            }
        } 
        getUsers();
    }, [token]);

    return (
        <div>
            <h1>안녕하세요 {name}님!</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, idx) => {
                        return (
                            <tr key={user.name}>
                                <td>{idx+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard;