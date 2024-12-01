const fs = require('fs');
const CryptoJS = require('crypto-js');

// Read the PDF file
const pdfPath = 'assets/pdf/nived.pdf';
const encryptedPath = 'assets/pdf/nived.pdf.enc';

// Read the PDF file
fs.readFile(pdfPath, (err, pdfData) => {
    if (err) {
        console.error('Error reading PDF:', err);
        return;
    }

    // Convert PDF data to WordArray
    const wordArray = CryptoJS.lib.WordArray.create(pdfData);
    const password = "your-secure-password"; // Change this to your secure password
    
    // Generate a random salt
    const salt = CryptoJS.lib.WordArray.random(128/8);
    
    // Generate key
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256/32,
        iterations: 1000
    });
    
    // Generate random IV
    const iv = CryptoJS.lib.WordArray.random(128/8);
    
    // Encrypt
    const encrypted = CryptoJS.AES.encrypt(wordArray, key, { 
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    
    // Combine salt + iv + encrypted data
    const encryptedFile = salt.toString() + iv.toString() + encrypted.toString();
    
    // Write the encrypted file
    fs.writeFile(encryptedPath, encryptedFile, (err) => {
        if (err) {
            console.error('Error writing encrypted file:', err);
            return;
        }
        console.log('Resume encrypted successfully!');
    });
});
