import { useState, useEffect, useRef } from 'react';
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import * as searchServices from '~/apiServices/searchServices'
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/icons';
import HeadlessTippy from '@tippyjs/react/headless';
import styles from './Search.module.scss';
import { useDebounce } from '~/hook'

const cx = classNames.bind(styles);

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
    const fetchApi = async () => {
      setLoading(true);
      const result = await searchServices.search(debounce);
      setSearchResult(result)
      setLoading(false);
    }
    fetchApi();
  }, [debounce]);

  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if(!searchValue.startsWith(' ')) {
      
      setSearchValue(e.target.value)
    }

  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // }

  return (
    <div>
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
            onChange={handleChange}
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
  
          <button className={cx('search-btn')} onMouseDown = {(e) => e.preventDefault()}>
            {/* search icon */}
  
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
