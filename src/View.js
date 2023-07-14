import './View.css';
import React from 'react';

export default function View({ meaningData }) {
    console.log(meaningData);

    const wordsButtons = meaningData.map((segment, index) => {
        const ref = React.createRef();
        return (
            <button ref={ref} key={index + segment.word} id={index + "n"} style={{ width: getWidthFromtext(segment.word) }} className="view-button" onClick={() => ClickTheSegment(ref.current, index)}>
                {segment.word}
            </button>
        );
    });

    const meaningButtons = meaningData.map((segment, index) => {
        return (
            <button key={index} id={index} className="meaning-button" style={{ width: getWidthFromtext(segment.word) }}>
                {segment.meaning}
            </button>
        );
    });

    return (
        <div className="view">
            <div>
                {meaningButtons}
            </div>
            <div>
                {wordsButtons}
            </div>
        </div>
    );
}

function ClickTheSegment(button, index) {
    let meaningButton = document.getElementById(index);
    button.classList.toggle('active');
    
    if (meaningButton.style.color === "white") {
        meaningButton.style.color = "rgb(87, 91, 95)";
    }
    else {
        meaningButton.style.color = "white";
    }
}

function getWidthFromtext(text) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = "16px Arial";
    let sum = 0;

    for (let i = 0; i < text.length; ++i) {
        sum += context.measureText(text[i]).width;
    }
    console.log(sum);
    return sum;
}