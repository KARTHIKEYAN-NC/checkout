document.addEventListener("DOMContentLoaded", function () {
    // Simulate a delay to show the preloader (remove this in production)
    setTimeout(function () {
        // Hide the preloader
        var preloader = document.getElementById('preloader');
        preloader.style.display = 'none';

        // Show the content
        var content = document.getElementById('content');
        content.style.display = 'block';
    }, 2000); // Adjust the delay as needed or remove this line in production
});


document.getElementById('continue-button').addEventListener('click', function () {
    var emailMobileInput = document.getElementById('email-mobile').value;
    if (emailMobileInput) {
        document.getElementById('otp-section').style.display = 'block';
        document.getElementById('continue-button').style.display = 'none';
        document.getElementById('signin-button').style.display = 'block';
        document.getElementById('change-link').style.display = 'block';
    } else {
        alert('Please enter your email or mobile number.');
    }
});


document.getElementById('signin-button').addEventListener('click', function () {
    var otpInput = document.getElementById('otp').value;
    if (otpInput) {
        // Assume the sign-in is successful.
        var name = "Karthikeyan N"; // This can be dynamically set
        var phone = "+91 " + document.getElementById('email-mobile').value;
        document.getElementById('logged-in-name').innerText = name;
        document.getElementById('logged-in-phone').innerText = phone;

        document.getElementById('login-container').style.display = 'none';
        document.getElementById('logged-in-info').style.display = 'flex';
        document.getElementById('old-division-heading').style.display = 'none';
        document.getElementById('addressForm').style.display = 'flex';

    } else {
        alert('Please enter the OTP.');
    }
});

document.getElementById('change-link').addEventListener('click', function () {
    document.getElementById('otp-section').style.display = 'none';
    document.getElementById('continue-button').style.display = 'block';
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('change-link').style.display = 'none';
});

document.getElementById('change-link-logged-in').addEventListener('click', function () {
    editOrder(); // Call the editOrder function

    // Call the changeSelectedAddressButton event listener
    document.getElementById('changeSelectedAddressButton').click();

    // The rest of your code for hiding and showing the specific sections
    document.getElementById('login-container').style.display = 'flex';
    document.getElementById('logged-in-info').style.display = 'none';
    document.getElementById('otp-section').style.display = 'none';
    document.getElementById('continue-button').style.display = 'block';
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('change-link').style.display = 'none';
    document.getElementById('email-mobile').value = '';
    document.getElementById('old-division-heading').style.display = 'flex';
    document.getElementById('savedIndicator').style.display = 'none';
    document.getElementById('savedAddresses').style.display = 'none';
    document.getElementById('address_division_heading').style.display = 'flex';
    document.getElementById('addressForm').style.display = 'none';
    document.getElementById('selectedAddress').style.display = 'none';
    document.getElementById('addAddressButton-container').style.display = 'none';

});



// address section
let addressCount = 0;
const maxAddresses = 5;

