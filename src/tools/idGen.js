
/*
  Author:       RedFoxFinn - Antti Aarnio
  Project:      solita-academy-vaccine
  File:         ./src/tools/idGen.js
  Description:  Tool that generates id's for the components or elements using parent id
*/

const idGen = (parentId, idFor, ...rest) => {
  switch (idFor) {
    case 'header': return `${parentId}.header`;
    case 'heading': return `${parentId}.heading`;
    case 'footer': return `${parentId}.footer`;
    case 'order': return `${parentId}.order.${rest[0]}`;
    case 'vaccination': return `${parentId}.vaccination.${rest[0]}`;
    case 'routing': return `${parentId}.routing`;
    case 'navigator': return `${parentId}.navigator`;
    case 'navlink': return `${parentId}.navlink.${rest[0]}`;
    case 'home': return `${parentId}.home`;
    case 'data': return `${parentId}.datavis`;
    case 'orders': return `${parentId}.orders`;
    case 'vaccinations': return `${parentId}.vaccinations`;
    default: return `${parentId}.default`;
  }
};

export default idGen;