class Adagrams {
  static frequencies() {
    return [
    ["A",9],
    ["B", 2],
    ["C", 2],
    ["D", 4],
    ["E", 12],
    ["F", 2],
    ["G", 3],
    ["H", 2],
    ["I", 9],
    ["J", 1],
    ["K", 1],
    ["L", 4],
    ["M", 2],
    ["N", 6],
    ["O", 8],
    ["P", 2],
    ["Q", 1],
    ["R", 6],
    ["S", 4],
    ["T", 6],
    ["U", 4],
    ["V", 2],
    ["W", 2],
    ["X", 1],
    ["Y", 2],
    ["Z", 1],
  ];}

  static makeNewBag() {
    let bag = [];
    const freqs = Adagrams.frequencies();

    for (let i=0; i<freqs.length; i++) {

      let entry = freqs[i];

      for (let j=0; j<entry[1]; j++) {
        bag.push(entry[0]); 
      }
    }
    return bag;
  }
  
  static drawLetters() {
    // draw 10 letters from newBag, return as array of 10 strings
    let newBag = this.makeNewBag();
    let tray = [];
    // console.log(newBag);

    for (let i=0; i < 10; i++) {
      let randomIndex = Math.floor(Math.random() * newBag.length);

      // remove from bag...
      newBag.splice(randomIndex, 1);

      // ...add to player's tray
      tray.push(newBag[randomIndex]);
    }
    return tray;
  }

  static remove(element, array) {
    // removes a single element from array
    let garbageIndex = array.indexOf(element);
    array.splice(garbageIndex, 1);
  }

  static usesAvailableLetters(inputAnyCase, lettersInHand) {
    // input = string, supposedly made from the lettersInHand
    // lettersInHand = array of 10 single-letter strings
    // returns T if input is legit, else F
    let input = inputAnyCase.toUpperCase();

    for (let i=0; i<input.length; i++) {
      if (lettersInHand.includes(input[i])) {
        this.remove(input[i], lettersInHand);
      } else {
        return false;
      }
    }
    return true;
  }

  static chart() {
    return[
    [['A','E','I','O','U','L','N','R','S','T'], 1],
    [['D','G'], 2],
    [['B','C','M','P'], 3],
    [['F','H','V','W','Y'], 4],
    [['K'], 5],
    [['J','X'], 8],
    [['Q','Z'], 10],]; 
  }

  static scoreWord(wordAnyCase) {
    // evals word value according to chart, and returns integer of points
    let sum = 0;
    let word = wordAnyCase.toUpperCase();
    let chart = this.chart();

    // assign value according to this.chart
    for (let i=0; i<word.length; i++) {
      for (let entry of chart) {
        if (entry[0].includes(word[i])) {
          sum += entry[1];
          break;
        }
      }
    }

    // extra 8 points if length = 7-10
    if ((word.length >= 7) && (word.length <= 10)){
      sum += 8;
    }

    return sum;
  }

  static highestScoreFrom(words) {
    // evaluate words[] and return {word: winnerWord, score: 100orSomething}
    let winner = { word: "TBD", score: "TBD" };
    let results = { };
    // format of results will be { score1: [word1, word2]}, score2: [word3], etc }
  
    // take inventory of all scores from words[]
    for (let word of words) {
      const score = this.scoreWord(word);

      if (results[score]) {
        results[score].push(word);
      } else {
        results[score] = [word];
      }
    }

    // get the max score and get winners[]
    const allScores = Object.keys(results);
    const max = Math.max(...allScores);
    winner['score'] = max;
    const winners = results[max];

    // is max scored by a single word?
    if (winners.length == 1) {
      winner['word'] = results[max][0];
    } else {
      // apply hierarchy for best winner: 10-letters > shortest.  tie-break: earliest-index
      const winner10Letters = winners.filter( word => word.length === 10);
      if (winner10Letters.length !== 0) {
        winner['word'] = winner10Letters[0]

      } else {
        const lengths = winners.map( word => word.length);
        const shortestLength = Math.min(...lengths);
        const firstWinner = winners.find(word => word.length === shortestLength);
        winner['word'] = firstWinner;
      }
    }
    return winner;
  }

};

// let words = ["haha", "ahah", "quiz", "cat", "quoz"];
// console.log(Adagrams.highestScoreFrom(words));
// Do not remove this line or your tests will break!
export default Adagrams;
