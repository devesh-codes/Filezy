import React from 'react';
import FileUploader from './components/FileUploader';
import FaqAccordion from './components/Accordian';

function App() {
  return (
    <div className="App" style={{
      // backgroundColor: '',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      paddingTop: '40px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '30px',
        color: '#fff'
      }}>
     Send files online, for free
      </h1>
      <FileUploader />
      <FaqAccordion/>
    </div>
  );
}

export default App;
