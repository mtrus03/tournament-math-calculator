import './App.css';
import { Container, Row, Col, Label, Input, FormGroup, Button } from 'reactstrap';
import { React, useState, useEffect } from 'react';
// import $ from 'jquery';

function App() {
  const [inputState, setInputState] = useState({ players: 32, rounds: 5, topCut: 8 });
  const [customFields, setCustomFields] = useState(false);
  const { players, rounds, topCut } = inputState;

  function handleInput(event) {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  }

  function toggleCustomFields() {
    setCustomFields(!customFields);
  }

  useEffect((customFields, players) => {
    if (customFields) return;
    if (players <= 4) { setInputState({ players, rounds: 0, topCut: players }) } else
      if (players <= 8) { setInputState({ players, rounds: 0, topCut: players }) } else
        if (players <= 16) { setInputState({ players, rounds: 5, topCut: 4 }) } else
          if (players <= 32) { setInputState({ players, rounds: 5, topCut: 8 }) } else
            if (players <= 64) { setInputState({ players, rounds: 6, topCut: 8 }) } else
              if (players <= 128) { setInputState({ players, rounds: 7, topCut: 8 }) } else
                if (players <= 226) { setInputState({ players, rounds: 8, topCut: 8 }) } else
                  if (players <= 409) { setInputState({ players, rounds: 9, topCut: 8 }) } else
                    if (players >= 410) { setInputState({ players, rounds: 10, topCut: 8 }) }
  }, [setInputState])

  function inputFields() {
    if (customFields) return (
      <Col className="col-4 bg-primary text-light">
        <FormGroup className="mb-4">
          <Label for="players" className="h2">Players</Label>
          <Input name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="rounds" className="h2">Rounds</Label>
          <Input name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="topCut" className="h2">Top Cut</Label>
          <Input name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </FormGroup>
        <Button className="btn btn-warning mb-4" onClick={toggleCustomFields}>Disable Custom Rounds/Top Cut</Button>
      </Col>
    )
    return (
      <Col className="col-4 bg-primary text-light">
        <FormGroup className="mb-4">
          <Label for="players" className="h2">Players</Label>
          <Input name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="rounds" className="h2">Rounds</Label>
          <Input name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </FormGroup>
        <FormGroup className="mb-4">
          <Label for="topCut" className="h2">Top Cut</Label>
          <Input name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </FormGroup>
        <Button className="btn btn-warning mb-4" onClick={toggleCustomFields}>Enable Custom Rounds/Top Cut</Button>
      </Col>
    )
  }

  return (
    <Container className="mt-2">
      <Row className="mx-auto text-center">
        {inputFields()}
        <Col className="col-8">
          <p className="h2">Results</p>
          <span>Players: {players}<br /></span>
          <span>Rounds: {rounds}<br /></span>
          <span>Top Cut: {topCut}<br /></span>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
