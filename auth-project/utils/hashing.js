const { hash, compare } = require("bcryptjs")
const {createHmac} = require('crypto')

exports.doHash = (value, saltValue) =>{
    const result = hash(value,saltValue)
    return result;
}

exports.doHashValidation= (value, hashedValue)=>{
    const result = compare(value, hashedValue)
    return result;
}

exports.hmacProcess = (value, key) => {
    const result = createHmac('shaq256', key).update(value).digest('hex')
    return result;
}