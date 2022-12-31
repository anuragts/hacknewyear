import { useState } from "react";
import getId from "./getId";
import { Input, Button } from "@nextui-org/react";
function Createresolution() {
  const id = getId();
  const [data, setData] = useState([]);
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataObj = Object.fromEntries(data);
    const response = await fetch("/api/resolution/create", {
      method: "POST",
      body: JSON.stringify({
        title: dataObj.title,
        description: dataObj.description,
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (result) {
      console.log("success");
      window.location.reload();
    } else {
      console.log("failed");
    }
  };
  return (
    <div className="flex justify-center">
      <div>
        <form onSubmit={handleSubmit} className="my-5 text-center w-min">
          <Input
            bordered
            size="lg"
            clearable
            name="title"
            placeholder="Enter your title"
            className="my-5"
            aria-label="title"
          />
          <br />
          <Input
            bordered
            size="lg"
            clearable
            name="description"
            placeholder="Enter your description"
            className="my-5"
            aria-label="description"
          />
          <br />
          <div className="flex justify-center my-5">
            <Button size="lg" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Createresolution;
