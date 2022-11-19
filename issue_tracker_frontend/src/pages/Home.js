import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState();
  useEffect(() => {
    const getProjects = async () => {
      const response = await fetch("/home");
      if (response.status === 200) {
        const data = await response.json();
        setProjects(data);
      }
    };
    getProjects();
  }, []);

  const handleOpenProject = (e) => {
    return navigate(`/project/details/${e.target.value}`);
  };

  return (
    <div>
      <div className={styles.heading}>
        <h2>ALL PROJECTS</h2>
        <Link to="/project/create">
          <Button className={styles.btn} variant="success">
            Create New Project
          </Button>
        </Link>
      </div>

      <div className={styles.projectsContainer}>
        {typeof projects === "undefined" ? (
          <h1>loading...</h1>
        ) : (
          projects.data.map((project) => {
            return (
              <div className={styles.card} key={project._id}>
                <h2>{project.name}</h2>
                <p style={{ color: "#2CBF2E", fontSize: "1.2rem" }}>
                  {project.description}
                </p>
                <p className={styles.author}>Author : {project.author}</p>
                <Button
                  variant="outline-light"
                  onClick={(e) => handleOpenProject(e)}
                  value={project._id}
                  className={styles.openProjectBtn}
                >
                  Open Project
                </Button>

                <p className={styles.issues}>Issues: {project.issues.length}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
