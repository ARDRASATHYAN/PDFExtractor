const express=require('express');
const bcrypt=require('bcryptjs');
const loginModel = require('../model/loginModel');
const registerModel = require('../model/registerModel');



const registerRouter = express.Router();


//register
registerRouter.post('/register', async (req, res) => {
    try {
        const olduser = await loginModel.findOne({ email: req.body.email });
        if (olduser) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'user already exists'
            });
        }

        const hashedpassword = await bcrypt.hash(req.body.password, 12);
//add data in login modal
        let log = {
            email: req.body.email,
            password: hashedpassword,
            role: 2,
        };
        const result = await loginModel(log).save();


        //add data in register model
        let reg = {
            login_id: result._id,
            name: req.body.name,
        };
        const result2 = await registerModel(reg).save();
        console.log("result2", result2);
        if (result2) {
            return res.status(201).json({
                success: true,
                error: false,
                message: 'registration completed',
                details: result2,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'something went wrong'
        });
        console.log(error);
    }
});

module.exports = registerRouter;