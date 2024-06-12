import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className='p-5 mb-4 bg-dark header'>
            <div className='container-fluid py-5 text-white d-flex justify-content-center'>
                <div className='d-flex flex-column align-items-center'>
                    <h1 className='display-5 fw-bold' style={{ color: 'rgba(106, 196, 255, 0.93)' }}>Delve into another universe!</h1>
                    <p className='col-md-8 fs-4 fw-bold text-center' style={{ color: 'rgba(106, 196, 255, 0.93)' }}>Where would you like to go next ?</p>
                    <Link type='button' className='btn main-color btn-lg text-white' to='/search'>Explore top books</Link>
                </div>
            </div>
        </div>
    );
} 