"use client";

import { FunctionComponent, ReactNode } from "react";
import AuthProvider from "@/app/AuthProvider";
import { ThemeProvider } from "./ThemeContext";

type thisProps = {
	children: ReactNode;
};

export const ContextLoader: FunctionComponent<thisProps> = ({ children }) => {
	return (
		<AuthProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</AuthProvider>
	);
};
