document.addEventListener('DOMContentLoaded', function() {
    // Dynamic greeting based on time of day
    const greetingElement = document.getElementById('greeting');
    const currentTime = new Date().getHours();
    if (currentTime < 12) {
        greetingElement.innerText = 'Good Morning! Thanks For Stopping By';
    } else if (currentTime < 18) {
        greetingElement.innerText = 'Good Afternoon! Thanks For Stopping By';
    } else {
        greetingElement.innerText = 'Good Evening! Thanks For Stopping By';
    }

    // Toggle additional projects
    const toggleButton = document.getElementById('toggleProjects');
    const additionalProjects = document.getElementById('additionalProjects');

    toggleButton.addEventListener('click', function() {
        if (additionalProjects.style.display === 'none') {
            additionalProjects.style.display = 'block';
            toggleButton.innerText = 'Show Less';
        } else {
            additionalProjects.style.display = 'none';
            toggleButton.innerText = 'Show More';
        }
    });
});
const portfolioData = [
    { categories: ['games', 'art', 'design'], link: 'https://obscurepolearmgaming.etsy.com', image: 'Images/OPGC2.png' },
    { categories: ['games', 'art', 'design'], link: 'https://www.drivethrurpg.com/product/404922/Crypt-of-the-First-Homunculus-A-Starter-Adventure?affiliate_id=1970305', image: 'Images/crypt2.png' },

    { categories: ['modeling','games'], link: 'https://makerworld.com/en/models/54505', image: 'Images/Gridfinity2.png' },
    { categories: ['modeling'], link: 'https://cad.onshape.com/documents/58b22b199228f892da6d672c/w/ce9a4923f57b817f1d652315/e/23e933926462cf9dfb9d2386?renderMode=0&uiState=6553ee3414d3b36435b8d069', 
    image: 'Images/3DModeling2.png' },
   
    { categories: ['entertainment'], link: 'https://youtube.com/playlist?list=PLI-cSaXx-4BKpWNtVe9NAHYSKIJ7e6xWQ&si=87fUbj2xWQN8XTji', image: 'Images/TrailerReel2.png' },
    { categories: ['entertainment'], link: 'https://www.linkedin.com/in/kevinmcsharry', image: 'Images/Linkedin2.png' },
    { categories: ['entertainment'], link: 'https://www.imdb.com/name/nm6343339/?ref_=fn_al_nm_1', image: 'Images/IMDB2.png' },
];

const portfolioContainer = document.querySelector('.portfolio');
const filterButtons = document.querySelectorAll('.filter-btn');


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const filteredItems = portfolioData.filter(item => item.categories.includes(category));
        displayPortfolioItems(filteredItems);
    });
});

function displayPortfolioItems(items) {
    portfolioContainer.innerHTML = items.map(item => `
        <a href="${item.link}" class="portfolio-item" target="_blank" style="background-image: url('${item.image}');">
           
        </a>
    `).join('');
}
displayPortfolioItems(portfolioData);
