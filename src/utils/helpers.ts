


export function generateRandomString() {
    const maxLonString = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < maxLonString; i++) {
        const index = Math.floor(Math.random() * characters.length);
        result += characters[index];
    }
    return result;
}