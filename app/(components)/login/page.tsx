"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { Footer } from "../footer/page";
import styles from "./login.module.scss";
import WelcomeAnimation from "../blocks/welcomeAnimation/WelcomeAnimation";
import Spinner from "../blocks/spinner/Spinner";
import { redirect } from "next/navigation";

const SignIn = () => {
	const { status } = useSession();
	if (status === "authenticated") redirect(window.location.origin);

	const [email, setEmail] = useState<string>("");
	const [showDialog, setShowDialog] = useState<boolean>(false);
	const [animationEnded, setAnimationEnded] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleSignIn() {
		setIsLoading(true);
		try {
			// Perform sign in
			const response = await signIn("email", {
				email,
				redirect: false,
				callbackUrl: `/dashboard`,
			});
			// Something went wrong
			if (response?.error) {
				throw new Error(response.error);
			}

			setIsLoading(false);
			setShowDialog(true);
		} catch (error) {
			setIsLoading(false);
			// handle error here (eg. display message to user)
		}
	}

	return (
		<>
			{status === "authenticated" && <p>"Already logged in, redirecting..."</p>}
			{status === "loading" && <p>"Loading not ideally..."</p>}
			{status === "unauthenticated" && (
				<div className={styles.loginWrapper}>
					<WelcomeAnimation fullText="Fortnighter" onSetAnimationEnded={setAnimationEnded} />
					{animationEnded && (
						<div className={styles.mailInput}>
							<input
								id="email"
								type="email"
								required
								onChange={(e) => setEmail(e.target.value)}
								placeholder="your@mail.com"
							/>
							<button onClick={handleSignIn}>{isLoading ? <Spinner /> : "Sign in with email"}</button>
							{showDialog && email && (
								<p>
									We emailed a magic link to <strong>{email}</strong>. Check your inbox and click the link
									in the email to login.
								</p>
							)}
						</div>
					)}
					{/*<Footer />*/}
				</div>
			)}
		</>
	);
};

export default SignIn;
