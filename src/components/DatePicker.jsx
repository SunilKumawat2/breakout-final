import React from "react";
import DatePickerLib from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom styles for the datepicker input, calendar, and clear (cross) icon
const datepickerStyles = `
  .custom-datepicker-input {
    width: 100%;
    background: #232424;
    color: #fff;
    border: 2px solid #474A4A;
    border-radius: 18px;
    padding: 14px 18px 14px 24px;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    transition: border 0.2s;
    box-shadow: none;
    position: relative;
    cursor: pointer;
    text-align: left;
    letter-spacing: 0.01em;
  }
  .custom-datepicker-input:focus, .custom-datepicker-input:active {
    border: 2px solid #ffb32c;
    box-shadow: 0 0 0 2px rgba(255,179,44,0.15);
  }
  .custom-datepicker-input::placeholder {
    color: #aaa;
    opacity: 1;
  }
  .react-datepicker__input-container {
    width: 100%;
    position: relative;
  }
  .custom-datepicker-arrow {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    font-size: 1.1em;
    color: #ffb32c;
    display: flex;
    align-items: center;
  }
  /* Style for the clear (cross) icon */
  .react-datepicker__close-icon {
    position: absolute;
    right: 44px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background: none;
    border-radius: 50%;
    transition: background 0.15s;
  }
  .react-datepicker__close-icon::before,
  .react-datepicker__close-icon::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 14px;
    height: 2.5px !important;
    padding: 0 !important;
    background: #ffb32c;
    border-radius: 2px;
    transform-origin: center;
    display: block;
  }
  .react-datepicker__close-icon::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .react-datepicker__close-icon::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  .react-datepicker__close-icon:hover {
    background: #2d2d2d;
  }
  .react-datepicker__close-icon .react-datepicker__close-icon__svg {
    width: 18px;
    height: 18px;
    display: block;
  }
  .react-datepicker__close-icon .react-datepicker__close-icon__svg path {
    stroke: #ffb32c;
    stroke-width: 2.5;
    stroke-linecap: round;
  }
  /* Calendar styles */
  .react-datepicker-popper {
    z-index: 10;
  }
  .react-datepicker {
    background: #232424;
    border: 1.5px solid #474A4A;
    border-radius: 18px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.25);
    color: #fff;
    font-family: inherit;
    padding: 8px 0 0 0;
  }
  .react-datepicker__header {
    background: #232424;
    border-bottom: 1px solid #474A4A;
    border-top-left-radius: 18px;
    border-top-right-radius: 18px;
    padding-top: 18px;
    padding-bottom: 12px;
  }
  .react-datepicker__current-month, .react-datepicker__month-read-view--selected-month {
    color: #fff;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.01em;
  }
  .react-datepicker__day, .react-datepicker__day-name {
    color: #fff;
    width: 2.2em;
    line-height: 2.2em;
    margin: 0.1em;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 400;
    transition: background 0.15s, color 0.15s;
  }
  .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected {
    background: #ffb32c;
    color: #232424;
    font-weight: 600;
  }
  .react-datepicker__day--today {
    border: 1.5px solid #ffb32c;
    color: #ffb32c;
    background: transparent;
  }
  .react-datepicker__day:hover {
    background: #474A4A;
    color: #ffb32c;
  }
  .react-datepicker__day--disabled {
    color: #666;
    background: transparent;
    cursor: not-allowed;
    opacity: 0.5;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__navigation {
    top: 18px;
  }
  .react-datepicker__navigation--previous,
  .react-datepicker__navigation--next {
    border: none;
    background: none;
    color: #ffb32c;
    font-size: 1.3em;
    padding: 0 8px;
    outline: none;
    cursor: pointer;
  }
  .react-datepicker__navigation-icon::before {
    border-color: #ffb32c;
  }
`;

const CustomInput = React.forwardRef(
  ({ value, onClick, onChange, placeholder }, ref) => (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        className="custom-datepicker-input"
        onClick={onClick}
        onChange={onChange}
        value={value || ""}
        placeholder={placeholder}
        ref={ref}
        readOnly
        autoComplete="off"
      />
      <span
        className="custom-datepicker-arrow"
        style={{ pointerEvents: "none" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M6 8L10 12L14 8"
            stroke="#ffb32c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  )
);

const DatePicker = ({
  selected,
  onChange,
  dateFormat = "MMMM d, yyyy",
  placeholderText = "Select a date",
  minDate,
  isClearable = true,
  showPopperArrow = false,
  wrapperClassName = "w-100",
  ...props
}) => {
  return (
    <>
      <style>{datepickerStyles}</style>
      <DatePickerLib
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        minDate={minDate}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        wrapperClassName={wrapperClassName}
        customInput={<CustomInput />}
        {...props}
      />
    </>
  );
};

export default DatePicker;
