"use client";

import { FunctionComponent, ReactNode, createContext, useState } from "react";

type thisProps = {
	children: ReactNode;
};
type Theme = "light" | "dark";
interface ThemeContextInterface {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextInterface | null>(null);

export const ThemeProvider: FunctionComponent<thisProps> = ({ children }) => {
	/*
    Theme change code start
    */
	const [theme, setTheme] = useState<Theme>(getBrowserTheme());

	function getBrowserTheme(): Theme {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
		if (darkThemeMq.matches) {
			return "dark";
		} else {
			return "light";
		}
	}

	function getOppositeTheme(): Theme {
		return theme === "light" ? "dark" : "light";
	}

	function toggleTheme(): void {
		const body = document.body as HTMLElement;
		if (!body) return;

		const cssVars = ["bgColor", "mainColor", "textColor", "contrastColor"];
		const newTheme = getOppositeTheme();

		cssVars.forEach((cssVar) => {
			body.style.setProperty(`--${cssVar}`, `var(--${cssVar}-${newTheme})`);
		});
		setTheme(newTheme);
	}

	return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
