const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const port = process.env.PORT || 9000;
dotenv.config(); // Load environment variables first
const authRoute = require('./Router/authRoute')

const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json())
app.set('view engine', 'ejs');

// Connection to MongoDB
mongoose.connect(process.env.MONGOOSEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/smoothies', (req, res) => {
    res.render('smoothies');
});
app.get('/information', (req, res) => {
    res.render('information'); // Assuming your EJS file is named 'information.ejs'
});

app.use(authRoute)
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
