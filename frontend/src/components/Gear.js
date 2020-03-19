import React, { PropTypes } from 'react';

/*const propTypes = {
  name: PropTypes.string.isRequired,
  cost: PropTypes.number,
  damage: PropTypes.string,
  type: PropTypes.string,
  subtype: PropTypes.string,
  description: PropTypes.string,
  rarity: PropTypes.number
};

class Gear extends React.Component {
  render() {
    const { name, cost, damage, type, subtype, description, rarity} = this.props;
    return (
      <li>
        <span>
          <div>
            <h1> {name} </h1>
          </div>
          <div>
            <h2>Type: </h2>
            <div>{type}</div>
            <h2>Subtype: </h2>
            <div>{subtype}</div>
            <h2>Damage: </h2>
            <div>{damage}</div>
          </div>
        </span>
      </li>
    );
  }
}

//Gear.PropTypes = propTypes;

export default Gear;

*/

const Gear = ({ gear }) => {
  return (
    <li>
      <span>
        <div>
          <h1> {gear.name} </h1>
        </div>
        <div>
          <h2>Type: </h2>
          <div>{gear.type}</div>
          <h2>Subtype: </h2>
          <div>{gear.subtype}</div>
          <h2>Damage: </h2>
          <div>{gear.damage}</div>
        </div>
      </span>
    </li>
  )
}

export default Gear
