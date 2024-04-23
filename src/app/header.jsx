import React from 'react';
import { NavLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '../icons';

export default function Header({ user, navItems }) {
  function validateConstraints(constraints) {
    return constraints.every((c) => c());
  }

  const userText = user ? (user.email.charAt(0) + user.email.split('@')[1].charAt(0)).toUpperCase() : '?';
  return (
    <div className='space-y-4'>
      <header className='flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-gray-800 text-sm py-4 dark:bg-white'>
        <nav className='max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between' aria-label='Global'>
          <div className='flex items-center justify-between'>
            <img className='w-10 m-3' src='/pizza-shop-icon.png' />
            <span className='font-normal flex-none text-4xl dark:text-gray-800 bg-clip-text bg-gradient-to-tr from-orange-500 to-orange-300 text-transparent'>Pizza Shop</span>
            <div className='sm:hidden'>
              <button
                type='button'
                className='hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-lg border border-gray-700 font-medium bg-gray-800 text-gray-400 shadow-sm align-middle hover:bg-gray-700/[.25] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600 transition-all text-sm dark:bg-gray-800 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800'
                data-hs-collapse='#navbar-dark'
              >
                <HamburgerIcon />
                <CloseIcon />
              </button>
            </div>
          </div>
          <div id='navbar-dark' className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'>
            <div className='flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5'>
              {navItems.map((item) => {
                return (
                  item.display.includes('nav') &&
                  (!item.constraints || validateConstraints(item.constraints)) && (
                    <NavLink
                      key={item.title}
                      className='font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400  focus:text-orange-600'
                      to={item.to.replace(':subPath?/', '')}
                    >
                      {item.title}
                    </NavLink>
                  )
                );
              })}
            </div>
          </div>
          {user && (
            <NavLink className='font-medium text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400  focus:text-orange-600' to='dinner-dashboard'>
              <div className='hs-tooltip inline-block  [--placement:bottom]'>
                <div className='hs-tooltip-toggle pl-4 font-semibold text-orange-400'>
                  <span className='inline-flex items-center justify-center size-[30px] rounded-full bg-orange-800 font-semibold text-white leading-none'>{userText}</span>
                </div>
              </div>
            </NavLink>
          )}
        </nav>
      </header>
    </div>
  );
}
