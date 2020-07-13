exports.handler = async (event) => {
    console.log(event.text)
    return event.text
};
