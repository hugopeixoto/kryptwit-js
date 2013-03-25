
var base85lookup = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!`#$%&/()='?_{+*~}-.,[]@";

var base85encode = function (data) {
  var string = "";

  for (var i = 0; i*4 < data.sigBytes; i++) {
    var v = data.words[i] >>> 0;
    for (var j = 0; j < 5; j++) {
      var r = v%85;
      string += base85lookup[r];
      v = (v/85)>>>0;
    }
  }

  return string;
}

var base85decode = function (data) {
  var out = CryptoJS.lib.WordArray.create([], data.length/5*4);

  for (var i = 0; i*5 < data.length; i++) {
    var v = 0;
    for (var j = 4; j >= 0; j--) {
      var add = base85lookup.indexOf(data[i*5+j]);
      v = v*85 + add;
    }
    out.words[i] = v>>0;
  }

  return out;
}

var TwitterFormatter = {
  iv_length: function () {
    return 10;
  },

  parse: function (tweet, x) {
    var cipher = CryptoJS.lib.CipherParams.create({
      ciphertext: base85decode(tweet.slice(this.iv_length()+4)),
      iv: base85decode(tweet.slice(4, this.iv_length()+4))
    });

    return cipher;
  },

  stringify: function (cipher) {
    return ";-) " + base85encode(cipher.iv) + base85encode(cipher.ciphertext);
  }
};

var derive_key = function (username, password) {
  return CryptoJS.PBKDF2(
    CryptoJS.enc.Utf8.parse(password),
    CryptoJS.enc.Utf8.parse(username),
    {     hasher: CryptoJS.algo.SHA256,
         keySize: 256/32,
      iterations: 1000 });
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
  var iv  = CryptoJS.lib.WordArray.random(8);

  return CryptoJS.AES.encrypt(
    pad(plaintext, 100),
    key,
    { padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.CTR, iv: iv, format: TwitterFormatter }).toString();
};

var status_update_decrypt = function (ciphertext, username, password) {
  var key = derive_key(username, password);

  var x = CryptoJS.AES.decrypt(
    ciphertext,
    key,
    { padding: CryptoJS.pad.NoPadding, mode: CryptoJS.mode.CTR, format: TwitterFormatter });

  unpad(x);
  return x.toString(CryptoJS.enc.Utf8);
};

