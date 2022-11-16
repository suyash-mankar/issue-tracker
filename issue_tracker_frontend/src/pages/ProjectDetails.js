import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../styles/projectDetails.module.css";
import { useNavigate } from "react-router-dom";

function ProjectDetails() {
  let { id } = useParams();
  const [project, setProject] = useState();
  const navigate = useNavigate();

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

  const handleCreateIssueBtn = (e) => {
    return navigate(`/issue/create/${id}`);
  };

  return (
    <div className={styles.outerContainer}>
      {typeof project === "undefined" ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.projectDetails} key={project._id}>
          <p>Project Name : {project.data.name}</p>
          <p>Project Description : {project.data.description}</p>
          <p>Project author : {project.data.author}</p>
          <Button
            variant="success"
            className={styles.issueBtn}
            value={project._id}
            onClick={(e) => {
              handleCreateIssueBtn(e);
            }}
          >
            Create Issue
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
