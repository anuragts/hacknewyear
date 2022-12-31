import { useState } from "react";
import getId from "./components/getId";
import { useRouter } from "next/router";
import { Input, Button } from "@nextui-org/react";
import LoginLoading from "./components/LoginLoading";

export default function Login() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const id = getId();
  if (id && id !== "null") {
    router.push("/dashboard");
  }
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    setLoading(true);
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: dataObj.email,
        password: dataObj.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    console.log(result);
    const y = result.id;
    const parsedUserId = y?.toString() || null;
    localStorage.setItem("userId", parsedUserId);
    setData(parsedUserId);
    console.log(result);
    if (response.status === 200) {
      console.log("success");
      window.location.reload();
      setLoading(false);
      router.push("/dashboard");
    } else {
      setLoading(false);
      console.log("failed");
    }
  };
  if (loading){
    return <LoginLoading/>
  }
  return (
    <div className="font-custom">
      <h1 className="text-center text-5xl my-[5rem]">Login</h1>

        <form onSubmit={handleSubmit} className="my-5 text-center">
          <Input
            underlined
            size="xl"
            clearable
            type="email"
            color="default"
            name="email"
            placeholder="Enter your email"
            className="my-5"
            aria-label="email"
          />{" "}
          <br />
          <Input.Password
            size="xl"
            bordered
            clearable
            type="password"
            name="password"
            placeholder="Enter your password "
            className="my-5"
            aria-label="password"
          />
          <div className="flex justify-center my-5">
            <Button size="xl" type="submit">
              Submit
            </Button>
          </div>{" "}
          <div className="flex justify-center my-5">
            <Button
              onClick={() => router.push("/register")}
              color="secondary"
              auto
            >
              Register
            </Button>
          </div>
          <div>{data}</div>{" "}
        </form>
    </div>
  );
}
