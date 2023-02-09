import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleXmark,
  faSpinner,
  faMagnifyingGlass,
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faCloudUpload,
  faMessage,
  faCoins,
  faGear,
  faUser,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import HeadlessTippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Header.module.scss';
import images from '~/assets/images/imdex.js';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
const cx = classNames.bind(styles);

//mảng ví dụ để render ra danh sách phần tử của nút more-btn
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code:'en',
          title:'English',
        },
        {
          type: 'language',
          code:'vi',
          title:'Tiếng Việt',
        }
      ]
    }
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: 'Feedback and help',
    to:'/feedback',
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: 'Keyboard shortcuts',
  },

]

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  //biến currentUser để ví dụ có người đang đăng nhập
  const currentUser = true

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([]);
    }, 0);
  }, []);

  const handlemenuChange = (menuItem) => {
    switch(menuItem.type) {
      case 'language':
        //change language
        break;
      default:
    }
  }

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'View profile',
      to:'/@hoaa',
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: 'Get coins',
      to:'/coins',
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: 'Settings',
      to:'/settings',
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Log out',
      to:'/Logout',
      separate: true,
    },
  ]

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        <div className={cx('logo')}>
          <img src={images.logo} alt="tiktok" />
        </div>
        {/* search */}
        <HeadlessTippy
          visible={searchResult.length > 0}
          interactive
          render={(attrs) => (
            <div className={cx('search-result')} tabIndex="-1" {...attrs}>
              <PopperWrapper>
                <h4 className={cx('search-title')}>Accounts</h4>
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
              </PopperWrapper>
            </div>
          )}
        >
          <div className={cx('search')}>
            <input placeholder="Search accounts and video" spellCheck={false} />
              {/* clear xóa ô tìm kiếm */}
            <button className={cx('clear')}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
            {/* loading icon */}
            <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

            <button className={cx('search-btn')}>
              {/* search icon */}
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

        <div className={cx('actions')}>
        {currentUser ? (
          <>
            <Tippy delay={[0, 200]} content="Upload video" placement='bottom'>
              <button className={cx('acction-btn')}>
              <FontAwesomeIcon icon={faCloudUpload} />
              </button>
            </Tippy>

            <Tippy content="Tin nhắn" placement='bottom'>
              <button className={cx('acction-btn')}>
                <FontAwesomeIcon icon={faMessage} />
              </button>
            </Tippy>
          </>
        ) : (
            <>
            <Button text>Upload</Button>
            <Button primary>Log in</Button>
            </>
        )}
            <Menu
              items={currentUser ? userMenu : MENU_ITEMS }
              onChange = {handlemenuChange}
            >
              {currentUser ? (
                <img src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/d95c70517212d1d9f87629f452a68870.jpeg?x-expires=1676019600&x-signature=%2BtJoazD9acFSxkh5G6l0LHidssM%3D'
                 className={cx('user-avatar')}
                 alt="Nguyen Văn A"/>

              ) : (

                <button className={cx('more-btn')}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>
              ) }
            </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
