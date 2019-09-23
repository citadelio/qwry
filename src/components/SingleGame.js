import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  changeGamePreview,
  changeSelectedGameAction
} from "../actions/settingsActions";
import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  card: {
    maxWidth: 345,
    display: "flex",
    marginBottom: 15,
    marginLeft: 0,
    marginRight: 0,
    height: 140
  }
}));

const SingleGame = ({
  id,
  title,
  source,
  changePreview,
  settings,
  changeSelectedGame
}) => {
  const classes = useStyles();
  const handleClick = () => {
    changePreview(settings.gamePreview);
    changeSelectedGame(id);
  };
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={source}
          title={title}
          onClick={handleClick}
        />
      </CardActionArea>
      <CardActions
        style={{ flexDirection: "column", justifyContent: "center" }}
      >
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className={classes.button}
          style={{ width: "80%" }}
          onClick={handleClick}
        >
          Single
        </Button>
        <Button
          variant="outlined"
          size="medium"
          disabled
          color="primary"
          className={classes.button}
          style={{ width: "80%" }}
        >
          Multiplayer
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = state => ({
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  changePreview: previewState => {
    dispatch(changeGamePreview(previewState));
  },
  changeSelectedGame: id => {
    dispatch(changeSelectedGameAction(id));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleGame);
