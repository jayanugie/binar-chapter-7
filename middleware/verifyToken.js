const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    try {
        let tokenHeader = req.headers['authorization'];
    if (!tokenHeader) {
        res.status(401).json({
            message: "No Token Detected",
            status: "Error"
         });
    } else {
        let token = tokenHeader;
        jwt.verify(token, process.env.JWT_SECRET, (error,decoded) => {
            if (error) {
                res.status(403).json({
                    message: error.message,
                    status: "Error"
                });
            } else {
                req.user = decoded;
                next();
            }
        });
    }
    } catch (error) {
        console.log('=============VERIFYTOKEN==================');
        console.log(error);
        console.log('=============VERIFYTOKEN==================');
        res.status(500).json({
            message: error.message,
            status: "Error"
        });
    }
}

module.exports = verifyToken

