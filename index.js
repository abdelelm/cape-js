exports.Cape = class Cape {
    constructor(key, s = 0) {
        if (typeof s === "string")
            s = s.charCodeAt(0);
        else if (typeof s === "number")
            s = s % 256;
        else
            s = 0;

        this.salt = s;
        this._key = this.stringToBinary(key);
        this._key_length = key.length + 1;
        this.compute_reduced_key(this._key);
    };

    compute_reduced_key(key) {
        this._reduced_key = 0;
        for (var i = 0; i < key.length; i++)
            this._reduced_key ^= (key[i] << (i % 8));
    };

    decrypt(source, destination) {
        var length = source.length;
        this.hash(source, destination);
        length = length - 1;
        destination[length] ^= (this._reduced_key ^ this.salt);
        for (var i = 0; i < length; i++)
            destination[i] ^= (
                (destination[length] ^ i) ^
                this._key[(this.salt ^ i ^ this._reduced_key) % this._key_length]
            );
        this.hash(destination, destination);
    };

    encrypt(
        source,
        destination,
        iv = 0
    ) {
        const length = source.length;
        destination[length] = iv;
        this.hash(source, destination);
        for (var i = 0; i < length; i++)
            destination[i] ^= (
                (destination[length] ^ i) ^
                this._key[(this.salt ^ i ^ this._reduced_key) % this._key_length]
            );
        destination[length] ^= (this._reduced_key ^ this.salt);
        this.hash(destination, destination);
    };

    hash(source, destination) {
        const length = source.length;
        for (var i = 0; i < length; i++)
            destination[i] = (
                (this._reduced_key ^ source[i] ^ this.salt ^ i) ^
                this._key[(this._reduced_key ^ this.salt ^ i) % this._key_length]
            );
    };

    set_key(key) {
        _key = key;
        _key_length = key.length;
        compute_reduced_key(key);
    };

    decrypt_str(source_str) {
        if (typeof source_str !== "string")
            throw ("Parameter has to be a string");

        var source = this.stringToBinary(source_str);
        var dest = new Array(source_str.length);
        this.decrypt(source, dest);
        return this.bin2string(dest).slice(0, source_str.length - 1);
    }

    encrypt_str(source_str, iv) {
        switch (typeof source_str) {
            case "number":
                source_str += "";
                break;
            case "object":
                source_str = JSON.stringify(source_str);
            case "string":
                break;
            default:
                throw ("NOT SUPPORTED");
                break;
        }
        var source = this.stringToBinary(source_str);
        var dest = new Array(source.length);
        this.encrypt(source, dest, iv);
        return this.bin2string(dest);
    }
    bin2string(array) {
        var result = "";
        for (var i = 0; i < array.length; ++i) {
            result += (String.fromCharCode(array[i]));
        }
        return result;
    }

    stringToBinary(str) {
        var t = []
        for (var i in str) {
            t[i] = str.charCodeAt(i)
        }
        return t;
    }

}