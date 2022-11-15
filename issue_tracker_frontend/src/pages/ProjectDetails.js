import React from "react";
import { useParams } from "react-router-dom";

function ProjectDetails() {
  let { id } = useParams();
  console.log(id);
  return <div>ProjectDetails</div>;
}

export default ProjectDetails;
