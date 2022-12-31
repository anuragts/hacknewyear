import { useState } from "react";
import getId from "./getId";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

function Createresolution() {
  const id = getId();
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
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
        completeby: dataObj.completeby,
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
    <div className="flex justify-center font-custom">
    <Button auto shadow onClick={handler} size="xl">
        Create a Resolution
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text className="font-custom" id="modal-title" size={18}>
            Create a
            <Text b size={18}>
            <span></span> Resolution
            </Text>
          </Text>
        </Modal.Header>
        <form onSubmit={handleSubmit} className="my-5 text-center">
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            name="title"
            placeholder="Enter your title"
            className="my-5 w-[5rem] font-custom"
            aria-label="title"
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Description"
            name="description"
            className="my-5 font-custom"
            aria-label="description"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button size="lg" className="font-custom" type="submit" auto onClick={closeHandler}>
            Create
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
export default Createresolution;
