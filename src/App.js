import './App.css';
import { Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { React, useState } from 'react';
// import $ from 'jquery';

function App() {
  const [inputState, setInputState] = useState({ players: 32, rounds: 5, topCut: 8 });
  const { players, rounds, topCut } = inputState;

  function handleFormChange(event) {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  }

  return (
    <Container className="mt-2">
      <Row className="mx-auto text-center">
        <Col className="col-4 bg-primary text-light">
          <FormGroup className="mb-4">
            <Label for="players" className="h2">Players</Label>
            <Input name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto" onChange={handleFormChange} />
          </FormGroup>
          <FormGroup className="mb-4">
            <Label for="rounds" className="h2">Rounds</Label>
            <Input name="rounds" type="number" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto" onChange={handleFormChange} />
          </FormGroup>
          <FormGroup className="mb-2">
            <Label for="topCut" className="h2">Top Cut</Label>
            <Input name="topCut" type="number" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto" onChange={handleFormChange} />
          </FormGroup>
        </Col>
        <Col className="col-8">
          <p className="h2">Fart</p>
          <span>Players: {players}<br /></span>
          <span>Rounds: {rounds}<br /></span>
          <span>Top Cut: {topCut}<br /></span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
