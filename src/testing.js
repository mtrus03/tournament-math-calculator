let standings = [];
let undefeatedPlayers = 2;
let oneDrawPlayers = 4;
let oneLossPlayers = 4;
let rounds = 5;
let surpass = [];
let pairings = [];
let playerPairingSkipped = false;
let points = 8;

for (let i = 0; i < undefeatedPlayers; i++) { standings.push((rounds - 1) * 3); } 
for (let i = 0; i < oneDrawPlayers; i++) { standings.push((rounds - 2) * 3 + 1); }
for (let i = 0; i < oneLossPlayers; i++) { standings.push((rounds - 2) * 3); }

while (standings.length < 16) { standings.push((rounds - 2) * 3); }
if (standings.length > 16) { standings = standings.slice(15); }

// for (let i = 0; i < standings.length; i++) {
    // if (standings[i] + 1 >= points && standings[1 + 1] >= points) { 
    //     surpass.push(standings[i] + 1);
    //     surpass.push(standings[i + 1] + 1);
    //     continue;
    // }
    // if (standings[i] + 3 >= points || standings[i + 1] + 3 >= points) {
    //     surpass.push(standings[i] > standings[i + 1] ? standings[i] + 3 : standings[i + 1] + 3);
    // }
// }

standings = standings.sort((a, b) => (b - a));

console.log(standings);
for (let i = 0; i < 16; i+=2) {
    pairings.push([standings[i], standings[i + 1]]);
    console.log(standings[i], standings[i + 1]);
    console.log(pairings);
}

const pointsWithDraw = points + 1;

for (const pairing of pairings) {
    console.log(`evaluating ${pairing[0]} vs ${pairing[1]} (user points on draw: ${pointsWithDraw})`);
    if (pairing.includes(points) && !playerPairingSkipped) {
        console.log(`this is the user's pairing, simulating intentional draw`);
        if (pairing[0] != pairing[1] && pairing[0] > (points)) {
            console.log(`user was paired up, adding ${pairing[0] + 1} to surpass list`);
            surpass.push(pairing[0] + 1);
        }
        playerPairingSkipped = true;
        continue;
    }
    if (pairing[0] + 1 >= pointsWithDraw && pairing[1] + 1 >= pointsWithDraw) {
        console.log(`intentional draw puts both players at or above user drawing`);
        surpass.push(pairing[0], pairing[1]);
        continue;
    }
    if (pairing[0] + 3 >= pointsWithDraw) {
        console.log(`${ pairing[0] } defeating ${ pairing[1] } puts them at or above user drawing`)
        surpass.push(pairing[0] + 3);
        continue;
    }
    if (pairing[1] + 3 >= pointsWithDraw) {
        console.log(`${ pairing[1] } defeating ${ pairing[0] } puts them at or above user drawing`)
        surpass.push(pairing[1] + 3);
        continue;
    }
    console.log(`neither player can surpass user drawing`);
}
console.log(`\nscores that tie or pass the player: ${surpass}`);

let beat = 0;
let tie = 0;

for (const score of surpass) {
    if (score > pointsWithDraw) { beat++ };
    if (score === pointsWithDraw) { tie++ };
}

console.log(`\nscores better than user drawing: ${beat}`);
console.log(`scores tied with user drawing: ${tie}`);

// console.log(standings);
// console.log(`player points: ${points}`);
// console.log(surpass);