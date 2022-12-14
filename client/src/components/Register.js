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
                        <label>??????</label>
                        <input type='text' placeholder='??????' value={name} onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label>??????</label>
                        <input type='radio' value='0' name='male' onChange={(e) => setSex(parseInt(e.target.value))}/>
                        <label htmlFor='male'>??????</label>
                        
                        <input type='radio' value='1' name='female' onChange={(e) => setSex(parseInt(e.target.value))}/>
                        <label htmlFor='female'>??????</label>
                    </div>
                    <div>
                        <label>??????</label>
                        <button type='button' onClick={openPostCode}>???????????? ??????</button>
                        <div id='popupDom'>
                            {popupOpen && (
                                <PopupPostCode onClose={closePostCode} setAddress={setAddress}/>
                            )}
                        </div>
                        <input readOnly type='text' value={address}/>
                    </div>
                    <div>
                        <label>?????????</label>
                        <input type='text' placeholder='???????????? ??????????????????' value={idUse} onChange={(e) => setIdUse(e.target.value)}/>
                    </div>
                    <div>
                        <label>????????????</label>
                        <input type='password' placeholder='??????????????? ??????????????????' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>???????????? ?????????</label>
                        <input type='password' placeholder='??????????????? ?????? ??????????????????' value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
                    </div>
                    <div>
                        <label>?????????</label>
                        <input type='text' placeholder='????????? ????????? ??????????????????' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label>?????????</label>
                        <input type='text' placeholder='????????? ????????? ??????????????????' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>?????????</label>
                        <div className={click ? 'select active':'select'} onClick={() => {
                            if(click === false) setClick(true)
                            else setClick(false)
                        }}>
                            <ul>
                                <li value="">??????????????????!</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>?????????</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>?????????</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>?????????</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)} onMouseOver={(e) => {setUniv(e.target.innerHTML);setShow(true);}} onMouseLeave={() => setShow(false)}>?????????</li>
                                <li value={univ} onClick={(e) => setUniv(e.target.innerHTML)}>??????</li>
                            </ul>
                            <div className='contain'>
                                <div className='selected'>
                                    <div className='selected-value'>{univ? univ: ""}</div>
                                    <div className='arrow'>???</div>
                                </div>
                                <div className={show? 'logo-img': ''} 
                                style={show? { ...univ==='?????????' ? 
                                {backgroundImage: logoImage['seoul']} 
                                    : {...univ === '?????????'?
                                    {backgroundImage: logoImage['yeonsei']}
                                        : {...univ === '?????????' ? 
                                        {backgroundImage: logoImage['korea']} 
                                            : {backgroundImage: logoImage['seokang']}
                                        }
                                    }
                                } : {}}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button>????????????</button>
                </form>
            </div>
        </section>
    );
}

export default Register;