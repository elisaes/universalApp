const jwt = require("jsonwebtoken")

function generateToken(private_key, application_id, sub = null) {

    const acl = {
        "paths": {
            "/**": {}
        }
    }



    const now = Math.floor((Date.now() / 1000))
    const ext = Math.floor(now + (((60 * 60) * 60) * 24))
    const props = {
        "iat": Math.floor(now),
        "nbf": Math.floor(now),
        "exp": ext,
        "jti": now,
        application_id,
        acl,
        sub
    }



    return jwt.sign(
        props,
        {
            key: private_key,
        },
        {
            algorithm: 'RS256',
        }
    )
}

module.exports = {generateToken}

