/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
/** @preserve
 * Counter block mode compatible with  Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR 
 * Jan Hruby jhruby.web@gmail.com
 */
CryptoJS.mode.CTRGladman = (function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

	function incWord(word)
	{	
    return (word+1)|0;
	}

	function incCounter(counter)
	{
		if ((counter[3] = incWord(counter[3])) === 0)
		{
			// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
			counter[2] = incWord(counter[2]);
		}
		return counter;
	}
	
    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
        processBlock: function (words, offset) {
            // Shortcuts
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;

            // Generate keystream
            if (iv) {
                counter = this._counter = iv.slice(0);
                counter.push(0);
                counter.push(0);

                // Remove IV for subsequent blocks
                this._iv = undefined;
            }
            
			
			var keystream = counter.slice(0);
             cipher.encryptBlock(keystream, 0);
 
			incCounter(counter);

            // Encrypt
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });

    CTRGladman.Decryptor = Encryptor;

    return CTRGladman;
}());


