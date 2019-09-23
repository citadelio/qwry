import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";

import GameEnvironment from "../GameEnvironment";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

const Memory = () => {
  const classes = useStyles();

  return (
    <GameEnvironment>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          Memory
        </Typography>
        <Typography component="p">
          How well can you concentrate, This game will test your memory and
          concentration level (still developing...)
        </Typography>
      </Paper>
    </GameEnvironment>
  );
};

export default Memory;
