import { prisma } from '../lib/prisma';
import express from 'express'
const app = express()
const port = 3000

app.use(express.json());

app.get('/get', async (req, res) => {
    try {
        const getuse = await prisma.user.findMany();
        res.status(200).json(getuse);
    } catch (error) {
        res.status(500).json('khong co du lieu');
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
