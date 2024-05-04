

import React, { useEffect, useRef, useState } from 'react';
import './ToastNotification.css';

const Component2 = () => {
    const [toastList, setToastList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const modalRef = useRef(null);

    const handleButtonClick = (event) => {
        event.preventDefault(); 
    
        const customText = document.getElementById('toastText').value;
    
        const newToast = {
            id: new Date().getTime(),
            message: customText !== '' ? `${customText} : ${toastList.length + 1}` : `Testing: ${toastList.length + 1}`,
        };
    
        const timeoutSeconds = inputValue === '' ? 7 : parseInt(inputValue);
        const timeoutMilliseconds = timeoutSeconds * 1000;
    
        const timeoutId = setTimeout(() => {
            removeToast(newToast.id);
        }, timeoutMilliseconds);
    
        setToastList([...toastList, { ...newToast, timeoutId }]);
    };

    const removeToast = (id) => {
        setToastList((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = () => {
        const newValue = parseInt(inputValue);
        if (!isNaN(newValue)) {
            setInputValue(newValue.toString());
        } else {
            setInputValue('7'); 
        }
        handleCloseModal();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div>
                <div className='SecondComponent_top' >
                    <form className="SecondComponent_form">
                        <div className="SecondComponent">
                            <label htmlFor="toastText">Enter Custom Toast Text</label>
                            <input className="SecondComponent_input" placeholder="Enter Here" id="toastText" type="text" />
                            <div>
                                <button className="btncom2" onClick={handleButtonClick}>
                                    Show Custom Toast Message
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <button
                            onClick={handleOpenModal}
                            className="btn__setting">
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="gear"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                style={{ width: '16px', height: '15px' }}
                            >
                                <path
                                    fill="currentColor"
                                    d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="toast-container">
                        {toastList.slice(-3).map((toast) => (
                            <div key={toast.id} className="toast-notification">
                                <div>
                                    <span onClick={() => removeToast(toast.id)} className="close-toast">
                                        <svg
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fas"
                                            data-icon="times"
                                            className="svg-inline--fa fa-times fa-w-11"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 352 512"
                                            style={{ width: '16px', height: '15px' }}
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M217.94 256l127.07-127.07c12.28-12.28 12.28-32.19 0-44.48L328.12 37.89c-12.28-12.28-32.19-12.28-44.48 0L176 164.06 48.93 37.99c-12.28-12.28-32.19-12.28-44.48 0L4.73 83.1c-12.28 12.28-12.28 32.19 0 44.48L131.8 256 4.73 383.07c-12.28 12.28-12.28 32.19 0 44.48l43.82 43.82c12.28 12.28 32.19 12.28 44.48 0L176 307.94l127.07 127.07c12.28 12.28 32.19 12.28 44.48 0l43.82-43.82c12.28-12.28 12.28-32.19 0-44.48L217.94 256z"
                                            ></path>
                                        </svg>
                                    </span>
                                </div>
                                <div className="toast-content">
                                    <p>{toast.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showModal && (
                        <div className="Modal_backdrop">
                            <div ref={modalRef} className="Modal_view">
                                <button className="Modal_close" onClick={handleCloseModal}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="times"
                                        className="svg-inline--fa fa-times fa-w-11"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 352 512"
                                        style={{ width: '1.5rem', height: '1.5rem' }} 
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M217.94 256l127.07-127.07c12.28-12.28 12.28-32.19 0-44.48L328.12 37.89c-12.28-12.28-32.19-12.28-44.48 0L176 164.06 48.93 37.99c-12.28-12.28-32.19-12.28-44.48 0L4.73 83.1c-12.28 12.28-12.28 32.19 0 44.48L131.8 256 4.73 383.07c-12.28 12.28-12.28 32.19 0 44.48l43.82 43.82c12.28 12.28 32.19 12.28 44.48 0L176 307.94l127.07 127.07c12.28 12.28 32.19 12.28 44.48 0l43.82-43.82c12.28-12.28 12.28-32.19 0-44.48L217.94 256z"
                                        ></path>
                                    </svg>
                                </button>
                                <div className="Modal_form">
                                    <div className="Modal_control">
                                        <label htmlFor="inputNumber" className="Modal_label">Set Timeout:</label>
                                        <input
                                            type="number"
                                            id="inputNumber"
                                            className="Modal_input"
                                            value={inputValue}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <button className="Modal_btn" onClick={handleSubmit}>Submit</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <footer class="Footer_footer">Footer</footer>
        </>
    );
};

export default Component2;
