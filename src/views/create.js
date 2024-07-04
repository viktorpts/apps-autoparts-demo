import { showView } from '../nav.js';
import { startDetails } from './details.js';

document.querySelector('#create form').addEventListener('submit', onCreate);

async function onCreate(event) {
    event.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        alert('Please login!');
        showView('login');
        return;
    }

    const formData = new FormData(event.target);
    const label = formData.get('label');
    const price = Number(formData.get('price'));
    const qty = Number(formData.get('qty'));
    const description = formData.get('description');

    if (!label || !description) {
        return alert('All fields are required');
    }
    if (price <= 0) {
        return alert('Price must be a positive number');
    }
    if (qty < 0) {
        return alert('Quantity cannot be negative');
    }

    const response = await fetch('http://localhost:3030/data/autoparts', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        },
        body: JSON.stringify({
            label,
            price,
            qty,
            description
        })
    });

    if (!response.ok) {
        const error = await response.json();
        return alert('Error creating part:\n' + error.message);
    }

    const result = await response.json();

    showView('details', startDetails, result._id);
}