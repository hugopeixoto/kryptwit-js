# Kryptwit JS

This library implements Kryptwit (blol.org/845-kryptwit-01) in Javascript.
It uses CryptoJS to handle the cryptography primitives. The exception is mode-ctr-gladman.js, which was vastly modified be compliant with the specification.

# Example

There is a small encrypt/decrypt sample in sample.js. It can be executed with d8 (V8 javascript shell):

    d8 aes.js pbkdf2.js pad-nopadding.js pad-zeropadding.js sha256-min.js mode-ctr-gladman.js kryptwit.js sample.js

This yields the following:

    input : this contains the text one should cipher and decipher. 100 characters maximum. (78)
    cipher: ;-) )mu!5XXIGh#%QB}=+8ngvAu*a7NyF`l{4v_obLe+[]Ty$kg=r-q8Hb4+Aeh?ZH'k/&G#V}U$B46JVv-Q0)he&+HYm$X~mM`T#jGb7&M?DaI#]c7o2)GPh)2xrwC!y*S#Ep8b).W (139)
    plain : this contains the text one should cipher and decipher. 100 characters maximum. (78)

