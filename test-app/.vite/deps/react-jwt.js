import {
  require_react
} from "./chunk-ZAUFE7H7.js";
import {
  __toESM
} from "./chunk-UXIASGQL.js";

// node_modules/react-jwt/dist/index.modern.js
var import_react = __toESM(require_react());
var map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var reverseMap = /* @__PURE__ */ new Map();
for (i = 0; i < map.length; i++) {
  bits = i.toString(2);
  padding = 6 - bits.length;
  bits = "0".repeat(padding) + bits;
  reverseMap.set(map.charCodeAt(i), bits);
}
var bits;
var padding;
var i;
function toByteArray(base64Str) {
  var bits = "";
  for (var _i = 0; _i < base64Str.length; _i++) {
    bits += reverseMap.get(base64Str.charCodeAt(_i));
  }
  bits = bits.slice(0, bits.length - bits.length % 8);
  var bytesArray = [];
  for (var _i2 = 0; _i2 < bits.length / 8; _i2++) {
    bytesArray.push(bits.slice(_i2 * 8, _i2 * 8 + 8));
  }
  return bytesArray;
}
function base64DecToArray(base64Str) {
  base64Str = base64Str.replaceAll("=", "");
  base64Str = base64Str.replaceAll("-", "+");
  base64Str = base64Str.replaceAll("_", "/");
  var charCodes = toByteArray(base64Str);
  return charCodes.map(function(code) {
    return parseInt(code, 2);
  });
}
function UTF8ArrToStr(bytes) {
  var decoded = "";
  var nPart;
  var arrayLength = bytes.length;
  for (var _i3 = 0; _i3 < arrayLength; _i3++) {
    nPart = bytes[_i3];
    decoded += String.fromCodePoint(nPart > 251 && nPart < 254 && _i3 + 5 < arrayLength ? (nPart - 252) * 1073741824 + (bytes[++_i3] - 128 << 24) + (bytes[++_i3] - 128 << 18) + (bytes[++_i3] - 128 << 12) + (bytes[++_i3] - 128 << 6) + bytes[++_i3] - 128 : nPart > 247 && nPart < 252 && _i3 + 4 < arrayLength ? (nPart - 248 << 24) + (bytes[++_i3] - 128 << 18) + (bytes[++_i3] - 128 << 12) + (bytes[++_i3] - 128 << 6) + bytes[++_i3] - 128 : nPart > 239 && nPart < 248 && _i3 + 3 < arrayLength ? (nPart - 240 << 18) + (bytes[++_i3] - 128 << 12) + (bytes[++_i3] - 128 << 6) + bytes[++_i3] - 128 : nPart > 223 && nPart < 240 && _i3 + 2 < arrayLength ? (nPart - 224 << 12) + (bytes[++_i3] - 128 << 6) + bytes[++_i3] - 128 : nPart > 191 && nPart < 224 && _i3 + 1 < arrayLength ? (nPart - 192 << 6) + bytes[++_i3] - 128 : nPart);
  }
  return decoded;
}
function decodeToken(token) {
  try {
    if (token.split(".").length !== 3 || typeof token !== "string") {
      return null;
    }
    var payload = token.split(".")[1];
    var base64Bytes = base64DecToArray(payload);
    var jsonPayload = decodeURIComponent(UTF8ArrToStr(base64Bytes));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("There was an error decoding token: ", error);
    return null;
  }
}
function isTokenExpired(token) {
  var decodedToken = decodeToken(token);
  var result = true;
  if (decodedToken && decodedToken.exp) {
    var expirationDate = /* @__PURE__ */ new Date(0);
    expirationDate.setUTCSeconds(decodedToken.exp);
    result = expirationDate.valueOf() < (/* @__PURE__ */ new Date()).valueOf();
  }
  return result;
}
function useJwt(userJwt) {
  var _useState = (0, import_react.useState)(false), isExpired = _useState[0], setIsExpired = _useState[1];
  var _useState2 = (0, import_react.useState)(null), decodedToken = _useState2[0], setDecodedToken = _useState2[1];
  (0, import_react.useEffect)(function() {
    evaluateToken(userJwt);
  }, [userJwt]);
  var evaluateToken = function evaluateToken2(token) {
    setDecodedToken(decodeToken(token));
    setIsExpired(isTokenExpired(token));
  };
  return {
    isExpired,
    decodedToken,
    reEvaluateToken: evaluateToken
  };
}
export {
  decodeToken,
  isTokenExpired as isExpired,
  useJwt
};
//# sourceMappingURL=react-jwt.js.map