document.getElementById('saveButton').addEventListener('click', function (e) {
    e.preventDefault();
    if (addressCount >= maxAddresses) {
        alert('You can only add up to five addresses.');
        return;
    }

    let formData = {
        name: document.getElementById('Firstname').value.trim(),
        phone: document.getElementById('Phonenumber').value.trim(),
        address: document.getElementById('address').value.trim(),
        city: document.getElementById('city').value.trim(),
        state: document.getElementById('state').value.trim(),
        pincode: document.getElementById('pincode').value.trim(),
        alternatePhone: document.getElementById('alternatePhonenumber').value.trim(),
        landmark: document.getElementById('landmark').value.trim()
    };

    if (formData.name && formData.phone && formData.address && formData.city && formData.state && formData.pincode) {
        let savedAddressText = `<strong>${formData.name}</strong>, <br>PhoneNumber: ${formData.phone}<br>${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`;
        if (formData.landmark) {
            savedAddressText += `<br>Landmark: ${formData.landmark}`;
        }
        if (formData.alternatePhone) {
            savedAddressText += `<br>Alternate Phone: ${formData.alternatePhone}`;
        }
        let savedAddressHTML = `
            <div class="savedAddress">
                <input type="radio" name="savedAddress" value="${savedAddressText}" id="address${addressCount}" required>
                <label for="address${addressCount}">${savedAddressText}</label>
                <i class="fas fa-edit editAddressButton" data-index="${addressCount}"></i>
                <i class="fas fa-trash deleteAddressButton" data-index="${addressCount}"></i>
                <div id="deliveryButton${addressCount}" class="deliveryButton" style="display: none;">
                    <button class="deliveryhereButton btn" data-index="${addressCount}">Deliver Here</button>
                </div>
                <hr>
            </div>
        `;

        document.getElementById('savedAddressList').innerHTML += savedAddressHTML;
        addressCount++;

        // Reset form fields
        document.getElementById('Firstname').value = '';
        document.getElementById('Phonenumber').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('state').value = '';
        document.getElementById('pincode').value = '';
        document.getElementById('alternatePhonenumber').value = '';
        document.getElementById('landmark').value = '';

        document.getElementById('addressForm').style.display = 'none';
        document.getElementById('savedAddresses').style.display = 'block';
        document.getElementById('savedIndicator').style.display = 'inline';

        if (addressCount >= maxAddresses) {
            document.getElementById('addAddressButton').style.display = 'none';
            document.getElementById('addAddressButton-container').style.display = 'none';
        } else {
            document.getElementById('addAddressButton').style.display = 'block';
            document.getElementById('addAddressButton-container').style.display = 'block';
        }
    } else {
        alert('Please fill all required fields.');
    }
});

document.getElementById('addAddressButton').addEventListener('click', function () {
    if (addressCount < maxAddresses) {
        document.getElementById('savedAddresses').style.display = 'block';
        document.getElementById('addressForm').style.display = 'block';
        document.getElementById('addAddressButton').style.display = 'none';
        document.getElementById('addAddressButton-container').style.display = 'none';
    } else {
        alert('You can only add up to five addresses.');
    }
});

document.getElementById('cancelButton').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('addressForm').style.display = 'none';
    document.getElementById('savedAddresses').style.display = 'block';
    document.getElementById('addAddressButton').style.display = 'block';
});

document.getElementById('savedAddressList').addEventListener('click', function (e) {
    if (e.target && e.target.matches('.editAddressButton')) {
        let index = e.target.getAttribute('data-index');
        editAddress(index);
    }
    if (e.target && e.target.matches('.deleteAddressButton')) {
        let index = e.target.getAttribute('data-index');
        deleteAddress(index);
    }
    if (e.target && e.target.matches('input[type="radio"][name="savedAddress"]')) {
        handleAddressSelection(e.target);
    }
    if (e.target && e.target.matches('.deliveryButton button')) {
        let index = e.target.getAttribute('data-index');
        selectAddressForDelivery(index);
    }
});

function editAddress(index) {
    let savedAddress = document.querySelectorAll('.savedAddress')[index];
    let addressData = savedAddress.querySelector('label').innerHTML.split('<br>');

    document.getElementById('Firstname').value = addressData[0].split(', ')[0].replace('').replace('');
    document.getElementById('Phonenumber').value = addressData[0].split(', ')[1].replace('');
    let addressParts = addressData[1].split(', ');
    document.getElementById('address').value = addressParts[0];
    document.getElementById('city').value = addressParts[1];
    document.getElementById('state').value = addressParts[2];
    document.getElementById('pincode').value = addressParts[3];

    // Optional fields
    if (addressData.length > 2) {
        addressData.slice(2).forEach(part => {
            if (part.startsWith('Landmark: ')) {
                document.getElementById('landmark').value = part.replace('Landmark: ', '');
            }
            if (part.startsWith('Alternate Phone: ')) {
                document.getElementById('alternatePhonenumber').value = part.replace('Alternate Phone: ', '');
            }
        });
    }

    // Remove the address from saved addresses list
    savedAddress.parentNode.removeChild(savedAddress);

    // Decrease address count
    addressCount--;

    document.getElementById('addressForm').style.display = 'block';
    document.getElementById('savedAddresses').style.display = 'none';
    document.getElementById('addAddressButton').style.display = 'block';
    document.getElementById('savedIndicator').style.display = 'none';
}

