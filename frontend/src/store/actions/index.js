const loginAction = (data) => {
    return {
        type: 'LOGIN',
        payload: data
    }
};

export { loginAction };