import React from "react";
import styles from "../styles/projectDetails.module.css";
import { labelOptions } from "../utils/constants";
import Select from "react-select";

function Filter({ issues, setFilteredIssues }) {
  const handleSearchFilter = (e) => {
    const searchWord = e.target.value;
    const newSearchFilter = issues.filter((issue) => {
      return (
        issue.title.toLowerCase().includes(searchWord.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    setFilteredIssues(newSearchFilter);
  };

  let labelFilteredIssues = [];

  const handleLabelsChange = (selectedOptions) => {
    setFilteredIssues([]);

    let selectedOptionsArr = selectedOptions.map((option) => {
      return option.value;
    });

    if (selectedOptionsArr.length === 0) {
      labelFilteredIssues = [];
      setFilteredIssues(issues);
    }

    for (let issue of issues) {
      for (let option of selectedOptionsArr) {
        if (issue.labels.includes(option)) {
          if (!labelFilteredIssues.includes(issue)) {
            labelFilteredIssues.push(issue);
            setFilteredIssues(labelFilteredIssues);
          }
        } else {
          let index = labelFilteredIssues.indexOf(issue);
          if (index !== -1) {
            labelFilteredIssues.splice(index, index + 1);
            setFilteredIssues(labelFilteredIssues);
          }
          break;
        }
      }
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <h3>Filters</h3>

      <div className={styles.searchFilterContainer}>
        <div className={styles.searchInputs}>
          <p> Search by Titile/Description </p>
          <input
            type="text"
            onChange={handleSearchFilter}
            placeholder={"Titile/Description"}
          />
        </div>
      </div>

      <div className={styles.labelFilterContainer}>
        <p> Labels </p>
        <Select
          options={labelOptions}
          isMulti
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="labels"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleLabelsChange}
        />
      </div>
    </div>
  );
}

export default Filter;
