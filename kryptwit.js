
var TwitterFormatter = {
  name: "TwitterFormatter",
  parse: function (tweet, x) {

    var cipher = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(tweet.slice(128/8*2+4)),
      iv: CryptoJS.enc.Hex.parse(tweet.slice(4, 128/8*2+4))
    });

    return cipher;
  },

  stringify: function (cipher) {
    return ";-) " + cipher.iv + cipher.ciphertext;
  }
};

var derive_key = function (username, password) {
  return CryptoJS.PBKDF2(password, username, { keySize: 256/32, iterations: 1000 });
}

var status_update_encrypt = function (plaintext, username, password) {
  var key = derive_key(username, password);
  var iv  = CryptoJS.lib.WordArray.random(128/8);

  return CryptoJS.AES.encrypt(
    plaintext,
    key,
    { mode: CryptoJS.mode.CTR, iv: iv, format: TwitterFormatter }).toString();
};

var status_update_decrypt = function (ciphertext, username, password) {
  var key = derive_key(username, password);
  var iv  = CryptoJS.enc.Hex.parse(ciphertext.slice(4, 128/8*2+4));

  return CryptoJS.AES.decrypt(
    ciphertext,
    key,
    { mode: CryptoJS.mode.CTR, format: TwitterFormatter }).toString(CryptoJS.enc.Utf8);
};

