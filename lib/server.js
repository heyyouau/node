'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _data = require('./data/data');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var database = (0, _data2.default)();

app.use('/graphql', (0, _expressGraphql2.default)({
    schema: (0, _schema2.default)(database),
    graphiql: true
}));

app.get('/', function (req, res) {
    res.send("hello world");
});

app.listen(6050);

exports.default = app;
//# sourceMappingURL=server.js.map