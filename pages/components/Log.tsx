import { useEffect, useState } from "react";
import getId from "./getId";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Log() {
  const [notlogged, setNotLogged] = useState(true);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (id && id !== "null" && id !== "") {
      setLogged(true);
      setNotLogged(false);
    }
  }, []);
  const id = getId();

  return (
    <>
      {logged ? (
        <div className="flex justify-end">
          <Link
            href={"/dashboard"}
            className="float-right my-4   text-[2rem]  mx-10 "
          >
            dashboard
          </Link>
          <Link
            href={"/Leader"}
            className="float-right bg-primary px-20 py-2 text-secondary text-[2rem] rounded-full my-3  mx-10 "
            >
            
              leaderboard
          </Link>
            <LogoutButton />
        </div>
      ) : (
        <div className="flex justify-end">
          <Link
            href={"/register"}
            className="float-right my-4   text-[2rem]  mx-10 "
          >
            register
          </Link>

          <Link
            href={"/login"}
            className="float-right bg-primary px-20 py-2 text-secondary text-[2rem] rounded-full my-3  mx-10 "
          >
            login
          </Link>
        </div>
      )}
    </>
  );
}
