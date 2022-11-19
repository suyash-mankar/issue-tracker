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
        <h1 style={{ margin: "50px 17px" }}>Loading...</h1>
      ) : (
        <>
          <div className={styles.projectDetailsContainer} key={project._id}>
            <div className="projectDetails">
              <h3>{project.data.name}</h3>
              <p style={{ color: "#2CBF2E", fontSize: "1.2rem" }}>
                {project.data.description}
              </p>
              <hr style={{ color: "white" }} />
            </div>

            <div className={styles.buttonContainer}>
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
              <Button
                variant="danger"
                className={styles.issueBtn}
                onClick={(e) => {
                  navigate("/");
                }}
              >
                Go Back
              </Button>
            </div>
          </div>

          <div className={styles.filtersIssuesContainer}>
            <div className={styles.filtersHeadingContainer}>
              <h2 style={{ marginBottom: 25 }}>Filters</h2>
              <Filter
                issues={issues}
                filteredIssues={filteredIssues}
                setFilteredIssues={setFilteredIssues}
              />
            </div>

            {filteredIssues.length === 0 ? (
              <h1 style={{ margin: "50px 100px" }}> No Issues Found </h1>
            ) : (
              <div className={styles.issueContainer}>
                <h3 style={{ marginBottom: 30 }}>
                  ALL ISSUES ({filteredIssues.length})
                </h3>
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
