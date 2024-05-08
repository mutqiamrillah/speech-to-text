import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack';
import './App.css';

function App() {

  const [textResult, setTextResult] = useState('');
  const [isSpeak, setSpeak] = useState(false);

  if (!window.SpeechRecognition) {
    if (!window.webkitSpeechRecognition) {
      return (
        ContentNotSupport()
      )
    }

    window.SpeechRecognition = window.webkitSpeechRecognition;
  }

  const recognition = new window.SpeechRecognition()

  recognition.continuous = true;
  recognition.lang = 'id';
  recognition.interimResults = true;

  recognition.onstart = () => {
    console.log('start...');
  }

  recognition.onend = () => {
    console.log('end...');
    setSpeak(false);
  }

  recognition.onError = () => {
    console.log('error');
  }

  const clickStart = () => {
    recognition.start();
    setSpeak(true);
  }

  const clickStop = () => {
    recognition.stop();
    setSpeak(false);
  }

  recognition.onresult = function (event) {
    let text = '';
    for (let i = 0; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    setTextResult(text)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img src="/images/logo/logo-comed.png" alt="logo comed"></img>
          <span>
            COMED - Communication Electronics for the Deaf <br />Pengadilan Agama Gresik
          </span>
          <img src="/images/logo/logo-pengadilan.png" alt="logo pengadilan"></img>
        </Box>
      </header>
      <div className="App-content">
        <h6><b>Aplikasi Comed</b> merupakan sarana komunikasi sidang antara Majelis Hakim dengan pihak penyandang tuna rungu/tuli yang berfungsi untuk mengubah suara menjadi teks.</h6>
        <h6>Cara penggunaan bisa diakses melalui 
          <strong>
            <a style={{ textDecoration: 'none', lineHeight: '0' }} target="_blank" rel="noopener noreferrer" href='https://drive.google.com/file/d/1C-ngcljvhAvJaWw6ti2r0YQolIX9WnZH/view?usp=sharing'> link berikut</a>
          </strong>.
        </h6>
        <p>Klik <span style={{ color: '#2e7d32' }}>START</span> untuk memulai</p>

        <div className="App-btn-control">
          <Stack spacing={1} direction="row">
            <Button variant="contained" color="success" onClick={() => clickStart()} disabled={isSpeak}>START</Button>
            <Button variant="contained" color="error" onClick={() => clickStop()} disabled={!isSpeak}>STOP</Button>
          </Stack>
        </div>

        <Alert icon={false}
          action={
            <Button onClick={() => setTextResult('')} variant="outlined" color="error" size="medium">
              RESET
            </Button>
          }
        >
          {textResult}
        </Alert>
      </div>
    </div >
  );
}


function ContentNotSupport() {
  const [isNotSupport, setIsNotSupport] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img src="/images/logo/logo-comed.png" alt="logo comed"></img>
          <span>
            COMED - Communication Electronics for the Deaf <br />Pengadilan Agama Gresik
          </span>
          <img src="/images/logo/logo-pengadilan.png" alt="logo pengadilan"></img>
        </Box>
      </header>
      <div className="App-content">
        <h6>Aplikasi Comed merupakan sarana komunikasi sidang antara Majelis Hakim dengan pihak penyandang tuna rungu/tuli yang berfungsi untuk mengubah suara menjadi teks.</h6>
        <p>Klik <span style={{ color: '#2e7d32' }}>START</span> untuk memulai</p>
        {isNotSupport &&
          <span>*Your browser does not support, please change to another browser.</span>
        }

        <div className="App-btn-control">
          <Stack spacing={1} direction="row">
            <Button variant="contained" color="success" onClick={() => setIsNotSupport(true)}>START</Button>
            <Button variant="contained" color="error" disabled={true}>STOP</Button>
          </Stack>
        </div>

        <Alert icon={false}
          action={
            <Button variant="outlined" color="error" size="medium">
              RESET
            </Button>
          }
        >
        </Alert>
      </div>
    </div >
  )

}

export default App;
