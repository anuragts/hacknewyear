import Image from "next/image";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Link from "next/link";
import year from "../public/img/year.svg";


const Home: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <div>
        <div className=" text-6xl mx-20 font-thin  mt-60">
          Transform your resolutions into reality with <br /> our easy-to-use
          platform .
        </div>
        <Image src={year} alt="imgggg" className="float-right mt-[-15rem] mx-[5]"  />
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
