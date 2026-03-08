import React, { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { CloseOutlined, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Button, MenuItem, Menu } from "@mui/material";


const Navbar = ({ loading, setLoading }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    setLoading(true);
    handleClose();
  };

  return (
    <div className='w-full h-[150px] flex justify-center z-10 bg-transparent flex-shrink-0 relative'>

      <div className='flex justify-center items-center w-[90%] h-full relative'>

        <div className='flex h-full absolute left-0'>

          <div className='flex h-full gap-1 items-center'>
            <Image
                src={"/logo/uncle-drew-logo.png"}
                alt='uncle-drew-navbar-logo'
                width={500}
                height={500}
                className='sm:w-[80px] sm:h-[80px] w-[40%] h-[40%]'
            />

            <div className='flex h-fit gap-2 font-moderniz'>
              <p 
                className="flex flex-col gap-1"
              >
                  <span 
                    className='text-[var(--text-white)] sm:text-[14px] text-[2.5vw]'
                    style={{ letterSpacing: '0.2em' }}
                  >
                    UNCLE
                  </span>
                  <span 
                    className='text-[var(--text-blue)] sm:text-[8px] text-[1.5vw]'
                    style={{ letterSpacing: '0.6em' }}
                  >
                    SPORTS
                  </span>
              </p>
              <p 
                className="flex flex-col gap-1"
              >
                <span 
                  className='text-[var(--text-white)] sm:text-[14px] text-[2.5vw]'
                  style={{ letterSpacing: '0.2em' }}
                >
                  DREW
                </span>
                <span 
                  className='text-[var(--text-blue)] sm:text-[8px] text-[1.5vw]'
                  style={{ letterSpacing: '0.6em' }}
                >
                  CENTER
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className='lg:flex hidden gap-24 justify-between'>
          <Link href="/" className='text-[var(--text-white)]'>Home</Link>
          <Link href="/#contact-us" className='text-[var(--text-white)]'>Contact Us</Link>
          <button
              type='button'
              onClick={handleClick}
              className='text-[var(--text-white)]'
          >
            Book
            {open ? <ArrowDropUp /> : <ArrowDropDown />}
          </button>
          <Menu
            id="booking-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Link href="/booking/search-booking">
              <MenuItem onClick={handleMenuItemClick}>
                Search Booking
              </MenuItem>
            </Link>
            <Link href="/booking/booking-form">
              <MenuItem onClick={handleMenuItemClick}>
                Booking Form
              </MenuItem>
            </Link>
          </Menu>
        </div>

        <div className='lg:flex hidden h-full absolute top-0 lg:right-15 right-18'>

          <div className='flex h-full w-fit items-center justify-center gap-10'>
            <Link 
              href="https://www.facebook.com/profile.php?id=61564280814117"
              aria-label="Visit our Facebook page"
            >
              <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.08988 24.5137V13.5669H11.7628L12.3138 9.29955H8.08988V6.57544C8.08988 5.34031 8.43146 4.49859 10.2046 4.49859L12.4625 4.49766V0.680748C12.072 0.630006 10.7317 0.513672 9.1717 0.513672C5.91418 0.513672 3.68402 2.50203 3.68402 6.15279V9.29955H0V13.5669H3.68402V24.5137H8.08988Z" fill="white"/>
              </svg>
            </Link> 
            <Link 
              href="https://www.google.com/search?sxsrf=AE3TifNJpQVZ87EwHujxfzNMfYK82cUuxg:1748069099470&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5VDQqw4C8RI0q3J5IALi0TeAymfFdTISnJQexdoKDti0f8ox0aEalsomU9KmITB_qrknUhXzYXd0pZOfpMpd-kX8FOU7N4Vea-Ma7yG4oW6rRdAO4QKgw_6HxqQxH3N-qgTpzA%3D&q=UNCLE+DREW+Sports+Center+salawag+Reviews"
              aria-label="Read our Google reviews"
            >
              <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.57135 0.513672C4.10032 0.513672 0.462891 4.1511 0.462891 8.62208C0.462891 14.1707 7.71916 22.3164 8.02811 22.6605C8.31829 22.9837 8.82493 22.9831 9.11458 22.6605C9.42353 22.3164 16.6798 14.1707 16.6798 8.62208C16.6797 4.1511 13.0423 0.513672 8.57135 0.513672ZM8.57135 12.7016C6.32186 12.7016 4.49182 10.8716 4.49182 8.62208C4.49182 6.3726 6.3219 4.54256 8.57135 4.54256C10.8208 4.54256 12.6508 6.37264 12.6508 8.62213C12.6508 10.8716 10.8208 12.7016 8.57135 12.7016Z" fill="white"/>
              </svg>
            </Link> 

          </div>
        </div>
        
        {/* Menu Button */}
        <div className='lg:hidden flex w-fit h-fit absolute right-5'>
          <Button 
            aria-label="Open menu"
            sx={{
              backgroundColor: 'var(--text-blue)',
              color: 'white',
              padding: '0px',
              paddingX: '10px',
              paddingY: '1px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgb(13, 156, 230, 0.4)',
              }
            }}
            onClick={() => setShowMenu(true)}
            variant="contained">
            <MenuIcon sx={{ fontSize: 40 }} />
          </Button>
        </div>

        
      </div>

      <div className={`lg:hidden ${showMenu ? "flex" : "hidden"} fixed top-0 left-0 w-full h-screen bg-black/[.5] z-20`}>
            <div className='h-full md:w-[45%] sm:w-[50%] w-[60%] bg-black flex flex-col'>

                <div className='h-fit w-[94%] flex justify-end mt-5'>
                    <IconButton
                        sx={{ color: "white" }}
                        onClick={() => setShowMenu(false)}
                    >
                        <CloseOutlined sx={{ fontSize: 30 }} />
                    </IconButton>
                </div>

                <div className='flex flex-col justify-between text-[20px] pl-8 pt-20 gap-5'>
                  <Link href="/" className='text-[var(--text-white)]'>Home</Link>
                  <Link href="/#contact-us" className='text-[var(--text-white)]'>Contact Us</Link>
                  <button
                      type='button'
                      onClick={handleClick}
                      className='text-[var(--text-white)] w-fit'
                  >
                    Book
                    {open ? <ArrowDropUp /> : <ArrowDropDown />}
                  </button>
                  <Menu
                    id="booking-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                  >
                    <Link href="/booking/search-booking">
                      <MenuItem onClick={handleMenuItemClick}>
                        Search Booking
                      </MenuItem>
                    </Link>
                    <Link href="/booking/booking-form">
                      <MenuItem onClick={handleMenuItemClick}>
                        Booking Form
                      </MenuItem>
                    </Link>
                  </Menu>
                </div>

                <div className='flex h-fit mt-12 pl-8'>
                  <div className='flex h-full w-fit items-center justify-center gap-10'>
                    <Link 
                      href="https://www.facebook.com/profile.php?id=61564280814117"
                      aria-label="Visit our Facebook page"
                    >
                      <svg width="13" height="25" viewBox="0 0 13 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08988 24.5137V13.5669H11.7628L12.3138 9.29955H8.08988V6.57544C8.08988 5.34031 8.43146 4.49859 10.2046 4.49859L12.4625 4.49766V0.680748C12.072 0.630006 10.7317 0.513672 9.1717 0.513672C5.91418 0.513672 3.68402 2.50203 3.68402 6.15279V9.29955H0V13.5669H3.68402V24.5137H8.08988Z" fill="white"/>
                      </svg>
                    </Link> 
                    <Link 
                      href="https://www.google.com/search?sxsrf=AE3TifNJpQVZ87EwHujxfzNMfYK82cUuxg:1748069099470&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E5VDQqw4C8RI0q3J5IALi0TeAymfFdTISnJQexdoKDti0f8ox0aEalsomU9KmITB_qrknUhXzYXd0pZOfpMpd-kX8FOU7N4Vea-Ma7yG4oW6rRdAO4QKgw_6HxqQxH3N-qgTpzA%3D&q=UNCLE+DREW+Sports+Center+salawag+Reviews"
                      aria-label="Read our Google reviews"
                    >
                      <svg width="17" height="23" viewBox="0 0 17 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.57135 0.513672C4.10032 0.513672 0.462891 4.1511 0.462891 8.62208C0.462891 14.1707 7.71916 22.3164 8.02811 22.6605C8.31829 22.9837 8.82493 22.9831 9.11458 22.6605C9.42353 22.3164 16.6798 14.1707 16.6798 8.62208C16.6797 4.1511 13.0423 0.513672 8.57135 0.513672ZM8.57135 12.7016C6.32186 12.7016 4.49182 10.8716 4.49182 8.62208C4.49182 6.3726 6.3219 4.54256 8.57135 4.54256C10.8208 4.54256 12.6508 6.37264 12.6508 8.62213C12.6508 10.8716 10.8208 12.7016 8.57135 12.7016Z" fill="white"/>
                      </svg>
                    </Link> 

                  </div>
                </div>

            </div>
      </div>

    </div>
  )
}

export default Navbar
