const JWT = require('jsonwebtoken')
module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]

        if (!token)  
            return next(createError(401, "You are not authenticated!"));

        await JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success:false,
                    message:'Authentication failed',
                    err
                })
            }
            else
            {
                req.body = decode;
                // res.send({
                //     success:true,
                //     message:'Authentication successful',
                //     body:decode
                // })
                next();
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            message: "Authentication failed",
            success: false,
            error
        })
    }
}