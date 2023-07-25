import React, { useState } from 'react';
import './css/Buttons.css';
import './css/FileBrowser.css';
//import './css/mainStyles.css';
import View from './View';
import { Segment } from './models/Segment';
import { File } from './models/File';
import axios, { AxiosRequestConfig } from "axios";


{/* <select name="nazwa" size="3">
<option>Tu wpisz pierwszą możliwość</option>
<option>Tu wpisz drugą możliwość</option>
</select> */}

// div, name, otworz
// 
//onClick={() => { openFile(file) }}
interface FileBrowserProps {
    setFile: (segments: Array<Segment>) => void;
    goToRecord: () => void;
    token: string | null;
}

export default function FileBrowser({ setFile, goToRecord, token }: FileBrowserProps) {

    const [files, setFiles] = useState<Array<File>>(new Array<File>());

    const GitHub = require("github-api");

    const github = new GitHub({
        token: token,
    });

    const owner = "miandrop";
    const repoName = "data";
    const path = "files/translations";

    const url = "https://api.github.com/repos/miandrop/data/contents/files/translations";

    const headers: AxiosRequestConfig["headers"] = {
        Authorization: `token ${token}`
        //"Content-Type": "application/json", // Przykład innych nagłówków
        // Dodaj inne nagłówki, jeśli są wymagane
    };


    // Wykonanie żądania POST z nagłówkiem autoryzacyjnym

    console.log(files);



    if (files.length == 0) {
        console.log("cosieieieek  " +files);

        const axiosInstance = axios.create({
            maxRedirects: 0,
            maxBodyLength: 0,
          });

          axiosInstance.get(url, { headers }).then((response: any) => {
            //console.log(response);
            setFiles(response.data);
            //console.log(response.data);
        })
    }

    //     const response = await axios.post(url, dataToSend, { headers });

    //     console.log("Odpowiedź serwera:", response.data);
    // } catch (error) {
    //     console.error("Wystąpił błąd podczas wysyłania danych:", error);
    // }

    // if (files.length == 0) {
    //     const repository = github.getRepo(owner, repoName);

    //     repository.getContents("main", path, true)
    //         .then((response: any) => {
    //             if (Array.isArray(response.data)) {
    //                 console.log(response.data);
    //                 setFiles(response.data);
    //             }
    //         })
    //         .catch((error: Error) => {
    //             console.error("Wystąpił błąd podczas pobierania plików:", error);
    //         });
    // }

    let listOfFiles = files.map((file, index) => {
        return (
            <li key={index} className='rowOfFiles'>
                <div className='fileName'>{file.name.slice(0, -5)}</div>
                <div className='openFile'>
                    <button className='openFileButton' key={index} onClick={() => { openFile(file) }} >
                        Otwórz
                    </button>
                </div>
            </li>
        );
    });

    return (
        <>
            <ul id='listOfFiles'>
                {listOfFiles}
            </ul>
            <div className='newFileDiv'>
                <button className='newFileButton' onClick={() => { goToRecord() }}>Nowy plik</button>
            </div>
        </>
    );

    function openFile(file: File) {
        console.log(file.download_url);

        //token
        //console.log(file.name);
        //var JSONData = GetJSONFromRepo(file.name);

        fetch(file.download_url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setFile(data);
            })
            .catch(error => {
                console.error('Wystąpił błąd podczas pobierania pliku JSON:', error);
            });
    }

    async function GetJSONFromRepo(fileName: string) {
        const GitHub = require("github-api");

        const owner = "miandrop";
        const repoName = "data";
        const path = "files/translations" + fileName;

        const github = new GitHub({ token });

        const repository = github.getRepo(owner, repoName);
        repository.getContents("main", path, true)
            .then((response: any) => {
                console.log(response);
                console.log(response.data.length);
                if (Array.isArray(response.data)) {
                    setFiles(response.data);
                }
            })
            .catch((error: Error) => {
                console.error("Wystąpił błąd podczas pobierania plików:", error);
            });

        // try {
        //     const repoObject = github.getRepo(owner, repoName);
        //     const response = await repoObject.getContents("main", path);

        //     console.log(response);
        //     const content = Buffer.from(response.data.content, "base64").toString("utf-8");

        //     const JsonData = JSON.parse(content);

        //     console.log(content);
        //     console.log(JsonData);

        // } catch (error: any) {
        //     console.error("Wystąpił błąd podczas pobierania pliku:", error.message);
        // }

    }
}