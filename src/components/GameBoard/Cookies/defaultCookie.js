import brownCookie from "../../../assets/Cookie_R_01.png";

const defaultCookieStyle = {
  width: "100px",
  height: "100px",
  backgroundImage: `url(${brownCookie})`, // Use the imported cookieImage as the background
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundColor: "transparent",
  borderRadius: "25%",
  cursor: "pointer",
  border: "none", // Remove the button border if desired
  position: "absolute",
  top: "40%",
  left: "45%",
};

export default defaultCookieStyle;
