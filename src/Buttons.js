import React, { useState } from 'react';
import './Buttons.css';

class Segment {
  constructor(word, meaning = undefined) {
    this.word = word;
    this.meaning = meaning;
  }
}

export default function Buttons({ meaningData, setNewMeaningData }) {
  let clicked = Array(meaningData.length).fill(false);

  const buttons = meaningData.map((segment, index) => {
    const ref = React.createRef();

    if (segment.meaning === undefined) {
      return (
        <button ref={ref} key={index + segment.word} className="record-button" onClick={() => ClickTheSegment(ref.current, index)}>
          {segment.word}
        </button>
      );

    }
    else {
      return (
        <button ref={ref} key={index + segment.word} className="record-button-done" onClick={() => ClickTheDoneSegment(ref.current, index)} onMouseOver={() => setValueForButton(ref.current, segment.meaning) } onMouseOut={() => setValueForButton(ref.current, segment.word)}>
          {segment.word}
        </button>
      );
    }
  });

  console.log(buttons);

  return (
    <div className="Buttons">
      {buttons}
      <input type='text' id='meaning'></input>
      <button onClick={MeaningButtonClicked}>Wprowadz</button>
      <button onClick={() => saveMeaningData(meaningData)}>Zapis</button>//zapisac do magazynu, podglad
    </div>
  );

  function ClickTheSegment(button, index) {
    if (clicked[index]) {
      clicked[index] = false;
    }
    else {
      clicked[index] = true;
    }

    button.classList.toggle('active');
  }

  function ClickTheDoneSegment(button, index) {
    console.log("done klik");
    if (clicked[index]) {
      clicked[index] = false;
    }
    else {
      clicked[index] = true;
    }

    button.classList.toggle('active');
  }

  function MeaningButtonClicked() {
    // gdy scalani zostawić stare meaning
    let meaning = document.getElementById("meaning").value;
    let newMeaningData = [];

    let firstIndex = undefined;
    let words = "";

    for (let i = 0; i < clicked.length; ++i) {
      if (clicked[i]) {
        if (firstIndex === undefined) {
          firstIndex = i;

          for (var k = i; k < clicked.length; ++k) {
            if (!clicked[k]) {
              break;
            }
            words += " " + meaningData[k].word;
          }
          words = words.slice(1);
          newMeaningData.push(new Segment(words, meaning));
          i = k;
        }
        else {
          newMeaningData.push(meaningData[i]);
        }
      }
      else {
        newMeaningData.push(meaningData[i]);
      }
    }

    setNewMeaningData(newMeaningData);
  }
}

function setValueForButton(button, value) {
  button.innerHTML = value;
  button.classList.toggle('onmouse');
}

function saveMeaningData(data)
{
  console.log(JSON.stringify(data));
}