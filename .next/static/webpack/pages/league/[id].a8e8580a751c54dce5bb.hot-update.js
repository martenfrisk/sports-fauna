webpackHotUpdate_N_E("pages/league/[id]",{

/***/ "./components/league-standings.tsx":
/*!*****************************************!*\
  !*** ./components/league-standings.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar _jsxFileName = \"/Users/marten.frisk/nextfauna/components/league-standings.tsx\",\n    _this = undefined;\n\nvar LeagueStandings = function LeagueStandings(_ref) {\n  var data = _ref.data;\n  var sorted = data.sort(function (a, b) {\n    return a.points - b.points;\n  });\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    children: sorted.map(function (position) {\n      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n        children: [position.member.username, \" - \", position.points]\n      }, position._id, true, {\n        fileName: _jsxFileName,\n        lineNumber: 6,\n        columnNumber: 5\n      }, _this);\n    })\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 4,\n    columnNumber: 3\n  }, _this);\n};\n\n_c = LeagueStandings;\n/* harmony default export */ __webpack_exports__[\"default\"] = (LeagueStandings);\n\nvar _c;\n\n$RefreshReg$(_c, \"LeagueStandings\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9sZWFndWUtc3RhbmRpbmdzLnRzeD85MDQzIl0sIm5hbWVzIjpbIkxlYWd1ZVN0YW5kaW5ncyIsImRhdGEiLCJzb3J0ZWQiLCJzb3J0IiwiYSIsImIiLCJwb2ludHMiLCJtYXAiLCJwb3NpdGlvbiIsIm1lbWJlciIsInVzZXJuYW1lIiwiX2lkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU1BLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsT0FBNEI7QUFBQSxNQUF6QkMsSUFBeUIsUUFBekJBLElBQXlCO0FBQ25ELE1BQU1DLE1BQU0sR0FBR0QsSUFBSSxDQUFDRSxJQUFMLENBQVUsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKO0FBQUEsV0FBVUQsQ0FBQyxDQUFDRSxNQUFGLEdBQVdELENBQUMsQ0FBQ0MsTUFBdkI7QUFBQSxHQUFWLENBQWY7QUFDQSxzQkFDQztBQUFBLGNBQ0VKLE1BQU0sQ0FBQ0ssR0FBUCxDQUFXLFVBQUNDLFFBQUQ7QUFBQSwwQkFDWDtBQUFBLG1CQUNFQSxRQUFRLENBQUNDLE1BQVQsQ0FBZ0JDLFFBRGxCLFNBQytCRixRQUFRLENBQUNGLE1BRHhDO0FBQUEsU0FBVUUsUUFBUSxDQUFDRyxHQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRFc7QUFBQSxLQUFYO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUREO0FBU0EsQ0FYRDs7S0FBTVgsZTtBQWFTQSw4RUFBZiIsImZpbGUiOiIuL2NvbXBvbmVudHMvbGVhZ3VlLXN0YW5kaW5ncy50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBMZWFndWVTdGFuZGluZ3MgPSAoeyBkYXRhIH06IHsgZGF0YTogYW55fSkgPT4ge1xuXHRjb25zdCBzb3J0ZWQgPSBkYXRhLnNvcnQoKGEsIGIpID0+IGEucG9pbnRzIC0gYi5wb2ludHMpXG5cdHJldHVybiAoXG5cdFx0PGRpdj5cblx0XHRcdHtzb3J0ZWQubWFwKChwb3NpdGlvbikgPT4gKFxuXHRcdFx0XHQ8ZGl2IGtleT17cG9zaXRpb24uX2lkfT5cblx0XHRcdFx0XHR7cG9zaXRpb24ubWVtYmVyLnVzZXJuYW1lfSAtIHtwb3NpdGlvbi5wb2ludHN9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0KSl9XG5cdFx0PC9kaXY+XG5cdClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGVhZ3VlU3RhbmRpbmdzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/league-standings.tsx\n");

/***/ })

})