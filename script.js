const notes = {
    'q': new Audio('./sounds/do.mp3'),
    'w': new Audio('./sounds/dox.mp3'),
    'e': new Audio('./sounds/re.mp3'),
    'r': new Audio('./sounds/rex.mp3'),
    't': new Audio('./sounds/mi.mp3'),
    'y': new Audio('./sounds/fa.mp3'),
    'u': new Audio('./sounds/fax.mp3'),
    'i': new Audio('./sounds/sol.mp3'),
    'o': new Audio('./sounds/solx.mp3'),
    'p': new Audio('./sounds/la.mp3'),
    '[': new Audio('./sounds/lax.mp3'),
    ']': new Audio('./sounds/si.mp3'),

    'a': new Audio('./sounds/do2.mp3'),
    's': new Audio('./sounds/do2x.mp3'),
    'd': new Audio('./sounds/re2.mp3'),
    'f': new Audio('./sounds/re2x.mp3'),
    'g': new Audio('./sounds/mi2.mp3'),
    'h': new Audio('./sounds/fa2.mp3'),
    'j': new Audio('./sounds/fa2x.mp3'),
    'k': new Audio('./sounds/sol2.mp3'),
    'l': new Audio('./sounds/sol2x.mp3'),
    ';': new Audio('./sounds/la2.mp3'),
    'z': new Audio('./sounds/la2x.mp3'),
    'x': new Audio('./sounds/si2.mp3'),

    '1': new Audio('./sounds/do3.mp3'),
    '2': new Audio('./sounds/do3x.mp3'),
    '3': new Audio('./sounds/re3.mp3'),
    '4': new Audio('./sounds/re3x.mp3'),
    '5': new Audio('./sounds/mi3.mp3'),
    '6': new Audio('./sounds/fa3.mp3'),
    '7': new Audio('./sounds/fa3x.mp3'),
    '8': new Audio('./sounds/sol3.mp3'),
    '9': new Audio('./sounds/sol3x.mp3'),
    '0': new Audio('./sounds/la3.mp3'),
    '-': new Audio('./sounds/la3x.mp3'),
    '=': new Audio('./sounds/si3.mp3'),
};

let isRecording = false;
let recordedNotes = [];
let volume = 1.0;
let startTime;

// Volume kontrolü
const volumeHandle = document.querySelector('.volume-handle');
const volumeBar = document.querySelector('.volume-container');

if (volumeBar) {
    volumeBar.addEventListener('click', function(e) {
        const rect = volumeBar.getBoundingClientRect();
        const position = (e.clientY - rect.top) / rect.height;
        volume = 1 - position;
        volumeHandle.style.top = `${position * 100}%`;
        updateVolume();
    });
}

function updateVolume() {
    Object.values(notes).forEach(audio => {
        audio.volume = volume;
    });
}

// Kayıt fonksiyonları
const recordButton = document.querySelector('.memory');
if (recordButton) {
    recordButton.addEventListener('click', toggleRecording);
}

function toggleRecording() {
    isRecording = !isRecording;
    if (isRecording) {
        recordButton.classList.add('active');
        recordedNotes = [];
        startTime = Date.now();
    } else {
        recordButton.classList.remove('active');
    }
}

function playRecording() {
    if (recordedNotes.length === 0) return;
    
    recordedNotes.forEach(note => {
        setTimeout(() => {
            playNote(note.key);
        }, note.timing);
    });
}

const demoButton = document.querySelector('.demo');
if (demoButton) {
    demoButton.addEventListener('click', playRecording);
}

function playNote(key) {
    const note = document.getElementById(key);
    if (note && notes[key]) {
        note.classList.add('active');
        notes[key].currentTime = 0;
        notes[key].play();
    }
}

// Klavye kontrolü
document.addEventListener('keydown', function(event) {
    if (event.repeat) return;
    const key = event.key.toLowerCase();
    playNote(key);
});

document.addEventListener('keyup', function(event) {
    const key = event.key.toLowerCase();
    const note = document.getElementById(key);
    if (note) {
        note.classList.remove('active');
    }
});

// Fare tıklama kontrolü
document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('mousedown', function() {
        const keyId = this.id;
        playNote(keyId);
    });
    
    key.addEventListener('mouseup', function() {
        this.classList.remove('active');
    });
    
    // Dokunmatik ekran desteği
    key.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const keyId = this.id;
        playNote(keyId);
    });
    
    key.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.classList.remove('active');
    });
});