function deleteAddress(index) {
    let savedAddress = document.querySelectorAll('.savedAddress')[index];
    savedAddress.parentNode.removeChild(savedAddress);

    // Decrease address count
    addressCount--;

    if (addressCount < maxAddresses) {
        document.getElementById('addAddressButton').style.display = 'block';
        document.getElementById('addAddressButton-container').style.display = 'block';
    }

    if (addressCount === 0) {
        document.getElementById('savedIndicator').style.display = 'none';
    }
}

function handleAddressSelection(selectedRadio) {
    let selectedAddress = selectedRadio.parentNode;
    let selectedIndex = selectedRadio.id.replace('address', ''); // Extract index from radio button id

    // Hide all delivery buttons
    document.querySelectorAll('.deliveryButton').forEach(button => {
        button.style.display = 'none';
    });

    // Show delivery button for selected address
    let deliveryButton = selectedAddress.querySelector(`#deliveryButton${selectedIndex}`);
    if (deliveryButton) {
        deliveryButton.style.display = 'block';
    }
}

function selectAddressForDelivery(index) {
    let selectedAddress = document.querySelectorAll('.savedAddress')[index];
    let selectedAddressText = selectedAddress.querySelector('label').innerHTML;

    document.getElementById('selectedAddressText').innerHTML = selectedAddressText;

    document.getElementById('address_division').style.display = 'none';
    document.getElementById('selectedAddress').style.display = 'flex';
    document.getElementById('addAddressButton').style.display = 'none';
    document.getElementById('addAddressButton-container').style.display = 'none';

    // Show the specific divisions
    document.getElementById('order-containers').style.display = 'block';
    document.getElementById('confirmation-mail-container').style.display = 'block';

    // Additional logic for small screens
    if (window.innerWidth <= 768) {
        document.getElementById('price_summary_division_container').style.display = 'block';
        document.getElementById('price_summary_divi').style.display = 'block';
        document.getElementById('price-details-inner').style.display = 'block';
    }
}


// Attach the event listener for the change button
document.getElementById('changeSelectedAddressButton').addEventListener('click', function () {
    document.getElementById('address_division').style.display = 'block';
    document.getElementById('addressForm').style.display = 'none';
    document.getElementById('addAddressButton').style.display = 'block';
    document.getElementById('addAddressButton-container').style.display = 'block';
    document.getElementById('selectedAddress').style.display = 'none';
    document.getElementById('order-containers').style.display = 'none';
    document.getElementById('confirmation-mail-container').style.display = 'none';
    document.getElementById('summary-division-heading').style.display = 'flex';

    if (document.getElementById('simplified-summary').style.display === 'flex') {
        document.getElementById('simplified-summary').style.display = 'none'; // Hide simplified-summary
        document.getElementById('order-summary').style.display = 'block'; // Show order-summary
    }

    document.getElementById('payment-options').style.display = 'none';
});


document.getElementById('savedAddressList').addEventListener('click', function (e) {
    if (e.target && e.target.matches('.deliveryButton button')) {
        let index = e.target.getAttribute('data-index');
        selectAddressForDelivery(index);
    }
});

// order summary

function increaseCount() {
    var countElement = document.getElementById('totalCount');
    var count = parseInt(countElement.textContent);
    countElement.textContent = count + 1;
}

function decreaseCount() {
    var countElement = document.getElementById('totalCount');
    var count = parseInt(countElement.textContent);
    if (count > 1) {
        countElement.textContent = count - 1;
    }
}

