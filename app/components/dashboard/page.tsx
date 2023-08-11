import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ProfileForm } from "./ProfileForm";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/authOptions";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) redirect("api/auth/signin");

    const currentUserEmail = session?.user?.email!;
    const user = await prisma.user.findUnique({
        where: { email: currentUserEmail },
    });

    return (
        <>
            <h1>Dashboard</h1>
            {/*<ProfileForm user={user} />*/}
        </>
    );
}
