// Number Base Converter Calculator JavaScript

function convertNumber() {
    const inputNumber = document.getElementById('inputNumber').value.trim();
    const fromBase = parseInt(document.getElementById('fromBase').value);
    
    // Clear previous results
    clearResults();
    
    if (!inputNumber) {
        showError('Please enter a number');
        return;
    }
    
    try {
        // Validate input based on selected base
        if (!isValidNumber(inputNumber, fromBase)) {
            showError(`Invalid number for base ${fromBase}`);
            return;
        }
        
        // Convert input to decimal first
        let decimalValue;
        if (fromBase === 10) {
            decimalValue = parseInt(inputNumber);
        } else {
            decimalValue = parseInt(inputNumber, fromBase);
        }
        
        if (isNaN(decimalValue) || decimalValue < 0) {
            showError('Invalid number or negative numbers not supported');
            return;
        }
        
        // Convert to all bases
        document.getElementById('binaryResult').value = decimalValue.toString(2);
        document.getElementById('octalResult').value = decimalValue.toString(8);
        document.getElementById('decimalResult').value = decimalValue.toString(10);
        document.getElementById('hexResult').value = decimalValue.toString(16).toUpperCase();
        
        // Add success styling
        document.getElementById('inputNumber').classList.add('success');
        
    } catch (error) {
        showError('Conversion error: ' + error.message);
    }
}

function isValidNumber(number, base) {
    const upperNumber = number.toUpperCase();
    
    switch (base) {
        case 2: // Binary
            return /^[01]+$/.test(number);
        case 8: // Octal
            return /^[0-7]+$/.test(number);
        case 10: // Decimal
            return /^[0-9]+$/.test(number);
        case 16: // Hexadecimal
            return /^[0-9A-F]+$/.test(upperNumber);
        default:
            return false;
    }
}

function showError(message) {
    document.getElementById('inputNumber').classList.add('error');
    
    // Show error message (you can enhance this with a proper error display)
    alert(message);
    
    // Remove error class after 3 seconds
    setTimeout(() => {
        document.getElementById('inputNumber').classList.remove('error');
    }, 3000);
}

function clearResults() {
    document.getElementById('binaryResult').value = '';
    document.getElementById('octalResult').value = '';
    document.getElementById('decimalResult').value = '';
    document.getElementById('hexResult').value = '';
    
    // Remove styling classes
    document.getElementById('inputNumber').classList.remove('error', 'success');
}

function clearAll() {
    document.getElementById('inputNumber').value = '';
    document.getElementById('fromBase').value = '10';
    clearResults();
}

function copyToClipboard(elementId) {
    const element = document.getElementById(elementId);
    const value = element.value;
    
    if (!value) {
        alert('No value to copy');
        return;
    }
    
    // Create temporary textarea to copy text
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = value;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
    // Show feedback
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = '#d4edda';
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, 500);
    
    // Optional: Show a small notification
    showNotification('Copied to clipboard!');
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

function loadExample(number, base) {
    document.getElementById('inputNumber').value = number;
    document.getElementById('fromBase').value = base;
    convertNumber();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Allow Enter key to trigger conversion
    document.getElementById('inputNumber').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertNumber();
        }
    });
    
    // Auto-convert when base changes (if there's input)
    document.getElementById('fromBase').addEventListener('change', function() {
        const inputValue = document.getElementById('inputNumber').value.trim();
        if (inputValue) {
            convertNumber();
        }
    });
    
    // Real-time validation styling
    document.getElementById('inputNumber').addEventListener('input', function() {
        const input = this.value.trim();
        const base = parseInt(document.getElementById('fromBase').value);
        
        this.classList.remove('error', 'success');
        
        if (input && !isValidNumber(input, base)) {
            this.classList.add('error');
        } else if (input) {
            this.classList.add('success');
        }
    });
});

// Additional utility functions
function getBaseInfo(base) {
    const info = {
        2: { name: 'Binary', chars: '0-1', example: '1010' },
        8: { name: 'Octal', chars: '0-7', example: '1234' },
        10: { name: 'Decimal', chars: '0-9', example: '1234' },
        16: { name: 'Hexadecimal', chars: '0-9, A-F', example: '1A2B' }
    };
    return info[base] || null;
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        convertNumber,
        isValidNumber,
        clearAll,
        loadExample
    };
}
