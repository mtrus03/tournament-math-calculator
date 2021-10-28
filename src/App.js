import './App.css';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
// import $ from 'jquery';

function App() {
  const [inputState, setInputState] = useState({ players: 32, rounds: 5, topCut: 8, playerPoints: 0, undefeatedPlayers: 0, oneLossPlayers: 0, oneDrawPlayers: 0, twoDrawPlayers: 0, twoLossPlayers: 0 });
  const [customFields, setCustomFields] = useState(false);
  const [canDrawMessage, setCanDrawMessage] = useState(<Row></Row>);
  const { players, rounds, topCut, playerPoints, undefeatedPlayers, oneLossPlayers, oneDrawPlayers, twoDrawPlayers, twoLossPlayers } = inputState;
  
  function handleInput(event) {
    const { name, value } = event.target;
    setInputState({ ...inputState, [name]: value });
  }

  function toggleCustomFields() {
    setCustomFields(!customFields);
  }

  useEffect(() => {
    if (!customFields) {
      if (players <= 4) { setInputState(previous => ({ ...previous, rounds: 0, topCut: players }) )} else
        if (players <= 8) { setInputState(previous => ({ ...previous, rounds: 0, topCut: players }) )} else
          if (players <= 16) { setInputState(previous => ({ ...previous, rounds: 4, topCut: 4 }) )} else
            if (players <= 32) { setInputState(previous => ({ ...previous, rounds: 5, topCut: 8 }) )} else
              if (players <= 64) { setInputState(previous => ({ ...previous, rounds: 6, topCut: 8 }) )} else
                if (players <= 128) { setInputState(previous => ({ ...previous, rounds: 7, topCut: 8 }) )} else
                  if (players <= 226) { setInputState(previous => ({ ...previous, rounds: 8, topCut: 8 }) )} else
                    if (players <= 409) { setInputState(previous => ({ ...previous, rounds: 9, topCut: 8 }) )} else
                      if (players >= 410) { setInputState(previous => ({ ...previous, rounds: 10, topCut: 8 }) )}
    }
  }, [players, customFields])

  function calculateCanDraw() {
    let pointsWithDraw = playerPoints;
    pointsWithDraw++;
    let playerPairingSkipped = false;
    let standings = [];
    let surpass = [];

    for (let i = 0; i < undefeatedPlayers; i++) { standings.push( (rounds - 1) * 3 ); }
    for (let i = 0; i < oneDrawPlayers; i++) { standings.push( (rounds - 2) * 3 + 1 ); }
    for (let i = 0; i < twoDrawPlayers; i++) { standings.push( (rounds - 3) * 3 + 2) ; }
    for (let i = 0; i < oneLossPlayers; i++) { standings.push( (rounds - 2) * 3 ); }
    for (let i = 0; i < twoLossPlayers; i++) { standings.push( (rounds - 3) * 3 ); }
    while (standings.length < players) { standings.push( (rounds - 4) * 3 + 1); }
    standings = standings.sort((a, b) => (b - a));

    let pairings = [];
    if (standings % 2) { pairings.splice(-1, 1); }
    for (let i = 0; i < players; i += 2) { pairings.push([standings[i], standings[i + 1]]); }
    console.log(pairings.length);
    console.log(pairings)
    console.log(pointsWithDraw)
    // console.log('standings:', standings)
    // console.log(pairings);
    for (const pairing of pairings) {
      // simulate user's round
      if (pairing.includes(playerPoints) && !playerPairingSkipped) {
        if (pairing[0] > playerPoints) { surpass.push(pairing[0] + 1); } else { surpass.push(pairing[1] + 1); }
        playerPairingSkipped = true;
        continue;
      } 
      // intentional draw puts both opponent's at or above user's score with draw
      if (pairing[0] + 1 >= pointsWithDraw && pairing[1] + 1 >= pointsWithDraw) {
        surpass.push(pairing[0] + 1, pairing[1] + 1);
        continue;
      }
      // one opponent winning puts them at or above user's core with draw
      if (pairing[0] + 3 >= pointsWithDraw) {
        surpass.push(pairing[0] + 3);
        continue;
      }
      if (pairing[1] + 3 >= pointsWithDraw) {
        surpass.push(pairing[1] + 3);
        continue;
      }
    }
    // console.log(surpass);
    let canDraw = false;
    let beat = surpass.filter(score => score > pointsWithDraw).length;
    let tie = surpass.filter(score => score === pointsWithDraw).length;
    console.log(`beat: ${beat} | tie: ${tie}`)
    if (beat + tie - 1 < topCut) { canDraw = true; }
    setCanDrawMessage(canDraw ? <Alert variant="success" className="mx-4">Yes, you can safely draw in.</Alert> : <Alert variant="danger" className="mx-4">No, you cannot safely draw in.</Alert>)
  }

  function inputFields() {
    if (customFields) return (
      <Col md={4} className="bg-primary text-light h-100">
        <Form.Group className="mb-4">
          <Form.Label className="h2">Players</Form.Label>
          <Form.Control name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="h2">Rounds</Form.Label>
          <Form.Control name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="h2">Top Cut</Form.Label>
          <Form.Control name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Button variant="btn btn-warning mb-4" onClick={toggleCustomFields}>Disable Custom Rounds/Top Cut</Button>
      </Col>
    )
    return (
      <Col md={4} className="bg-primary text-light h-100">
        <Form.Group className="mb-4">
          <Form.Label className="h2">Players</Form.Label>
          <Form.Control name="players" type="text" id="players" value={inputState.players} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="h2">Rounds</Form.Label>
          <Form.Control name="rounds" type="text" id="rounds" value={inputState.rounds} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="h2">Top Cut</Form.Label>
          <Form.Control name="topCut" type="text" id="topCut" value={inputState.topCut} min="2" className="w-25 mx-auto form-control form-control-lg text-center" onChange={handleInput} disabled />
        </Form.Group>
        <Button variant="btn btn-warning mb-4" onClick={toggleCustomFields}>Enable Custom Rounds/Top Cut</Button>
      </Col>
    )
  }

  return (
    <Container className="my-2">
      <Row className="mx-auto text-center">
        {inputFields()}
        <Col md={8}>
          <p className="h2">End of Round {rounds - 1}</p>
          <p className="text-muted">Players: {players} | Rounds: {rounds} | Top Cut: {topCut}</p>

          <Row>
            <Alert variant="info" className="mx-4">
              <h5>Include yourself in the appropriate player count!</h5>
            </Alert>
          </Row>

          <Row>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="playerPoints" type="text" id="playerPoints" value={inputState.playerPoints} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Your Points</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="undefeatedPlayers" type="text" id="undefeatedPlayers" value={inputState.undefeatedPlayers} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Players with {3 * (rounds - 1)} Points ({rounds - 1}-0)</Form.Label><br />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="oneDrawPlayers" type="text" id="oneDrawPlayers" value={inputState.oneDrawPlayers} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Players with {3 * (rounds - 2) + 1} Points ({rounds - 2}-0-1)</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="oneLossPlayers" type="text" id="oneLossPlayers" value={inputState.oneLossPlayers} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Players with {3 * (rounds - 2)} Points ({rounds - 2}-1)</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="twoDrawPlayers" type="text" id="twoDrawPlayers" value={inputState.twoDrawPlayers} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Players with {3 * (rounds - 3) + 2} Points ({rounds - 3}-0-2)</Form.Label>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-4">
                <Form.Control name="twoLossPlayers" type="text" id="twoLossPlayers" value={inputState.twoLossPlayers} className="w-50 mx-auto form-control form-control-lg text-center" onChange={handleInput} />
                <Form.Label className="h5">Players with {3 * (rounds - 3)} Points ({rounds - 3}-2)</Form.Label>
              </Form.Group>
            </Col>
          </Row>
         
          <Row>
            <Button variant="btn btn-primary mb-4 w-75 mx-auto" onClick={calculateCanDraw}>Can I Draw In?</Button>
          </Row>
          
          <>
            {canDrawMessage}
          </>
        </Col>
      </Row>
    </Container>
  );
}

export default App;