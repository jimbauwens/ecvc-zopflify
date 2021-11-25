/* 
 * European COVID vaccination certificate library 
 * 
 * Copyright 2021 (c) Jim Bauwens (MIT License)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */

"use strict";

const DEFAULT_ITERATIONS = 15;

import { b45 } from "./base45.js";
import { zlibAsync } from "./zopfli/index.js";

interface Window { pako: any; }
const pako = window["pako"];

/*
 * The ECVC_Container takes care of the packaging the certificate, e.g. qr, base45 and zlib
 */

export class ECVC_Container {

    private cbor_payload: Uint8Array;

    constructor(cbor_payload) {
        this.cbor_payload = cbor_payload;
    }

    static fromHC1String(data : string) : ECVC_Container {
		const header     = data.substr(0, 4); //should be HC1:
		const b45_data   = data.substr(4);

        assert(header === "HC1:", "Invalid input, missing HC1 header");
        let compressed_payload;

        try {
            compressed_payload = b45.decode(b45_data);
        } catch {
            throw new Error("Invalid input, invalid base45");
        }

        return this.fromZlib(compressed_payload);
    }

    static fromZlib(data: Uint8Array) : ECVC_Container {
        try {
            const payload = pako.inflate(data);
            return new this(payload);
        } catch (e) {
            console.log(e);
            throw new Error("Invalid input, could not inflate decoded base45 content");
        }
    }

    toHC1StringAsync(options?: {iterations: number}): Promise<string> {
        const iterations =  options.iterations || DEFAULT_ITERATIONS;

        return new Promise<string>((resolve, reject) => {
            zlibAsync(this.cbor_payload, { numiterations: iterations }).then((output: Uint8Array) => {
				const repacked = "HC1:" + b45.encode(output);
                resolve(repacked);
			}).catch(e => {
                reject("Error running zipfli");
            });
        });
    }
}

function assert(condition: boolean, errormsg: string) {
    if (!condition)
        throw new Error(errormsg);
}
