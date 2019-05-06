const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function HelloWorld(props) {
  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <h1>Bonjour Monde!</h1>
        <p>C'est ma huitième page!</p>

	<h2>Coucou</h2>
      </Container>
    </div>
  );
}

module.exports = HelloWorld;
