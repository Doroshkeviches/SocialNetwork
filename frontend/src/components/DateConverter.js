export function DateConverter(date) {
    const today = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const now = today.toLocaleString('ds-DE', options);
    return now

}