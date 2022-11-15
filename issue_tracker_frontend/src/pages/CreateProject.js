import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../styles/createProject.module.css";
import { useFormInput } from "../hooks";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  const name = useFormInput("");
  const description = useFormInput("");
  const author = useFormInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/project/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        description: description.value,
        author: author.value,
      }),
    });

    if (res.status === 200) {
      console.log("form data successfully send from frontend");
      return navigate("/");
    }
  };

  return (
    <div className={styles.outerContainer}>
      <Form className={styles.form} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            name="name"
            value={name.value}
            onChange={name.onChange}
            type="text"
            placeholder="Enter Project Name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={description.value}
            onChange={description.onChange}
            as="textarea"
            rows={3}
            placeholder="Enter Project Description"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Author</Form.Label>
          <Form.Control
            name="author"
            value={author.value}
            onChange={author.onChange}
            type="text"
            placeholder="Enter Author's Name"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateProject;