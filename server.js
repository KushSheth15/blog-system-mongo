require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { checkForAuthenticationCookie } = require('./middleware/auth-jwt');

const userRoute = require('./routes/user'); 
const blogRoute = require('./routes/blog');
const Blog = require('./models/blog');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.set('view engine', 'ejs');
app.set('views',path.resolve("./views"));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home',{
        user: req.user,
        blogs: allBlogs
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
});