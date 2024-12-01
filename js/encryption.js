// Encryption using CryptoJS
const encryptPDF = async (pdfArrayBuffer) => {
    const password = "your-secure-password"; // Change this to your secure password
    const wordArray = CryptoJS.lib.WordArray.create(pdfArrayBuffer);
    const salt = CryptoJS.lib.WordArray.random(128/8);
    
    const key = CryptoJS.PBKDF2(password, salt, {
        keySize: 256/32,
        iterations: 1000
    });
    
    const iv = CryptoJS.lib.WordArray.random(128/8);
    
    const encrypted = CryptoJS.AES.encrypt(wordArray, key, { 
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    
    const result = salt.toString() + iv.toString() + encrypted.toString();
    return result;
};

const decryptPDF = async (encryptedStr) => {
    const password = "your-secure-password"; // Same password as encryption
    
    try {
        const salt = CryptoJS.enc.Hex.parse(encryptedStr.substr(0, 32));
        const iv = CryptoJS.enc.Hex.parse(encryptedStr.substr(32, 32));
        const encrypted = encryptedStr.substring(64);
        
        const key = CryptoJS.PBKDF2(password, salt, {
            keySize: 256/32,
            iterations: 1000
        });
        
        const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        
        return decrypted.toString(CryptoJS.enc.Latin1);
    } catch (error) {
        console.error('Decryption failed:', error);
        throw new Error('Failed to decrypt PDF');
    }
};

// Function to handle resume download
async function downloadResume() {
    try {
        const response = await fetch('assets/pdf/nived.pdf.enc');
        const encryptedData = await response.text();
        
        // Decrypt the data
        const decryptedData = await decryptPDF(encryptedData);
        
        // Convert to Blob and download
        const blob = new Blob([decryptedData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nived.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading resume:', error);
        alert('Error downloading resume. Please try again.');
    }
}
