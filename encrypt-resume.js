const fs = require('fs');
const CryptoJS = require('crypto-js');

// Configuration
const ENCRYPTION_KEY = 'your-secure-password'; // Use the same password as in encryption.js
const INPUT_FILE = 'assets/pdf/nived.pdf';
const OUTPUT_FILE = 'assets/pdf/nived.pdf.enc';

// Read and encrypt the PDF file
fs.readFile(INPUT_FILE, (err, pdfData) => {
    if (err) {
        console.error('Error reading PDF:', err);
        return;
    }

    try {
        // Convert PDF data to string
        const text = Array.from(new Uint8Array(pdfData))
            .map(byte => String.fromCharCode(byte))
            .join('');
        
        // Encrypt the content
        const encrypted = CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
        
        // Write the encrypted content
        fs.writeFile(OUTPUT_FILE, encrypted, (err) => {
            if (err) {
                console.error('Error writing encrypted file:', err);
                return;
            }
            console.log('Resume encrypted successfully!');
        });
    } catch (error) {
        console.error('Error encrypting file:', error);
    }
});
