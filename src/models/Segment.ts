export class Segment {
    word: string;
    meaning: string | null;

    constructor(word: string, meaning: string | null = null) {
        this.word = word;
        this.meaning = meaning;
    }
}