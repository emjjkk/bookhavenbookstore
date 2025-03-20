$(document).ready(function () {
    // Initialize cart in sessionStorage if it doesn't exist
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    // Function to update the cart display in the modal
    function updateCartDisplay() {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        const cartItemsContainer = $('#cartItems');
        cartItemsContainer.empty(); // Clear the current cart display

        if (cart.length === 0) {
            cartItemsContainer.append('<p>Your cart is empty.</p>');
        } else {
            cart.forEach((item, index) => {
                cartItemsContainer.append(`
                    <div class="cart-item">
                        <p>${item.name}</p>
                        <button class="removeFromCartButton" data-index="${index}">Remove</button>
                    </div>
                `);
            });
        }
    }

    // Toggle mobile navigation
    $('#MobileNavBtn').click(function () {
        $('#MobileNav').slideToggle();
    });

    // Handle newsletter subscription
    $('#subscribeForm').on('submit', function (event) {
        event.preventDefault();
        alert('Thank you for subscribing.');
    });

    // Open the modal and display cart items
    $('#openModalBtn').on('click', function () {
        updateCartDisplay();
        $('#myModal').fadeIn();
    });

    // Close the modal
    $('.close').on('click', function () {
        $('#myModal').fadeOut();
    });

    // Close the modal when clicking outside
    $(window).on('click', function (event) {
        if ($(event.target).is('#myModal')) {
            $('#myModal').fadeOut();
        }
    });

    // Add item to cart
    $('.addToCartButton').on('click', function (event) {
        const itemName = $(this).siblings('p').text(); // Get the item name
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.push({ name: itemName }); // Add the item to the cart
        sessionStorage.setItem('cart', JSON.stringify(cart)); // Update sessionStorage
        alert('Item added to the cart.');
    });

    // Remove item from cart
    $(document).on('click', '.removeFromCartButton', function (event) {
        const index = $(this).data('index'); // Get the index of the item to remove
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        cart.splice(index, 1); // Remove the item from the cart
        sessionStorage.setItem('cart', JSON.stringify(cart)); // Update sessionStorage
        updateCartDisplay(); // Refresh the cart display
    });

    // Clear the cart
    $('#clearCartButton').on('click', function (event) {
        sessionStorage.setItem('cart', JSON.stringify([])); // Clear the cart
        updateCartDisplay(); // Refresh the cart display
        alert('Cart cleared.');
    });

    // Process the order
    $('#processOrderButton').on('click', function (event) {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        if (cart.length === 0) {
            alert('Your cart is empty.');
        } else {
            sessionStorage.setItem('cart', JSON.stringify([])); // Clear the cart
            updateCartDisplay(); // Refresh the cart display
            alert('Thank you for your order.');
        }
    });

    // Handle form submission
    $('#contactForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Retrieve form data
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();

        // Create an object to store the form data
        const formData = {
            name: name,
            email: email,
            message: message
        };

        // Save the form data to localStorage
        localStorage.setItem('contactFormData', JSON.stringify(formData));

        // Notify the user
        alert('Thank you for your message');

        // Optionally, clear the form fields
        $('#contactForm')[0].reset();
    });

    // Optional: Retrieve and display saved form data on page load
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData) {
        const formData = JSON.parse(savedFormData);
        $('#name').val(formData.name);
        $('#email').val(formData.email);
        $('#message').val(formData.message);
    }
});