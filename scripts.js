// Function to set a cookie with the text size preference
function setFontSizeCookie(fontsize) {
    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set the cookie expiration to 1 year from now
    const expires = "expires=" + d.toUTCString();
    document.cookie = "textSize=" + fontsize + "; " + expires + "; path=/";
}

// Function to get the cookie value for the text size preference
function getFontSizeCookie() {
    const name = "textSize=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
        }
    }
    return "";
}

// Function to apply the user's saved text size preference on page load
function applyFontSizePreference() {
    const savedSize = getFontSizeCookie();
    if (savedSize) {
        document.body.style.fontSize = savedSize;
    }
}

// Function to change the text size and save the preference
function changeTextSize(sizeChange) {
    const bodyElement = document.querySelector("body");
    let currentSize = parseFloat(window.getComputedStyle(bodyElement).fontSize);
    currentSize += sizeChange;
    bodyElement.style.fontSize = currentSize + "px";

    // Save the user's preference in a cookie
    setFontSizeCookie(currentSize + "px");
}

// Attach event listeners
document.addEventListener("DOMContentLoaded", function () {
    // Apply the user's saved text size preference on page load
    applyFontSizePreference();
    
    // Attach text resizing buttons' event listeners
    const increaseButton = document.getElementById("increase-text-size");
    const decreaseButton = document.getElementById("decrease-text-size");
    const resetButton = document.getElementById("reset-text-size");
    
    if (increaseButton) {
        increaseButton.addEventListener("click", function () {
            changeTextSize(2);
        });
    }
    
    if (decreaseButton) {
        decreaseButton.addEventListener("click", function () {
            changeTextSize(-2);
        });
    }
    
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            document.body.style.fontSize = "16px"; // Default font size
            setFontSizeCookie("16px");
        });
    }
});
