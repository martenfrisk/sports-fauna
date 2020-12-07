webpackHotUpdate_N_E("pages/league/[id]",{

/***/ "./pages/league/[id].tsx":
/*!*******************************!*\
  !*** ./pages/league/[id].tsx ***!
  \*******************************/
/*! exports provided: __N_SSP, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__N_SSP\", function() { return __N_SSP; });\n/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral */ \"./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js\");\n/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ \"./node_modules/@babel/runtime/regenerator/index.js\");\n/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ \"./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-request */ \"./node_modules/graphql-request/dist/index.js\");\n/* harmony import */ var graphql_request__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_request__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _components_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/layout */ \"./components/layout.tsx\");\n/* harmony import */ var _utils_graphql_client__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/utils/graphql-client */ \"./utils/graphql-client.js\");\n/* harmony import */ var _components_teampicker__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/components/teampicker */ \"./components/teampicker.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _components_league_options__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @/components/league-options */ \"./components/league-options.tsx\");\n/* harmony import */ var _components_league_standings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @/components/league-standings */ \"./components/league-standings.tsx\");\n\n\n\n\n\n\nvar _jsxFileName = \"/Users/marten.frisk/nextfauna/pages/league/[id].tsx\",\n    _this = undefined,\n    _s = $RefreshSig$();\n\nfunction _templateObject() {\n  var data = Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__[\"default\"])([\"\\n      mutation UpdateLeague($id: ID!, $teams: [TeamTypeInput], $public: Boolean, $class: LeagueType) {\\n        updateLeagueOptions(id: $id, data: { teams: $teams, public: $public, class: $class }) {\\n          teams\\n\\t\\t\\t\\t\\tpublic\\n\\t\\t\\t\\t\\tclass\\n        }\\n      }\\n    \"]);\n\n  _templateObject = function _templateObject() {\n    return data;\n  };\n\n  return data;\n}\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\n// import { useRouter } from 'next/router'\n\n\n\n\n\n\n\n\nvar League = function League(_ref) {\n  _s();\n\n  var data = _ref.data,\n      teams = _ref.teams,\n      token = _ref.token;\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useState\"])(data.options.teams ? data.options.teams : []),\n      pickedTeam = _useState[0],\n      setPickedTeam = _useState[1];\n\n  var _useState2 = Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useState\"])(data.options ? data.options : {}),\n      options = _useState2[0],\n      setOptions = _useState2[1];\n\n  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useState\"])(null),\n      upcomingEvents = _useState3[0],\n      setUpcomingEvents = _useState3[1];\n\n  var getEvents = /*#__PURE__*/function () {\n    var _ref2 = Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( /*#__PURE__*/_Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(teamId) {\n      var events;\n      return _Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {\n        while (1) {\n          switch (_context.prev = _context.next) {\n            case 0:\n              _context.next = 2;\n              return fetch(\"https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=\".concat(teamId)).then(function (res) {\n                return res.json();\n              });\n\n            case 2:\n              events = _context.sent;\n              setUpcomingEvents(function (prev) {\n                return _objectSpread(_objectSpread({}, prev), {}, Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({}, teamId, events));\n              });\n              console.log(upcomingEvents);\n\n            case 5:\n            case \"end\":\n              return _context.stop();\n          }\n        }\n      }, _callee);\n    }));\n\n    return function getEvents(_x) {\n      return _ref2.apply(this, arguments);\n    };\n  }();\n\n  var _useState4 = Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useState\"])(''),\n      errorMessage = _useState4[0],\n      setErrorMessage = _useState4[1];\n\n  var _useState5 = Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useState\"])(''),\n      updateMessage = _useState5[0],\n      setUpdateMessage = _useState5[1];\n\n  var updateTeam = /*#__PURE__*/function () {\n    var _ref3 = Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__[\"default\"])( /*#__PURE__*/_Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee2() {\n      var query, variables;\n      return _Users_marten_frisk_nextfauna_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee2$(_context2) {\n        while (1) {\n          switch (_context2.prev = _context2.next) {\n            case 0:\n              query = Object(graphql_request__WEBPACK_IMPORTED_MODULE_5__[\"gql\"])(_templateObject());\n              variables = {\n                id: data.options._id,\n                teams: pickedTeam,\n                \"public\": options[\"public\"],\n                \"class\": options[\"class\"]\n              };\n              _context2.prev = 2;\n              _context2.next = 5;\n              return Object(_utils_graphql_client__WEBPACK_IMPORTED_MODULE_7__[\"graphQLClient\"])(token).request(query, variables);\n\n            case 5:\n              setTimeout(function () {\n                setUpdateMessage('');\n              }, 4000);\n              setUpdateMessage('Changes saved');\n              _context2.next = 13;\n              break;\n\n            case 9:\n              _context2.prev = 9;\n              _context2.t0 = _context2[\"catch\"](2);\n              console.error(_context2.t0);\n              setErrorMessage(_context2.t0.message);\n\n            case 13:\n            case \"end\":\n              return _context2.stop();\n          }\n        }\n      }, _callee2, null, [[2, 9]]);\n    }));\n\n    return function updateTeam() {\n      return _ref3.apply(this, arguments);\n    };\n  }();\n\n  Object(react__WEBPACK_IMPORTED_MODULE_9__[\"useEffect\"])(function () {\n    pickedTeam.map(function (team) {\n      getEvents(team);\n      console.log({\n        team: team\n      }); // return (\n      // \tJSON.stringify(upcomingEvents[team])\n      // )\n    });\n  }, [pickedTeam]);\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_components_layout__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"h1\", {\n      className: \"text-2xl text-center\",\n      children: \"League info\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 4\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n      className: \"flex w-full\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n        className: \"flex flex-wrap w-1/2\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n          className: \"w-full\",\n          children: \"Upcoming games for your teams\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 69,\n          columnNumber: 6\n        }, _this), upcomingEvents !== null && pickedTeam !== [] && pickedTeam.map(function (team) {\n          var _upcomingEvents$team$, _upcomingEvents$team$2, _upcomingEvents$team$3;\n\n          return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n            className: \"w-1/2\",\n            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n              children: (_upcomingEvents$team$ = upcomingEvents[team.teamId]) === null || _upcomingEvents$team$ === void 0 ? void 0 : _upcomingEvents$team$.events[0].strEvent\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 75,\n              columnNumber: 9\n            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n              children: (_upcomingEvents$team$2 = upcomingEvents[team.teamId]) === null || _upcomingEvents$team$2 === void 0 ? void 0 : _upcomingEvents$team$2.events[1].strEvent\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 78,\n              columnNumber: 9\n            }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n              children: (_upcomingEvents$team$3 = upcomingEvents[team.teamId]) === null || _upcomingEvents$team$3 === void 0 ? void 0 : _upcomingEvents$team$3.events[2].strEvent\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 81,\n              columnNumber: 9\n            }, _this)]\n          }, team, true, {\n            fileName: _jsxFileName,\n            lineNumber: 74,\n            columnNumber: 8\n          }, _this);\n        })]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 68,\n        columnNumber: 5\n      }, _this), data ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n        className: \"flex flex-col items-start w-1/2\",\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"h2\", {\n          children: [\"League name: \", data.name]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 90,\n          columnNumber: 7\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n          children: [\"League members:\", data.members.data.length > 0 ? data.members.data.map(function (item) {\n            return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n              children: [item.username, \" (\", item.email, \")\"]\n            }, item.username, true, {\n              fileName: _jsxFileName,\n              lineNumber: 97,\n              columnNumber: 10\n            }, _this);\n          }) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"span\", {\n            className: \"ml-2 text-sm italics\",\n            children: \"No members :(\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 102,\n            columnNumber: 9\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 93,\n          columnNumber: 7\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n          className: \"mt-4\",\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n            className: \"text-sm text-center\",\n            children: \"League options\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 108,\n            columnNumber: 8\n          }, _this), data.options ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_components_league_options__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n            optionsData: [options, setOptions]\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 112,\n            columnNumber: 9\n          }, _this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n            className: \"ml-2 text-sm italics\",\n            children: \"No options set\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 114,\n            columnNumber: 9\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 107,\n          columnNumber: 7\n        }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_components_league_standings__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n          data: data.standings.data\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 119,\n          columnNumber: 7\n        }, _this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 89,\n        columnNumber: 6\n      }, _this) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {\n        children: \"Loading...\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 123,\n        columnNumber: 6\n      }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"div\", {}, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 125,\n        columnNumber: 5\n      }, _this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 67,\n      columnNumber: 4\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"button\", {\n      onClick: function onClick() {\n        return updateTeam();\n      },\n      children: \"Click to save changes\"\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 129,\n      columnNumber: 4\n    }, _this), updateMessage && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n      children: updateMessage\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 131,\n      columnNumber: 5\n    }, _this), errorMessage && /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(\"p\", {\n      children: errorMessage\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 134,\n      columnNumber: 5\n    }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_components_teampicker__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n      teams: teams,\n      picker: [pickedTeam, setPickedTeam]\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 136,\n      columnNumber: 4\n    }, _this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 65,\n    columnNumber: 3\n  }, _this);\n};\n\n_s(League, \"BDz4pNfot12v4Sd03xPG7Dy5NgA=\");\n\n_c = League;\nvar __N_SSP = true;\n/* harmony default export */ __webpack_exports__[\"default\"] = (League);\n\nvar _c;\n\n$RefreshReg$(_c, \"League\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvbGVhZ3VlLy50c3g/YjJkYyJdLCJuYW1lcyI6WyJMZWFndWUiLCJkYXRhIiwidGVhbXMiLCJ0b2tlbiIsInVzZVN0YXRlIiwib3B0aW9ucyIsInBpY2tlZFRlYW0iLCJzZXRQaWNrZWRUZWFtIiwic2V0T3B0aW9ucyIsInVwY29taW5nRXZlbnRzIiwic2V0VXBjb21pbmdFdmVudHMiLCJnZXRFdmVudHMiLCJ0ZWFtSWQiLCJmZXRjaCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZXZlbnRzIiwicHJldiIsImNvbnNvbGUiLCJsb2ciLCJlcnJvck1lc3NhZ2UiLCJzZXRFcnJvck1lc3NhZ2UiLCJ1cGRhdGVNZXNzYWdlIiwic2V0VXBkYXRlTWVzc2FnZSIsInVwZGF0ZVRlYW0iLCJxdWVyeSIsImdxbCIsInZhcmlhYmxlcyIsImlkIiwiX2lkIiwiZ3JhcGhRTENsaWVudCIsInJlcXVlc3QiLCJzZXRUaW1lb3V0IiwiZXJyb3IiLCJtZXNzYWdlIiwidXNlRWZmZWN0IiwibWFwIiwidGVhbSIsInN0ckV2ZW50IiwibmFtZSIsIm1lbWJlcnMiLCJsZW5ndGgiLCJpdGVtIiwidXNlcm5hbWUiLCJlbWFpbCIsInN0YW5kaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNQSxNQUFNLEdBQUcsU0FBVEEsTUFBUyxPQUFtRTtBQUFBOztBQUFBLE1BQWhFQyxJQUFnRSxRQUFoRUEsSUFBZ0U7QUFBQSxNQUExREMsS0FBMEQsUUFBMURBLEtBQTBEO0FBQUEsTUFBbkRDLEtBQW1ELFFBQW5EQSxLQUFtRDs7QUFBQSxrQkFDN0NDLHNEQUFRLENBQUNILElBQUksQ0FBQ0ksT0FBTCxDQUFhSCxLQUFiLEdBQXFCRCxJQUFJLENBQUNJLE9BQUwsQ0FBYUgsS0FBbEMsR0FBMEMsRUFBM0MsQ0FE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QSxnQkFBSUE7QUFBSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBckVGLGVBdUVDLHFFQUFDLDhEQUFEO0FBQVksV0FBSyxFQUFFbkIsS0FBbkI7QUFBMEIsWUFBTSxFQUFFLENBQUNJLFVBQUQsRUFBYUMsYUFBYjtBQUFsQztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBdkVEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUREO0FBNEVBLENBaklEOztHQUFNUCxNOztLQUFBQSxNOztBQWlMU0EscUVBQWYiLCJmaWxlIjoiLi9wYWdlcy9sZWFndWUvW2lkXS50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcbmltcG9ydCB7IGdxbCB9IGZyb20gJ2dyYXBocWwtcmVxdWVzdCdcbmltcG9ydCBMYXlvdXQgZnJvbSAnQC9jb21wb25lbnRzL2xheW91dCdcbmltcG9ydCB7IGdyYXBoUUxDbGllbnQgfSBmcm9tICdAL3V0aWxzL2dyYXBocWwtY2xpZW50J1xuaW1wb3J0IHsgZ2V0QXV0aENvb2tpZSB9IGZyb20gJ0AvdXRpbHMvYXV0aC1jb29raWVzJ1xuaW1wb3J0IFRlYW1QaWNrZXIgZnJvbSAnQC9jb21wb25lbnRzL3RlYW1waWNrZXInXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgTGVhZ3VlT3B0aW9ucyBmcm9tICdAL2NvbXBvbmVudHMvbGVhZ3VlLW9wdGlvbnMnXG5pbXBvcnQgTGVhZ3VlU3RhbmRpbmdzIGZyb20gJ0AvY29tcG9uZW50cy9sZWFndWUtc3RhbmRpbmdzJ1xuXG5jb25zdCBMZWFndWUgPSAoeyBkYXRhLCB0ZWFtcywgdG9rZW4gfTogeyBkYXRhOiBhbnksIHRlYW1zOiBhbnksIHRva2VuOiBhbnkgfSkgPT4ge1xuXHRjb25zdCBbcGlja2VkVGVhbSwgc2V0UGlja2VkVGVhbV0gPSB1c2VTdGF0ZShkYXRhLm9wdGlvbnMudGVhbXMgPyBkYXRhLm9wdGlvbnMudGVhbXMgOiBbXSlcblx0Y29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGUoZGF0YS5vcHRpb25zID8gZGF0YS5vcHRpb25zIDoge30pXG5cdGNvbnN0IFt1cGNvbWluZ0V2ZW50cywgc2V0VXBjb21pbmdFdmVudHNdID0gdXNlU3RhdGUobnVsbClcblxuXHRjb25zdCBnZXRFdmVudHMgPSBhc3luYyAodGVhbUlkKSA9PiB7XG5cdFx0Y29uc3QgZXZlbnRzID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vd3d3LnRoZXNwb3J0c2RiLmNvbS9hcGkvdjEvanNvbi8xL2V2ZW50c25leHQucGhwP2lkPSR7dGVhbUlkfWApLnRoZW4oKHJlcykgPT4gcmVzLmpzb24oKSlcblx0XHRzZXRVcGNvbWluZ0V2ZW50cygocHJldikgPT4gKHsuLi5wcmV2LCBbdGVhbUlkXTogZXZlbnRzfSkpXG5cdFx0Y29uc29sZS5sb2codXBjb21pbmdFdmVudHMpXG5cdH1cblx0Y29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKCcnKVxuXHRjb25zdCBbdXBkYXRlTWVzc2FnZSwgc2V0VXBkYXRlTWVzc2FnZV0gPSB1c2VTdGF0ZSgnJylcblx0Y29uc3QgdXBkYXRlVGVhbSA9IGFzeW5jICgpID0+IHtcblx0XHRjb25zdCBxdWVyeSA9IGdxbGBcbiAgICAgIG11dGF0aW9uIFVwZGF0ZUxlYWd1ZSgkaWQ6IElEISwgJHRlYW1zOiBbVGVhbVR5cGVJbnB1dF0sICRwdWJsaWM6IEJvb2xlYW4sICRjbGFzczogTGVhZ3VlVHlwZSkge1xuICAgICAgICB1cGRhdGVMZWFndWVPcHRpb25zKGlkOiAkaWQsIGRhdGE6IHsgdGVhbXM6ICR0ZWFtcywgcHVibGljOiAkcHVibGljLCBjbGFzczogJGNsYXNzIH0pIHtcbiAgICAgICAgICB0ZWFtc1xuXHRcdFx0XHRcdHB1YmxpY1xuXHRcdFx0XHRcdGNsYXNzXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBgXG5cblx0XHRjb25zdCB2YXJpYWJsZXMgPSB7XG5cdFx0XHRpZDogZGF0YS5vcHRpb25zLl9pZCxcblx0XHRcdHRlYW1zOiBwaWNrZWRUZWFtLFxuXHRcdFx0cHVibGljOiBvcHRpb25zLnB1YmxpYyxcblx0XHRcdGNsYXNzOiBvcHRpb25zLmNsYXNzXG5cdFx0fVxuXG5cdFx0dHJ5IHtcblx0XHRcdGF3YWl0IGdyYXBoUUxDbGllbnQodG9rZW4pLnJlcXVlc3QocXVlcnksIHZhcmlhYmxlcylcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRzZXRVcGRhdGVNZXNzYWdlKCcnKVxuXHRcdFx0fSwgNDAwMClcblx0XHRcdHNldFVwZGF0ZU1lc3NhZ2UoJ0NoYW5nZXMgc2F2ZWQnKVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdFx0c2V0RXJyb3JNZXNzYWdlKGVycm9yLm1lc3NhZ2UpXG5cdFx0fVxuXHR9XG5cblx0dXNlRWZmZWN0KCgpID0+IHtcblx0XHRwaWNrZWRUZWFtLm1hcCgodGVhbSkgPT4ge1xuXHRcdFx0Z2V0RXZlbnRzKHRlYW0pXG5cdFx0XHRjb25zb2xlLmxvZyh7dGVhbX0pXG5cdFx0XHQvLyByZXR1cm4gKFxuXHRcdFx0Ly8gXHRKU09OLnN0cmluZ2lmeSh1cGNvbWluZ0V2ZW50c1t0ZWFtXSlcblx0XHRcdC8vIClcblx0XHR9XG5cdFx0KVxuXHR9LCBbcGlja2VkVGVhbV0pXG5cblx0cmV0dXJuIChcblx0XHQ8TGF5b3V0PlxuXHRcdFx0PGgxIGNsYXNzTmFtZT1cInRleHQtMnhsIHRleHQtY2VudGVyXCI+TGVhZ3VlIGluZm88L2gxPlxuXHRcdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IHctZnVsbFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIHctMS8yXCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGxcIj5cblx0XHRcdFx0XHRcdFVwY29taW5nIGdhbWVzIGZvciB5b3VyIHRlYW1zXG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0e3VwY29taW5nRXZlbnRzICE9PSBudWxsICYmIHBpY2tlZFRlYW0gIT09IFtdICYmIChcblx0XHRcdFx0XHRcdHBpY2tlZFRlYW0ubWFwKCh0ZWFtKSA9PiAoXG5cdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwidy0xLzJcIiBrZXk9e3RlYW19PlxuXHRcdFx0XHRcdFx0XHRcdDxwPlxuXHRcdFx0XHRcdFx0XHRcdFx0e3VwY29taW5nRXZlbnRzW3RlYW0udGVhbUlkXT8uZXZlbnRzWzBdLnN0ckV2ZW50fVxuXHRcdFx0XHRcdFx0XHRcdDwvcD5cblx0XHRcdFx0XHRcdFx0XHQ8cD5cblx0XHRcdFx0XHRcdFx0XHRcdHt1cGNvbWluZ0V2ZW50c1t0ZWFtLnRlYW1JZF0/LmV2ZW50c1sxXS5zdHJFdmVudH1cblx0XHRcdFx0XHRcdFx0XHQ8L3A+XG5cdFx0XHRcdFx0XHRcdFx0PHA+XG5cdFx0XHRcdFx0XHRcdFx0XHR7dXBjb21pbmdFdmVudHNbdGVhbS50ZWFtSWRdPy5ldmVudHNbMl0uc3RyRXZlbnR9XG5cdFx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdCkpXG5cdFx0XHRcdFx0KX1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdHtkYXRhID8gKFxuXHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1zdGFydCB3LTEvMlwiPlxuXHRcdFx0XHRcdFx0PGgyPlxuXHRcdFx0XHRcdFx0TGVhZ3VlIG5hbWU6IHtkYXRhLm5hbWV9XG5cdFx0XHRcdFx0XHQ8L2gyPlxuXHRcdFx0XHRcdFx0PGRpdj5cblx0XHRcdFx0XHRcdExlYWd1ZSBtZW1iZXJzOiBcblx0XHRcdFx0XHRcdFx0e2RhdGEubWVtYmVycy5kYXRhLmxlbmd0aCA+IDAgPyAoXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YS5tZW1iZXJzLmRhdGEubWFwKChpdGVtKSA9PiAoXG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGtleT17aXRlbS51c2VybmFtZX0+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHtpdGVtLnVzZXJuYW1lfSAoe2l0ZW0uZW1haWx9KVxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0KSlcblx0XHRcdFx0XHRcdFx0KSA6IChcblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzc05hbWU9XCJtbC0yIHRleHQtc20gaXRhbGljc1wiPlxuXHRcdFx0XHRcdFx0XHRcdE5vIG1lbWJlcnMgOihcblx0XHRcdFx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdCl9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3NOYW1lPVwibXQtNFwiPlxuXHRcdFx0XHRcdFx0XHQ8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0XHRcdFx0TGVhZ3VlIG9wdGlvbnNcblx0XHRcdFx0XHRcdFx0PC9wPlxuXHRcdFx0XHRcdFx0XHR7ZGF0YS5vcHRpb25zID8gKFxuXHRcdFx0XHRcdFx0XHRcdDxMZWFndWVPcHRpb25zIG9wdGlvbnNEYXRhPXtbb3B0aW9ucywgc2V0T3B0aW9uc119IC8+XG5cdFx0XHRcdFx0XHRcdCkgOiAoXG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzc05hbWU9XCJtbC0yIHRleHQtc20gaXRhbGljc1wiPlxuXHRcdFx0XHRcdFx0XHRcdE5vIG9wdGlvbnMgc2V0XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdCl9XG5cdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdDxMZWFndWVTdGFuZGluZ3MgZGF0YT17ZGF0YS5zdGFuZGluZ3MuZGF0YX0gLz5cblxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQpOiAoXG5cdFx0XHRcdFx0PGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG5cdFx0XHRcdCl9XG5cdFx0XHRcdDxkaXY+XG5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxidXR0b24gb25DbGljaz17KCkgPT4gdXBkYXRlVGVhbSgpfT5DbGljayB0byBzYXZlIGNoYW5nZXM8L2J1dHRvbj5cblx0XHRcdHt1cGRhdGVNZXNzYWdlICYmIChcblx0XHRcdFx0PHA+e3VwZGF0ZU1lc3NhZ2V9PC9wPlxuXHRcdFx0KX1cblx0XHRcdHtlcnJvck1lc3NhZ2UgJiYgKFxuXHRcdFx0XHQ8cD57ZXJyb3JNZXNzYWdlfTwvcD5cblx0XHRcdCl9XG5cdFx0XHQ8VGVhbVBpY2tlciB0ZWFtcz17dGVhbXN9IHBpY2tlcj17W3BpY2tlZFRlYW0sIHNldFBpY2tlZFRlYW1dfSAvPlxuXG5cdFx0PC9MYXlvdXQ+XG5cdClcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKGN0eDogYW55KSB7XG5cdGNvbnN0IHsgaWQgfSA9IGN0eC5wYXJhbXNcblx0Y29uc3QgdG9rZW4gPSBnZXRBdXRoQ29va2llKGN0eC5yZXEpXG5cblx0Y29uc3QgeyB0ZWFtcyB9ID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vd3d3LnRoZXNwb3J0c2RiLmNvbS9hcGkvdjEvanNvbi8xL2xvb2t1cF9hbGxfdGVhbXMucGhwP2lkPTQzMjgnKS50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXG5cblx0Y29uc3QgcXVlcnkgPSBncWxgXG5cdFx0cXVlcnkgRmluZExlYWd1ZSgkaWQ6IElEISkge1xuXHRcdFx0ZmluZExlYWd1ZUJ5SUQoaWQ6ICRpZCkge1xuXHRcdFx0XHRuYW1lXG5cdFx0XHRcdF9pZFxuXHRcdFx0XHRvcHRpb25zIHtcblx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRjbGFzc1xuXHRcdFx0XHRcdHB1YmxpY1xuXHRcdFx0XHRcdGRpdmlzaW9uc1xuXHRcdFx0XHR9XG5cdFx0XHRcdHN0YW5kaW5ncyB7XG5cdFx0XHRcdFx0ZGF0YSB7XG5cdFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdG1lbWJlciB7XG5cdFx0XHRcdFx0XHRcdHVzZXJuYW1lXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRwb2ludHNcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0bWVtYmVycyB7XG5cdFx0XHRcdFx0ZGF0YSB7XG5cdFx0XHRcdFx0XHRfaWRcblx0XHRcdFx0XHRcdHVzZXJuYW1lXG5cdFx0XHRcdFx0XHRlbWFpbFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1gXG5cdGNvbnN0IHJlcyA9IGF3YWl0IGdyYXBoUUxDbGllbnQodG9rZW4pLnJlcXVlc3QocXVlcnksIHtpZH0pXG5cdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNcblxuXHRyZXR1cm4geyBwcm9wczogeyBcblx0XHR0b2tlbjogdG9rZW4gfHwgbnVsbCxcblx0XHRkYXRhOiBkYXRhPy5maW5kTGVhZ3VlQnlJRCxcblx0XHR0ZWFtc1xuXHR9IH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVhZ3VlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/league/[id].tsx\n");

/***/ })

})