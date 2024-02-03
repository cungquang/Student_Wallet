import React from 'react';
import './App.css';
import Footer from './components/footer';
import Header from './components/header';

const App:React.FC = () => {
  return (
    <div className="App">
      <Header/>
        Main thing
      <Footer/>
    </div>
  );
}

export default App;
