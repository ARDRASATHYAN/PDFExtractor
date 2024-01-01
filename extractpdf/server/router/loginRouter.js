const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginModel = require('../model/loginModel');



const loginRouter = express.Router();



//login page
loginRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;     
  try {
    if (email && password) {
      const oldUser = await loginModel.findOne({ email });
      if (!oldUser)
        return res
          .status(404)
          .json({ success: false, error: true, message: "User doesn't Exist" });
      const isPasswordCorrect = await bcrypt.compare(
        password,
        oldUser.password
      );
      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ success: false, error: true, message: 'Incorrect password' });

      const token = jwt.sign(
        {
          userId: oldUser._id,
          userRole: oldUser.role,
          useremail: oldUser.email,
        },
        'secret_this_should_be_longer',      
        { expiresIn: '1h' }              
      );
      console.log('token', token);
      return res.status(200).json({
        success: true,
        error: false,
        token: token,
        expiresIn: 3600,
        loginId: oldUser._id,
        userRole: oldUser.role,
        useremail: oldUser.email,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'All fields are required!',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = loginRouter;