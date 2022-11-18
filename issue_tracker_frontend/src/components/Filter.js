import React, { useState, useEffect } from "react";
import styles from "../styles/projectDetails.module.css";
import { labelOptions } from "../utils/constants";
import Select from "react-select";

function Filter({ issues, filteredIssues, setFilteredIssues }) {
  const [authorOptionState, setAuthorOptionState] = useState();
  const [labelOptionsState, setLabelOptionsState] = useState([]);
  const [isLabelFilter, setIsLabelFilter] = useState(false);
  const [isAuthorFilter, setIsAuthorFilter] = useState(false);
  //  <----------- Search Filter ----------------->

  useEffect(() => {
    if (!isLabelFilter) {
      if (!isAuthorFilter) {
        setFilteredIssues(issues);
      } else {
        handleAuthorChange(authorOptionState);
      }
    }

    if (!isAuthorFilter) {
      if (!isLabelFilter) {
        setFilteredIssues(issues);
      } else {
        handleLabelsChange(labelOptionsState);
      }
    }
  }, [isLabelFilter, isAuthorFilter]);

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

  const filterByLabelsArray = (searchIssues, selectedOptionsArr) => {
    let labelFilteredIssues = [];

    for (let issue of searchIssues) {
      for (let option of selectedOptionsArr) {
        if (issue.labels.includes(option)) {
          if (!labelFilteredIssues.includes(issue)) {
            labelFilteredIssues.push(issue);
          }
        } else {
          let index = labelFilteredIssues.indexOf(issue);
          if (index !== -1) {
            labelFilteredIssues.splice(index, index + 1);
          }
          break;
        }
      }
    }
    return labelFilteredIssues;
  };

  //  <----------- Labels Filter ----------------->
  let labelFilteredIssues = [];

  const handleLabelsChange = (selectedOptions) => {
    setIsLabelFilter(true);
    setFilteredIssues([]);
    setLabelOptionsState(selectedOptions);
    let selectedOptionsArr = selectedOptions.map((option) => {
      return option.value;
    });

    if (selectedOptionsArr.length === 0) {
      setIsLabelFilter(false);
    }
    let searchIssues = [];
    if (!isAuthorFilter) {
      searchIssues = issues;
    } else {
      searchIssues = filteredIssues;
    }

    const labelFilteredIssues = filterByLabelsArray(
      searchIssues,
      selectedOptionsArr
    );
    setFilteredIssues(labelFilteredIssues);
  };

  //  <----------- Author Filter ----------------->
  let authors = issues.map((issue) => issue.author);
  authors = [...new Set(authors)];

  const authorOptions = authors.map((author) => {
    let optionObject = { value: author, label: author };

    return optionObject;
  });

  const handleAuthorChange = (selectedOption) => {
    setIsAuthorFilter(true);
    setFilteredIssues([]);
    if (selectedOption === null) {
      setIsAuthorFilter(false);
    } else {
      setAuthorOptionState(selectedOption);

      let searchIssues = [];
      if (!isLabelFilter) {
        searchIssues = issues;
      } else {
        let labelOptionsArr = labelOptionsState.map((option) => {
          return option.value;
        });

        const labelFilteredIssues = filterByLabelsArray(
          issues,
          labelOptionsArr
        );

        searchIssues = labelFilteredIssues;
      }

      for (let issue of searchIssues) {
        if (issue.author.includes(selectedOption.value)) {
          if (!labelFilteredIssues.includes(issue)) {
            labelFilteredIssues.push(issue);
            setFilteredIssues(labelFilteredIssues);
          }
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
      <div className={styles.authorFilterContainer}>
        <p> Author </p>
        <Select
          options={authorOptions}
          closeMenuOnSelect={true}
          hideSelectedOptions={true}
          name="labels"
          isClearable={true}
          className="basic-single"
          classNamePrefix="select"
          onChange={handleAuthorChange}
          isRtl={false}
          isSearchable={true}
        />
      </div>
    </div>
  );
}

export default Filter;
