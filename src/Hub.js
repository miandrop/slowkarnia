import Record from './Record';
import View from './View';
import { useState } from 'react';

export default function Hub()
{
    var data = `[
        {
            "word": "Welcome",
            "meaning": "Witamy"
        },
        {
            "word": "to the React",
            "meaning": "W React"
        },
        {
            "word": "documentation!",
            "meaning": "dokumentacji!"
        },
        {
            "word": "This page",
            "meaning": "Ta strona"
        },
        {
            "word": "will give you",
            "meaning": "da ci"
        },
        {
            "word": "an anto the 80% of React concepts",
            "meaning": "do 80% znajomości konceptów Reacta"
        },
        {
            "word": "you will use",
            "meaning": "których będziesz używał"
        },
        {
            "word": "a daily",
            "meaning": "dziennie"
        },
        {
            "word": "basis.",
            "meaning": "bazowo"
        }
    ]`;

    var dataValue = JSON.parse(data);
    //View
    //Hub
    //record
    return (
        <div className="hub">
            {/* <button>View</button>
            <button>Record</button> */}
            {/* <Record/> */}
            <View meaningData = {dataValue}/>
        </div>
    );
}