
const NavigationShapes = () => {
  return (
    <>
      {/* Left side shape */}
      <div className="absolute left-0 top-0 h-full">
        <svg height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            d="M0 0 L75 0 L100 100 L0 100 Z"
            fill="#C1FF72"
            className="h-full"
          />
        </svg>
      </div>
      
      {/* Right side shape */}
      <div className="absolute right-0 top-0 h-full">
        <svg height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
          <path
            d="M0 0 L200 0 L200 100 L50 100 Z"
            fill="#000000"
            className="h-full"
          />
        </svg>
      </div>
    </>
  );
};

export default NavigationShapes;
