module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/user.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/user.js":
/*!***************************!*\
  !*** ./pages/api/user.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return user; });\n/* harmony import */ var faunadb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! faunadb */ \"faunadb\");\n/* harmony import */ var faunadb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(faunadb__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _utils_fauna_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/utils/fauna-client */ \"./utils/fauna-client.js\");\n/* harmony import */ var _utils_auth_cookies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/utils/auth-cookies */ \"./utils/auth-cookies.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\nasync function user(req, res) {\n  const token = Object(_utils_auth_cookies__WEBPACK_IMPORTED_MODULE_2__[\"getAuthCookie\"])(req);\n\n  if (!token) {\n    return res.status(200).send('Not logged in');\n  }\n\n  try {\n    const {\n      ref,\n      data\n    } = await Object(_utils_fauna_client__WEBPACK_IMPORTED_MODULE_1__[\"authClient\"])(token).query(faunadb__WEBPACK_IMPORTED_MODULE_0__[\"query\"].Get(faunadb__WEBPACK_IMPORTED_MODULE_0__[\"query\"].CurrentIdentity()));\n    res.status(200).json(_objectSpread(_objectSpread({}, data), {}, {\n      id: ref.id\n    }));\n  } catch (error) {\n    console.error(error);\n    res.status(error.requestResult.statusCode).send(error.message);\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvdXNlci5qcz8yYWJiIl0sIm5hbWVzIjpbInVzZXIiLCJyZXEiLCJyZXMiLCJ0b2tlbiIsImdldEF1dGhDb29raWUiLCJzdGF0dXMiLCJzZW5kIiwicmVmIiwiZGF0YSIsImF1dGhDbGllbnQiLCJxdWVyeSIsInEiLCJHZXQiLCJDdXJyZW50SWRlbnRpdHkiLCJqc29uIiwiaWQiLCJlcnJvciIsImNvbnNvbGUiLCJyZXF1ZXN0UmVzdWx0Iiwic3RhdHVzQ29kZSIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVlLGVBQWVBLElBQWYsQ0FBb0JDLEdBQXBCLEVBQXlCQyxHQUF6QixFQUE4QjtBQUM1QyxRQUFNQyxLQUFLLEdBQUdDLHlFQUFhLENBQUNILEdBQUQsQ0FBM0I7O0FBRUEsTUFBSSxDQUFDRSxLQUFMLEVBQVk7QUFDWCxXQUFPRCxHQUFHLENBQUNHLE1BQUosQ0FBVyxHQUFYLEVBQWdCQyxJQUFoQixDQUFxQixlQUFyQixDQUFQO0FBQ0E7O0FBRUQsTUFBSTtBQUNILFVBQU07QUFBRUMsU0FBRjtBQUFPQztBQUFQLFFBQWdCLE1BQU1DLHNFQUFVLENBQUNOLEtBQUQsQ0FBVixDQUFrQk8sS0FBbEIsQ0FBd0JDLDZDQUFDLENBQUNDLEdBQUYsQ0FBTUQsNkNBQUMsQ0FBQ0UsZUFBRixFQUFOLENBQXhCLENBQTVCO0FBQ0FYLE9BQUcsQ0FBQ0csTUFBSixDQUFXLEdBQVgsRUFBZ0JTLElBQWhCLGlDQUEwQk4sSUFBMUI7QUFBZ0NPLFFBQUUsRUFBRVIsR0FBRyxDQUFDUTtBQUF4QztBQUNBLEdBSEQsQ0FHRSxPQUFPQyxLQUFQLEVBQWM7QUFDZkMsV0FBTyxDQUFDRCxLQUFSLENBQWNBLEtBQWQ7QUFDQWQsT0FBRyxDQUFDRyxNQUFKLENBQVdXLEtBQUssQ0FBQ0UsYUFBTixDQUFvQkMsVUFBL0IsRUFBMkNiLElBQTNDLENBQWdEVSxLQUFLLENBQUNJLE9BQXREO0FBQ0E7QUFDRCIsImZpbGUiOiIuL3BhZ2VzL2FwaS91c2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcXVlcnkgYXMgcSB9IGZyb20gJ2ZhdW5hZGInXG5pbXBvcnQgeyBhdXRoQ2xpZW50IH0gZnJvbSAnQC91dGlscy9mYXVuYS1jbGllbnQnXG5pbXBvcnQgeyBnZXRBdXRoQ29va2llIH0gZnJvbSAnQC91dGlscy9hdXRoLWNvb2tpZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHVzZXIocmVxLCByZXMpIHtcblx0Y29uc3QgdG9rZW4gPSBnZXRBdXRoQ29va2llKHJlcSlcblxuXHRpZiAoIXRva2VuKSB7XG5cdFx0cmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5zZW5kKCdOb3QgbG9nZ2VkIGluJylcblx0fVxuXG5cdHRyeSB7XG5cdFx0Y29uc3QgeyByZWYsIGRhdGEgfSA9IGF3YWl0IGF1dGhDbGllbnQodG9rZW4pLnF1ZXJ5KHEuR2V0KHEuQ3VycmVudElkZW50aXR5KCkpKVxuXHRcdHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgLi4uZGF0YSwgaWQ6IHJlZi5pZCB9KVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0cmVzLnN0YXR1cyhlcnJvci5yZXF1ZXN0UmVzdWx0LnN0YXR1c0NvZGUpLnNlbmQoZXJyb3IubWVzc2FnZSlcblx0fVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/api/user.js\n");

