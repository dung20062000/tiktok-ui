import { useState, useEffect, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import HeadlessTippy from '@tippyjs/react/headless';
import style from './Search.module.scss';
import { useDebounce } from '~/hook'

const cx = classNames.bind(style);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const debounce = useDebounce(searchValue,  500)

  const inputRef = useRef();

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([])
    inputRef.current.focus();
  }

  useEffect(() => {
    if(!debounce.trim()) {
      setSearchResult([])
      return ;
    }

    setLoading(true)

    fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounce)}&type=less`)
      .then(res => res.json())
      .then(
        res => {
          setSearchResult(res.data);
          setLoading(false)
        }
      )
      .catch(() => {
        setLoading(false);
      })
  }, [debounce]);

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
            {searchResult.map(result => (
              <AccountItem key={result.id} data={result}/>
            ))}
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
        {!!searchValue && !loading && (
          <button
            className={cx('clear')}
            onClick={handleClear}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        {/* loading icon */}
        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

        <button className={cx('search-btn')}>
          {/* search icon */}

          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
