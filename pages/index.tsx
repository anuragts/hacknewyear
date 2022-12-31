import Image from "next/image";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className=" text-6xl mx-20 font-thin  mt-60">
          Transform your resolutions into reality with <br /> our easy-to-use
          platform .
        </div>
        <div className="mt-[5rem]">
          <Link href={"/dashboard"} className="text-secondary bg-primary px-[4rem] py-[1rem] rounded-full  text-3xl ml-[15rem]" >
            Take Off
            </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
