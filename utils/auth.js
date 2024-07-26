require('dotenv').config();
const JWT = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

/**
 * Create a JWT token for a given user.
 * @param {Object} user - The user object containing user details.
 * @returns {string} - The generated JWT token.
 */

function createTokenForUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        profileImage:user.profileImage,
        role: user.role
    };

    const token = JWT.sign(payload,secret);
    return token;
}

/**
 * Validate a JWT token and return the decoded payload.
 * @param {string} token - The JWT token to validate.
 * @returns {Object} - The decoded token payload.
 * @throws {JsonWebTokenError} - Throws an error if token is invalid.
 */
function validateToken(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken
};