function removeProduct() {
    var countElement = document.getElementById('totalCount');
    countElement.textContent = 0;
}

function continueOrder() {
    document.getElementById('order-summary').style.display = 'none';
    document.getElementById('price_summary_division_container').style.display = 'none';
    document.getElementById('price_summary_divi').style.display = 'none';
    document.getElementById('price-details-inner').style.display = 'none';
    document.getElementById('confirmation-mail-container').style.display = 'none';
    document.getElementById('simplified-summary').style.display = 'flex';
    document.getElementById('payment-options').style.display = 'block';
}

function editOrder() {
    document.getElementById('simplified-summary').style.display = 'none';
    document.getElementById('order-summary').style.display = 'block';
    document.getElementById('confirmation-mail-container').style.display = 'block';
    document.getElementById('payment-options').style.display = 'none';
}

function decreaseCount() {
    let count = document.getElementById('totalCount').innerText;
    if (count > 1) {
        document.getElementById('totalCount').innerText = --count;
    }
}

function increaseCount() {
    let count = document.getElementById('totalCount').innerText;
    document.getElementById('totalCount').innerText = ++count;
}

function removeProduct() {
    // Functionality to remove the product
    alert("Product removed!");
}

// payment option
document.addEventListener('DOMContentLoaded', () => {
    const upiOption = document.getElementById('upi');
    const subOptions = document.querySelector('.sub-options');
    const paymentDetails = document.getElementById('paymentDetails');
    const creditCardRadio = document.getElementById('creditCardRadio');
    const netbankingRadio = document.getElementById('netbanking');
    const netbankingOptions = document.getElementById('netbankingOptions');
    const codRadio = document.getElementById('cod');
    const codOptions = document.getElementById('codOptions');
    const paymentOptions = document.querySelectorAll('input[name="payment"]');

    // Show/hide sub-options and payment details based on selected payment option
    function togglePaymentOptions() {
        subOptions.style.display = upiOption.checked ? 'block' : 'none';
        paymentDetails.style.display = creditCardRadio.checked ? 'block' : 'none';
        netbankingOptions.style.display = netbankingRadio.checked ? 'block' : 'none';
        codOptions.style.display = codRadio.checked ? 'block' : 'none';
    }

    // Initial toggle
    togglePaymentOptions();

    // Event listeners for payment options
    paymentOptions.forEach(option => {
        option.addEventListener('change', togglePaymentOptions);
    });
});

document.getElementById('phonepe').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('phonepe-continue').style.display = 'block';
        document.getElementById('upi-id-number').style.display = 'none';
        document.getElementById('upi-id-pay').style.display = 'none';
        document.getElementById('upi-id-number-verify').style.display = 'none';
    }
});

document.getElementById('upi-id').addEventListener('change', function () {
    if (this.checked) {
        document.getElementById('phonepe-continue').style.display = 'none';
        document.getElementById('upi-id-number').style.display = 'inline';
        document.getElementById('upi-id-number-verify').style.display = 'inline';
        document.getElementById('upi-id-pay').style.display = 'block';
    }
});
// Function to generate a random four-digit code
function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

// Function to display the generated code
function displayCode() {
    const code = generateCode();
    document.getElementById('verificationCode').innerText = code;
    document.getElementById('verificationCode').dataset.code = code;  // Store the code for validation
}

// Function to validate the user input
function validateCode() {
    const inputCode = document.getElementById('verificationInput').value;
    const generatedCode = document.getElementById('verificationCode').dataset.code;

    if (inputCode === generatedCode) {
        // Code is correct, proceed with order confirmation
        alert('Order confirmed!');
        // Perform order confirmation actions here
    } else {
        // Code is incorrect, show error message
        document.getElementById('error').style.display = 'block';
    }
}

// Call the displayCode function when the page loads or when the div is shown
window.onload = displayCode;


// pricesummarydivision

