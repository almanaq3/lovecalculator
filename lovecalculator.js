document.addEventListener('DOMContentLoaded', () => {
    const calculateButton   = document.querySelector('.btn_calculate');
    const progressBar       = document.getElementById('progress-bar');
    const progressContainer = document.getElementById('progress-container');
    const heartsContainer   = document.getElementById('hearts-container');
    const romanticMusic     = document.getElementById('romantic-music');
    const faces             = document.querySelectorAll('.face');

    const HeartTime = 30000;
    const AnimTime  = 2000;

    const romanticSongs = [
        './Musicas/Musica1.mp3',
        './Musicas/Musica2.mp3',
        './Musicas/Musica3.mp3',
    ];

    const reactions = [
        { emoji: '😭', word: 'Nunca', min: 0, max: 19 },
        { emoji: '😟', word: 'Talvez', min: 20, max: 39 },
        { emoji: '🫤', word: 'Será?', min: 40, max: 59 },
        { emoji: '😄', word: 'Bom', min: 60, max: 69 },
        { emoji: '🥰', word: 'Perfeito!', min: 70, max: 79 },
        { emoji: '😍', word: 'Amor Verdadeiro', min: 80, max: 89 },
        { emoji: '🤯', word: '100%', min: 90, max: 100 },
    ];

    function createHearts() {
        heartsContainer.innerHTML = '';
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${2 + Math.random() * 3}s`;
            heartsContainer.appendChild(heart);
        }
        setTimeout(() => {
            heartsContainer.innerHTML = '';
        }, HeartTime);
    }

    function animateProgressBar(percentage) {
        let start = 0;
        const interval = setInterval(() => {
            if (start <= percentage) {
                progressBar.style.width = `${start}%`;
                progressBar.style.backgroundColor = `hsl(${(start / 100) * 120}, 100%, 50%)`;
                start++;
            } else {
                clearInterval(interval);
                progressBar.style.backgroundColor = 'white';
            }
        }, 10);
    }

    function resetSystem() {
        romanticMusic.pause();
        romanticMusic.src = '';
        progressBar.style.width = '0%';
        heartsContainer.classList.add('hidden');
    }

    calculateButton.addEventListener('click', (event) => {
        event.preventDefault();
        resetSystem();

        const person1 = document.querySelector('input[name="person1"]').value.trim();
        const person2 = document.querySelector('input[name="person2"]').value.trim();

        if (!person1 || !person2) {
            alert('Por favor, preencha os dois nomes.');
            return;
        }

        progressContainer.classList.remove('hidden');
        setTimeout(() => {
            const probability = Math.floor(Math.random() * 101);
            progressContainer.classList.add('hidden');

            const reaction = reactions.find(r => probability >= r.min && probability <= r.max);
            faces.forEach((face) => {
                face.querySelector('.reaction').innerText = reaction.emoji;
                face.querySelector('.percentage').innerText = `${probability}% - ${reaction.word}`;
            });

            if (probability >= 70) {
                romanticMusic.src = romanticSongs[Math.floor(Math.random() * romanticSongs.length)];
                romanticMusic.play();
                heartsContainer.classList.remove('hidden');
                createHearts();
            }

            animateProgressBar(probability);
        }, AnimTime);
    });
});
