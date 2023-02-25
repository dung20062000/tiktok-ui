import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faCoins,
  faGear,
  faUser,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes'
import Button from '~/components/Button';
import styles from './Header.module.scss';
import images from '~/assets/images/imdex.js';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';
import { UploadIcon, MessageIcon } from '~/components/icons';
import Search from '../Search'

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
  //biến currentUser để ví dụ có người đang đăng nhập
  const currentUser = true

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
        <Link to={routesConfig.home} className={cx('logo')}>
          <img src={images.logo} alt="tiktok" />
        </Link>
        {/* search */}
        <Search/>

        <div className={cx('actions')}>
        {currentUser ? (
          <>
            <Tippy delay={[0, 200]} content="Upload video" placement='bottom'>
              <button className={cx('acction-btn')}>
                <UploadIcon/>
              </button>
            </Tippy>

            <Tippy content="Tin nhắn" placement='bottom'>
              <button className={cx('acction-btn')}>
                <MessageIcon/>
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
                <Image src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7f21825ffcf04729c9103f2cbaaa91c8~c5_100x100.jpeg?x-expires=1676872800&x-signature=b0uhEB3Yw2Ci3yG7xV6584qz%2Fd0%3D'
                 className={cx('user-avatar')}
                 alt="Nguyen Văn A"
                 />
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
