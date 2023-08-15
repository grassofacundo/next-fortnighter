import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { JobPosition } from "@prisma/client";
import { getServerSession } from "next-auth";
import { FunctionComponent } from "react";

type thisProps = {
	currentJobPosition: jobPosition | null;
	onUpdateCurrentJobPosition: (jobPosition: JobPosition) => void;
};

const JobsDropdown: FunctionComponent<thisProps> = async ({ currentJobPosition, onUpdateCurrentJobPosition }) => {
	const session = await getServerSession(authOptions);
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

	return (
		<>
			{jobPositions.length === 0 && <p>Create job position</p>}
			{jobPositions.length > 0 && jobPositions.map((job) => <p>{job.Name}</p>)}
		</>
	);
};

export default JobsDropdown;
