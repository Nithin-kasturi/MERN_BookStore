const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.get('/',(req,res)=>{
    res.send("Hello");
})
// Replace the following connection string with your MongoDB Atlas connection string
const mongoDBURI = 'mongodb+srv://nithin:test123@cluster0.xbq5cse.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => console.log(err));
app.post('/addUser',async (req,res)=>{
    const {email,password}=req.body;
    console.log(email,password);
    const user=await User.findOne({email:email});
    if(!user){
        bcrypt.hash(password,10).then((hash)=>{
            const newUser=new User({
                email:email,
                password:hash
            });
            newUser.save();
        })
        res.send("OK");
    }
    else{
        res.send("User Already exists");
    }
});
app.post('/checkUser',async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    if(!user){
        res.send("User Doesn't Exsists");
    }
    else{
        const userPassword=user.password;
        bcrypt.compare(password,userPassword).then((match)=>{
            if(!match){
                res.send("Passwords doesn't match");
            }
            else{
                const accessToken=createToken(user);
                res.cookie("Access-token",accessToken,{
                    maxAge:60*60*24*30*1000,
                });
                res.send("OK");
            }
        })
    }
});
app.post('/insertComment', async (req, res) => {
        const comment = req.body.commentAndUser.comment.comment;
        if(comment!=undefined){
            const user = req.body.commentAndUser.user;
            const id=req.body.commentAndUser.id;
            const commentObject={
                id:id,
                comment:comment
            }
            const updatedUser = await User.findOneAndUpdate(
                { email: user },
                { $push: { comments:commentObject } },
                { new: true }
            );
        }
        
});
app.post('/insertReply', async (req, res) => {
    const reply = req.body.replyAndUser.reply.reply;
    if(reply!=undefined){
        const user = req.body.replyAndUser.user;
        const commentator = req.body.replyAndUser.commentator;
        const id=req.body.replyAndUser.id;
        const replyObject={
            id:id,
            reply:reply,
            email:user,
        }
    const updatedUser = await User.findOneAndUpdate(
            { email: commentator },
            { $push: { replies:replyObject } },
            { new: true }
        );
    }
    
});

app.get('/getComments',async (req,res)=>{
    const bookId=req.query.id;
    const response=await User.find({'comments.id':bookId});
    res.send(response);
});
app.listen(process.env.PORT || 8000, () => {
    console.log('Server connected');
});
