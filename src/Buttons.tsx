import React, { useState, FunctionComponent } from 'react';
import './css/Buttons.css';
import { Segment } from './models/Segment';
import axios from 'axios';

interface ButtonsProps {
    meaningData: Array<Segment>;
    setNewMeaningData: (segments: Array<Segment>) => void;
    token: string | null;
    deeplToken: string | null;
}

//ierwsze ładowanie -> tłum
// łaczeniu -> tłum
// rozlacznie -> tłum

// wszystko ->

export default function Buttons({ meaningData, setNewMeaningData, token, deeplToken }: ButtonsProps) {

    let clicked = Array(meaningData.length).fill(false);

    const buttons = meaningData.map((segment: Segment, index: number) => {

        const ref = React.createRef<HTMLButtonElement>();

        if (segment.meaning == null) {
            return (
                <div className="ButtonSegments" key={index.toString()+"d"}>
                    <button id={index.toString()} ref={ref} key={index.toString() + segment.word} className="record-button" onClick={() => ClickTheSegment(ref.current, index)} style={{ width: getWidthFromtext(segment.word) }} onDoubleClick={() => Split(index)}>
                        {segment.word}
                    </button>
                    <input id={index.toString() + "i"} key={index.toString() + "i"} className="inputButtons" style={{ width: getWidthFromtext(segment.word) }}>
                    </input>
                </div>
            );
        }
        else {
            return (
                <div className="ButtonSegments" key={index.toString()+"d"}>
                    <button id={index.toString()} ref={ref} key={index.toString() + segment.word} className="record-button-done" onClick={() => ClickTheDoneSegment(ref.current, index)} style={{ width: getWidthFromtext(segment.word) }} onDoubleClick={() => Split(index)}>
                        {segment.word}
                    </button>
                    <input id={index.toString() + "i"} key={index.toString() + "i"} defaultValue={segment.meaning} className="inputButtons" style={{ width: getWidthFromtext(segment.word) }}>
                    </input>
                </div>
            );
        }
    });

    return (
        <>
            <div className="buttons">
                {buttons}
            </div>

            <div className="supportButtons">
                <button onClick={() => { MergeButtonClicked(); }}>Łączenie</button>
                <button onClick={() => { SplitButtonClicked(); }}>Rozłączenie</button>
            </div>

            <div className="supportFiles">
                Nazwa pliku: <input type='text' id='fileName'></input>
                <button onClick={() => { saveMeaningData(); }}>Zapisz</button>
            </div>
        </>
    );

    function saveMeaningData() {
        let fileName = (document.getElementById("fileName") as HTMLInputElement).value;

        let data = GetUpdateMeaningData();

        let jsonData = JSON.stringify(data);

        const GitHub = require("github-api");

        const github = new GitHub({
            token: token,
        });

        const owner = "miandrop";
        const repoName = "data";
        const branch = 'main';
        const filePath = 'files/translations/' + fileName + '.json';

        const repository = github.getRepo(owner, repoName);

        repository.writeFile(branch, filePath, jsonData, 'Zapis pliku JSON', {})
            .then(() => {
                console.log('Plik JSON został zapisany pomyślnie.');
            })
            .catch((error: Error) => {
                console.error('Wystąpił błąd podczas zapisu pliku JSON:', error);
            });
    }

    function GetUpdateMeaningData() {
        let newMeaningData = meaningData.slice();

        for (let i = 0; i < newMeaningData.length; ++i) {
            let meaning = (document.getElementById(i.toString() + "i") as HTMLInputElement).value;
            newMeaningData[i].meaning = meaning;
        }

        return newMeaningData;
    }

    function ClickTheSegment(button: HTMLButtonElement | null, index: number) {
        if (button == null) {
            return;
        }

        if (clicked[index]) {
            clicked[index] = false;
        }
        else {
            clicked[index] = true;
        }

        button.classList.toggle('active');
    }

    function ClickTheDoneSegment(button: HTMLButtonElement | null, index: number) {
        if (button == null) {
            return;
        }

        if (clicked[index]) {
            clicked[index] = false;
        }
        else {
            clicked[index] = true;
        }

        button.classList.toggle('active');
    }

    function MergeButtonClicked() {
        let newMeaningData = new Array<Segment>();

        let firstIndex = undefined;
        let words = "";

        for (let i = 0; i < meaningData.length; ++i) {
            if (clicked[i]) {
                if (firstIndex === undefined) {
                    firstIndex = i;

                    for (var k = i; k < meaningData.length; ++k) {
                        if (!clicked[k]) {
                            break;
                        }
                        words += " " + meaningData[k].word;
                    }
                    words = words.slice(1);//tlu
                    newMeaningData.push(new Segment(words, null));
                    i = k - 1;
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

    function SplitButtonClicked() {
        for (let i = 0; i < clicked.length; ++i) {
            if (clicked[i]) {

                Split(i);
            }
        }
    }

    function Split(index: number) {
        const segmentButton = (document.getElementById(index.toString()) as HTMLButtonElement);
        const text = segmentButton.innerHTML.trim();

        if (text !== '') {
            const words = text.split(' ');

            let segments = meaningData.slice(0, index);

            segments = segments.concat(words.map((word) => {
                return new Segment(word);
            }));

            segments = segments.concat(meaningData.slice(index + 1));

            console.log(segments);

            setNewMeaningData(segments);
        }
    }

    // function Translate(textToTranslate: string): Promise<string> {

    //     const sourceLanguage = 'EN';
    //     const targetLanguage = 'PL';

    //     const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${deeplToken}&text=${textToTranslate}&source_lang=${sourceLanguage}&target_lang=${targetLanguage}`;

    //     // axios.post(apiUrl)
    //     //     .then(response => {
    //     //         result = response.data.translations[0].text;
    //     //         return result;
    //     //     })
    //     //     .catch(error => {
    //     //         console.error('Błąd podczas przetwarzania żądania:', error);
    //     //     });

    //     return axios
    //     .post(apiUrl)
    //     .then(response => {
    //       const translation: string = response.data.translations[0].text;
    //       return translation;
    //     })
    //     .catch(error => {
    //       console.error('Błąd podczas przetwarzania żądania:', error.message);
    //       throw error;
    //     });
    // }
}

function setValueForButton(button: HTMLButtonElement | null, value: string | null) {
    if (button == null || value == null) {
        return;
    }
    button.innerHTML = value;
    button.classList.toggle('onmouse');
}



function getWidthFromtext(text: string) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if (context == null) {
        return;
    }
    context.font = "16px Arial";
    let sum = 0;

    for (let i = 0; i < text.length; ++i) {
        sum += context.measureText(text[i]).width;
    }
    return sum + 15;
}