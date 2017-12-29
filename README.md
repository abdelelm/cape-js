cape-js 1.0
====

Cape implements a new, private key / public salt, xor based, symmetric stream chipher along with a pseudo-random initialization vector asymmetric encryption algorithm, both originally developed to offer strong data security for limited microcontrollers.

This library is fully based on [Cape](https://github.com/gioblu/Cape) library developed by Giovanni Blu Mitolo. 


### How to use cape-js
Installation
```bash
    npm i @eldisniper/cape-js --save
```

Initialization
```js  
const Cape  = require("@eldisniper/cape-js").Cape;
var cape = new Cape("YOUR-ENCRYPTION-KEY", 0); // key , salt
```

Working like in C 
```js  
    var stringtoencrypt = "STRINGTOENCRYPT";
    var len = stringtoencrypt.length;
    var source = cape.stringToBinary(stringtoencrypt);
    var destination = new Array(len)
    cape.encrypt(source, destination);
    console.log("Encrypted ", cape.bin2string(destination));
    source = new Array(len);
    cape.decrypt(destination, source);
    console.log("Decrypted ", cape.bin2string(source));
```
Simplified version
```js
    const encrypted = cape.encrypt_str("STRINGTOENCRYPT");
    console.log("Encrypted ", encrypted);
    const decrypted = cape.decrypt_str(encrypted);
    console.log("Decrypted ", decrypted);
```


### License
    
```cpp  
/*  _____  _____   _____   _____    ____  ___
   |      |_____| |_____| |_____      |  |___
   |_____ |     | |       |_____  |___|   ___|     version 1.0

Cape Copyright (c) 2017, Abdelel All rights reserved.
This library is fully based on Cape by Giovanni Blu Mitolo. 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. */
```
