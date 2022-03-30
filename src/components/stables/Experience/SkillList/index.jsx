import React from "react";
import EmptyState from "../../../EmptyState";
import EmptySkillsImg from "../../../../assets/states/EmptySkills.svg";
import { connect } from "react-redux";
import { LoadingFill } from "../../../../components/Loading";
import { makeStyles } from "@material-ui/styles";
import Chip from "@material-ui/core/Chip";
import skillDict from "../Skill/skill.json";

const styles = makeStyles(theme => ({
  chip: {
    margin: "2px",
  },
}));

function SkillList({ isLoading, onAdd, skills }) {
  const classes = styles();

  return (
    <React.Fragment>
      {isLoading ? (
        <LoadingFill />
      ) : skills.length === 0 ? (
        <EmptyState
          imgSrc={EmptySkillsImg}
          description="Dengan menambah <b>skill</b>, teman-teman Anda akan tertarik dengan apa yang Anda kuasai"
          ButtonProps={{
            onClick: onAdd,
          }}
        />
      ) : (
        skills.map(skill => (
          <Chip className={classes.chip} label={skillDict[skill]} />
        ))
      )}
    </React.Fragment>
  );
}

function createContainer() {
  const mapStateToProps = state => ({});

  return connect(mapStateToProps)(SkillList);
}

export default createContainer();
