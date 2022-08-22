import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const GetUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id', 'name', 'email', 'idUse']
        });
        res.json(users);
    } catch (error) {
        console.error(error);
    }
}

export const Register = async(req, res) => {
    const {name, sex, idUse, address, password, confPassword, email, phone, univ} = req.body;

    if(password !== confPassword) {
        return res.status(400).json({
            msg: '입력한 비밀번호와 재입력한 비밀번호가 서로 일치하지 않습니다.'
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name,
            sex,
            address,
            idUse,
            password: hashPassword,
            email,
            phone,
            univ,
        });
        res.json({
            msg: '성공적으로 등록되었습니다!'
        });
    } catch (error) {
        console.error(error);
    }
}

export const Login = async(req,res) => {
    try {
        const user = await Users.findAll({
            where: {
                idUse: req.body.idUse
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({
            msg: '비밀번호가 틀렸습니다!'
        });

        const userId = user[0].idUse;
        const userName = user[0].name;
        const userEmail = user[0].email;
        const accessToken = jwt.sign({userId, userName, userEmail}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        const refreshToken = jwt.sign({userId, userName, userEmail}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        //여기서 refreshToken이 update된 것 아님? 맞음!
        await Users.update({refresh_token: refreshToken}, {
          where: {
            idUse: userId
          }  
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg:'아이디를 못 찾았습니다.'});
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    //refreshToken 자동만료의 경우
    if(!refreshToken) {
        return res.sendStatus(204);
    }
    const user = await Users.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    //해당 refreshToken을 가지고 있는 user가 없는 경우
    if(!user[0]) {
        return res.sendStatus(204);
    }
    const userId = user[0].id;
    //refreshToken이 없는 상태로 만들어버리기. 
    await Users.update({refresh_token: null}, {
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    //return의 결과물 console로 찍어보기.
    return res.sendStatus(200);
}

