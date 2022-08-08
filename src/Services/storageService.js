export const saveUser = (data) => {
    localStorage.setItem('twok_user', JSON.stringify(data));
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem('twok_user'));
}