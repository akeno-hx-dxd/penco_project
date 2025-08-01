import React from 'react';
import Intro from '../components/Intro';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Contact from '../components/Contact';
import AddToCartDemo from '../components/AddToCartDemo';

const Home = () => {
  return (
    <main>
      <Intro />
      <Portfolio />
      <section id="shop" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop Demo</h2>
          <AddToCartDemo />
        </div>
      </section>
      <About />
      <Contact />
    </main>
  );
};

export default Home;