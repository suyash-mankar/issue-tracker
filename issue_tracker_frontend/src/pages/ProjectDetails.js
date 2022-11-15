import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../styles/projectDetails.module.css";


function ProjectDetails() {
  let { id } = useParams();
  const [project, setProject] = useState();

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

  return (
    <div className={styles.outerContainer}>
      {typeof project === "undefined" ? (
        <h1>loading...</h1>
      ) : (
        <div className={styles.projectDetails} key={project._id}>
          <p>Project Name : {project.data.name}</p>
          <p>Project Description : {project.data.description}</p>
          <p>Project author : {project.data.author}</p>
          <Button variant="success" className={styles.issueBtn}>Create Issue</Button>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
