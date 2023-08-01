import * as React from "react";
import Loading from "./Loading";
// import Navi_Opening from "./src/Navi_Opening";
import Main from "./src/Main";
import * as Font from "expo-font";

const getFonts = async () => {
  await Font.loadAsync({
    "Montserrat": require("./assets/Montserrat/Montserrat-VariableFont_wght.ttf"),
    "Montserrat-Bold": require("./assets/Montserrat/static/Montserrat-Bold.ttf"),
  });
};

export default class extends React.Component {
  state = {
    isLoading: true,
  };
  componentDidMount = async () => {
    // 1,000가 1초
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  };

  render() {
    getFonts();
    if (this.state.isLoading) {
      return <Loading />;
    } else {
      return <Main />;
    }
  }
}
