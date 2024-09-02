export const runtime = "edge";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Home = async () => {
    const user = await currentUser()
    if(user){
        redirect("/dashboard/files")
    }
 return <div>
  Homepage
 </div>
};

export default Home;
