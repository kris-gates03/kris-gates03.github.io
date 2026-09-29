// 1. Select all the buttons and all the cards
const buttons = document.querySelectorAll('.filter-buttons button');
const cards = document.querySelectorAll('.card');

// 2. Add a click event to every button
buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        // Remove the 'active' class from all buttons, then add it to the clicked one
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Find out which category was clicked
        const filterValue = button.getAttribute('data-filter');

        // Loop through all the cards to show or hide them
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === cardCategory) {
                // Show the card
                card.classList.remove('hidden');
                // Remove absolute positioning so it goes back into the grid
                setTimeout(() => card.style.position = 'relative', 0); 
            } else {
                // Hide the card
                card.classList.add('hidden');
                // Wait for the fade out animation before snapping it out of the grid
                setTimeout(() => card.style.position = 'absolute', 400);
            }
        });
    });
});

// 1. Point to the container where the HTML will go
const container = document.getElementById('project-container');

// 2. Fetch the data from the JSON file (this happens in the background)
fetch('data.json')
    .then(response => response.json()) // Convert the response to usable data
    .then(projects => {
        
        // 3. Loop through each project in the JSON file
        projects.forEach(project => {
            
            // Create a new div element for the card
            const card = document.createElement('div');
            card.className = 'card';
            
            // Insert the HTML structure, injecting the JSON data dynamically
            card.innerHTML = `
                <h2>${project.title}</h2>
                <span class="badge">${project.category}</span>
                <p>${project.description}</p>
            `;
            
            // Append the finished card to the container on the webpage
            container.appendChild(card);
        });
        
    })
    .catch(error => console.error('Error loading the projects:', error));