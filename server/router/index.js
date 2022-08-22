import express from 'express';
import {GetUsers, Register, Login, Logout} from '../controllers/Users.js';
import {verifyToken} from '../middleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

// /users로 get요청을 보낼 때 서버로부터 user의 유효성 검증
router.get('/users', verifyToken, GetUsers);
// /user post요청을 보낼 때 회원가입 진행
router.post('/users', Register);
// /login으로 post요청을 보낼 때 로그인 진행
router.post('/login', Login);
// /token으로 get요청 보낼 때 토큰 초기화
router.get('/token', refreshToken);
// /logout으로 delete요청 보낼 때 로그아웃 진행
router.delete('/logout', Logout);

export default router;
