
var base85encode = function (data) {
  return data;
}

var base85decode = function (data) {
  return data;
}

var TwitterFormatter = {
  parse: function (tweet, x) {

    var cipher = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(base85decode(tweet.slice(128/8*2+4))),
      iv: CryptoJS.enc.Hex.parse(base85decode(tweet.slice(4, 128/8*2+4)))
    });

    return cipher;
  },

  stringify: function (cipher) {
    return ";-) " + base85encode(cipher.iv) + base85encode(cipher.ciphertext);
  }
};

var derive_key = function (username, password) {
  return CryptoJS.PBKDF2(password, username, { keySize: 256/32, iterations: 1000 });
}

var pad = function (string, limit) {
  var data = CryptoJS.enc.Utf8.parse(string);
  CryptoJS.pad.ZeroPadding.pad(data, limit/4);
  return data;
}

var unpad = function (data) {
  CryptoJS.pad.ZeroPadding.unpad(data);
}

var status_update_encrypt = function (plaintext, username, password) {
  var key = derive_key(username, password);
  var iv  = CryptoJS.lib.WordArray.random(128/8);

  return CryptoJS.AES.encrypt(
    pad(plaintext, 100),
    key,
    { mode: CryptoJS.mode.CTR, iv: iv, format: TwitterFormatter }).toString();
};

var status_update_decrypt = function (ciphertext, username, password) {
  var key = derive_key(username, password);

  var x = CryptoJS.AES.decrypt(
    ciphertext,
    key,
    { mode: CryptoJS.mode.CTR, format: TwitterFormatter });

  unpad(x);
  return x.toString(CryptoJS.enc.Utf8);
};

