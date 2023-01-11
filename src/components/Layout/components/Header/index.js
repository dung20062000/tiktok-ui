import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images/imdex.js';


const cx = classNames.bind(styles);
function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        {/* logo */}
        <div className={cx('logo')}>
          <img src={images.logo} alt='tiktok' />
        </div>
        {/* search */}
        <div className={cx('search')}>
          <input placeholder="Search accounts and video" spellCheck={false} />
          <button className={cx('clear')}>
            {/* clear xóa ô tìm kiếm */}
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          {/* loading icon */}
          <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

          <button className={cx('search-btn')}>
            {/* search icon */}
            <FontAwesomeIcon icon={faMagnifyingGlass} />

          </button>

        </div>
        <div className={cx('actions')}>

        </div>
      </div>
    </header>
  );
}

export default Header;
