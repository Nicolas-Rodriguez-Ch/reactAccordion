import './AccordionComponent.css';
import { useEffect, useState } from 'react';
import { breedType } from '../../utils/types/breedType';

export const AccordionComponent = () => {
  const [data, setData] = useState<breedType[] | null>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await (await fetch('/api/breeds?limit=98')).json();
      setData(response.data);
    };
    fetchData();
  }, []);
  console.log(data);

  return (
    <>
      <div className='p-4'>List of cat breeds</div>
    </>
  );
};
