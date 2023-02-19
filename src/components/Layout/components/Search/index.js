import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import style from './Search.module.scss';
import { useState, useEffect, useRef } from 'react';

const cx = classNames.bind(style);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([])
    inputRef.current.focus();
  }

  useEffect(() => {
    setTimeout(() => {
      setSearchResult([1, 1, 1, 1]);
    }, 0);
  }, []);

  const handleHideResult = () => {
    setShowResult(false);
  };

  return (
    <HeadlessTippy
      visible={showResult && searchResult.length > 0}
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
      onClickOutside={handleHideResult}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Search accounts and video"
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />

        {/* clear xóa ô tìm kiếm */}
        {!!searchValue && (
          <button
            className={cx('clear')}
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {/* loading icon */}
        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

        <button className={cx('search-btn')}>
          {/* search icon */}

          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
