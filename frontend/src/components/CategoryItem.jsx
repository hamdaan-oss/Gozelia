// CategoryItem component
import { NavLink } from 'react-router-dom';

// Category component for rendering each category item
const CategoryItem = ({ refProp, index, imgSrc, title }) => {
  return (
    <NavLink to={`/category/${title.toLowerCase()}`} ref={refProp} data-index={index} className='bg-black w-full md:w-1/4 md:h-[25vw] relative cursor-pointer'>
      <img src={imgSrc} alt={title} className='aspect-square w-full h-full opacity-80 transition-opacity duration-300 hover:opacity-100' />
      <p className='absolute inset-0 flex justify-center text-white text-xl md:mt-10 mt-10'>{title}</p>
    </NavLink>
  );
};

export default CategoryItem;
