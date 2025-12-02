// Card link handlers
console.log('Card links script loaded!');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for cards...');
    // Get all clickable home cards
    const cards = document.querySelectorAll('.home-card[style*="cursor: pointer"]');

    cards.forEach(card => {
        const title = card.querySelector('.home-card-title').textContent;

        // Determine which link to open based on card title
        let url = '';
        let target = '_blank';

        if (title.includes('Client-Server Game')) {
            url = 'https://github.com/KFry101/CS3341-server-client-game';
        } else if (title.includes('Dungeon Tiles')) {
            url = 'https://github.com/KFry101/Dungeon_Tiles';
        } else if (title.includes('EZPPTX')) {
            url = 'https://devpost.com/software/ezpptx';
        } else if (title.includes('Social Stressors')) {
            url = '/artwork/1';
            target = '_self';
        }

        // Add click event listener
        if (url) {
            card.addEventListener('click', function(event) {
                event.stopPropagation();
                window.open(url, target);
            });
        }
    });
});