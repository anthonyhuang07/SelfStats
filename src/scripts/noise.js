document.addEventListener('DOMContentLoaded', async () => {
  const decibelMeter = document.getElementById('decibelMeter');
  const noiseStatus = document.getElementById('noiseStatus');
  const ticks = document.querySelectorAll('.tick');
  const tickLabels = document.querySelectorAll('.tickLabel');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    let lastUpdateTime = 0;

    scriptProcessor.onaudioprocess = () => {
      const array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      const values = array.reduce((a, b) => a + b, 0);
      const average = values / array.length;
      const decibels = Math.round(average);

      // Update ticks continuously
      let isLoud = false;
      ticks.forEach((tick, index) => {
        const tickValue = 30 + index * 5;
        if (decibels >= tickValue) {
          tick.style.backgroundColor = decibels >= 80 ? '#FFD202' : '#00E063';
          if (decibels >= 80) isLoud = true;
        } else {
          tick.style.backgroundColor = decibels >= 80 ? '#74610D' : '#11743E';
        }
      });

      // Change noise status and background color based on tick levels
      if (isLoud) {
        noiseStatus.innerText = 'Loud';
        noiseStatus.style.color = '#FFD202';
        document.body.style.background = 'linear-gradient(to bottom, #745F01, #251F00)';
        tickLabels.forEach(label => label.style.color = '#b89a14');
      } else {
        noiseStatus.innerText = 'OK';
        noiseStatus.style.color = '#00E063';
        document.body.style.background = 'linear-gradient(to bottom, #036730, #00210F)';
        tickLabels.forEach(label => label.style.color = '#1bb15e');
      }

      // Update dB number every second
      const currentTime = Date.now();
      if (currentTime - lastUpdateTime >= 1000) {
        lastUpdateTime = currentTime;
        decibelMeter.innerHTML = `${decibels}<span id="decibels">dB</span>`;
      }
    };
  } catch (err) {
    console.error('Error accessing microphone:', err);
  }
});
