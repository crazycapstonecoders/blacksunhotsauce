import { containerFluid, container, title } from "assets/jss/material-kit-react.js";

const userDashboardPageStyle = {
  container: {
    ...containerFluid,
    zIndex: "2",
    position: "relative",
    paddingTop: '5vh',
    "@media (min-width: 576px)": {
      maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
      maxWidth: "100%"
    },
    "@media (min-width: 992px)": {
      maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
      maxWidth: "100%",
    }
  },
  infoItem: {
    "@media (min-width: 576px)": {
      maxWidth: "58%",
      marginLeft: '25%'
    },
    "@media (min-width: 768px)": {
      maxWidth: "50%",
      marginLeft: '25%'
    },
    "@media (min-width: 992px)": {
      maxWidth: "50%",
      marginLeft: '25%'
    },
    "@media (min-width: 1200px)": {
      marginLeft: '25%',
      width: '50%'
    },
  },
  header: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  headerContainer: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
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
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px"
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important"
  },
  form: {
    margin: "0"
  },
  table: {
    minWidth: 650,
  }
}

export default userDashboardPageStyle