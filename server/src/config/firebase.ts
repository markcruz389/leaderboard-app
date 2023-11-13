import * as admin from "firebase-admin";
import { initializeApp, getApps, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

import * as serviceAccount from "../../service-account.json";

// admin.initializeApp();
// const adminCredentials = {
//     credential: admin.credential.cert({
//         projectId: serviceAccount.project_id,
//         clientEmail: serviceAccount.client_email,
//         privateKey: serviceAccount.private_key,
//     }),
// };

// const firebaseApp = initializeApp(adminCredentials);
// getApps().length === 0 ? initializeApp(adminCredentials) : getApp();

const initializeFirebase = () => {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: serviceAccount.project_id,
            clientEmail: serviceAccount.client_email,
            privateKey: serviceAccount.private_key,
        }),
    });
};

export { initializeFirebase };
