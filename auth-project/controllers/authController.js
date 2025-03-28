const { signupSchema, signinSchema } = require("../middlewares/validator"); //Joi validation middleware jo bnayatha
const User = require('../models/usersModel'); //model mongoose ka jo db se interact krega 
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");  //utils me jo function bnaya tha bcrypt ka pass hash ke liyey
const jwt = require('jsonwebtoken')
const transport = require('../middlewares/sendMail')



exports.signup = async (req, res) => {
    const { email, password } = req.body; //extract email aur pass
    try {
        //Validate email and password using joi
        const { error, value } = signupSchema.validate({ email, password })

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message })
        }

        //Check if user exists
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists!" })
        }

        //Hash the pass (for security)
        const hashPassword = await doHash(password, 12)

        //Create and save new user 
        const newUser = new User({
            email,
            password: hashPassword,
        })
        const result = await newUser.save();
        console.log(result);


        result.password = undefined; //hide hashed pass in response
        console.log(result);

        //send successful response
        res.status(201).json({
            success: true, message: "Your account has been created successfully",
            result
        })

    } catch (error) {
        console.log(error);
    }
}
exports.signin = async (req, res) => {
    // 1. Email & Password Extract
    const { email, password } = req.body;

    try {
        // 2. Joi Validation (Email/Password Format Check)
        const { error, value } = signinSchema.validate({ email, password });

        if (error) {
            return res.status(401).json({ success: false, message: error.details[0].message });
        }

        // 3. Database Se User Check (Password Explicitly Fetch)
        const existingUser = await User.findOne({ email }).select('+password');
        
        if (!existingUser) {
            return res.status(401).json({ success: false, message: "User does not exists!" });
        }

        // 4. Password Match (Hashed vs Input)
        const result = await doHashValidation(password, existingUser.password);
        
        if (!result) {
            return res.status(401).json({ success: false, message: "Invalid Credentials!" });
        }

        // 5. JWT Token Generate (For Authentication)
        const token = jwt.sign({
            userId: existingUser._id,
            email: existingUser.email,
            verified: existingUser.verified
        }, process.env.TOKEN_SECRET,
        {
            expiresIn:'8h'
        }
    );

        // 6. Token Cookie Mein Set + Response
        res.cookie('Authorization', 'Bearer ' + token, { 
            expires: new Date(Date.now() + 8 * 3600000), // 8 Hours
            httpOnly: process.env.NODE_ENV === 'production', // Extra Security
            secure: process.env.NODE_ENV === 'production' // HTTPS Only
        }).json({
            success: true,
            token,
            message: "logged in successfully"
        });

    } catch (error) {
        // 7. Server Error Handling
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

exports.signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).json({success:true, message:'logged out successfully'})
}

exports.sendVerificationCode = async (req, res) => {
    const {email} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (!existingUser) {
            return res.status(404).json({ success: false, message: "User does not exists!" });
        }
        if (existingUser.verified) {
            return res.status(400).json({ success: false, message: "You are already verified" });
        }

        const codeValue = Math.floor(Math.random() * 1000000).toString() 
        let info = await transport.sendMail({
            from:process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
            to:existingUser.email,
            subject:"verification code",
            html:'<h1>' + codeValue + '</h1>'
        })

        if (info.accepted[0] === existingUser.email) {
            const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)
            existingUser.verificationCode = hashedCodeValue
            existingUser.verificationCodeValidation = Date.now()
        }
    } catch (error) {
        console.log(error);
    }
}