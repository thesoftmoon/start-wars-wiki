import React, { useRef, useState } from "react";
import '../styles/Navbar.scss'
import { Link } from "react-router-dom";


function Navbar() {
  const [navBgColor, setNavBgColor] = useState(false);

  const navbarBgChange = () => {
    if (window.scrollY >= 90) {
      setNavBgColor(true);
    } else {
      setNavBgColor(false);
    }
  };

  window.addEventListener("scroll", navbarBgChange);

  const [isOpened, setIsOpened] = useState(false);

  const openMenu = useRef(null);


  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  const openRemover = () => {
    if (!isOpened) {
      openMenu.current.classList.add('open');
      openMenu.current.classList.remove('closed');
    } else if (isOpened) {
      openMenu.current.classList.remove('open');
      openMenu.current.classList.add('closed');
    }
  }

  return (
    <div className={navBgColor ? "navbar-pc navbar-background" : "navbar-pc"}>
      <div className="container">
        <div>
        <Link to='/'>
          <svg xmlns="http://www.w3.org/2000/svg" width="181" height="100" viewBox="0 0 181 100" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9473 38.4535V41.5086L30.8886 39.7001C31.9271 39.4903 33.2555 38.2615 33.2555 36.677C33.2555 36.0368 33.4992 35.5709 32.7487 34.8774L31.6053 33.7535C30.9491 33.2752 31.6835 33.1258 32.233 33.0155L36.0084 32.2508V38.6705L39.003 38.0641V31.6445L43.038 30.8282V28.079L29.971 30.7215C28.3812 31.0434 27.6041 32.7274 27.6485 33.5134C27.693 34.2995 27.8388 35.2686 29.1601 36.2022C30.364 37.054 28.5626 37.118 28.3812 37.1554L21.9473 38.4571V38.4535Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M49.6515 26.7363L44.8216 27.7126L42.115 37.4292L45.1275 36.8193L45.6166 35.4358L48.7961 34.7938L49.2674 35.9817L52.2194 35.3842L49.6515 26.7363ZM46.2887 33.0991L47.329 29.5265L48.3071 32.6918L46.2887 33.0991Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M61.7564 30.3997C60.5952 30.6344 60.5952 30.2076 60.5952 30.2076C61.5893 30.0066 62.4731 28.3777 62.4731 26.8929C62.4731 25.408 61.022 24.437 59.8607 24.6718L53.3628 25.9859V35.1548L56.6651 34.4862V31.4311C56.6651 31.4311 58.07 32.7968 58.7991 33.3214C59.5282 33.846 59.594 33.894 60.5899 33.6913L65.7718 32.6439V29.587L61.7564 30.3997ZM58.76 28.8667L56.6651 29.29V27.6397L58.76 27.2165C59.7203 27.0209 59.8874 28.6374 58.7582 28.865L58.76 28.8667Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M65.779 23.4465L69.156 22.7637L70.0131 25.648L70.808 22.4293L74.3522 21.7127L75.2698 24.5846L76.1874 21.341L79.1216 20.7471L76.431 30.4619L73.7422 31.006L72.5632 26.9035L71.2348 31.5128L68.4838 32.0694L65.779 23.4465Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M86.0534 19.3973L81.2236 20.3754L78.5152 30.0902L81.5383 29.482L82.0274 28.0985L85.2052 27.4565L85.6782 28.6444L88.6302 28.0469L86.0534 19.3973ZM82.6907 25.7618L83.7292 22.1893L84.7072 25.3529L82.6907 25.7618Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M109.618 17.331V14.5729L103.438 15.8177C101.85 16.1396 101.162 17.8716 101.206 18.6629C101.251 19.4543 101.397 20.4181 102.718 21.3517C103.922 22.2035 102.122 22.2675 101.941 22.3049C101.941 22.3049 99.1151 22.8722 98.3842 23.0162C98.1854 23.0654 97.9785 23.0726 97.7767 23.0374C97.5749 23.0022 97.3827 22.9253 97.2123 22.8117C98.2081 22.6108 99.0902 20.9836 99.0902 19.4987C99.0902 18.0139 97.6409 17.0429 96.4797 17.2776L89.9817 18.5918V27.7607L93.2822 27.092V24.0352C93.2822 24.0352 94.6889 25.4027 95.4162 25.9255C96.1435 26.4483 96.2111 26.4981 97.207 26.2971L104.43 24.7874C105.469 24.5775 107.043 23.2972 107.043 21.7091C107.043 21.069 107.053 20.7133 106.303 20.0198L105.16 18.8959C104.503 18.4176 105.103 18.2326 105.652 18.1206L109.618 17.331ZM95.3771 21.4816L93.2804 21.9065V20.2634L95.3771 19.8384C96.3338 19.6374 96.4992 21.2539 95.3735 21.4816H95.3771Z" fill="white" />
            <path d="M46.4577 61.6211L42.8388 76.9286L31.6444 79.1941L21.1648 46.9217L32.3682 44.658L37.0842 58.566L41.1743 42.8743L51.4636 40.7937L56.2508 54.6876L59.4429 39.1791L70.6355 36.9153L62.0143 73.0502L50.8199 75.3157L46.4577 61.6211Z" fill="white" />
            <path d="M78.0777 35.4091L89.2704 33.1436V67.5357L78.0777 69.7995V35.4091Z" fill="white" />
            <path d="M112.602 28.424V39.6272L120.465 26.8431L131.66 24.5793L118.845 44.3664L124.556 50.1565L134.843 48.0741V58.3188L121.267 61.0645L112.598 52.5785V62.8197L101.409 65.0764V30.6895L112.602 28.424Z" fill="white" />
            <path d="M144.126 22.0417L155.32 19.7833V54.1737L144.126 56.4374V22.0417Z" fill="white" />
            <path d="M161.671 60.9596L18.9241 89.8373C14.5548 90.7264 11 87.8811 11 83.5172V48.5667C11 44.1974 14.5566 39.9242 18.9241 39.0404L24.9811 37.8151V40.8382L18.9241 42.0635C16.2211 42.6094 14.0231 45.2537 14.0231 47.955V82.9055C14.0231 85.6067 16.2211 87.3619 18.9241 86.8177L161.669 57.9401C164.372 57.3942 166.57 54.7498 166.57 52.0486V17.0945C166.57 14.3933 164.372 12.6381 161.669 13.1823L109.618 23.7169L110.742 20.4662L161.674 10.1627C166.043 9.27358 169.598 12.1189 169.598 16.4828V51.4333C169.595 55.8026 166.04 60.0758 161.671 60.9596Z" fill="white" />
          </svg>
        </Link>

        </div>
        <div
          className={isOpened ? "navbar-links-mo worked" : "navbar-links-mo"}
        >
          <button
            className={isOpened ? "opened menu" : "menu"}
            onClick={() => { handleClick(); openRemover(); }}
            aria-label={isOpened}
          >
            <svg width="60" height="60" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
          <div ref={openMenu} className='links-mo'>
          <Link className='navbar-mo-btn' to='/characters'><h2>Personajes</h2></Link>
          <Link className='navbar-mo-btn' to='/ships'><h2>Naves</h2></Link>
          <Link className='navbar-mo-btn' to='/planets'><h2>Planetas</h2></Link>
          </div>
        </div>

        <div className="navbar-links-pc d-none d-md-flex">
        <Link className='navbar-btn' to='/characters'>Personajes</Link>
          <Link className='navbar-btn' to='/ships'>Naves</Link>
          <Link className='navbar-btn' to='/planets'>Planetas</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;