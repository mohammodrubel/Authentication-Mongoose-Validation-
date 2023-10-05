const User = require('../Model/users')

const handleError = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    if(err.code === 11000){
        errors.email = 'this email is already registerd'
        return errors
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path]= properties.message
        });
    }
    return errors
};
module.exports.signup_get = async(req,res)=>{
    res.render('signup')
}
module.exports.signup_post = async(req,res)=>{
    const {name,email,password} = req.body 

    try{
        const user = await User.create({
            name,
            email,
            password
        })
        res.status(201).json({user})
    }
    catch(err){
        console.log(err)
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}
module.exports.login_get = async(req,res)=>{
    res.send('user login')
}
module.exports.login_post = async(req,res)=>{
    res.render('user login')
}