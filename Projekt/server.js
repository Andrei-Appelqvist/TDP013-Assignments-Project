const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect to mongo
connectDB();
// Middleware
app.use(express.json({extended: false}));


app.get('/',(req, res) => res.send('Api Running'));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.Port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