document.addEventListener('DOMContentLoaded', function () {
    const priceSummary = document.getElementById('price_summary_division');
    const footer = document.getElementById('footer');

    // Create an IntersectionObserver instance
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Footer is in view, move the price summary up
                priceSummary.style.bottom = `${entry.boundingClientRect.height + 20}px`; // 20px for padding/margin
            } else {
                // Footer is not in view, reset the price summary position
                priceSummary.style.bottom = '1rem';
            }
        });
    }, {
        root: null,
        threshold: 0
    });

    // Observe the footer
    observer.observe(footer);
});





// popup sction
document.getElementById('cvvInfoButton').addEventListener('click', function () {
    document.getElementById('cvvPopup').style.display = 'block';
});

document.getElementById('closePopupButton').addEventListener('click', function () {
    document.getElementById('cvvPopup').style.display = 'none';
});



// responsive

document.addEventListener('DOMContentLoaded', function () {
    const logincontainer = document.getElementById('login-division-container');
    const loginContainer = document.getElementById('login-container');
    const signinButton = document.getElementById('signin-button');
    const loggedininfo = document.getElementById('logged-in-info');
    const addressContainer = document.getElementById('address_division_container');
    const addressDivision = document.getElementById('address_division');
    const selectedAddress = document.getElementById('selectedAddress');
    const summaryContainer = document.getElementById('summary_division_container');
    const orderSummary = document.getElementById('order-summary');
    const continueOrder = document.getElementById('continueOrder');
    const paymentContainer = document.getElementById('payment_division_container');
    const paymentdivision = document.getElementById('payment_division');
    const pricesummarydivision = document.getElementById('price_summary_division');
    const pricesummarydivisioncontainer = document.getElementById('price_summary_division_container');

    // Function to handle the layout based on screen size
    function handleResponsiveLayout() {
        if (window.innerWidth <= 768) {
            // Mobile view adjustments
            document.body.style.flexDirection = 'column';
            addressContainer.style.display = 'none';
            addressDivision.style.display = 'none';
            summaryContainer.style.display = 'none';
            orderSummary.style.display = 'none';
            paymentContainer.style.display = 'none';
            paymentdivision.style.display = 'none';
            pricesummarydivision.style.display = 'none';
            pricesummarydivisioncontainer.style.display = 'none';

            // Event listener for login button click
            signinButton.addEventListener('click', showAddressContainer);

            continueOrder.addEventListener('click', showpaymentcontainer);

        } else {
            // Desktop view adjustments
            document.body.style.flexDirection = 'row';
            addressContainer.style.display = 'block';
            addressDivision.style.display = 'block';
            summaryContainer.style.display = 'block';
            orderSummary.style.display = 'block';
            paymentContainer.style.display = 'block';
            paymentdivision.style.display = 'block';
            pricesummarydivision.style.display = 'block';

            // Remove event listener for mobile button click
            signinButton.removeEventListener('click', showAddressContainer);

            continueOrder.removeEventListener('click', showpaymentcontainer);
        }
    }

    // Function to show the address container after login
    function showAddressContainer() {
        loginContainer.style.display = 'none';
        logincontainer.style.display = 'none';
        loggedininfo.style.display = 'none';
        addressContainer.style.display = 'block';
        addressDivision.style.display = 'block';

        // Show summary container and order summary
        if (window.innerWidth <= 768) {
            summaryContainer.style.display = 'block';
            orderSummary.style.display = 'block';
        }
    }

    function showpaymentcontainer() {
        loginContainer.style.display = 'none';
        logincontainer.style.display = 'none';
        loggedininfo.style.display = 'none';
        summaryContainer.style.display = 'none';
        orderSummary.style.display = 'none';
        addressContainer.style.display = 'none';
        addressDivision.style.display = 'none';
        selectedAddress.style.display = 'none';
        paymentContainer.style.display = 'block';
        paymentdivision.style.display = 'block';
    }

    // Run the function when the window is resized
    window.addEventListener('resize', handleResponsiveLayout);

    // Run the function on initial load
    handleResponsiveLayout();
});







