const response = (payload, ...rest) => {
    return {
        status: 'success',
        content: payload,
        ...rest,
    };
};

module.exports = {
    response,
}