import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/createIssue.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormInput } from "../hooks";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { labelOptions } from "../utils/constants";
import { Option } from "../utils/ReactSelectComponent";

function CreateIssue() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [project, setProject] = useState();
  const [labels, setLabels] = useState([]);

  const title = useFormInput("");
  const description = useFormInput("");
  const author = useFormInput("");

  useEffect(() => {
    const getProject = async () => {
      const response = await fetch(`/project/details/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setProject(data);
      }
    };
    getProject();
  }, [id]);

  const handleChange = (selectedOptions) => {
    let labelsArr = selectedOptions.map((option) => {
      return option.value;
    });
    setLabels(labelsArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/issue/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title.value,
        description: description.value,
        labels: labels,
        author: author.value,
        project: id,
      }),
    });

    if (res.status === 200) {
      console.log("form data successfully send from frontend");
      return navigate(`/project/details/${id}`);
    }
  };

  return (
    <div className={styles.outerContainer}>
      {typeof project === "undefined" ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div className={styles.projectDetails} key={project._id}>
            <p>Project Name : {project.data.name}</p>
            <p>Project Description : {project.data.description}</p>
            <p>Project author : {project.data.author}</p>
          </div>

          <div className={styles.formContainer}>
            <Form className={styles.formBorder} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  {...title}
                  type="text"
                  placeholder="Enter Title"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  {...description}
                  type="text"
                  placeholder="Enter Description"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Labels</Form.Label>

                <Select
                  options={labelOptions}
                  isMulti
                  closeMenuOnSelect={false}
                  hideSelectedOptions={false}
                  name="labels"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChange}
                  components={{
                    Option,
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  name="author"
                  {...author}
                  type="text"
                  placeholder="Enter Author Name"
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Create Issue
              </Button>
            </Form>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateIssue;
