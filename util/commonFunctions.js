const JWT = require('jsonwebtoken');
const { responseMessageCode } = require('./constants');
const logger = require('./logger');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: "c4ebb8c6",
    apiSecret: "CiVLM9boPvVQGpLH"
})
const generateJWToken = (payload) => {
    try {
        const secret = 'secret_key'
        const signOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        payload.creationDateTime = Date.now();
        const token = JWT.sign(payload, secret, signOptions);
        return (token);
    } catch (error) {
        return (error);
    }
};

const validateAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        const secret = 'secret_key'

        const verifyOptions = {
            issuer: 'tracking',
            expiresIn: '30d'
        };
        JWT.verify(token, secret, verifyOptions, (err, decoded) => {
            if (err) {
                logger.error(err.toString());

                reject(responseMessageCode.INVALID_ACCESS_TOKEN);
            }

            resolve(decoded);
        });
    });
};



const validateUser = (opts) => {
    return new Promise((resolve, reject) => {
        const user = opts.user;
        if (!user) {
            reject(responseMessageCode.NO_DATA_FOUND);
        }
        resolve(200);
    });
};

const generatepassword = () => {
    var generator = require('generate-password');
    var password = generator.generate({
        length: 10,
        numbers: true
    })
    return password
}

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);

};



function sendOtpNexmo(otpDetails) {
    console.log(otpDetails)
    nexmo.message.sendSms(otpDetails.from, "+91" + otpDetails.to, otpDetails.text, {
        type: "unicode"
    }, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

function sendEmailNodemailer(mailOptions) {
   let user = "donotreply.answerlet@gmail.com";
    let pass = "govind220*"
   // var transporter = nodemailer.createTransport('smtps://' + user + ':' + pass + '@smtp.gmail.com');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: user, // here use your real email
          pass: pass // put your password correctly (not in this question please)
        }
      });
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log({
                success: 0,
                msg: 'email error',
                data: error.message
            });
        } else {
            console.log({
                success: 1,
                msg: 'mail send successfully',
                data: response
            });
        }
    });
}

module.exports = {
    generateJWToken,
    validateAccessToken,
    validateUser,
    generateOTP,
    sendOtpNexmo,
    sendEmailNodemailer,
    generatepassword
};
