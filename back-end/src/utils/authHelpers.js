const crypto = require('crypto');
const jwt = require('jsonwebtoken');


exports.generateAccessToken = (userId) => {
    return jwt.sign({ id: userId, exp: Math.floor(Date.now() * 0.001) + 300 }, process.env.ACCESS_TOKEN_KEY);
}


exports.generateRefreshToken = (exp=null) => {
    if (exp) return `${exp} ${crypto.randomBytes(128).toString('base64')}`;
    return `${Math.floor(Date.now() * 0.001) + 31536000} ${crypto.randomBytes(128).toString('base64')}`;
}


exports.verifyRefreshToken = (refreshToken) => {
    const [exp, token] = refreshToken.split(' ', 2);
    if (!token || exp < Math.floor(Date.now() * 0.001)) return;
    return {exp, token}
}


exports.storingTokenScript = (accessToken, refreshToken) => {
    return `<script>localStorage.setItem('accessToken','${accessToken}');localStorage.setItem('refreshToken','${refreshToken}');location.href='/'</script>`;
}


exports.generateSalt = (length) => {
    return crypto.randomBytes(length).toString('hex');
}


exports.hashPassword = (password, salt='') => {
    return crypto.createHash('sha256').update(password + salt).digest('base64')
}
