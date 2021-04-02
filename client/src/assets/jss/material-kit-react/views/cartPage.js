import { containerFluid } from "assets/jss/material-kit-react.js";

const cartPageStyle = {
    container: {
        ...containerFluid,
        zIndex: "2",
        position: "relative",
        paddingTop: '5vh',
        "@media (min-width: 576px)": {
          maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
          maxWidth: "90%"
        },
        "@media (min-width: 992px)": {
          maxWidth: "960px"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "75%"
        }
      },
      checkout: {
        "@media (min-width: 576px)": {
          maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
          maxWidth: "60%"
        },
        "@media (min-width: 992px)": {
          maxWidth: "40%"
        },
        "@media (min-width: 1200px)": {
          maxWidth: "35%"
        },
      }, 
      cartItem: {
        "@media (min-width: 576px)": {
          maxWidth: "540px"
        },
        "@media (min-width: 768px)": {
          maxWidth: "60%"
        },
        "@media (min-width: 992px)": {
          maxWidth: "55%",
          marginRight: '5%'
        },
        "@media (min-width: 1200px)": {
          maxWidth: "40%",
          marginRight: '5%'
        },
      },
      main: {
        background: "#FFFFFF",
        position: "relative",
        zIndex: "3"
      },
      mainRaised: {
        margin: "-60px 30px 0px",
        borderRadius: "6px",
        boxShadow:
          "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
      },
      card: {
        display: 'flex',
        flexDirection: 'column'
      },
}

export default cartPageStyle