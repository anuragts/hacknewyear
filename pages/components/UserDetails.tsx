import getId from "./getId";
import { useState } from "react";
import { useEffect } from "react";
import { Popover, Button, Text } from "@nextui-org/react";
import Loading from "./Loading";

export default function UserDetails() {
  interface User {
    name: string;
    email: string;
    completed: string;
  }

  const userId = getId();
  const [user, setUser] = useState<User>();
  const [completedResolutions, setCompletedResolutions] = useState<string>();
  const [loading , setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch("/api/user/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const {user , completedResolutions} = await res.json();
      if (completedResolutions){
        setCompletedResolutions(completedResolutions);
      }
      if (user) {
        console.log("success");
        setUser(user);
        setLoading(false);
      } else {
        console.log("failed");
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div className="float-right mx-[2rem] mt-[-2rem] font-custom">
        <Popover isBordered >
          <Popover.Trigger>
            <Button auto flat>
              Details
            </Button>
          </Popover.Trigger>
          <Popover.Content css={{marginRight:"$10"}}>
            <Text css={{ p: "$10"  }}>
              {" "}
              {loading && <Loading /> }
              {user && (
                <div className="font-custom">
                  <p>Username: {user.name}</p>
                  <p>Email: {user.email}</p>
                </div>
              )}
              <div>
              {completedResolutions && <p className="font-custom">Resolutions completed: {completedResolutions}</p>}
              </div>
            </Text>
          </Popover.Content>
        </Popover>
      </div>
    </div>
  );
}
