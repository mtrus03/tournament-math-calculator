import './App.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
// import $ from 'jquery';

function App() {
  const [inputState, setInputState] = useState({ players: 32, rounds: 5, topCut: 8 });
  const [customFields, setCustomFields] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const { players, rounds, topCut } = inputState;

  function handleInput(event) {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  }

  function toggleCustomFields() {
    setCustomFields(!customFields);
  }

  useEffect(() => {
    if (!customFields) {
      if (players <= 4 && customFields) { setInputState({ players, rounds: 0, topCut: players }) } else
        if (players <= 8) { setInputState({ players, rounds: 0, topCut: players }) } else
          if (players <= 16) { setInputState({ players, rounds: 5, topCut: 4 }) } else
            if (players <= 32) { setInputState({ players, rounds: 5, topCut: 8 }) } else
              if (players <= 64) { setInputState({ players, rounds: 6, topCut: 8 }) } else
                if (players <= 128) { setInputState({ players, rounds: 7, topCut: 8 }) } else
                  if (players <= 226) { setInputState({ players, rounds: 8, topCut: 8 }) } else
                    if (players <= 409) { setInputState({ players, rounds: 9, topCut: 8 }) } else
                      if (players >= 410) { setInputState({ players, rounds: 10, topCut: 8 }) }
    }
  }, [players, customFields])

  useEffect(() => {
    setCurrentRound(rounds - 1);
  }, [rounds])

  function inputFields() {
    if (customFields) return (
      <Col className="col-4 bg-primary text-light">
        <Form.Group className="mb-4">
          <Form.Label for="players" className="h2">Players</Form.Label>
          <Form.Control name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label for="rounds" className="h2">Rounds</Form.Label>
          <Form.Control name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label for="topCut" className="h2">Top Cut</Form.Label>
          <Form.Control name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Button className="btn btn-warning mb-4" onClick={toggleCustomFields}>Disable Custom Rounds/Top Cut</Button>
      </Col>
    )
    return (
      <Col className="col-4 bg-primary text-light">
        <Form.Group className="mb-4">
          <Form.Label for="players" className="h2">Players</Form.Label>
          <Form.Control name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label for="rounds" className="h2">Rounds</Form.Label>
          <Form.Control name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label for="topCut" className="h2">Top Cut</Form.Label>
          <Form.Control name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </Form.Group>
        <Button className="btn btn-warning mb-4" onClick={toggleCustomFields}>Enable Custom Rounds/Top Cut</Button>
      </Col>
    )
  }

  return (
    <Container className="mt-2">
      <Row className="mx-auto text-center">
        {inputFields()}
        <Col className="col-8">
          <p className="h2">
            <Button variant="outline-dark" className="p-1 mx-2" onClick={() => setCurrentRound(currentRound > 1 ? currentRound - 1 : 1)}>◄</Button>
            End of Round {currentRound}
            <Button variant="outline-dark" className="p-1 mx-2" onClick={() => setCurrentRound(currentRound < inputState.rounds - 1 ? currentRound + 1 : inputState.rounds - 1)}>►</Button>
          </p>
          <span>Players: {players} | Rounds: {rounds} | Top Cut: {topCut}<br /></span>
          <hr />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
