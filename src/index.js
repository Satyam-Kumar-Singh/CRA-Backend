import dotenv from 'dotenv';
import http from 'http';
import sequelize from './db/sequelize.js';
import app from './app.js';
import User from './models/UsersModel.js';

dotenv.config();

const port = process.env.PORT || 2000
const server = http.createServer(app);




server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});
sequelize.authenticate()
    .then(() => console.log('Database connected successfully.'))
    .catch(err => console.error('Database connection error:', err));

sequelize.sync({ force: false }) // Set to true for development to re-create tables
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => console.error('Error creating database tables:', error));