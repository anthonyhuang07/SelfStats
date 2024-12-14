const onboarding = document.getElementById('onboarding');
const profilePreview = document.getElementById('profilePreview');
const nameInput = document.getElementById('nameInput');
const imageInput = document.getElementById('imageInput');

// Check if user data exists in localStorage
const storedName = localStorage.getItem('userName');
const storedImage = localStorage.getItem('userImage');

if (storedName || storedImage) {
    if (storedImage) {
        const img = document.createElement('img');
        img.src = storedImage;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.borderRadius = '50%';
        img.style.marginTop = '20px';
        document.body.appendChild(img);
    }
} else {
    onboarding.style.display = 'block';
}

// Make the profile preview circle trigger file input
profilePreview.addEventListener('click', () => {
    imageInput.click();
});

// Show image preview
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profilePreview.style.backgroundImage = `url('${reader.result}')`;
            profilePreview.textContent = '';
        };
        reader.readAsDataURL(file);
    }
});

// Save data on Enter
document.getElementById('enterButton').addEventListener('click', () => {
    const name = nameInput.value.trim() || 'User';
    const image = profilePreview.style.backgroundImage.replace('url("', '').replace('")', '') || '';

    localStorage.setItem('userName', name);
    if (image) {
        localStorage.setItem('userImage', image);
    }

    document.body.innerHTML = '<h1>Welcome, ' + name + '</h1>';
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.borderRadius = '50%';
        img.style.marginTop = '20px';
        document.body.appendChild(img);
    }
});

// Skip to default values
document.getElementById('skipButton').addEventListener('click', () => {
    localStorage.setItem('userName', 'User');
    document.body.innerHTML = '<h1>Welcome, User</h1>';
});