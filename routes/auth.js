const router = require('express').Router();
// const router = express.Router();
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');


require('../db/auth');
const Public = require('../models/publicSchema');

// Register validation;
router.post('/register', async (req, res) => {
    try {
        const {name, email, phone, work, password, confirmPassword} = req.body;

        if(!name || !email || !phone || !work|| !password|| !confirmPassword)
        return res.status(400).json({error: 'please enter all fields required!'});

        if(password.length < 6 )
        return res.status(400).json({error: 'please enter your password atleast six characters!'});

        if(password !== confirmPassword)
        return res.status(400).json({error: 'please enter the password twice!'});

        const existingUser = await Public.findOne({email});
        if(existingUser)
        return res.status(400).json({error: 'email is already exist!'});

        const userFind = new Public({name, email, phone, work, password, confirmPassword})
        const userSave = await userFind.save();

        if(userSave)
        return res.status(201).json({msg: 'user register successfully'});
  

    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'Failed to register user'});
    }
})

// Login validation;
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password)
        return  res.status(400).json({error: 'Invalid credentials!'});
      
        const userLogin = await Public.findOne({email})

        if(userLogin) {

        const isMatchPassword = await bcrypt.compare(password, userLogin.password);

        const token = await userLogin.generateAuthToken();

        res.cookie('authCookie', token, {
            expires: new Date(Date.now() + 500000),
            httpOnly: true
        });

        if(!isMatchPassword) {
            res.status(400).json({error: 'user error!'})

        }   else {
            res.status(201).json({msg: 'User login successfully'});
        }
    }
    else {
        res.status(400).json({error: "Invalid Credentials"})
    }
    } catch (err) {
        console.error(err)
        res.status(500).json({error: 'user not login!'});
    }
})

// Authenticate;
router.get('/about', authenticate, (req, res) => {
    // console.log('hello world')
    res.send(req.tokenRoot)
})

// Contact page
router.get('/dynamicData', authenticate, (req, res) => {
    // console.log('hello world')
    res.send(req.tokenRoot)
})

// Contact message form;
router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
    
        if ( !name || !email || !phone || !message ) {
            console.log('error in contact form')
            return res.json({error: 'Please fill all details!'});
        }
        const userMessage = await Public.findOne({ _id: req.userID})

        if(userMessage) {
            const saveMessage = await userMessage.addMessage(name, email, phone, message);
            await saveMessage.save();
            res.status(201).json({message: 'User message send successfully'})
        }
    } catch (error) {
        console.error('error')
    }
})

// Logout functionality;
router.get('/logOut', (req, res) => {
    res.clearCookie('authCookie', { path: '/'});
    res.status(200).send('User logged out!')
})

module.exports = router;