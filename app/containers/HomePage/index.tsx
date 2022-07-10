import React from 'react';
import { Helmet } from 'react-helmet-async';
import ApplicationDemo from '../DesignPatterns/StateMode';

export default function HomePage() {
  ApplicationDemo();

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="设计模式学习" />
      </Helmet>
      <div>
        <h1>设计模式学习</h1>
      </div>
    </article>
  );
}
