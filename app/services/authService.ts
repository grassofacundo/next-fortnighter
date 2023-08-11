import { Dispatch, SetStateAction } from "react";
import dbService from "./dbService";
import { signIn } from "next-auth/react";

interface AuthParams {
    email: string;
    password: string;
    //callback?: SetStateAction;
}

/*let auth: Auth;
let firebaseApp: FirebaseApp;
let monitoringAuthChange: boolean;
let isTrustedDevice: boolean;*/

class AuthService {
    //storageKey = "fortnighter-trusted-device";

    /*init(firebaseAppParam: FirebaseApp) {
        firebaseApp = firebaseAppParam;
        this.setAuth();
        isTrustedDevice = !!this.getILocalStorageTrustedDevice();
    }*/

    /*setAuth() {
        const authLocal = getAuth(firebaseApp);
        auth = authLocal;
    }*/

    /*getAuthService() {
        return auth;
    }*/

    /*trustDevice() {
        isTrustedDevice = true;
        localStorage.setItem(this.storageKey, isTrustedDevice.toString());
    }*/

    /*untrustDevice() {
        localStorage.removeItem(this.storageKey);
        isTrustedDevice = false;
    }*/

    /*getILocalStorageTrustedDevice() {
        const IsTrustedOnLocalStorage = localStorage.getItem(this.storageKey);

        return IsTrustedOnLocalStorage;
    }*/

    /*getIsTrustedDevice(): boolean {
        return !!isTrustedDevice;
    }*/

    async createUser(AuthParams: AuthParams): Promise<AuthEventReturn> {
        const response = {
            ok: true,
            errorMessage: "",
        };

        const { email, password } = AuthParams;

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const resJson = await res.json();
                response.ok = res.ok;
                response.errorMessage = resJson.message;
            }
        } catch (error: any) {
            response.ok = false;
            response.errorMessage = error;
        }

        /*await createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                if (user.email) dbService.setCollectionName(user.email);
            })
            .catch((error) => {
                response.ok = false;
                response.errorMessage = error.message;
                if (error.message.includes("email-already-in-use"))
                    response.errorMessage =
                        "Email is already in use, try logging in instead";
            });*/
        return response;
    }

    /*async logIn(AuthParams: AuthParams): Promise<AuthEventReturn> {
        const response = {
            ok: true,
            errorMessage: "",
        };

        const { email, password } = AuthParams;

        const res = await signIn("credentials", {
            redirect: false,
            email: email,
            password: password,
            callbackUrl,
          });

        await signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                if (user.email) dbService.setCollectionName(user.email);
            })
            .catch((error) => {
                response.ok = false;
                response.errorMessage = error.message;
                if (
                    error.message.includes("wrong-password") ||
                    error.message.includes("user-not-found")
                )
                    response.errorMessage = "Username or password is incorrect";
            });
        return response;
    }*/

    /*logOut() {
        dbService.clearCollectionName();
        auth.signOut();
    }*/

    /*getAuthState(onStateChange: Dispatch<SetStateAction<User | null>>): void {
        if (monitoringAuthChange) return;

        monitoringAuthChange = true;
        onAuthStateChanged(authService.getAuthService(), (user) => {
            if (user) {
                if (user.email) dbService.setCollectionName(user.email);
                onStateChange(user);
                // ...
            } else {
                dbService.clearCollectionName();
                onStateChange(null);
            }
        });
    }*/
}

const authService = new AuthService();
export default authService;
