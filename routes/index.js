var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.send('sdf');
});

router.post('/creat', function (req, res, next) {
    try {
        var reqObj = req.body;
        console.log(reqObj);
        req.getConnection(function (err, conn) {
            if (err) {
                console.log('Sql connection error', err);
                return next(err);
            }
            else {
                var insertSql = "INSERT INTO EmailSubscription SET ?";
                var insertValues = {
                    "email": 'test_name',
                    "isValid": "test_id"
                }

                var query = conn.query(insertSql, insertValues, function(err, result) {
                    if (err) {
                        console.log('sql errorL: ', err);
                        return next(err);
                    }
                    res.json({'success': true});
                })
            }

        })
    } catch(ex) {
        console.error('Internal error: ' + ex);
        return next(ex);
    }
})

module.exports = router;
