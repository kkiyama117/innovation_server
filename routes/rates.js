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

//app.getでPOSTすることができます。最初の引数を変更することでURLが変更できます。二つ目が実行内容です。
router.post('/', function (req, res) {
    create_res.post(req, res)
});

module.exports = router;
