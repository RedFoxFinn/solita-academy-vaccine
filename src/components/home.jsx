import React from 'react';

import inforeader from '../tools/inforeader';

const Home = ({id}) => {
  const texts = inforeader.home();
  return <section id={id} data-testid={id}>
    <section>
      <p>{texts ? texts.intro : 'intro'}</p>
    </section>
    <section>
      <p>{texts ? texts.disclaimer : 'disclaimer'}</p>
    </section>
    <section style={{display: 'inline-flex'}}>
      <p>Assignment given by:</p>
      {texts
        ? <a href={texts.assignment.by.url}>{texts.assignment.by.author}</a>
        : <p>author</p>}
    </section>
    <section>
      <p>{texts ? texts.assignment.purpose : 'assignment purpose'}</p>
    </section>
  </section>;
};

export default Home;