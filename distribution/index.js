'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var asyncTimedFunc = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(func, funcName) {
    var _this = this;

    var start, id;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            start = new Date();
            id = '' + Math.floor(Math.random() * 1000000);

            shouldLog[id] = true;
            _context3.next = 5;
            return Promise.all([_asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
              var res;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.prev = 0;
                      _context2.next = 3;
                      return func();

                    case 3:
                      res = _context2.sent;

                      shouldLog[id] = false;
                      return _context2.abrupt('return', res);

                    case 8:
                      _context2.prev = 8;
                      _context2.t0 = _context2['catch'](0);

                      shouldLog[id] = false;
                      throw _context2.t0;

                    case 12:
                    case 'end':
                      return _context2.stop();
                  }
                }
              }, _callee2, _this, [[0, 8]]);
            }))(), logFunc(funcName, start, id)]);

          case 5:
            return _context3.abrupt('return', _context3.sent[0]);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function asyncTimedFunc(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

require('babel-polyfill');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; } //
//  index.js
//  asynctime
//
//  Created on 08/08/2016 By Thibault Malbranche
//

var shouldLog = {};

var logFunc = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(funcName, start, id) {
    var time;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            time = (new Date().getTime() - start.getTime()).toString();

            process.stdout.write(funcName + ' - ' + _chalk2.default.blue(time) + ' ms\r');
            if (shouldLog[id]) {
              setTimeout(function () {
                logFunc(funcName, start, id);
              }, 20);
            } else {
              process.stdout.write(funcName + ' - ' + _chalk2.default.green(time) + ' ms\r\n');
            }

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function logFunc(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = asyncTimedFunc;