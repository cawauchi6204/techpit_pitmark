import gravatar from "gravatar";
import firebase from "./firebase";

class UserService {
    constructor() {
        this.db = firebase.firestore();
    }

    async createUser(auth) {
        const user = {
            authId: auth.uid,
            name: auth.email.substr(0, auth.email.indexOf("@")),
            gravarUrl: gravatar.url(auth.email)
        };
        // authenticationからデータをとってきている

        await this.db.collection("users").add(user);
        return user;
    }
}

const userService = new UserService();
export { userService };
