import './AccordionComponent.css';
import { useEffect, useState } from 'react';
import { breedType } from '../../utils/types/breedType';

export const AccordionComponent = () => {
  const [data, setData] = useState<breedType[] | null>();
  const [selected, setSelected] = useState<breedType | null>();
  const [arrowDirection, setArrowDirection] = useState('→');

  useEffect(() => {
    const fetchData = async () => {
      const response = await (await fetch('/api/breeds?limit=98')).json();
      setData(response.data);
    };
    fetchData();
  }, []);

  const expandBreed = (breed: breedType) => {
    setSelected(breed);
    setArrowDirection('↓');
  };

  return (
    <div className='flex flex-col p-4 gap-4 justify-center'>
      <div>List of cat breeds</div>
      <div>
        <div>Click on the breed you want to expand</div>
        <div className='flex flex-col m-4 p-4 gap-4 justify-center bg-sky-600'>
          {data?.map((breed) => {
            return (
              <div
                key={breed.breed}
                className='text-stone-300 font-bold flex flex-row justify-between'
                onClick={() => expandBreed(breed)}
              >
                <span>{breed.breed}</span>
                <span>{arrowDirection}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
