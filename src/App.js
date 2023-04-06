import logo from './logo.svg';
import './App.css';

import React from "react";
const owl = {
  title: 'Excellent Owl',
  src: 'https://content.codecademy.com/courses/React/react_photo-owl.jpg'
};

class Rishav extends React.Component {
  render() {
    return (
      <div>
        <blockquote>
          <p>What is important now is to recover our senses.</p>
          <cite>
            <a
              target="_blank"
              href="https://en.wikipedia.org/wiki/Susan_Sontag"
            >
              Susan Sontag
            </a>
          </cite>
        </blockquote>
      </div>
    );
  }
}

class Owl extends React.Component {
  render() {
    return (
      <div>
        <h1>{owl.title}</h1>
        <img 
          src={owl.src}
          alt={owl.title}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <Rishav/>
        <Owl/>
    </div>
  );
}

export default App;
