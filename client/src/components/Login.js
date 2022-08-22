import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const [idUse, setIdUse] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/login', {
                idUse,
                password
            });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            setMsg(error.response.data.msg);
        }
    }

    const Register = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    return (
        <section>
            <form onSubmit={Auth}>
                <p>{msg}</p>
                <div>
                    <label>유저 아이디를 입력해주세요</label>
                    <input type='text' placeholder='아이디 입력' value={idUse} onChange={(e) => setIdUse(e.target.value)}/>
                </div>
                <div>
                    <label>비밀번호를 입력해주세요</label>
                    <input type='password' placeholder='비밀번호 입력' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button>로그인</button>
                <button onClick={Register}>회원가입</button>
            </form>
        </section>
    );
}

export default Login;