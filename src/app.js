const express = require('express');
const loginRouter = require('./routers/login.router');
const userRouter = require('./routers/user.router');
const categoriesRouter = require('./routers/categories.router');
const postRouter = require('./routers/post.router');
const error = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRouter);
app.use(error);

module.exports = app;
