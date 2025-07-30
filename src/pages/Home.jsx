import React from 'react';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <main>
      <Intro />
      <Portfolio />
      <About />
      <Contact />
    </main>
  );
};

export default Home;