import "./coverImage.css";
import dummyBanner from './dummyBanner.jpeg';

const CoverImage = () => {
  return (
    <div className="cover-image">
     <img src={dummyBanner} alt="cover-pic"/>
    </div>
  );
};

export default CoverImage;
