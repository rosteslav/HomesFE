const CustomPath = ({
    d,
    fill,
    regionTitle,
    cursor,
    onMouseEnter,
    onMouseLeave,
    onClick,
    chosen,
    activeRegion,
    region,
}) => {
    const pathStyle = {
        stroke: 'rgb(255, 255, 255)',
        strokeWidth: '0.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '10',
        d,
        fill,
    };

    const pathClassName = chosen
        ? ` ${region} ${
              !chosen[0].includes(regionTitle) &&

              !chosen[1].includes(regionTitle) &&
              !activeRegion &&
              'fill-gray-400'
          } ${
              !chosen[0].includes(regionTitle) &&
              !chosen[1].includes(regionTitle) &&
              'hover:fill-red-950'
          } ${chosen[0].includes(regionTitle) && 'fill-blue-800'} ${
              chosen[1].includes(regionTitle) && 'fill-blue-500'
          } ${
              activeRegion == region
                  ? !chosen[0].includes(regionTitle) &&
                    !chosen[1].includes(regionTitle) &&
                    'fill-red-950'
                  : !chosen[0].includes(regionTitle) &&
                    !chosen[1].includes(regionTitle) &&
                    activeRegion !== region &&
                    'fill-gray-400'
          }`
        : 'fill-gray-400';

    return (
        <path
            {...pathStyle}
            className={pathClassName}
            cursor={cursor}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <title>{regionTitle}</title>
        </path>
    );
};

export default CustomPath;
