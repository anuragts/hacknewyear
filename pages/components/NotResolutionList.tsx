import { useState, useEffect } from "react";
import { Button, Card, Text, Row } from "@nextui-org/react";
import { useRouter } from "next/router";
import getId from "./getId";
import Confetti from "./Confetti";
import Loading from "./Loading";

const ResolutionList = () => {
  interface Resolution {
    id: number;
    title: string;
    description: string;
    userId: number;
  }
  const router = useRouter();
  const userId = getId();
  const [resolutions, setResolutions] = useState<Resolution[]>([]);
  const [loading , setLoading] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchResolutions = async () => {
      const res = await fetch("/api/resolution/getnot", {
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
        console.log("failed");
        setLoading(false);
      }
    };
    fetchResolutions();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/resolution/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (data) {
      const newResolutions = resolutions.filter((r) => r.id !== id);
      setResolutions(newResolutions);
      window.location.reload();
    }
  };

  const handleCompleted = async (id: number, userId = id) => {
    // get date now
    const completedAt = new Date().toISOString();
    const res = await fetch(`/api/resolution/completed/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, userId,completedAt }),
    });
    const data = await res.json();
    if (data) {
      const newResolutions = resolutions.filter((r) => r.id !== id);
      setResolutions(newResolutions);
    }
  };

  const handleConfettiClick = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      window.location.reload();
    }, 5000);
  };

  if (userId == "" || userId == "null") {
    router.push("/login");
  }

  return (
    <>
      <div className="flex justify-center  flex-wrap flex-row">
      {loading && <Loading /> }
        {resolutions.map((resolution: any) => (
          <div key={resolution.id} className=" my-5 mx-5">
            <Card variant="shadow" css={{ mw: "400px" }}>
              <Card.Body>
                <Text size={"$2xl"} css={{ textAlign: "center" }}>
                  {resolution.title}
                </Text>
                <Text css={{ textAlign: "center", marginTop: "$5" }}>
                  {resolution.description}
                </Text>
                <Text css={{ textAlign: "center", marginTop: "$5" }}>
                  Compelete By - {resolution.completeby?.slice(0, 10)}
                </Text>
              </Card.Body>
              <Card.Divider />
              <Row justify="flex-end">
                <Button
                  color={"success"}
                  css={{ mx: "4px", textDecoration: "bold" }}
                  onPress={() => handleCompleted(resolution.id)}
                  onClick={handleConfettiClick}
                >
                  Completed
                </Button>

                <Button
                  color={"error"}
                  css={{ mx: "4px" }}
                  onPress={() => handleDelete(resolution.id)}
                >
                  Delete
                </Button>
              </Row>
            </Card>
          </div>
        ))}
        {showConfetti && <Confetti />}
      </div>
    </>
  );
};

export default ResolutionList;
