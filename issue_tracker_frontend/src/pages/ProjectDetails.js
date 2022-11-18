import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../styles/projectDetails.module.css";
import { useNavigate } from "react-router-dom";
import { IssueCard, Filter } from "../components";

function ProjectDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState();
  const [filteredIssues, setFilteredIssues] = useState([]);

  useEffect(() => {
    const getProject = async () => {
      const response = await fetch(`/project/details/${id}`);
      if (response.status === 200) {
        const data = await response.json();
        setProject(data);
        setFilteredIssues(data.data.issues);
      }
    };
    getProject();
  }, [id]);

  const handleCreateIssueBtn = (e) => {
    return navigate(`/issue/create/${id}`);
  };

  let issues = [];
  if (typeof project !== "undefined") {
    issues = project.data.issues;
  }

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
            <Button
              variant="success"
              className={styles.issueBtn}
              value={project._id}
              onClick={(e) => {
                handleCreateIssueBtn(e);
              }}
            >
              Create New Issue
            </Button>
          </div>

          <div className={styles.filtersIssuesContainer}>
            <Filter issues={issues} setFilteredIssues={setFilteredIssues} />

            {filteredIssues.length === 0 ? (
              <p>No results match your search </p>
            ) : (
              <div className={styles.issueContainer}>
                {filteredIssues.map((issue) => {
                  return <IssueCard issue={issue} key={issue._id} />;
                })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectDetails;
