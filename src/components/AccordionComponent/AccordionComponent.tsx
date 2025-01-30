import './AccordionComponent.css';
import { useEffect, useState } from 'react';
import { breedType } from '../../utils/types/breedType';

export const AccordionComponent = () => {
  const [data, setData] = useState<breedType[] | null>(null);
  const [selected, setSelected] = useState<breedType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/breeds?limit=98');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const toggleAccordion = (breed: breedType) => {
    setSelected((prev) => (prev?.breed === breed.breed ? null : breed));
  };

  if (error) {
    return <>Oops, something went wrong, sorry</>;
  }
  
  return (
    <div className='flex flex-col p-4 gap-4 justify-center'>
      <div>List of cat breeds</div>
      <div>
        <div>Click on the breed you want to expand</div>
        <div className='flex flex-col m-4 p-4 gap-4 justify-center bg-sky-600'>
          {data === null ? (
            <span className='text-stone-300 font-bold flex flex-row justify-between m-4 p-4'>
              Loading...
            </span>
          ) : (
            data?.map((breed) => (
              <div key={breed.breed} className='flex flex-col'>
                <div
                  className='text-stone-300 font-bold flex flex-row justify-between cursor-pointer'
                  onClick={() => toggleAccordion(breed)}
                >
                  <span>{breed.breed}</span>
                  <span>{selected?.breed === breed.breed ? '↓' : '→'}</span>
                </div>
                {selected?.breed === breed.breed && (
                  <div className='bg-stone-200 text-black p-4 mt-2 rounded'>
                    <p>
                      <strong>Country:</strong> {breed.country}
                    </p>
                    <p>
                      <strong>Origin:</strong> {breed.country}
                    </p>
                    <p>
                      <strong>Coat:</strong> {breed.coat}
                    </p>
                    <p>
                      <strong>Pattern:</strong> {breed.pattern}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
