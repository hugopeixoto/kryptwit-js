var username  = "KryptwitJS";
var password  = "zomgpwd";
var plaintext = "this contains the text one should cipher and decipher. 100 characters maximum.";

print("input :  " + plaintext + " (" + plaintext.length + ")");

var ciphertext = status_update_encrypt(plaintext, username, password);
print("cipher:  " + ciphertext + " (" + ciphertext.length + ")");

var plaintext2 = status_update_decrypt(ciphertext, username, password);
print("plain :  " + plaintext2 + " (" + plaintext2.length + ")");

