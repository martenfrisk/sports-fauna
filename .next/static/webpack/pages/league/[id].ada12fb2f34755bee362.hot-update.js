webpackHotUpdate_N_E("pages/league/[id]",{

/***/ "./components/teampicker.tsx":
/*!***********************************!*\
  !*** ./components/teampicker.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"./node_modules/next/image.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvar _jsxFileName = \"/Users/marten.frisk/nextfauna/components/teampicker.tsx\",\n    _this = undefined;\n\n\n\nvar TeamPicker = function TeamPicker(_ref) {\n  var teams = _ref.teams,\n      picker = _ref.picker;\n\n  var _picker = Object(_Users_marten_frisk_nextfauna_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(picker, 2),\n      pickedTeam = _picker[0],\n      setPickedTeam = _picker[1];\n\n  var toggleTeam = function toggleTeam(teamId, teamName) {\n    setPickedTeam(function () {\n      return {\n        teamId: teamId,\n        teamName: teamName\n      };\n    });\n    console.log(pickedTeam); // if (pickedTeam.some((x) => x.teamId === teamId)) {\n    // \tsetPickedTeam(pickedTeam.filter((x) => (x.teamId !== teamId)))\n    // } else {\n    // }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n    className: \"flex flex-wrap justify-between max-w-6xl text-sm\",\n    children: teams.map(function (team) {\n      return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n        onClick: function onClick() {\n          return toggleTeam(team.idTeam, team.strTeam);\n        },\n        className: \"w-1/4 px-2 cursor-pointer\",\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"div\", {\n          className: \"flex items-center w-full p-4 mx-2 my-2 rounded-md bg-blue-50 \".concat(pickedTeam.some(function (x) {\n            return x.teamId === team.idTeam;\n          }) && 'bg-blue-200'),\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(next_image__WEBPACK_IMPORTED_MODULE_2___default.a, {\n            src: team.strTeamBadge,\n            width: 30,\n            height: 30\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 28,\n            columnNumber: 7\n          }, _this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"span\", {\n            className: \"ml-4 text-lg\",\n            children: team.strTeam\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 29,\n            columnNumber: 7\n          }, _this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 23,\n          columnNumber: 6\n        }, _this)\n      }, team.idTeam, false, {\n        fileName: _jsxFileName,\n        lineNumber: 18,\n        columnNumber: 5\n      }, _this);\n    })\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 16,\n    columnNumber: 3\n  }, _this);\n};\n\n_c = TeamPicker;\n/* harmony default export */ __webpack_exports__[\"default\"] = (TeamPicker);\n\nvar _c;\n\n$RefreshReg$(_c, \"TeamPicker\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy90ZWFtcGlja2VyLnRzeD84ZDNmIl0sIm5hbWVzIjpbIlRlYW1QaWNrZXIiLCJ0ZWFtcyIsInBpY2tlciIsInBpY2tlZFRlYW0iLCJzZXRQaWNrZWRUZWFtIiwidG9nZ2xlVGVhbSIsInRlYW1JZCIsInRlYW1OYW1lIiwiY29uc29sZSIsImxvZyIsIm1hcCIsInRlYW0iLCJpZFRlYW0iLCJzdHJUZWFtIiwic29tZSIsIngiLCJzdHJUZWFtQmFkZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOztBQUVBLElBQU1BLFVBQVUsR0FBRyxTQUFiQSxVQUFhLE9BQW9EO0FBQUEsTUFBakRDLEtBQWlELFFBQWpEQSxLQUFpRDtBQUFBLE1BQTFDQyxNQUEwQyxRQUExQ0EsTUFBMEM7O0FBQUEsbUpBQ2xDQSxNQURrQztBQUFBLE1BQy9EQyxVQUQrRDtBQUFBLE1BQ25EQyxhQURtRDs7QUFHdEUsTUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQ0MsTUFBRCxFQUFpQkMsUUFBakIsRUFBc0M7QUFDeERILGlCQUFhLENBQUM7QUFBQSxhQUFPO0FBQUNFLGNBQU0sRUFBRUEsTUFBVDtBQUFpQkMsZ0JBQVEsRUFBRUE7QUFBM0IsT0FBUDtBQUFBLEtBQUQsQ0FBYjtBQUNBQyxXQUFPLENBQUNDLEdBQVIsQ0FBWU4sVUFBWixFQUZ3RCxDQUd4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBUEQ7O0FBU0Esc0JBQ0M7QUFBSyxhQUFTLEVBQUMsa0RBQWY7QUFBQSxjQUNFRixLQUFLLENBQUNTLEdBQU4sQ0FBVSxVQUFDQyxJQUFEO0FBQUEsMEJBQ1Y7QUFFQyxlQUFPLEVBQUU7QUFBQSxpQkFBTU4sVUFBVSxDQUFDTSxJQUFJLENBQUNDLE1BQU4sRUFBY0QsSUFBSSxDQUFDRSxPQUFuQixDQUFoQjtBQUFBLFNBRlY7QUFHQyxpQkFBUyxFQUFDLDJCQUhYO0FBQUEsK0JBS0M7QUFDQyxtQkFBUyx5RUFDUlYsVUFBVSxDQUFDVyxJQUFYLENBQWdCLFVBQUNDLENBQUQ7QUFBQSxtQkFBT0EsQ0FBQyxDQUFDVCxNQUFGLEtBQWFLLElBQUksQ0FBQ0MsTUFBekI7QUFBQSxXQUFoQixLQUFvRCxhQUQ1QyxDQURWO0FBQUEsa0NBS0MscUVBQUMsaURBQUQ7QUFBTyxlQUFHLEVBQUVELElBQUksQ0FBQ0ssWUFBakI7QUFBK0IsaUJBQUssRUFBRSxFQUF0QztBQUEwQyxrQkFBTSxFQUFFO0FBQWxEO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTEQsZUFNQztBQUFNLHFCQUFTLEVBQUMsY0FBaEI7QUFBQSxzQkFBZ0NMLElBQUksQ0FBQ0U7QUFBckM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFORDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFMRCxTQUNNRixJQUFJLENBQUNDLE1BRFg7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURVO0FBQUEsS0FBVjtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FERDtBQW9CQSxDQWhDRDs7S0FBTVosVTtBQWtDU0EseUVBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL3RlYW1waWNrZXIudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnXG5cbmNvbnN0IFRlYW1QaWNrZXIgPSAoeyB0ZWFtcywgcGlja2VyIH06IHsgdGVhbXM6IGFueTsgcGlja2VyOiBhbnkgfSkgPT4ge1xuXHRjb25zdCBbcGlja2VkVGVhbSwgc2V0UGlja2VkVGVhbV0gPSBwaWNrZXJcblxuXHRjb25zdCB0b2dnbGVUZWFtID0gKHRlYW1JZDogc3RyaW5nLCB0ZWFtTmFtZTogc3RyaW5nKSA9PiB7XG5cdFx0c2V0UGlja2VkVGVhbSgoKSA9PiAoe3RlYW1JZDogdGVhbUlkLCB0ZWFtTmFtZTogdGVhbU5hbWUgfSkpXG5cdFx0Y29uc29sZS5sb2cocGlja2VkVGVhbSlcblx0XHQvLyBpZiAocGlja2VkVGVhbS5zb21lKCh4KSA9PiB4LnRlYW1JZCA9PT0gdGVhbUlkKSkge1xuXHRcdC8vIFx0c2V0UGlja2VkVGVhbShwaWNrZWRUZWFtLmZpbHRlcigoeCkgPT4gKHgudGVhbUlkICE9PSB0ZWFtSWQpKSlcblx0XHQvLyB9IGVsc2Uge1xuXHRcdC8vIH1cblx0fVxuXG5cdHJldHVybiAoXG5cdFx0PGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtd3JhcCBqdXN0aWZ5LWJldHdlZW4gbWF4LXctNnhsIHRleHQtc21cIj5cblx0XHRcdHt0ZWFtcy5tYXAoKHRlYW0pID0+IChcblx0XHRcdFx0PGRpdlxuXHRcdFx0XHRcdGtleT17dGVhbS5pZFRlYW19XG5cdFx0XHRcdFx0b25DbGljaz17KCkgPT4gdG9nZ2xlVGVhbSh0ZWFtLmlkVGVhbSwgdGVhbS5zdHJUZWFtKX1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJ3LTEvNCBweC0yIGN1cnNvci1wb2ludGVyXCJcblx0XHRcdFx0PlxuXHRcdFx0XHRcdDxkaXZcblx0XHRcdFx0XHRcdGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIHctZnVsbCBwLTQgbXgtMiBteS0yIHJvdW5kZWQtbWQgYmctYmx1ZS01MCAke1xuXHRcdFx0XHRcdFx0XHRwaWNrZWRUZWFtLnNvbWUoKHgpID0+IHgudGVhbUlkID09PSB0ZWFtLmlkVGVhbSkgJiYgJ2JnLWJsdWUtMjAwJ1xuXHRcdFx0XHRcdFx0fWB9XG5cdFx0XHRcdFx0PlxuXHRcdFx0XHRcdFx0PEltYWdlIHNyYz17dGVhbS5zdHJUZWFtQmFkZ2V9IHdpZHRoPXszMH0gaGVpZ2h0PXszMH0gLz5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzTmFtZT1cIm1sLTQgdGV4dC1sZ1wiPnt0ZWFtLnN0clRlYW19PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdCkpfVxuXHRcdDwvZGl2PlxuXHQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRlYW1QaWNrZXJcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/teampicker.tsx\n");

/***/ })

})