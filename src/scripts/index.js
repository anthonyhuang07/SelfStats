document.addEventListener('DOMContentLoaded', () => {
  const profileImg = document.querySelector('.profile img');
  const settingsButton = document.querySelector('.settingsButton');
  const infoButton = document.querySelector('.infoButton');
  const modal = document.getElementById('infoModal');
  const closeButton = document.querySelector('.closeButton');
  const username = document.getElementById('username');

  // Load saved image from localStorage
  const savedImgSrc = localStorage.getItem('profileImgSrc');
  if (savedImgSrc) {
    profileImg.src = savedImgSrc;
  }

  // Load saved username from localStorage
  const savedUsername = localStorage.getItem('username');
  if (savedUsername) {
    username.innerText = savedUsername;
  }

  profileImg.addEventListener('click', () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          profileImg.src = e.target.result;
          localStorage.setItem('profileImgSrc', e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  });

  infoButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });

  username.addEventListener('blur', () => {
    localStorage.setItem('username', username.innerText);
  });
});
