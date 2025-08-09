// ========== IMPORTS ========== //
import { fetchRecipes, filterRecipes } from './recipes.js';

// ========== MOBILE FUNCTIONALITY ========== //
// Hamburger Menu Toggle
const initMobileMenu = () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.setAttribute(
                'aria-expanded',
                menuToggle.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });

        // Close menu when clicking links (mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
};

// ========== API INTEGRATION ========== //
// Load Featured Recipes (Homepage)
const loadFeaturedRecipes = async () => {
    const featuredSection = document.getElementById('featured-recipes');
    if (!featuredSection) return;

    try {
        const recipes = await fetchRecipes({ number: 3 });
        featuredSection.innerHTML = recipes.map(recipe => `
      <div class="recipe-card" data-id="${recipe.id}">
        <img src="${recipe.image}" alt="${recipe.title}" loading="lazy">
        <div class="recipe-info">
          <h3>${recipe.title}</h3>
          <div class="recipe-meta">
            <span>${recipe.diets?.join(', ') || 'N/A'}</span>
            <span>${recipe.readyInMinutes} mins</span>
          </div>
        </div>
      </div>
    `).join('');

        // Add click handlers to new cards
        initRecipeModals();
    } catch (error) {
        console.error('Failed to load featured recipes:', error);
    }
};

// ========== MODAL FUNCTIONALITY ========== //
// Initialize Recipe Modals
const initRecipeModals = () => {
    const modal = document.getElementById('recipe-modal');
    if (!modal) return;

    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', async () => {
            try {
                showLoading(true);
                const recipeId = card.dataset.id;
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=YOUR_API_KEY`
                );
                const data = await response.json();

                document.getElementById('modal-content').innerHTML = `
          <h2>${data.title}</h2>
          <img src="${data.image}" alt="${data.title}">
          <div class="recipe-details">
            <p><strong>Servings:</strong> ${data.servings}</p>
            <p><strong>Time:</strong> ${data.readyInMinutes} mins</p>
            <h3>Ingredients</h3>
            <ul>${data.extendedIngredients.map(i => `
              <li>${i.original}</li>
            `).join('')}</ul>
            <h3>Instructions</h3>
            <div>${data.instructions || 'No instructions provided.'}</div>
          </div>
        `;
                modal.showModal();
            } catch (error) {
                console.error('Failed to load recipe details:', error);
                showError('Could not load recipe details');
            } finally {
                showLoading(false);
            }
        });
    });

    // Close modal
    document.querySelector('.close-modal')?.addEventListener('click', () => {
        modal.close();
    });
};

// ========== UTILITIES ========== //
const showLoading = (show) => {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = show ? 'block' : 'none';
};

const showError = (message) => {
    const errorEl = document.getElementById('error-message');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        setTimeout(() => errorEl.style.display = 'none', 3000);
    }
};

// ========== INITIALIZE ========== //
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    loadFeaturedRecipes();
    initRecipeModals();
});