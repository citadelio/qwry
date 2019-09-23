import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BottomNavigationAction, BottomNavigation } from "@material-ui/core";
import { SettingsRounded, EqualizerRounded } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState("pause");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
      style={{ position: "fixed", bottom: 0 }}
    >
      <BottomNavigationAction
        label="Stats"
        value="stat"
        icon={<EqualizerRounded />}
      />

      <BottomNavigationAction
        label="Menu"
        value="more"
        icon={<SettingsRounded />}
      />
    </BottomNavigation>
  );
};

const styles = {
  hidden: {
    display: "none"
  },
  block: {
    display: "block"
  }
};
export default BottomNav;
