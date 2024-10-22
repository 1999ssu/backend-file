import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 사용자 등록
router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err: any) { // `err` 타입을 `any`로 지정
    res.status(500).send(err.message);
  }
});

// 사용자 로그인
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    // if (!user) return 
    if(!user) {
      res.status(400).send('Invalid credentials'); // 메시지 발송 기능 실행 
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).send('Invalid credentials');
      return
    } 

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err: any) { // `err` 타입을 `any`로 지정
    res.status(500).send(err.message);
  }
});

export default router;
