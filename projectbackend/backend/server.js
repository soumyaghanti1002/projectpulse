require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemon=require('nodemon');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB Connection (Choose one: Local or Atlas)

//  Connect to Local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/projectManagementDB", {
})
.then(() => console.log(' Connected to MongoDB (Local)'))
.catch(err => console.error(' MongoDB Connection Error:', err));


//Connect to MongoDB Atlas (If Using .env)
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log(' Connected to MongoDB (Atlas)'))
// .catch(err => console.error(' MongoDB Connection Error:', err));

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Project Management Tool API');
});
app.get("/api/todolist", (req, res) => {
    res.json({ message: "Backend is connected to React!" });
});


// Import Routes
const Authroutes = require('./routes/Authroutes');
const Projectroutes = require('./routes/Projectroutes');
const Taskroutes = require('./routes/Taskroutes');
const Todolistsroutes = require('./routes/Todolistsroutes');
const Userroutes=require('./routes/Userroutes');

app.use('/api/auth', Authroutes);
app.use('/api/projects', Projectroutes);
app.use('/api/tasks', Taskroutes);
app.use('/api/todolists', Todolistsroutes);
app.use('/api/user',Userroutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
