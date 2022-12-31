import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import getId from "./getId";
import { useEffect } from "react";
import Log from "./Log";
export default function Header() {
  const [notlogged, setNotLogged] = useState(false);
  const [logged, setLogged] = useState(false);
  const id = getId();

  useEffect(() => {
    const id = getId();

    if (id && id !== "null" && id !== "") {
      setLogged(true);
    } else {
      setNotLogged(true);
    }
  }, []);
  return (
    <>
      <Head>
        <title>New Me</title>
        <meta
          name="description"
          content="Resolution is a web app that helps you set and track your goals. Whether you want to improve your health, increase productivity, or achieve personal growth, Resolution can help you stay motivated and on track. With features like daily reminders, progress tracking, and accountability, Resolution makes it easy to turn your resolutions into reality. Start making progress today with Resolution"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Grand+Hotel&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="">
        <div className="">
          <Link href={"/"} className="float-left  text-[3rem] mx-10 ">
            newme
          </Link>
        </div>
      </div>
      <Log />
      
    </>
  );
}
