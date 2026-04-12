import { prisma } from '../lib/prisma';
import express from 'express'
const app = express()
const port = 3000

app.use(express.json());

app.get('/get', async (req, res) => {
    try {
        const getuse = await prisma.user.findMany({
            where: { email: req.query.user },
            select: { email: true },
        });
        res.status(200).json(getuse);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server hoặc không có dữ liệu' });
    }
});

app.post('/get', async (req, res) => {
    try {
        const getuse = await prisma.user.create({
            where: { email: req.query.user },
            select: { email: true },
        });
        res.status(200).json(getuse);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server hoặc không có dữ liệu' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
