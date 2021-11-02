/**
 * Created by ApolloYr on 4/4/2018.
 */
var model = require('./../models');
var mailer = require('./../services/mailer');

exports.getCountries = function (req, res, next) {
    model.countries.findAll().then(function (result) {
        res.json({
            'success': true,
            data: result
        })
    })
};

exports.submitPersonalInfo = function (req, res, next) {

    var param = req.body;
    console.log(param);

    model.users.count({where: {username: param.username}}).then(function (result) {
        if (result > 0) {
            res.json({
                'success': false,
                'msg': 'user already exist'
            })
        } else {
            res.json({
                'success': true
            })
        }
    })
};

exports.submitContactInfo = function (req, res, next) {
    var param = req.body;
    model.users.count({where: {email: param.email}}).then(function (result) {
        if (result > 0) {
            res.json({
                'success': false,
                'msg': 'email already exist'
            })
        } else {
            res.json({
                'success': true
            })
        }
    })
};

exports.createAccount = function (req, res, next) {

    var token = getRandomToken(40);
    var param = req.body;
    param.email_token = token;

    model.users.create(req.body).then(function (user) {

        createUserInfo(user);


        var output = `
            <h3>Thank you for your creating account</h3>
            <p>We would like you to verify your email</p>
            <a href="http://localhost:3000/users/verifyEmail/` + token + `">Verify Now</a>
        `;

        mailer.sendMail(param.email, 'Email Verification', output, function (error, info) {
            if (error) {
                return res.json({
                    'success': false,
                    'email': 'error'
                })
            } else {
                return res.json({
                    'success': true
                })
            }
        });

    }).catch(next);
}

exports.verifyEmail = function (req, res, next) {
    var params = req.params;
    var token = params.token;

    model.users.findOne({where: {email_token: token}}).then(function (result) {
        if (result) {
            result.update({email_verified: 1}).then(function (result) {
                res.json({
                    success: true,
                    msg: 'email verified'
                })

                //res.send(`<script>location.href = "http://localhost:4200/home"</script>`);
            })
        } else {
            res.json({
                success: false,
                msg: 'token is invalid'
            })
        }
    })
}

function createUserInfo(user) {
    model.userinfos.max('accountNumber', {where: {country: user.country}}).then(function(max) {
        var accountNumber = '';
        if (max) {
            accountNumber = getAccountNumber(max);
        } else {
            accountNumber = 'AAA0000001'
        }

        model.userinfos.create({
            userid: user.id,
            country: user.country,
            accountNumber: accountNumber,
            level: 'L01'
        })
    })

}

function getAccountNumber(val) {

    var digits = ['A', 'B', 'C', 'D', 'E', 'F',
        'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z' ];

    var firstC =  val.substr(0, 1); var firstIndex = digits.indexOf(firstC);
    var secondC = val.substr(1, 1); var secondIndex = digits.indexOf(secondC);
    var thirdC = val.substr(2, 1); var thirdIndex = digits.indexOf(thirdC);

    var number = val.substr(3, val.length - 3);
    var tmp = Number(number);
    tmp++;

    if (tmp > 9999999) {
        number = String("00000000" + tmp).slice(-8);
    } else {
        number = String("00000000" + tmp).slice(-7);
    }

    if (number.length >= 8) {
        number = number.substr(1, 7);

        thirdIndex++;
        if (thirdIndex >= 26) {
            thirdIndex = 0;
            secondIndex++

            if (secondIndex >= 26) {
                secondIndex = 0;
                firstIndex++;
            }
        }

        firstC = digits[firstIndex];
        secondC = digits[secondIndex];
        thirdC = digits[thirdIndex];
    }

    return firstC + secondC + thirdC + number;
}

function getRandomToken(length) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

    if (!length) {
        length = Math.floor(Math.random() * chars.length);
    }

    var str = '';
    for (var i = 0; i < length; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}