/***/ }),

/***/ "./utils/auth-cookies.js":
/*!*******************************!*\
  !*** ./utils/auth-cookies.js ***!
  \*******************************/
/*! exports provided: setAuthCookie, removeAuthCookie, getAuthCookie, getUserCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setAuthCookie\", function() { return setAuthCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"removeAuthCookie\", function() { return removeAuthCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAuthCookie\", function() { return getAuthCookie; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getUserCookie\", function() { return getUserCookie; });\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookie */ \"cookie\");\n/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_0__);\n\nconst TOKEN_NAME = 'faunaToken';\nconst MAX_AGE = 60 * 60 * 24;\nfunction setAuthCookie(res, token, userID) {\n  const cookie = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"])(TOKEN_NAME, token, {\n    httpOnly: true,\n    maxAge: MAX_AGE,\n    path: '/',\n    sameSite: 'lax',\n    secure: false\n  });\n  const userCookie = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"])('user', userID, {\n    httpOnly: true,\n    maxAge: MAX_AGE,\n    path: '/',\n    sameSite: 'lax',\n    secure: false\n  });\n  res.setHeader('Set-Cookie', [cookie, userCookie]);\n}\nfunction removeAuthCookie(res) {\n  const cookie = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"])(TOKEN_NAME, '', {\n    maxAge: -1,\n    path: '/'\n  });\n  const userCookie = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"serialize\"])('user', '', {\n    maxAge: -1,\n    path: '/'\n  });\n  res.setHeader('Set-Cookie', [cookie, userCookie]);\n}\nfunction getAuthCookie(req) {\n  if (req.cookies) return req.cookies[TOKEN_NAME];\n  const cookies = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"parse\"])(req.headers.cookie || '');\n  return cookies[TOKEN_NAME];\n}\nfunction getUserCookie(req) {\n  if (req.cookies) return req.cookies['user'];\n  const cookies = Object(cookie__WEBPACK_IMPORTED_MODULE_0__[\"parse\"])(req.headers.cookie || '');\n  return cookies['user'];\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9hdXRoLWNvb2tpZXMuanM/NTE5NCJdLCJuYW1lcyI6WyJUT0tFTl9OQU1FIiwiTUFYX0FHRSIsInNldEF1dGhDb29raWUiLCJyZXMiLCJ0b2tlbiIsInVzZXJJRCIsImNvb2tpZSIsInNlcmlhbGl6ZSIsImh0dHBPbmx5IiwibWF4QWdlIiwicGF0aCIsInNhbWVTaXRlIiwic2VjdXJlIiwidXNlckNvb2tpZSIsInNldEhlYWRlciIsInJlbW92ZUF1dGhDb29raWUiLCJnZXRBdXRoQ29va2llIiwicmVxIiwiY29va2llcyIsInBhcnNlIiwiaGVhZGVycyIsImdldFVzZXJDb29raWUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxNQUFNQSxVQUFVLEdBQUcsWUFBbkI7QUFDQSxNQUFNQyxPQUFPLEdBQUcsS0FBSyxFQUFMLEdBQVUsRUFBMUI7QUFFTyxTQUFTQyxhQUFULENBQXVCQyxHQUF2QixFQUE0QkMsS0FBNUIsRUFBbUNDLE1BQW5DLEVBQTJDO0FBQ2pELFFBQU1DLE1BQU0sR0FBR0Msd0RBQVMsQ0FBQ1AsVUFBRCxFQUFhSSxLQUFiLEVBQW9CO0FBQzNDSSxZQUFRLEVBQUUsSUFEaUM7QUFFM0NDLFVBQU0sRUFBRVIsT0FGbUM7QUFHM0NTLFFBQUksRUFBRSxHQUhxQztBQUkzQ0MsWUFBUSxFQUFFLEtBSmlDO0FBSzNDQyxVQUFNO0FBTHFDLEdBQXBCLENBQXhCO0FBUUEsUUFBTUMsVUFBVSxHQUFHTix3REFBUyxDQUFDLE1BQUQsRUFBU0YsTUFBVCxFQUFpQjtBQUM1Q0csWUFBUSxFQUFFLElBRGtDO0FBRTVDQyxVQUFNLEVBQUVSLE9BRm9DO0FBRzVDUyxRQUFJLEVBQUUsR0FIc0M7QUFJNUNDLFlBQVEsRUFBRSxLQUprQztBQUs1Q0MsVUFBTTtBQUxzQyxHQUFqQixDQUE1QjtBQU9BVCxLQUFHLENBQUNXLFNBQUosQ0FBYyxZQUFkLEVBQTRCLENBQUNSLE1BQUQsRUFBU08sVUFBVCxDQUE1QjtBQUNBO0FBRU0sU0FBU0UsZ0JBQVQsQ0FBMEJaLEdBQTFCLEVBQStCO0FBQ3JDLFFBQU1HLE1BQU0sR0FBR0Msd0RBQVMsQ0FBQ1AsVUFBRCxFQUFhLEVBQWIsRUFBaUI7QUFDeENTLFVBQU0sRUFBRSxDQUFDLENBRCtCO0FBRXhDQyxRQUFJLEVBQUU7QUFGa0MsR0FBakIsQ0FBeEI7QUFJQSxRQUFNRyxVQUFVLEdBQUdOLHdEQUFTLENBQUMsTUFBRCxFQUFTLEVBQVQsRUFBYTtBQUN4Q0UsVUFBTSxFQUFFLENBQUMsQ0FEK0I7QUFFeENDLFFBQUksRUFBRTtBQUZrQyxHQUFiLENBQTVCO0FBS0FQLEtBQUcsQ0FBQ1csU0FBSixDQUFjLFlBQWQsRUFBNEIsQ0FBQ1IsTUFBRCxFQUFTTyxVQUFULENBQTVCO0FBQ0E7QUFHTSxTQUFTRyxhQUFULENBQXVCQyxHQUF2QixFQUE0QjtBQUNsQyxNQUFJQSxHQUFHLENBQUNDLE9BQVIsRUFBaUIsT0FBT0QsR0FBRyxDQUFDQyxPQUFKLENBQVlsQixVQUFaLENBQVA7QUFFakIsUUFBTWtCLE9BQU8sR0FBR0Msb0RBQUssQ0FBQ0YsR0FBRyxDQUFDRyxPQUFKLENBQVlkLE1BQVosSUFBc0IsRUFBdkIsQ0FBckI7QUFDQSxTQUFPWSxPQUFPLENBQUNsQixVQUFELENBQWQ7QUFDQTtBQUVNLFNBQVNxQixhQUFULENBQXVCSixHQUF2QixFQUE0QjtBQUNsQyxNQUFJQSxHQUFHLENBQUNDLE9BQVIsRUFBaUIsT0FBT0QsR0FBRyxDQUFDQyxPQUFKLENBQVksTUFBWixDQUFQO0FBRWpCLFFBQU1BLE9BQU8sR0FBR0Msb0RBQUssQ0FBQ0YsR0FBRyxDQUFDRyxPQUFKLENBQVlkLE1BQVosSUFBc0IsRUFBdkIsQ0FBckI7QUFDQSxTQUFPWSxPQUFPLENBQUMsTUFBRCxDQUFkO0FBQ0EiLCJmaWxlIjoiLi91dGlscy9hdXRoLWNvb2tpZXMuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXJpYWxpemUsIHBhcnNlIH0gZnJvbSAnY29va2llJ1xuXG5jb25zdCBUT0tFTl9OQU1FID0gJ2ZhdW5hVG9rZW4nXG5jb25zdCBNQVhfQUdFID0gNjAgKiA2MCAqIDI0XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRBdXRoQ29va2llKHJlcywgdG9rZW4sIHVzZXJJRCkge1xuXHRjb25zdCBjb29raWUgPSBzZXJpYWxpemUoVE9LRU5fTkFNRSwgdG9rZW4sIHtcblx0XHRodHRwT25seTogdHJ1ZSxcblx0XHRtYXhBZ2U6IE1BWF9BR0UsXG5cdFx0cGF0aDogJy8nLFxuXHRcdHNhbWVTaXRlOiAnbGF4Jyxcblx0XHRzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcblx0fSlcbiAgXG5cdGNvbnN0IHVzZXJDb29raWUgPSBzZXJpYWxpemUoJ3VzZXInLCB1c2VySUQsIHtcblx0XHRodHRwT25seTogdHJ1ZSxcblx0XHRtYXhBZ2U6IE1BWF9BR0UsXG5cdFx0cGF0aDogJy8nLFxuXHRcdHNhbWVTaXRlOiAnbGF4Jyxcblx0XHRzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcblx0fSlcblx0cmVzLnNldEhlYWRlcignU2V0LUNvb2tpZScsIFtjb29raWUsIHVzZXJDb29raWVdKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQXV0aENvb2tpZShyZXMpIHtcblx0Y29uc3QgY29va2llID0gc2VyaWFsaXplKFRPS0VOX05BTUUsICcnLCB7XG5cdFx0bWF4QWdlOiAtMSxcblx0XHRwYXRoOiAnLydcblx0fSlcblx0Y29uc3QgdXNlckNvb2tpZSA9IHNlcmlhbGl6ZSgndXNlcicsICcnLCB7XG5cdFx0bWF4QWdlOiAtMSxcblx0XHRwYXRoOiAnLydcblx0fSlcblxuXHRyZXMuc2V0SGVhZGVyKCdTZXQtQ29va2llJywgW2Nvb2tpZSwgdXNlckNvb2tpZV0pXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEF1dGhDb29raWUocmVxKSB7XG5cdGlmIChyZXEuY29va2llcykgcmV0dXJuIHJlcS5jb29raWVzW1RPS0VOX05BTUVdXG5cblx0Y29uc3QgY29va2llcyA9IHBhcnNlKHJlcS5oZWFkZXJzLmNvb2tpZSB8fCAnJylcblx0cmV0dXJuIGNvb2tpZXNbVE9LRU5fTkFNRV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJDb29raWUocmVxKSB7XG5cdGlmIChyZXEuY29va2llcykgcmV0dXJuIHJlcS5jb29raWVzWyd1c2VyJ11cblxuXHRjb25zdCBjb29raWVzID0gcGFyc2UocmVxLmhlYWRlcnMuY29va2llIHx8ICcnKVxuXHRyZXR1cm4gY29va2llc1sndXNlciddXG59Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./utils/auth-cookies.js\n");

