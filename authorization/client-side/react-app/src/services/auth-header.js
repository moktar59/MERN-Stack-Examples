export default function authHeader() {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
// console.log('user in authheader=', JSON.parse(user));
// let tmp = JSON.parse(user);

// console.log("condition=", (tmp.accessToken)? true: false);

    if (user && user.accessToken) {
        return {'x-access-token': user.accessToken};
    } else {
        return {};
    }
}