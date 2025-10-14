export class RandomColor {
    static getRandomHex() {
        let hexColor = '#'; 
        for (let i = 0; i < 6; i++) {
            hexColor += this.#getRandomHexChar();
        }
        return hexColor;
    }

    static #getRandomHexChar() {
        const hexChars = '0123456789ABCDEF';
        const randomIndex = Math.floor(Math.random() * hexChars.length);

        if (randomIndex >= 0 && randomIndex < hexChars.length) {
            return hexChars.charAt(randomIndex);
        } else {
            return '0';
        }
    }

}