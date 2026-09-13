// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();

// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// const UserRoute = require('./routers/UserRouter');
// const CustomerRoute = require('./routers/CustomerRouter');
// const ProductRoute = require('./routers/ProductRouter');
// const OrderRoute = require('./routers/OrderRouter');

// const PORT = process.env.PORT || 3000;
// const MONGODB_URI = process.env.MONGODB_URI;

// // Health check
// app.get('/abc', (req, resp) => {
//     return resp.json({ message: 'Server Started..' });
// });

// // Route mounting
// app.use('/api/user', UserRoute);
// app.use('/api/customer', CustomerRoute);
// app.use('/api/product', ProductRoute);
// app.use('/api/order', OrderRoute);

// // 404 handler for unknown routes
// app.use((req, resp) => {
//     resp.status(404).json({ message: 'Route Not Found' });
// });

// // Centralized error handler (catches anything passed to next(err))
// app.use((err, req, resp, next) => {
//     console.error('Unhandled Error:', err);
//     resp.status(err.status || 500).json({ message: 'Internal Server Error' });
// });

// mongoose.connect(MONGODB_URI).then(() => {
//     console.log('Mongo db connected...');

//     app.listen(PORT, () => {
//         console.log(`Server Started And Running on port ${PORT}`);
//     });

// }).catch((error) => console.error('Db Error : ', error));
require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

app.use(
    cors({
        origin: 'http://goopiy.online',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const UserRoute = require('./routers/UserRouter');

const CustomerRoute = require('./routers/CustomerRouter');

const ProductRoute = require('./routers/ProductRouter');

const OrderRoute = require('./routers/OrderRouter');

const PORT = process.env.PORT || 3000;

const MONGODB_URI = process.env.MONGODB_URI;

// Health check

app.get('/testbackend', (req, resp) => {

    return resp.json({ message: 'Server Started..' });

});

// Route mounting

app.use('/api/user', UserRoute);

app.use('/api/customer', CustomerRoute);

app.use('/api/product', ProductRoute);

app.use('/api/order', OrderRoute);

// 404 handler for unknown routes

app.use((req, resp) => {

    resp.status(404).json({ message: 'Route Not Found' });

});

// Centralized error handler (catches anything passed to next(err))

app.use((err, req, resp, next) => {

    console.error('Unhandled Error:', err);

    resp.status(err.status || 500).json({
        message: 'Internal Server Error'
    });

});

mongoose.connect(MONGODB_URI).then(() => {

    console.log('Mongo db connected...');

    app.listen(PORT, () => {

        console.log("Server Started And Running on port " + PORT);

    });

}).catch((error) => console.error('Db Error : ', error));
