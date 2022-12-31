import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";

function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userId", "");
      window.location.reload();
      router.push("/login");
    }
  };

  return (
    <Button onClick={handleLogout} bordered color="error" css={{margin:"$5"}} size={"xl"} auto>
      Logout
    </Button>
  );
}

export default LogoutButton;
