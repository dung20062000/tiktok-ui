import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './AccountItem.module.scss';

const cx = classNames.bind(style);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <img
      className={cx('avatar')}
        src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/7f21825ffcf04729c9103f2cbaaa91c8~c5_100x100.jpeg?x-expires=1676966400&x-signature=eUJePX74AU9s%2FfFuSxW4s7U25sQ%3D"
        alt="img-hoa"
      />
      <div className={cx('imfo')}>
        <h4 className={cx('name')}>
          <span>Nguyễn Văn A</span>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </h4>
        <span className={cx('username')}>username</span>
      </div>
    </div>
  );
}

export default AccountItem;
