import './Carousel.scss';
import type { Slide } from '../../modals/Slide';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../ui/Loader';

const Carousel: React.FC<{ slides: Slide[] , loading: boolean }> = ({ slides, loading }) => {
    const [currrent, setCurrent] = useState(0);
    const navigate = useNavigate();
    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
    const nextSlide = () => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
    if (loading) {
        return <Loader />;
    }
    if (!slides || slides.length === 0) {
        return <div >No slides available</div>;
    }
    return (
        <>
        <div className="carousel">
            <button className='prev' onClick={prevSlide}>&#10094;</button>
            <div className="slide" onClick={() => navigate(slides[currrent].link)}>
                <img src={`/images/slides/${slides[currrent].image}`} alt={slides[currrent].title} />
                <div className="overlay">
                    <h2>{slides[currrent].title}</h2>
                    <p>{slides[currrent].subtitle}</p>
                </div>
            </div>
            <button className='next' onClick={nextSlide}>&#10095;</button>
        </div>
        <div className='brands'>
            
            {[1, 2, 3, 4, 5].map((num) => (
                <img key={num} src={`/images/brands/brand${num}.png`} alt={`Brand ${num}`} />
            ))}

        </div>
        </>
    );
}

export default Carousel;