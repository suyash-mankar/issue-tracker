import { useState, useEffect } from "react";
import styles from "../styles/home.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

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
    <div className={styles.outerContainer}>
      {typeof projects === "undefined" ? (
        <h1>loading...</h1>
      ) : (
        projects.data.map((project) => {
          return (
            <div className={styles.card} key={project._id}>
              <p>Project Name : {project.name}</p>
              <p>Project Description : {project.Description}</p>
              <p>Project author : {project.author}</p>
              <Button
                variant="outline-dark"
                onClick={(e) => handleOpenProject(e)}
                value={project._id}
              >
                Open Project
              </Button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Home;
