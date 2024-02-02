// Home.js
import React from 'react';
import Header from '../components/common/header';
import Footer from '../components/common/footer';

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section>
          <h1>Welcome to PaperKeep</h1>
          <p>This is the home page content. Feel free to customize it.</p>
        </section>
        <section>
          <h3>Test</h3>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;