// import all sub type cookies (real/decoy)
// import Basic_Real from "./DecoyCookies/Basic_Real";

const Types = [
  { type: "Other", effect: null},
];
const TotalEffectTypeAmount = Types.length;

// return a random type-identified
const getRandomEffectType = () => {
  const randonIndex = Math.floor(Math.random() * Types.length);

  return Types[randonIndex].type;
};

// return type-identified on given index
const getEffectTypeAt = (index) => {
  return Types[index].type;
};

// return render-used coookie type
const getEffectType = (type) => {
  const effectEntry = Types.find((entry) => entry.type === type);

  if (!effectEntry) {
    console.log("Can't find given type");
    return null;
  }

  return effectEntry.effect;
};


export {
  TotalEffectTypeAmount,
  getRandomEffectType,
  getEffectTypeAt,
  getEffectType,
};
