import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	//TO DO: job position and the dates should be in the request
	//We should sanitize those params

	const session = await getServerSession(authOptions);
	if (!session) return;

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

	//TO DO, only use the latest modified jobPositions
	const currentJobPosition = jobPositions[0];

	const today = new Date();
	const twoWeeksAgo = new Date(
		today.getFullYear(),
		today.getMonth(),
		today.getDate() - 14,
		today.getHours(),
		today.getMinutes(),
		today.getSeconds(),
	);

	//TO DO: Only get shifts within the correct dates
	const shifts = currentJobPosition
		? await prisma.shift.findMany({
				where: { jobPositionId: currentJobPosition.id },
		  })
		: [];

	return NextResponse.json(shifts);
}
