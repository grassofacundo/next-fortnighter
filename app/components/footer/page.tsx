"use client";

import { FunctionComponent, useContext } from "react";
import styles from "./footer.module.scss";
import ThemeContext from "../contexts/ThemeContext";
import { signOut, useSession } from "next-auth/react";

type thisProps = {};

export const Footer: FunctionComponent<thisProps> = () => {
    const { status } = useSession();
    const themeContent = useContext(ThemeContext);
    const theme = themeContent?.theme;
    const toggleTheme = themeContent?.toggleTheme;

    const showLogOut = status === "authenticated";

    return (
        <footer className={styles.wrapperBody}>
            <button
                className={styles.logOutButton}
                style={{ opacity: showLogOut ? "1" : "0" }}
                disabled={!showLogOut}
                onClick={() => signOut()}
            >
                Log out
            </button>
            <button
                className={`${styles.themeButton} ${
                    theme === "dark" ? styles.inverted : ""
                }`}
                onClick={() => {
                    if (toggleTheme) toggleTheme();
                }}
            ></button>
        </footer>
    );
};
