import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = ({allToys, likeToy, donateToy}) => {
  return(
    <div id="toy-collection">
      {allToys.map(toy => <ToyCard toy={toy} key={toy.id} likeToy={likeToy} donateToy={donateToy}/>)}
    </div>
  );
}

export default ToyContainer;
