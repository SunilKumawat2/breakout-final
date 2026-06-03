import Image from "next/image";
import HalfStar from "@/images/half-star.svg";

export const filledStar = ({ size = 32, spacing = 5, key }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ marginRight: spacing }}
      fill="none"
      viewBox="0 0 33 32"
      key={key}
    >
      <path
        fill="url(#a)"
        d="M15.986 2.433a.779.779 0 0 1 1.395 0l3.392 6.87a3.117 3.117 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.117 3.117 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.117 3.117 0 0 0-2.896 0L8.456 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.484-5.34a.778.778 0 0 1 .431-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <path
        fill="url(#b)"
        d="M15.986 2.433a.779.779 0 0 1 1.395 0l3.392 6.87a3.117 3.117 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.117 3.117 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.117 3.117 0 0 0-2.896 0L8.456 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.484-5.34a.778.778 0 0 1 .431-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <path
        stroke="url(#c)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.986 2.433a.779.779 0 0 1 1.395 0l3.392 6.87a3.117 3.117 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.117 3.117 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.117 3.117 0 0 0-2.896 0L8.456 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.484-5.34a.778.778 0 0 1 .431-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <path
        stroke="url(#d)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.986 2.433a.779.779 0 0 1 1.395 0l3.392 6.87a3.117 3.117 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.117 3.117 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.117 3.117 0 0 0-2.896 0L8.456 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.484-5.34a.778.778 0 0 1 .431-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="31.365"
          x2="3.397"
          y1="2"
          y2="31.332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAE00" />
          <stop offset="1" stopColor="#F87E00" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="16.683"
          x2="16.683"
          y1="2"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F87E00" />
          <stop offset=".6" stopColor="#FFAE00" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="31.365"
          x2="3.397"
          y1="2"
          y2="31.332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAE00" />
          <stop offset="1" stopColor="#F87E00" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="16.683"
          x2="16.683"
          y1="2"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F87E00" />
          <stop offset=".6" stopColor="#FFAE00" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const halfFilledStar = ({ size = 32, spacing = 5, key }) => {
  return (
    <Image
      src={HalfStar}
      alt="half-star"
      width={size}
      height={size}
      style={{ marginRight: spacing }}
      key={key}
    />
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      style={{ marginRight: spacing }}
    >
      <path
        fill="url(#a)"
        d="M15.446 2.433a.778.778 0 0 1 1.395 0l3.391 6.87a3.118 3.118 0 0 0 2.342 1.702l7.584 1.11a.777.777 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.779.779 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.344-1.703l3.39-6.87Z"
      />
      <path
        fill="url(#b)"
        d="M15.446 2.433a.778.778 0 0 1 1.395 0l3.391 6.87a3.118 3.118 0 0 0 2.342 1.702l7.584 1.11a.777.777 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.779.779 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.344-1.703l3.39-6.87Z"
      />
      <path
        stroke="url(#c)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.446 2.433a.778.778 0 0 1 1.395 0l3.391 6.87a3.118 3.118 0 0 0 2.342 1.702l7.584 1.11a.777.777 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.779.779 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.344-1.703l3.39-6.87Z"
      />
      <path
        stroke="url(#d)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.446 2.433a.778.778 0 0 1 1.395 0l3.391 6.87a3.118 3.118 0 0 0 2.342 1.702l7.584 1.11a.777.777 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.779.779 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.344-1.703l3.39-6.87Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="16.142"
          x2="16.142"
          y1="2"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F87E00" />
          <stop offset=".6" stopColor="#FFAE00" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="1.46"
          x2="30.825"
          y1="16"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".615" stopOpacity="0" />
          <stop offset=".615" />
        </linearGradient>
        <linearGradient
          id="c"
          x1="30.825"
          x2="2.856"
          y1="2"
          y2="31.332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAE00" />
          <stop offset="1" stopColor="#F87E00" />
        </linearGradient>
        <linearGradient
          id="d"
          x1="16.142"
          x2="16.142"
          y1="2"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F87E00" />
          <stop offset=".6" stopColor="#FFAE00" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export const emptyStar = ({ size = 32, spacing = 5, key }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      style={{ marginRight: spacing }}
      fill="none"
      viewBox="0 0 32 32"
      key={key}
    >
      <path
        stroke="url(#a)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.446 2.433a.777.777 0 0 1 1.395 0l3.392 6.87a3.118 3.118 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <path
        stroke="url(#b)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.065"
        d="M15.446 2.433a.777.777 0 0 1 1.395 0l3.392 6.87a3.118 3.118 0 0 0 2.341 1.702l7.584 1.11a.778.778 0 0 1 .432 1.327l-5.485 5.341a3.118 3.118 0 0 0-.897 2.758l1.295 7.546a.778.778 0 0 1-1.132.822l-6.78-3.565a3.116 3.116 0 0 0-2.896 0L7.916 29.91a.778.778 0 0 1-1.13-.822l1.293-7.545a3.115 3.115 0 0 0-.897-2.759l-5.485-5.34a.778.778 0 0 1 .432-1.33l7.583-1.108a3.116 3.116 0 0 0 2.345-1.703l3.39-6.87Z"
      />
      <defs>
        <linearGradient
          id="a"
          x1="30.825"
          x2="2.857"
          y1="2"
          y2="31.332"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFAE00" />
          <stop offset="1" stopColor="#F87E00" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="16.142"
          x2="16.142"
          y1="2"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F87E00" />
          <stop offset=".6" stopColor="#FFAE00" />
        </linearGradient>
      </defs>
    </svg>
  );
};
