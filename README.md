<h1>Zopflify your EU COVID-19 Vaccination Certificate</h1>

	<h3>What's this?</h3>

		A small tool that you can use to repackage your European COVID vaccination certificate. 
		You can change the QR error correction factor, which can reduce the size of the QR code.
		Additionally, the packed data is recompressed using <a href="https://github.com/google/zopfli">zopfli</a>, typically yielding
		better compression rates than typical zlib compression (while being backwards compatible with zlib).

		<br><br>
		tl;dr: You can make your qr-code smaller (less dense).

	<h3>Where do I get this 'HC1:' data from? Where do I input my QR-Code?</h3>

		Decode your certificate with any qr-code decoder and copy the data in the input form above.
		I was too lazy to add code to import qr-code images (you can only check so many libraries for hidden backdoors).

	<h3>Are you stealing my certificate with this?</h3>

		No, everything happens inside the browser using JavaScript and WebAssembly (for zopfli). 
		But don't trust me, if you want to be sure disable internet while using the page 
		(or block all subsequent requests from this domain after loading the page in developer tools).

	<h3>Why did you do this?</h3>
	
		I wanted to stick my COVID certificate on my university card so that I didn't need to use my phone to enter the restaurant of the university.
		However, the error correction on the default European certificate card is extremely high, which means that the individual pixels
		are very small when printed to fit my card. 
		The Belgian CovidScan application doesn't like this, so I tried repacking the QR-code to see if I could change the error correction rate.
		This proved to be successful, but I wanted to see if I could go further and reduce the size of the compressed zlib data.
		I discovered zopfli and thus this application was born :)


	<h3>What libraries did you use for this?</h3>
		The excellent QR-code library from Project Nayuki (<a href="https://www.nayuki.io/page/qr-code-generator-library">https://www.nayuki.io/page/qr-code-generator-library</a>), 
		a random base45 decoding library found at <a href="https://github.com/lovasoa/base45-ts">lovasoa/base45-ts</a>,
		pako, a high speed zlib port (<a href="https://github.com/nodeca/pako">nodeca/pako</a>),
		<a href="gfx/zopfli">https://github.com/gfx/universal-zopfli-js</a>, a WebAssembly build of <a href="https://github.com/google/zopfli">google/zopfli</a>.


	<h3>Is this open-source?</h3>
		It's not really rocket science, just pipelining some tools together, but yes you can find the source at: <a href="https://github.com/jimbauwens/ecvc-zopflify">https://github.com/jimbauwens/ecvc-zopflify</a>. 

        

