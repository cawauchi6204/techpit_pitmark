import gravatar from "gravatar";
import firebase from "./firebase";

class UserService {
    constructor() {
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    async getCurrentUser() {
        if (this.auth.currentUser == null) {
            throw new Error("サインインしていません。サインインしてください");
        }

        const snapshot = await this.db.collection("authId", "==", this.auth.currentUser.uid).get();

        let user = null;
        snapshot.forEach(doc => {
            user = doc.data();
            user.id = doc.id;
            console.log(doc.data);
            console.log(doc.id);
        });
        return user;
    }


    async createUser(auth) {
        const user = {
            authId: auth.uid,
            gravarUrl: gravatar.url(auth.email),
            name: auth.email.substr(0, auth.email.indexOf("@"))
            //emailの@から先を切り取る
        };
        // authenticationからデータをとってきている

        await this.db.collection("users").add(user);
        return user;
    }
}

const userService = new UserService();
export { userService };
