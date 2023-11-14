import * as admin from "firebase-admin";

import * as serviceAccount from "../service-account.json";

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
