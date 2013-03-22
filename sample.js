
var username  = "hugopeixoto";
var password  = "zomgpwd";
var plaintext = "so kawaii";
print("input :" + plaintext)

var ciphertext = status_update_encrypt(plaintext, username, password);
print("cipher:" + ciphertext);

var plaintext2 = status_update_decrypt(ciphertext, username, password);
print("plain :" + plaintext2);

