interface ColorIconProps {
  color?: string;
}

export default function ColorIcon({ color = '#4D4857' }: ColorIconProps) {
  return (
    <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.6679 28.4999C23.5714 28.4999 29.1678 22.9035 29.1678 15.9999C29.1678 9.09641 23.5714 3.5 16.6679 3.5C9.76438 3.5 4.16797 9.09641 4.16797 15.9999C4.16797 22.9035 9.76438 28.4999 16.6679 28.4999Z"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M25.5068 7.16117C23.1626 4.81696 19.9832 3.5 16.668 3.5C13.3528 3.5 10.1733 4.81696 7.82914 7.16117C5.48493 9.50538 4.16797 12.6848 4.16797 16C4.16797 19.3152 5.48493 22.4946 7.82914 24.8389L16.668 16L25.5068 7.16117Z"
        fill={color}
      />
    </svg>
  );
}
