import Buttons from './Buttons';
import './css/Record.css';
import { useState } from 'react';
import { Segment } from './models/Segment';
import axios from 'axios';
import * as request from 'sync-request';

interface RecordProps {
    goReturn: () => void;
    token: string | null;
    deeplToken: string | null;
}

export default function Record({ goReturn, token, deeplToken }: RecordProps) {
    const [meaningData, setMeaningData] = useState<Array<Segment> | null>(null);

    return (
        <>
            <textarea id="record-textarea"></textarea>
            <div className='recordButtons'>
                <button onClick={() => { SaveTextArea(); }}>Dalej</button>
                <button onClick={() => { goReturn(); }}>Powrót</button>
            </div>
            {meaningData ? <Buttons meaningData={meaningData} setNewMeaningData={setNewMeaningData} token={token} deeplToken={deeplToken} /> : null}
        </>
    );

    function setNewMeaningData(newValue: Array<Segment>) {
        setMeaningData(newValue);
    }

    function SaveTextArea() {
        //console.log("save stta");
        const textarea = (document.getElementById("record-textarea") as HTMLTextAreaElement);
        const text = textarea.value.trim();

        if (text !== '') {
            const words = text.split(' ');
            //let transWords = Array<string>(words.length).fill("");

            //let transWords = Translate(words);
            let transWords = Translate("domek");
            
            for (let i = 0; i < words.length; ++i) {
                //transWords[i] = Translate(words[i]);
                transWords[i] = "ale";
                //console.log(i);
            }

            console.log(transWords);

            setMeaningData(words.map((word, index) => {
                return new Segment(word, transWords[0]);
            }));
        }
    }

    function Translate(textsToTranslate: string): Array<string> {
        const sourceLanguage = 'EN';
        const targetLanguage = 'PL';

        var request = require('sync-request');

        const apiUrl = `https://api-free.deepl.com/v2/translate?auth_key=${deeplToken}&source_lang=${sourceLanguage}&target_lang=${targetLanguage}&text=${textsToTranslate}`;

        // const response = request('POST', apiUrl, {
        //     json: {
        //       text: textsToTranslate
        //     }
        //   });

          const response = request('POST', apiUrl, {
            json: {
              text: textsToTranslate
            }
          });

        // console.log(response);
        // console.log(response.getBody('utf-8'));


        // JSON.parse(response.getBody('utf-8'));
        // return response.getBody('utf-8');

        const responseData = JSON.parse(response.getBody('utf-8'));
        const translations: Array<string> = responseData.translations.map((translation: any) => translation.text);
        
        console.log(translations);
        return translations;
    }
}