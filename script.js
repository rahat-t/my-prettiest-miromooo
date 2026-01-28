// Updated JS: Changed to height: auto for full album expansion, no overlap.

document.addEventListener('DOMContentLoaded', () => {
    // Date: Dynamic, accessible
    const dateEl = document.getElementById('date');
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    dateEl.setAttribute('datetime', today.toISOString().split('T')[0]);

    // Album toggle: Accessible expand/collapse with height auto
    const toggleBtn = document.getElementById('album-toggle');
    const album = document.getElementById('photo-album');
    toggleBtn.addEventListener('click', () => {
        const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        toggleBtn.setAttribute('aria-expanded', !expanded);
        album.setAttribute('aria-hidden', expanded);
        album.style.height = expanded ? '0' : 'auto'; // Use height auto for full expansion
        toggleBtn.textContent = expanded ? 'tap me pls? 🥹' : 'tap me pls? 🥹';
    });

    // Game: Cute Animal Collector
    const gameContent = document.getElementById('game-content');
    const animalsContainer = document.getElementById('animals-container');
    const meterFill = document.getElementById('meter-fill');
    const pointsText = document.getElementById('points-text');
    const envelopeReward = document.getElementById('envelope-reward');
    const envelopeClosed = document.getElementById('envelope-closed');
    const meter = document.querySelector('.love-meter');
    let points = 0;
    const maxPoints = 10;
    const animals = ['🐻‍❄️', '🦙', '🐇', '🐨', '🐑']; // Cute animals

    function createAnimals() {
        for (let i = 0; i < 5; i++) {
            const animal = document.createElement('div');
            animal.className = 'animal';
            animal.textContent = animals[Math.floor(Math.random() * animals.length)];
            animal.style.left = Math.random() * 80 + '%';
            animal.style.animationDelay = Math.random() * 2 + 's';
            animal.addEventListener('click', () => {
                if (points < maxPoints) {
                    points++;
                    updateMeter();
                    animal.remove();
                    if (points < maxPoints) createAnimals();
                }
            });
            animalsContainer.appendChild(animal);
        }
    }

    function updateMeter() {
        const percent = (points / maxPoints) * 100;
        meterFill.style.width = percent + '%';
        pointsText.textContent = `Animals: ${points}`;
        meter.setAttribute('aria-valuenow', points);
        if (points >= maxPoints) {
            gameContent.style.display = 'none'; // Game vanishes
            envelopeReward.style.display = 'flex'; // Envelope appears centered
        }
    }

    envelopeClosed.addEventListener('click', () => {
        window.open('letter.html', '_blank'); // Opens letter in new page
    });

    createAnimals();

    // Sound: User-initiated only, no autoplay
    const muteBtn = document.getElementById('mute-btn');
    const sound = document.getElementById('click-sound');
    let muted = false;
    muteBtn.addEventListener('click', () => {
        muted = !muted;
        sound.muted = muted;
        muteBtn.textContent = muted ? '💔' : '❤️';
        muteBtn.setAttribute('aria-label', muted ? 'Unmute sound' : 'Mute sound');
    });

    // Photos: Sound on click, right-click disabled
    document.querySelectorAll('.photo').forEach(photo => {
        photo.addEventListener('click', () => {
            if (!muted) {
                sound.currentTime = 0;
                sound.play().catch(() => {}); // Handle play errors gracefully
            }
        });
        photo.addEventListener('contextmenu', e => e.preventDefault());
    });
});