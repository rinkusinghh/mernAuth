const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const publicSchema = new mongoose.Schema({
    name: {type: String, required: true, },
    email: {type: String, required: true, unique: true },
    phone: {type: Number, required: true,  },
    work: {type: String, required: true,  },
    password: {type: String, required: true,  },
    confirmPassword: {type: String, required: true, },
    date: { type: Date, default: Date.now},
    messages: [
     {
        name: {type: String, required: true, },
        email: {type: String, required: true, },
        phone: {type: Number, required: true,  },
        message: {type: String, required: true,  }
    }
],
    tokenField: [
        {
            token: {type: String, required: true}
        }
    ]
})

// Password Hashing;
publicSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();

    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, salt);
        this.confirmPassword = await bcrypt.hash(this.confirmPassword, salt);
    }
    next();
})

// token generate
publicSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        this.tokenField = this.tokenField.concat({token: token})
        await this.save();
        return token;

    } catch (err) {
        console.error(err);
    }
}

// Storing the message;
publicSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        return this.messages;
        
    } catch (error) {
        console.error(error);
    }
}

module.exports = mongoose.model('Public', publicSchema);
