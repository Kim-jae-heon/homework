import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import PopupPostCode from './PopupPostCode.js';
import '../logo.css';

const logoImage = {
    seoul: `url("https://www.academyinfo.go.kr/image/schlInfoJspImgLoad.do?paramUrl=/infofile/PDF_UPLOAD/ANNOUNCE/200812031738480.jpg&refParamUrl=/infofile/PDF_UPLOAD/ANNOUNCE/200812031738480.jpg")`,
    yeonsei: `url("https://www.yonsei.ac.kr/_res/sc/img/intro/img_symbol25.png")`,
    korea: `url("https://www.korea.ac.kr/mbshome/mbs/university/images/img/img_1_1_5_1_4__10.png")`,
    seokang: `url("https://sogang.ac.kr/front/imgs/common/logo0.png")`
}

const Register = () => {
    const [name, setName] = useState('');
    const [sex, setSex] = useState(0);
    const [popupOpen, setPopupOpen] = useState(false);
    const [address, setAddress] = useState('');
    const [idUse, setIdUse] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [univ, setUniv] = useState('');
    const [msg, setMsg] = useState('');
    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const openPostCode = () => {
        setPopupOpen(true);
    }

    const closePostCode = () => {
        setPopupOpen(false);
    }

    const Register = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/users', {
                name,
                sex,
                address,
                idUse,
                password,
                confPassword,
                email,
                phone,
                univ,
            });
            navigate('/');
        } catch (error) {
            console.error(error);
            setMsg(error.response.data.msg);
        }
    }
    
    return (
        <section>
            <div>
                <form onSubmit={Register} className='box' encType='multipart/form-data'>
                    <p>{msg}</p>
                    <div>
                        <label>이름</label>
                        <input type='text' placeholder='이름' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>성별</label>
                        <input type='radio' value='0' name='male' onChange={(e) => setSex(parseInt(e.target.value))}/>
                        <label htmlFor='male'>남자</label>
                        
                        <input type='radio' value='1' name='female' onChange={(e) => setSex(parseInt(e.target.value))}/>
                        <label htmlFor='female'>여자</label>
                    </div>
                    <div>
                        <label>주소</label>
                        <button type='button' onClick={openPostCode}>우편번호 검색</button>
                        <div id='popupDom'>
                            {popupOpen && (
                                <PopupPostCode onClose={closePostCode} setAddress={setAddress}/>
                            )}
                        </div>
                        <input readOnly type='text' value={address}/>
                    </div>
                    <div>
                        <label>아이디</label>
                        <input type='text' placeholder='아이디를 입력해주세요' value={idUse} onChange={(e) => setIdUse(e.target.value)}/>
                    </div>
                    <div>
                        <label>비밀번호</label>
                        <input type='password' placeholder='비밀번호를 입력해주세요' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>비밀번호 재확인</label>
                        <input type='password' placeholder='비밀번호를 다시 입력해주세요' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>이메일</label>
                        <input type='text' placeholder='이메일 주소를 입력해주세요' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>핸드폰</label>
                        <input type='text' placeholder='핸드폰 번호를 입력해주세요' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>대학교</label>
                        <div className={click ? 'select active':'select'} onClick={() => {
                            if(click === false) setClick(true)
                            else setClick(false)
                        }}>
                            <ul>
                                <li value="">선택해주세요!</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>서울대</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>연세대</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>고려대</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>서강대</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)}>기타</li>
                            </ul>
                            <div className='contain'>
                                <div className='selected'>
                                    <div className='selected-value'>{univ? univ: ""}</div>
                                    <div className='arrow'>▼</div>
                                </div>
                                <div className={show? 'logo-img': ''} 
                                style={show? { ...univ==='서울대' ? 
                                {backgroundImage: logoImage['seoul']} 
                                    : {...univ === '연세대'?
                                    {backgroundImage: logoImage['yeonsei']}
                                        : {...univ === '고려대' ? 
                                        {backgroundImage: logoImage['korea']} 
                                            : {backgroundImage: logoImage['seokang']}
                                        }
                                    }
                                } : {}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button>회원가입</button>
                </form>
            </div>
        </section>
    );
}

export default Register;