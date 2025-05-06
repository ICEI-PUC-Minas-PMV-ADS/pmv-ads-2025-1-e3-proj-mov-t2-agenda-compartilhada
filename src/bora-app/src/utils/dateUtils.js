// Converte data para ser manipulável
export const dataEditavel = (dateString) => {
    if (!dateString) {
        return null;
    } else {
        const data = new Date(dateString);
        data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
        return data;
    }
};

export const ehHoje = (date) => {
    return date.toDateString() === new Date().toDateString();
}