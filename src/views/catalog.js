import { showView } from '../nav.js';
import { startDetails } from './details.js';

export function startCatalog() {
    const list = document.getElementById('parts');
    list.innerHTML = 'Loading &hellip;';

    loadParts();
}

async function loadParts() {
    const response = await fetch('http://localhost:3030/data/autoparts');

    if (!response.ok) {
        return alert('Error loading catalog');
    }

    const parts = await response.json();

    showParts(parts);
}

function showParts(parts) {
    const elements = parts.map(createPartPreview);

    const list = document.getElementById('parts');

    list.replaceChildren(...elements);
}

function createPartPreview(partData) {
    const element = document.createElement('li');

    element.innerHTML = `<a id=${partData._id} href="/catalog/${partData._id}">${partData.label} - $${partData.price}</a>`;

    element.querySelector('a').addEventListener('click', (event) => {
        event.preventDefault();
        showView('details', startDetails, partData._id);
    });

    return element;
}