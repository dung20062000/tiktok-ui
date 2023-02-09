import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useState } from 'react';

import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import Header from './Header';

const cx = classNames.bind(styles);
const defaultFn = () => {}

function Menu({children, items=[], onChange = defaultFn }) {
  const [history, setHistory] = useState([{data: items }]); //render mảng dữ liệu ban đầu 
  const current = history[history.length  -1]  //phần tử cuối cùng của mảng 

    const renderItems = () => {
        return current.data.map( (item, index) => {
          const isParent = !!item.children //tạo biến để convert sang boolean để sử lí logic nếu có children thì mới sử lí logic

          return <MenuItem key={index} data={item} onClick={() => {
            if(isParent){
              setHistory((prev) => [...prev, item.children])
            }else{
              onChange(item)
            }
            
          }}/>
        })
    }
 
    return ( 
        <Tippy
        delay={[0, 500]}
        offset={[12, 8]}
        interactive
        placement='bottom-end'
        render={(attrs) => (
          <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
              {history.length > 1 && <Header title="Language" onBack={() => {
                setHistory(prev => prev.slice(0, prev.length-1))
              }}/>}
              {renderItems()}
            </PopperWrapper>
          </div>
        )}
        onHide={ () => setHistory(prev => prev.slice(0, 1))} // trở về giao diện đầu tiên khi hover lại
      >
        {children}
      </Tippy>
     );
}

export default Menu;