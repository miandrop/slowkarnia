import FileBrowser from './FileBrowser';
import Record from './Record';
import View from './View';
import './css/Hub.css'
import { useState } from 'react';
import { Segment } from './models/Segment';
import axios from 'axios';

export default function Hub() {
    const [fileToView, setFileToView] = useState<Array<Segment> | null>(null);
    const [isRecord, setIsRecord] = useState<boolean>(false);

    const partOfToken = "github_pat_11AYN4LWY076g2bjitUDDx_gpztvyhDWhTNt8H6m3mESuP5LGqtqRrKYBGrhELXdlEPCSFW6KFJi5";
    const [token, setToken] = useState<string | null>(partOfToken);

    return (
        <>
            <header>
                <div id='login'>
                    <input type='text' id='login-input'></input>
                    <button id='login-button' onClick={login}>Zaloguj</button>
                </div>
            </header>

            <main>
                {
                    (fileToView && <View meaningData={fileToView} goReturn={returnFromView} ></View>) ||
                    (isRecord && <Record goReturn={returnFromRecord} token={token} deeplToken={""}></Record>) ||
                    (<FileBrowser setFile={setStateForFile} goToRecord={setStateForIsRecord} token={token}></FileBrowser>)
                }
            </main>
            <footer></footer>
        </>
    );

    function setStateForFile(fileData: Array<Segment>) {
        setFileToView(fileData);
    }

    function setStateForIsRecord() {
        setIsRecord(true);
    }

    function returnFromView() {
        setFileToView(null);
    }

    function returnFromRecord() {
        setIsRecord(false);
    }

    async function login() {
        let backPartOfToken = (document.getElementById("login-input") as HTMLInputElement).value;

        if (backPartOfToken.length > 0) {
            let tempToken = partOfToken + backPartOfToken;

            try {
                const response = await axios.get('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${tempToken}`,
                    },
                });

                if (response.status === 200) {
                    setToken(tempToken);
                    console.log("dziala");
                } else {
                    alert("nieprawidlowe")
                }
            } catch (error) {
                console.error('Błąd zapytania do GitHub API:', error);
            }
        }
    }
}