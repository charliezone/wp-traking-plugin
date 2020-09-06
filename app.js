/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/src/ListCodes.jsx":
/*!************************************!*\
  !*** ./frontend/src/ListCodes.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ListCodes(props) {
  function handleCopy(e) {
    e.preventDefault();
    var input_temp = document.createElement("input");
    input_temp.value = e.target.getAttribute('code');
    document.body.appendChild(input_temp);
    input_temp.select();
    document.execCommand("copy");
    document.body.removeChild(input_temp);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "traking-codes-list"
  }, /*#__PURE__*/React.createElement("h2", null, "C\xF3digos de seguimiento"), props.codes && props.codes.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      className: "traking-code",
      key: v.cp
    }, /*#__PURE__*/React.createElement("strong", null, v.cp), " ", /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: handleCopy,
      code: v.cp
    }, "copiar"));
  }), !props.codes && /*#__PURE__*/React.createElement("span", null, "No se encontraron c\xF3digos para la informaci\xF3n proporcionada."), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return props.goBack('TrakingForm');
    }
  }, "Atras"));
}

/* harmony default export */ __webpack_exports__["default"] = (ListCodes);

/***/ }),

/***/ "./frontend/src/TrakingForm.jsx":
/*!**************************************!*\
  !*** ./frontend/src/TrakingForm.jsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function TrakingForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    var ci = document.querySelector('input[name="ci"]');

    if (ci.value.length > 0) {
      props.getCodes(ci.value);
    } else {
      var err = document.querySelector('.error-msg');
      err.textContent = 'Este campo no puede estar vacio';
      err.classList.remove('hide');
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "traking-form-wrap"
  }, /*#__PURE__*/React.createElement("h2", null, "Obtenga los c\xF3digos de los paquetes para su posterior seguimiento"), /*#__PURE__*/React.createElement("form", {
    className: "traking-form",
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "ci",
    placeholder: "Ingrese n\xFAmero de identificaci\xF3n del que recibe (CI)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "error-msg hide"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, "Obtener c\xF3digos")));
}

/* harmony default export */ __webpack_exports__["default"] = (TrakingForm);

/***/ }),

/***/ "./frontend/src/app.js":
/*!*****************************!*\
  !*** ./frontend/src/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TrakingForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TrakingForm */ "./frontend/src/TrakingForm.jsx");
/* harmony import */ var _ListCodes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListCodes */ "./frontend/src/ListCodes.jsx");


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var _React = React,
    useState = _React.useState;

function App() {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      codes = _useState2[0],
      setCodes = _useState2[1];

  var _useState3 = useState('TrakingForm'),
      _useState4 = _slicedToArray(_useState3, 2),
      route = _useState4[0],
      setRoute = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      loading = _useState6[0],
      setLoading = _useState6[1];

  function getCodes(ci) {
    setLoading(true);
    var headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "ci": ci,
      'nonce': site_info.traking_nonce
    });
    var requestOptions = {
      method: 'POST',
      headers: headers,
      body: raw
    };
    fetch("".concat(site_info.site_url, "/wp-json/traking/v1/get-codes"), requestOptions).then(function (response) {
      return response.json();
    }).then(function (result) {
      var data = JSON.parse(result);
      setLoading(false);
      setCodes(data.data);
      setRoute('ListCodes');
    })["catch"](function (error) {
      return console.log('error', error);
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "traking-app"
  }, /*#__PURE__*/React.createElement("div", {
    className: loading ? 'loading' : 'hide'
  }, /*#__PURE__*/React.createElement("span", null, "Cargando ...")), /*#__PURE__*/React.createElement("div", {
    className: !loading ? 'wraper' : 'hide'
  }, route === 'TrakingForm' ? /*#__PURE__*/React.createElement(_TrakingForm__WEBPACK_IMPORTED_MODULE_0__["default"], {
    getCodes: getCodes
  }) : /*#__PURE__*/React.createElement(_ListCodes__WEBPACK_IMPORTED_MODULE_1__["default"], {
    goBack: setRoute,
    codes: codes
  })));
}

var domContainer = document.querySelector('#traking-app');
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), domContainer);

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./frontend/src/app.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\xampp\htdocs\grupobordoy\wp-content\plugins\traking\frontend\src\app.js */"./frontend/src/app.js");


/***/ })

/******/ });