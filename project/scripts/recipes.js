// API URL - Using TheMealDB (free API)
const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

// DOM Elements
const recipeGrid = document.getElementById('recipe-grid');
const filtersForm = document.getElementById('recipe-filters');
const modal = document.getElementById('recipe-modal');
const modalContent = document.getElementById('modal-content');

// Fetch recipes from API
async function fetchRecipes(filters = {}) {
    try {
        showLoading(true);

        // In a real implementation, you would filter by diet/vegan/keto
        // Since TheMealDB doesn't support these filters directly,
        // we'll fetch all and filter client-side
        const response = await fetch(`${API_URL}filter.php?c=${filters.cuisine || ''}`);
        const data = await response.json();

        // Store in localStorage for offline use
        localStorage.setItem('cachedRecipes', JSON.stringify(data.meals || []));

        return data.meals || [];
    } catch (error) {
        console.error('Error fetching recipes:', error);
        showError('Failed to load recipes. Using cached data.');

        // Fallback to cached recipes
        const cached = localStorage.getItem('cachedRecipes');
        return cached ? JSON.parse(cached) : [];
    } finally {
        showLoading(false);
    }
}

// Display recipes in grid
function displayRecipes(recipes) {
    recipeGrid.innerHTML = recipes.slice(0, 15).map(recipe => `
        <div class="recipe-card" data-id="${recipe.idMeal}">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
            <div class="recipe-info">
                <h3>${recipe.strMeal}</h3>
                <div class="recipe-meta">
                    <span>${recipe.strCategory || 'Unknown'}</span>
                    <span>${recipe.strArea || 'Unknown'}</span>
                </div>
            </div>
        </div>
    `).join('');

    // Add click event to each card
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => openRecipeModal(card.dataset.id));
    });
}

// Open modal with recipe details
async function openRecipeModal(recipeId) {
    try {
        showLoading(true);
        const response = await fetch(`${API_URL}lookup.php?i=${recipeId}`);
        const data = await response.json();
        const recipe = data.meals[0];

        // Format ingredients list
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            if (recipe[`strIngredient${i}`]) {
                ingredients.push(`
                    <li>
                        ${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}
                    </li>
                `);
            }
        }

        modalContent.innerHTML = `
            <h2>${recipe.strMeal}</h2>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
            <div class="recipe-details">
                <p><strong>Category:</strong> ${recipe.strCategory}</p>
                <p><strong>Cuisine:</strong> ${recipe.strArea}</p>
                
                <h3>Ingredients</h3>
                <ul>${ingredients.join('')}</ul>
                
                <h3>Instructions</h3>
                <div>${recipe.strInstructions.replace(/\r\n/g, '<br>')}</div>
            </div>
        `;

        modal.showModal();
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        showError('Failed to load recipe details.');
    } finally {
        showLoading(false);
    }
}

// Handle filter form submission
filtersForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(filtersForm);
    const filters = {
        diet: formData.get('diet'),
        cuisine: formData.get('cuisine')
    };

    const recipes = await fetchRecipes(filters);
    displayRecipes(recipes);
});

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    modal.close();
});

// Utility functions
function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    spinner.hidden = !show;
}

function showError(message) {
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    document.body.appendChild(errorEl);
    setTimeout(() => errorEl.remove(), 3000);
}

// Initialize page
(async function init() {
    const recipes = await fetchRecipes();
    displayRecipes(recipes);
})();