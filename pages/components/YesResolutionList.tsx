import { useState, useEffect } from "react";
import { Button, Card, Text, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import getId from "./getId";
import Loading from "./Loading";

const ResolutionList = () => {
  interface Resolution {
    id: number;
    title: string;
    description: string;
    userId: number;
  }
  interface Subtask {
    id: number;
    title: string;
    description: string;
    resolutionId: number;
  }

  const router = useRouter();

  const userId = getId();
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [subtasks, setSubtasks] = useState<Subtask[]>([]);
  const [loading , setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchResolutions = async () => {
      setLoading(true);
      const res = await fetch("/api/resolution/getyes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await res.json();
      if (data) {
        console.log("success");
        setLoading(false);
        setResolutions(data);
      } else {
        setLoading(false);
        console.log("failed");
      }
    };
    fetchResolutions();
  }, []);

  useEffect(() => {
    const fetchSubtasks = async (resolutionId :any) => {
      const res = await fetch("/api/subtask/getyes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resolutionId: resolutionId }),
      });
      const data = await res.json();
      if (data) {
        setSubtasks(data);
      }
    };
    if (userId != "" && userId != "null") {
      
    }
  }, []);


  

  if (userId == "" || userId == "null") {
    router.push("/login");
  }
  if (resolutions.length == 0 ){
    return (
      <>
        <h1 className="text-2xl text-center my-10">Completed Resolutions</h1>
        <div className="flex justify-center ">
          <Text size={"$2xl"} color="" className="font-bold text-primary">No Completed Resolutions ... </Text>
        </div>
      </>
    );
  }
  return (
    <>
        <h1 className="text-2xl text-center my-10">Completed Resolutions</h1>
      <div className="flex justify-center  flex-wrap flex-row">
        {loading && <Loading /> }
        {resolutions.map((resolution: any) => (
          <div key={resolution.id} className=" my-5 mx-5">
            <Card variant="shadow" css={{ mw: "400px" }}>
              <Card.Body>
                <Text size={"$2xl"} css={{textAlign:"center",marginLeft:"$10",paddingLeft:"$10",paddingRight:"$10", marginRight:"$10", textDecorationLine:"line-through" ,textDecorationColor:"$gray900",textDecorationStyle:"solid" }}>{resolution.title}</Text>
                <Text css={{textAlign:"center",textDecorationLine:"line-through",textDecorationColor:"$gray900"}}>{resolution.description}</Text>
              </Card.Body>
              <Card.Divider />
              <Card.Body>
                <Text css={{textAlign:"center"}}>Compeleted At - {resolution.completedAt?.slice(0,10)}</Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResolutionList;
