const Cape  = require("@eldisniper/cape-js").Cape;
var cape = new Cape("YOUR-ENCRYPTION-KEY", 0);

//  THE WAY IT WORKS IN C (ARDUINO)  --> https://github.com/gioblu/Cape
console.log("")
var stringtoencrypt = "STRINGTOENCRYPT";
var len = stringtoencrypt.length;
var source = cape.stringToBinary(stringtoencrypt);
var destination = new Array(len)
cape.encrypt(source, destination);
console.log("Encrypted ", cape.bin2string(destination));
source = new Array(len);
cape.decrypt(destination, source);
console.log("Decrypted ", cape.bin2string(source));


// SIMPLIFIED

const encrypted = cape.encrypt_str("STRINGTOENCRYPT");
console.log("Encrypted ", encrypted);
const decrypted = cape.decrypt_str(encrypted);
console.log("Decrypted ", decrypted);