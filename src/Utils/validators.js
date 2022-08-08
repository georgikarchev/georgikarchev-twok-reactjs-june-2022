export const usernameValidator = (username) => {
    if(username.length !== 8) {
        return false;
    }

    let pattern = /^[A-Za-z0-9]{8}\b/g;
    let result = pattern.exec(username);
    if(result === null || result.length !== 1){
        return false;
    }

    return true;
}