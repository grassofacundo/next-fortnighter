import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Home = async () => {
	const session = await getServerSession(authOptions);
	redirect(!session ? "api/auth/signin" : "/dashboard");

	return <></>;
};

export default Home;
