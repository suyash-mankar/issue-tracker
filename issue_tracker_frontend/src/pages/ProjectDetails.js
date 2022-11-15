import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/home.module.css";

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
        <div className={styles.card} key={project._id}>
          <p>Project Name : {project.data.name}</p>
          <p>Project Description : {project.data.description}</p>
          <p>Project author : {project.data.author}</p>
        </div>
      )}
    </div>
  );
}

export default ProjectDetails;
