import { useRouter } from "next/router";
import getId from "./components/getId";
import Createresolution from "./components/Createresolution";
import NotResolutionList from "./components/NotResolutionList";
import YesResolutionList from "./components/YesResolutionList";
import UserDetails from "./components/UserDetails";


export default function dashboard() {
  const router = useRouter();
  const id = getId();
  if (id == "" || id == "null") {   
    router.push("/login");
  }

  return (
    <>
    <div className="font-custom">
      <UserDetails />
      <h1 className="text-center ml-[9rem] text-3xl my-[5rem]">My Resolutions</h1>
      <Createresolution />
      <div className="my-[2rem]"></div>
      <NotResolutionList />
      <YesResolutionList />
    </div>
    </>
  );
}