/***/ }),

/***/ "./utils/fauna-client.js":
/*!*******************************!*\
  !*** ./utils/fauna-client.js ***!
  \*******************************/
/*! exports provided: guestClient, authClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"guestClient\", function() { return guestClient; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"authClient\", function() { return authClient; });\n/* harmony import */ var faunadb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! faunadb */ \"faunadb\");\n/* harmony import */ var faunadb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(faunadb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst guestClient = new faunadb__WEBPACK_IMPORTED_MODULE_0___default.a.Client({\n  secret: \"fnAD8DK6JAACAS8Z3C4VmH7tcdStX8J8DosKDS5Q\"\n});\nconst authClient = secret => new faunadb__WEBPACK_IMPORTED_MODULE_0___default.a.Client({\n  secret\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9mYXVuYS1jbGllbnQuanM/YTc4YiJdLCJuYW1lcyI6WyJndWVzdENsaWVudCIsImZhdW5hZGIiLCJDbGllbnQiLCJzZWNyZXQiLCJwcm9jZXNzIiwiTkVYVF9QVUJMSUNfRkFVTkFfR1VFU1RfU0VDUkVUIiwiYXV0aENsaWVudCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRU8sTUFBTUEsV0FBVyxHQUFHLElBQUlDLDhDQUFPLENBQUNDLE1BQVosQ0FBbUI7QUFDN0NDLFFBQU0sRUFBRUMsMENBQTBDQztBQURMLENBQW5CLENBQXBCO0FBSUEsTUFBTUMsVUFBVSxHQUFJSCxNQUFELElBQVksSUFBSUYsOENBQU8sQ0FBQ0MsTUFBWixDQUFtQjtBQUFFQztBQUFGLENBQW5CLENBQS9CIiwiZmlsZSI6Ii4vdXRpbHMvZmF1bmEtY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGZhdW5hZGIgZnJvbSAnZmF1bmFkYidcblxuZXhwb3J0IGNvbnN0IGd1ZXN0Q2xpZW50ID0gbmV3IGZhdW5hZGIuQ2xpZW50KHtcblx0c2VjcmV0OiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GQVVOQV9HVUVTVF9TRUNSRVQsXG59KVxuXG5leHBvcnQgY29uc3QgYXV0aENsaWVudCA9IChzZWNyZXQpID0+IG5ldyBmYXVuYWRiLkNsaWVudCh7IHNlY3JldCB9KSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/fauna-client.js\n");

/***/ }),

/***/ "cookie":
/*!*************************!*\
  !*** external "cookie" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb29raWVcIj8yZDIxIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImNvb2tpZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNvb2tpZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///cookie\n");

/***/ }),

/***/ "faunadb":
/*!**************************!*\
  !*** external "faunadb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"faunadb\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmYXVuYWRiXCI/OWIwYiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJmYXVuYWRiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZmF1bmFkYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///faunadb\n");

/***/ })

/******/ });