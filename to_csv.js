module.exports = (data = []) => {
    const [head] = data;
    const keys = Object.keys(head);
    const headLine = keys.join();

    const csv = [headLine];

    return csv;
};