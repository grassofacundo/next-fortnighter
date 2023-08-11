import { redirect } from "next/navigation";
import InOutAnim from "./components/utils/InOutAnim";
import Dashboard from "./components/dashboard/page";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Footer } from "./components/footer/page";
import styles from "./page.module.scss";

const Home = async () => {
    const session = await getServerSession(authOptions);
    if (!session) redirect("api/auth/signin");

    return (
        <div className={styles.appContainer}>
            {!session && <></>}
            {
                <InOutAnim inState={true} customClass={styles.dashboardWrapper}>
                    <Dashboard />
                    <Footer />
                </InOutAnim>
            }
        </div>
    );
};

export default Home;
