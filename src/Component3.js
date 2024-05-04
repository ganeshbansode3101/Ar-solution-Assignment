import React, { useEffect, useRef, useState } from 'react';
import './ToastNotification.css';

const Component3 = () => {
  const [toastList, setToastList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = async (e) => {
    e.preventDefault(); 
    const customText = document.getElementById('toastText').value;
    if (!customText) {
      alert('Please enter a time.');
      return;
    }

    setLoading(true);

    try {
      const timeoutSeconds = parseInt(customText);

      let countdown = timeoutSeconds;
      const intervalId = setInterval(() => {
        if (countdown === 0) {
          clearInterval(intervalId);
          handleTimerEnd();
        } else {
          const newToast = {
            id: new Date().getTime(),
            message: `${countdown--} : 1`,
          };
          setToastList([...toastList, newToast]);
        }
      }, 800);
    } catch (error) {
      console.error('Error starting countdown:', error);
      setLoading(false);
    }
  };

  const handleTimerEnd = async () => {
    try {
      const response = await fetch('https://api.knowmee.co/api/v1/master/get-country-list');
      const data = await response.json();
      setCountryList(data?.responseData);

      setLoading(false);
      setToastList([]);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const removeToast = (id) => {
    setToastList((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <div>
        {!loading && countryList.length === 0 && (
          <div className='SecondComponent_top'>
            <form className="SecondComponent_form">
              <div className="SecondComponent">
                <label htmlFor="toastText">Enter Countdown Time</label>
                <input
                  value={inputValue}
                  onChange={handleInputChange}
                  className="SecondComponent_input"
                  placeholder="Enter Here"
                  id="toastText"
                  type="text"
                />
                <div>
                  <button className="btncom2" onClick={handleButtonClick}>
                    Start Timer
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}


        {loading && countryList.length === 0 ? (
          <div className='section'>
            <h1>Fetching Data, Please wait...</h1>  
          </div>
        ) : (
          <>
            {
              !countryList.length == 0 ?
                <section className="ThirdComponent_section">
                  <div className="CountryList_container">
                    <div className="CountryList_wrapper"><button onClick={handlePrevPage} disabled={currentPage === 1} className="CountryList_btn">Previous</button><button className="CountryList_btn" onClick={handleNextPage} disabled={currentPage * itemsPerPage >= countryList.length} fdprocessedid="d0mdhs">Next</button></div>
                    <ul className="CountryList_list">
                      {Array.isArray(countryList) && countryList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((country, index) => (
                        <li className="CountryList_item" key={index}>{country?.country_name}</li>
                      ))}
                    </ul>

                  </div>
                </section> : null
            }


          </>



        )}

        {/* Toast notifications */}
        <div className="toast-container">
          {toastList.map((toast) => (
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
        
      </div>
      <footer class="Footer_footer">Footer</footer>
    </>
  );
};

export default Component3;
