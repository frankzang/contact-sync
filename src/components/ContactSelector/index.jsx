import { useListBox, useOption } from '@react-aria/listbox';
import { useListState } from '@react-stately/list';
import { useFocusRing } from '@react-aria/focus';
import { mergeProps } from '@react-aria/utils';
import { useRef, useState } from 'react';
import { useVisuallyHidden } from '@react-aria/visually-hidden';
import styles from './ContactSelector.module.css';
import checkMarkIcon from '../../assets/images/checkmark.svg';
import arrowDownIcon from '../../assets/images/arrow-down.svg';
import checkboxIcon from '../../assets/images/checkbox.svg';
import checkboxFilledIcon from '../../assets/images/checkbox-filled.svg';
import 'wicg-inert';

const Option = ({ item, state }) => {
  const ref = useRef();
  const { optionProps, isSelected } = useOption({ key: item.key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(optionProps, focusProps)}
      ref={ref}
      style={{
        outline: isFocusVisible ? '2px solid orange' : 'none',
      }}
      className={styles.ListItem}
    >
      <img src={isSelected ? checkboxFilledIcon : checkboxIcon} alt="" />
      {item.rendered}
    </li>
  );
};

export const ContactSelector = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const state = useListState(props);
  const listRef = useRef();
  const { listBoxProps, labelProps } = useListBox({ ...props }, state, listRef);
  const { visuallyHiddenProps } = useVisuallyHidden();

  const handleClick = () => {
    const expanded = !isExpanded;
    setIsExpanded(expanded);

    const el = listRef.current;
    const initial = el.getBoundingClientRect();

    el.setAttribute('data-expanded', expanded);
    if (!expanded) {
      el.setAttribute('inert', 'true');
    } else {
      el.removeAttribute('inert');
    }

    const last = el.getBoundingClientRect();

    const x = initial.width / last.width;
    const y = initial.height / last.height;
    const l = initial.left - last.left;
    const t = initial.top - last.top;

    el.animate?.(
      [
        {
          transform: ` translate3d(${l}px, ${t}px, 1px) scale3d(${x}, ${y}, 1)`,
        },
        { transform: `scale(1)` },
      ],
      {
        duration: 300,
        easing: 'ease-in-out',
        direction: 'normal',
        fill: 'forwards',
      }
    );
  };

  return (
    <div className={styles.Container}>
      <button
        aria-expanded={isExpanded}
        data-expanded={isExpanded}
        onClick={handleClick}
        className={styles.ListHeader}
      >
        <img src={checkMarkIcon} alt="" />
        All contacts
        <img src={arrowDownIcon} alt="" className={styles.ArrowIcon} />
      </button>
      <div>
        <div {...mergeProps(labelProps, visuallyHiddenProps)}>
          {props.label}
        </div>
        <ul
          {...listBoxProps}
          ref={listRef}
          className={`${styles.List}`}
          inert={'true'}
        >
          {[...state.collection].map((item) => (
            <Option key={item.key} item={item} state={state} />
          ))}
        </ul>
      </div>
    </div>
  );
};
