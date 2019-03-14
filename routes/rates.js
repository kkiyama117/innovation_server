let express = require('express');
let router = express.Router();
let create_res = require('../utils/create_responce');

/* GET home page. */
router.get('/', function (req, res, next) {
    create_res.get_all(req, res)
});

router.get('/:id', function (req, res, next) {
    create_res.get(req, res)
});

router.post('/', function (req, res) {
    if (req.body.start_date === "" || req.body.rate === "") {
        res.status(400).send("please send correct value")
    } else {
        create_res.post(req, res);
    }
});

router.delete('/:id', function (req, res) {
    create_res.delete(req, res);
});

module.exports = router;
