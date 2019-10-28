//imports
var SimpleCrypto = require('simple-crypto-js').default;

module.exports = function decrypt(data){
    const SECRET_KEY = process.env.SECRET_KEY
    var simpleCrypto = new SimpleCrypto(SECRET_KEY)
    return simpleCrypto.decrypt(data)
}