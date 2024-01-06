// import all sub type decoys

// implment function to return a type-identified

// implment a function to return the type 
//  - base on given identifier and real/decoy

// implment a function to return the the sub-type style 
//  - base on given identifier and real/decoy
//  - and give base style

// implment a function to return the the sub-type decoy amount
//  - base on given type

/****** sample ******/
// ChildTypeSelector.js
import ChildTypeA from './ChildTypeA';
import ChildTypeB from './ChildTypeB';
import ChildTypeC from './ChildTypeC';

const getChildComponentByType = (type) => {
  switch (type) {
    case 'A':
      return ChildTypeA;
    case 'B':
      return ChildTypeB;
    default:
      return ChildTypeC;
  }
};

export default getChildComponentByType;
