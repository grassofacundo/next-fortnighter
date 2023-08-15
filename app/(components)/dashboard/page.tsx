import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { JobPosition } from "@prisma/client";
import { FunctionComponent, useState } from "react";
import JobsDropdown from "./jobsDropdown/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

type thisProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

const Dashboard: FunctionComponent<thisProps> = async ({ searchParams }) => {
	const session = await getServerSession(authOptions);
	if (!session) redirect("api/auth/signin");

	//const positionId = searchParams

	const userEmail = session?.user?.email;
	const user = userEmail
		? await prisma.user.findUnique({
				where: { email: userEmail },
		  })
		: null;

	const jobPositions = user
		? await prisma.jobPosition.findMany({
				where: { userId: user.id },
		  })
		: [];

	const today = new Date();
	const twoWeeksAgo = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 14,
		today.getHours(),
		today.getMinutes(),
		today.getSeconds(),
	);

	//TO DO, only use the latest modify jobPositions
	const currentJobPosition = jobPositions[0];

	/*
    Before redirecting, we should get:
    - Last updated job position
    - Last week/fortnight (depending on preference)

    Send that information as query params using this structure /dashboard?a=1&b=2

    The query params should be something like this:
    job-position
    start-date
    end-date
    */
	const jobQueryParam = `job-position=${currentJobPosition?.id ?? "none"}`;
	const startQueryParam = `start-date=${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
	const endQueryParam = `end-date=${twoWeeksAgo.getDate()}-${twoWeeksAgo.getMonth()}-${twoWeeksAgo.getFullYear()}`;

	/*const { status } = useSession();
	if (status === "unauthenticated") redirect("api/auth/signin");

	const [currentJobPosition, setCurrentJobPosition] = useState<jobPosition | null>(null);

	function updateCurrentJobPosition(jobPosition: JobPosition) {
		setCurrentJobPosition({
			id: jobPosition.Id,
			name: jobPosition.Name,
		});
	}*/

	/*const currentUserEmail = session?.user?.email!;
    const user = await prisma.user.findUnique({
        where: { email: currentUserEmail },
    });*/

	return (
		<>
			{/*status === "loading" && <p>"loading"</p>*/}
			{
				/*status === "authenticated" && */ <>
					<h1>Dashboard</h1>
					{/*<JobsDropdown
						currentJobPosition={currentJobPosition}
						onUpdateCurrentJobPosition={updateCurrentJobPosition}
            />*/}
				</>
			}
		</>
	);
};

export default Dashboard;
