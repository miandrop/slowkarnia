import Buttons from './Buttons';
import './Record.css';
import { useState } from 'react';

class Segment {
    constructor(word, meaning = undefined) {
        this.word = word;
        this.meaning = meaning;
    }
}

export default function Record() {
    const [meaningData, setMeaningData] = useState(null);

    return (
        <div className="record">
            <textarea id="record-textarea"></textarea>
            <button onClick={SaveTextArea}>Dalej</button>
            {meaningData ? <Buttons meaningData={meaningData} setNewMeaningData={setNewMeaningData} /> : null}
        </div>
    );

    function setNewMeaningData(newValue)
    {
        setMeaningData(newValue);
    }

    function SaveTextArea() {
        const textarea = document.getElementById("record-textarea");
        const text = textarea.value.trim();

        if (text !== '') {
            const words = text.split(' ');

            setMeaningData(words.map((word) => {
                return new Segment(word);
            }));
        }
    }
}