// Encryption configuration
const ENCRYPTION_KEY = 'your-secure-password'; // Change this to your secure password

// Function to encrypt the PDF file
async function encryptFile(arrayBuffer) {
    const text = Array.from(new Uint8Array(arrayBuffer))
        .map(byte => String.fromCharCode(byte))
        .join('');
    
    return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
}

// Function to decrypt the PDF file
async function decryptFile(encrypted) {
    const decrypted = CryptoJS.AES.decrypt(encrypted, ENCRYPTION_KEY);
    const text = decrypted.toString(CryptoJS.enc.Utf8);
    
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
        bytes[i] = text.charCodeAt(i);
    }
    
    return bytes.buffer;
}

// Function to handle resume download
async function downloadResume() {
    try {
        // Show loading state
        const downloadBtn = document.querySelector('.download-resume-btn');
        if (downloadBtn) {
            downloadBtn.textContent = 'Downloading...';
            downloadBtn.disabled = true;
        }

        // Fetch the encrypted file
        const response = await fetch('assets/pdf/nived.pdf.enc');
        if (!response.ok) {
            throw new Error('Failed to fetch encrypted file');
        }

        // Get the encrypted content
        const encryptedContent = await response.text();
        
        // Decrypt the content
        const decryptedBuffer = await decryptFile(encryptedContent);
        
        // Create blob and download
        const blob = new Blob([decryptedBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'nived_resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Reset button state
        if (downloadBtn) {
            downloadBtn.textContent = 'Download Resume';
            downloadBtn.disabled = false;
        }
    } catch (error) {
        console.error('Error downloading resume:', error);
        alert('Error downloading resume. Please try again.');
        
        // Reset button state on error
        const downloadBtn = document.querySelector('.download-resume-btn');
        if (downloadBtn) {
            downloadBtn.textContent = 'Download Resume';
            downloadBtn.disabled = false;
        }
    }
}
