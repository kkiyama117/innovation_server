let db = require('./database');

// fix error caused by IEEE754
function fix_float(rates) {
    return rates.map(function (value) {
        value.rate = value.rate.toFixed(2);
        return value;
    });
}

// parse datetime to date formatted string
function parse_date(rates) {
    return rates.map(function (value) {
        value.start_date = value.start_date.toISOString().substring(0, 10);
        return value;
    });
}

function parse_results(results) {
    if (Array.isArray(results)) {
        return fix_float(parse_date(results))
    }else {
        return results
    }
}

// get_all
exports.get_all = function (req, res) {
    let connection = db.connection;
    connection.execute('select * from tax_rate', [], function (error, results, fields) {
        res.json(parse_results(results));
    });
};

// get
exports.get = function (req, res) {
    let connection = db.connection;
    // mysql library named placeholders
    // https://github.com/sidorares/node-mysql2/blob/master/documentation/Extras.md#named-placeholders
    connection.execute('SELECT * FROM tax_rate where id = ?', [req.params.id], function (error, results, fields) {
        res.json(parse_results(results));
    });
};

exports.post = function (req, res) {
    // データをDBに追加
    let connection = db.connection;
    const first_date = new Date("1000-01-02");
    const last_date = new Date("9999-12-30");
    let date = new Date(req.body.start_date);
    let rate = Math.round(req.body.rate * 100) * 0.01;
    if (date instanceof Date && (date.toString() !== "Invalid Date") && (first_date < date < last_date)) {
        connection.execute('insert into tax_rate (start_date, rate) values(?, ?)',
            [date, rate], function (error, results, fields) {
                res.json(results);
            });
    } else {
        return "error"
    }
};

exports.delete = function (req, res) {
    let connection = db.connection;
    connection.execute('delete from tax_rate where id = ?', [req.params.id], function (error, results, fields) {
        res.json(results);
    });
};
