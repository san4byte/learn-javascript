"use strict";
(self["webpackChunkjavascript_modular"] = self["webpackChunkjavascript_modular"] || []).push([["hello"],{

/***/ "./src/hello.js":
/*!**********************!*\
  !*** ./src/hello.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);


const mhs = [
	{
		nama: "joko santoso",
		email: "joko@gmail.com",
		jurusan: "teknik informatika",
	},
	{
		nama: "adi",
		email: "adi@gmail.com",
		jurusan: "teknik mesin",
	},
	{
		nama: "samsul",
		email: "samsul@gmail.com",
		jurusan: "sistem informasi",
	},
];

const mahasiswa = lodash__WEBPACK_IMPORTED_MODULE_0___default().find(mhs, { nama: "joko santoso" });
console.log(mahasiswa);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/hello.js"));
/******/ }
]);