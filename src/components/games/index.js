import React from "react";
import { connect } from "react-redux";

import Meaning from "./Meaning";
import Memory from "./Memory";
import Vocab from "./Vocab";
import Scrambled from "./Scrambled";
import Paused from "./paused";

const Index = ({ settings }) => {
  if (settings.pauseState) {
    return <Paused />;
  } else {
    if (settings.selectedGameId === 1) return <Scrambled />;
    else if (settings.selectedGameId === 2) return <Vocab />;
    else if (settings.selectedGameId === 3) return <Meaning />;
    else if (settings.selectedGameId === 4) return <Memory />;
  }
};

const mapStateToProps = state => ({
  settings: state.settings
});

export default connect(mapStateToProps)(Index);
