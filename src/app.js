import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send(" Hello This is CRA  Backend ");
});

app.use('/api/users',userRoutes);



app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send({error: 'Somethings went wrong!'})
});

export default app;