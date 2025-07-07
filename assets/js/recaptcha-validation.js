
const recaptcha_site_key = '6LfX2norAAAAADRyELy81mKqbedx4X0zGVhVigDb';
const recaptcha_secret_key = '6LfX2norAAAAAO9B8JxPte_VR2b0jjeGE0LEp085';

/**
 * Verify reCAPTCHA token with Google's API
 * @param {string} token - The reCAPTCHA token to verify
 * @param {number} minScore - Minimum score threshold (default: 0.5)
 * @returns {Promise<boolean>} - Returns true if verification successful and score meets threshold
 */
async function verifyRecaptcha(token, minScore = 0.5) {
    const recaptchaSecretKey = recaptcha_secret_key;
    
    const data = new URLSearchParams({
        secret: recaptchaSecretKey,
        response: token,
        remoteip: getClientIP()
    });

    try {
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        });

        const result = await response.json();

        if (result.success && result.score && result.score >= minScore) {
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
    }
}

/**
 * Helper function to get client IP address
 * @returns {string} Client IP address
 */
function getClientIP() {
    if (typeof req !== 'undefined') {
        return req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 
               (req.connection.socket ? req.connection.socket.remoteAddress : null);
    }
    
    return '';
}

/**
 * Returns the HTML for the reCAPTCHA hidden input field
 * @param {string} action - The form action name (e.g., 'contact', 'devis')
 * @returns {string} HTML for the hidden input field
 */
function recaptchaHiddenInput(action) {
    return `<input type="hidden" name="g-recaptcha-response" id="g-recaptcha-response-${action}">`;
}

/**
 * Creates and inserts the reCAPTCHA input into the appropriate div
 * @param {string} formName - The form name/action
 */
function createRecaptchaInput(formName) {
    const inputId = `g-recaptcha-response-${formName}`;
    
    if (document.getElementById(inputId)) {
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'g-recaptcha-response';
    input.id = inputId;
    input.value = '';
    
    let targetDiv = document.getElementById('recaptcha');
    
    if (!targetDiv) {
        const possibleIds = [
            `recaptcha-${formName}`,
            `${formName}-recaptcha`,
            `recaptcha_${formName}`,
            `${formName}_recaptcha`
        ];
        
        for (const id of possibleIds) {
            targetDiv = document.getElementById(id);
            if (targetDiv) break;
        }
    }
    
    if (!targetDiv) {
        const form = document.getElementById(`${formName}Form`) || 
                    document.querySelector(`form[name="${formName}"]`) ||
                    document.querySelector(`button[name="${formName}"]`)?.closest('form');
        
        if (form) {
            form.appendChild(input);
            console.log(`reCAPTCHA input créé dans le formulaire pour ${formName}`);
            return;
        }
    }
    
    if (targetDiv) {
        targetDiv.appendChild(input);
    }
}

/**
 * Browser-side function to execute reCAPTCHA and get token
 * @param {string} action - The action name for this reCAPTCHA execution
 * @param {string} siteKey - Your reCAPTCHA site key
 * @returns {Promise<string>} - Returns the reCAPTCHA token
 */
async function executeRecaptcha(action, siteKey) {
    return new Promise((resolve, reject) => {
        if (typeof grecaptcha === 'undefined') {
            reject(new Error('reCAPTCHA not loaded'));
            return;
        }

        grecaptcha.ready(() => {
            grecaptcha.execute(siteKey, { action: action })
                .then(token => {
                    const hiddenInput = document.getElementById(`g-recaptcha-response-${action}`);
                    if (hiddenInput) {
                        hiddenInput.value = token;
                    }
                    resolve(token);
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        verifyRecaptcha,
        recaptchaHiddenInput,
        getClientIP
    };
} else if (typeof window !== 'undefined') {
    window.recaptchaUtils = {
        executeRecaptcha,
        recaptchaHiddenInput,
        createRecaptchaInput
    };
}

function executeRecaptcha(formName, submitButton) {
    if (typeof grecaptcha !== 'undefined') {
      try {
        grecaptcha.ready(function () {
          grecaptcha.execute(recaptcha_site_key, { action: formName })
            .then(function (token) {
              createRecaptchaInput(formName);
              
              const input = document.getElementById('g-recaptcha-response-' + formName);
              if (input) {
                input.value = token;
                console.log("reCAPTCHA token obtained successfully for " + formName);
              } else {
                console.error("Impossible de trouver l'input reCAPTCHA pour " + formName);
              }
            })
            .catch(function (error) {
              console.error("reCAPTCHA execution error:", error);
            });
        });
      } catch (error) {
        console.error("Error in reCAPTCHA execution:", error);
      }
    } else {
      console.error("grecaptcha is undefined. Make sure the reCAPTCHA script is loaded properly.");
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('button[name="contact"]')) {
      createRecaptchaInput('contact');
      executeRecaptcha('contact');

      document.querySelector('button[name="contact"]').addEventListener('click', function (e) {
        const input = document.getElementById('g-recaptcha-response-contact');
        if (!input || !input.value) {
          e.preventDefault();
          console.log("No reCAPTCHA token found, executing reCAPTCHA...");
          executeRecaptcha('contact');
          setTimeout(function () {
            console.log("Attempting to submit form after reCAPTCHA execution");
            document.querySelector('button[name="contact"]').click();
          }, 1500);
        } else {
          console.log("reCAPTCHA token found, form will submit normally");
        }
      });
    }

    if (document.querySelector('button[name="devis"]')) {
      createRecaptchaInput('devis');
      executeRecaptcha('devis');

      document.querySelector('button[name="devis"]').addEventListener('click', function (e) {
        const input = document.getElementById('g-recaptcha-response-devis');
        if (!input || !input.value) {
          e.preventDefault();
          executeRecaptcha('devis');
          setTimeout(function () {
            document.querySelector('button[name="devis"]').click();
          }, 1000);
        }
      });
    }

    if (document.querySelector('button[name="precontact"]')) {
      createRecaptchaInput('precontact');
      executeRecaptcha('precontact');

      document.querySelector('button[name="precontact"]').addEventListener('click', function (e) {
        const input = document.getElementById('g-recaptcha-response-precontact');
        if (!input || !input.value) {
          e.preventDefault();
          executeRecaptcha('precontact');
          setTimeout(function () {
            document.querySelector('button[name="precontact"]').click();
          }, 1000);
        }
      });
    }

    if (document.querySelector('input[name="devis"]')) {
      createRecaptchaInput('devis_home');
      executeRecaptcha('devis_home');
    }
  });

  setInterval(function () {
    if (document.querySelector('button[name="contact"]')) {
      executeRecaptcha('contact');
    }
    if (document.querySelector('button[name="devis"]')) {
      executeRecaptcha('devis');
    }
    if (document.querySelector('input[name="devis"]')) {
      executeRecaptcha('devis_home');
    }

    if (document.querySelector('button[name="precontact"]')) {
      executeRecaptcha('precontact');
    }
  }, 90000);