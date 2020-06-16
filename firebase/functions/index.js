const functions = require("firebase-functions");
const admin = require("firebase-admin");
// gravatar のインポート
const gravatar = require("gravatar");
// faker のインポート
const faker = require("faker");

admin.initializeApp();
const db = admin.firestore();
const fns = functions.region("asia-northeast1");

exports.syncBookmark = fns.firestore
    .document("users/{userId}/bookmarks/{bookmarkId}")
    .onCreate(async (snapshot, context) => {
        // 変更がないので割愛
    });

// 認証機能を使用します
const auth = admin.auth();
// ユーザーは5人作成します
const userNames = ["alice", "bob", "charlie", "dave", "ellen"];
// テストユーザーを作成する関数
exports.testUsers = fns.https.onRequest(async (req, res) => {
    // ユーザー作成自体は非同期でかまいませんがすべての終了を待ちます
    await Promise.all(
        userNames.map(userName => {
            // firebase-admin のユーザー作成関数を実行します
            return auth
                .createUser({
                    email: `${userName}@example.com`,
                    emailVerified: false,
                    password: "12345678",
                    disabled: false
                })
                .then(user => {
                    // ユーザーが作成されたら Firestore にユーザーデータを登録します
                    return db
                        .collection("users")
                        .doc(userName)
                        .set({
                            authId: user.uid,
                            name: user.email.substr(0, user.email.indexOf("@")),
                            gravatarUrl: gravatar.url(user.email)
                        });
                })
                .catch(console.log);
        })
    );
    // 結果としてレスポンスを返します
    res.status(200).send("users are created successfully.");
});

// ブックマークのテストデータを作成する関数
exports.testBookmarks = fns.https.onRequest(async (req, res) => {
    // 100件のURLを生成する
    const urls = [];
    for (let i = 0; i < 100; i++) {
        urls.push(faker.internet.url());
    }

    // バッチによる一括書き込み処理のためのオブジェクトを取得する
    const batch = db.batch();
    // Promise.all で全てのユーザーブックマークサブコレクションの参照取得まで待機する
    const refs = await Promise.all(
        userNames.map(userName => {
            return db
                .collection("users")
                .doc(userName)
                .collection("bookmarks");
        })
    );
    refs.forEach(ref => {
        urls.forEach(url => {
            // 30%の確率でブックマークしないようにする
            if (Math.random() < 0.3) {
                return;
            }

            // 20%の確率でコメントはなしとする
            const comment = Math.random() >= 0.2 ? faker.lorem.sentence(4) : null;
            // バッチに書き込み処理を登録する
            batch.create(ref.doc(), {
                title: url.toUpperCase().replace(/HTTPS?:\/\//, ""),
                url: url,
                comment: comment,
                // 登録日をランダムにする
                bookmarkedAt: faker.date.between("2010-01-01", "2018-12-31")
            });
        });
    });
    // バッチによる一括書き込みを実行する
    const result = await batch.commit();
    // 結果として作成件数を含めたレスポンスを返す
    res.status(200).send(`${result.length} bookmarks are created successfully.`);
});
