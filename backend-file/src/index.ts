import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';

// .env 파일에서 환경 변수 로드
dotenv.config();


const app = express();
const port = process.env.PORT;

app.use(express.json()); // JSON 요청 본문 파싱
app.use('/api/auth', authRoutes); // 인증 라우터
// Middleware
app.use(bodyParser.json());

// 간단한 라우팅 예시
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your portfolio backend!');
});

app.listen(port, () => {
  console.log(`!!!!Server is running on http://localhost:${port}!!!!`);
});




const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined');
}

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

