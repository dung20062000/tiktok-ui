import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button(
    {
        to, 
        href, 
        primary=false, 
        outline=false, 
        large =false,  
        small=false, 
        text = false, //nut text
        disabled = false, //khoong hien thi nut
        rounded = false, //
        className,
        lefIcon,
        rightIcon,
        children, 
        onClick ,
        ...passProps
    }
    ) {
    let Comp = 'button'

    const classess = cx('wrapper',{ primary, outline, small, large, text, disabled, rounded,[className]:className, })
    const props={
        onClick,
        ...passProps
    }

    //delete props when btn is disabled
    if(disabled){
        Object.keys(props).forEach((key) => {
            if(key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        })
    }

    if(to){
        props.to = to
        Comp =Link
    }else if(href) {
        props.href = href
        Comp = 'a'
    }

    return ( 
        <Comp 
            className={classess}
            {...props}
        
        >
            {lefIcon && <span className={cx('icon')}>{lefIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}

        </Comp>
     );
}

export default Button;