import { showView } from './nav.js';
import { startCatalog } from './views/catalog.js';
import './views/login.js';
import './views/create.js';

const views = {
    'home-nav': ['home'],
    'catalog-nav': ['catalog', startCatalog],
    'catalog-link': ['catalog', startCatalog],
    'login-nav': ['login'],
    'login-link': ['login'],
    'register-nav': ['register'],
    'register-link': ['register'],
    'create-nav': ['create'],
};

for (let linkId in views) {
    document.getElementById(linkId).addEventListener('click', (event) => {
        event.preventDefault();

        const [sectionId, callback] = views[linkId];

        showView(sectionId, callback);
    });
}

// TODO Check for user sessiosn and update nav link visibility

showView('home');