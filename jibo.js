AOS.init({ duration: 1000 });

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Booking Form Logic
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = date => date.toISOString().split('T')[0];
    
    const pickupDate = document.getElementById('pickup-date');
    const returnDate = document.getElementById('return-date');
    pickupDate.min = formatDate(today);
    pickupDate.value = formatDate(today);
    returnDate.min = formatDate(tomorrow);
    returnDate.value = formatDate(tomorrow);

    const pricing = {
        economy: 35,
        compact: 45,
        midsize: 55,
        suv: 75,
        luxury: 120
    };

    document.getElementById('calculate-btn').addEventListener('click', () => {
        const pickup = new Date(`${pickupDate.value}T${document.getElementById('pickup-time').value}`);
        const returnD = new Date(`${returnDate.value}T${document.getElementById('return-time').value}`);
        const carType = document.getElementById('car-type').value;
        
        if (!carType || pickup >= returnD) return;
        
        const diffDays = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
        const total = pricing[carType] * diffDays;
        document.getElementById('price-display').textContent = `$${total.toFixed(2)}`;
    });

    document.getElementById('booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Booking submitted successfully!');
    });
});