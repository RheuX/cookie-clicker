// import all sub type cookies (real/decoy)
import {AmongUs_Real, AmongUs_Decoy} from "./DecoyCookies/AmongUs";
import { Rotate_Real, Rotate_Decoy } from "./DecoyCookies/Rotate";

const Types = [
  { type: "AmongUs", Cookie: [AmongUs_Real, AmongUs_Decoy], decoy_amount: 5 },
  { type: "Rotate", Cookie: [Rotate_Real, Rotate_Decoy], decoy_amount: 5 },
  // { type: "ReverseDeadCookie", Cookie: [null, null], decoy_amount: 0 },
  // { type: "Other", Cookie: [null, null], decoy_amount: 0 },
];
const TotalTypeAmount = Types.length;

// return a random type-identified
const getRandomType = () => {
  const randonIndex = Math.floor(Math.random() * Types.length);

  return Types[randonIndex].type;
};

// return type-identified on given index
const getTypeAt = (index) => {
  return Types[index].type;
};

// return render-used coookie type
const getDecoyCookieType = (type, is_real) => {
  const CookieEntry = Types.find((entry) => entry.type === type);

  if (!CookieEntry) {
    console.log("Can't find given type");
    return null;
  }

  if (is_real) {
    return CookieEntry.Cookie[0];
  } else {
    return CookieEntry.Cookie[1];
  }
};

// return decoy amount on a type
const getDecoyAmount = (type) => {
  const CookieEntry = Types.find((entry) => entry.type === type);

  if (!CookieEntry) {
    console.log("Can't find given type");
    return null;
  }

  return CookieEntry.decoy_amount;
};

const decoyReversionOnType = (type) => {
  if (type === "ReverseDeadCookie") {
    return true;
  }

  return false;
};

export {
  TotalTypeAmount,
  getRandomType,
  getTypeAt,
  getDecoyCookieType,
  getDecoyAmount,
  decoyReversionOnType,
};
