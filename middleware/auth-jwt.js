const { validateToken } = require("../utils/auth");

/**
 * Middleware to check for an authentication cookie and attach user payload to the request.
 * @param {string} cookieName - The name of the cookie containing the authentication token.
 * @returns {function} Middleware function.
 */

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue) {
           return next();
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
           
        } catch (error) {
            console.error('Error validating token:', error);
            
        }
       return next();
    }
}

module.exports = {
    checkForAuthenticationCookie
}