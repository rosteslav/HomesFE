import { useDispatch, useSelector } from 'react-redux';
import { clearSvgColor, setFilterOption, updateFilterQueryData } from '../../store/features/filter';
import SvgSofiaMap from '../../UI/SvgSofiaMap';
import { useEffect } from 'react';

const SofiaSvgFilter = ({ setPage }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);

    useEffect(() => {
        if (filter.queryData.neighbourhood && filter.queryData.neighbourhood.length > 0) {
            const data = Array.from(document.querySelectorAll('.allPaths'));
            data.map((el) => {
                if (filter.queryData.neighbourhood.includes(el.textContent)) {
                    el.classList.add('selectedNH');
                    el.style.fill= '#6B63FF';
                }
            });
        }
    });

    const handleMouseEnter = (e) => {
        const elem = e.target;
        const shouldExclude = elem.getAttribute('data-exclude') === 'true';
        let area = [];
        const classArea = elem.textContent;

        if (classArea === 'Район СЕВЕР') {
            area = Array.from(document.querySelectorAll('.north'));
        } else if (classArea === 'Район ИЗТОК') {
            area = Array.from(document.querySelectorAll('.east'));
        } else if (classArea === 'Район ЗАПАД') {
            area = Array.from(document.querySelectorAll('.west'));
        } else if (classArea === 'Район ЮГ') {
            area = Array.from(document.querySelectorAll('.south'));
        }

        if (!shouldExclude) {
            if (area.length > 0) {
                for (const a of area) {
                    if (!a.className.baseVal.includes('selectedNH')) {
                        a.style.fill = '#5031F8';
                    }
                }
            } else {
                if (!elem.className.baseVal.includes('selectedNH')) {
                    elem.style.fill = '#5031F8';
                }
            }
        }
    };

    const handleMouseLeave = (e) => {
        const elem = e.target;
        let area = [];
        const classArea = elem.textContent;
        const shouldExclude = elem.getAttribute('data-exclude') === 'true';

        if (classArea === 'Район СЕВЕР') {
            area = Array.from(document.querySelectorAll('.north'));
        } else if (classArea === 'Район ИЗТОК') {
            area = Array.from(document.querySelectorAll('.east'));
        } else if (classArea === 'Район ЗАПАД') {
            area = Array.from(document.querySelectorAll('.west'));
        } else if (classArea === 'Район ЮГ') {
            area = Array.from(document.querySelectorAll('.south'));
        }

        if (!shouldExclude && !filter.queryData.neighbourhood.includes(elem.textContent)) {
            if (area.length > 0) {
                for (const a of area) {
                    if (!a.className.baseVal.includes('selectedNH')) {
                        a.style.fill = '#AEA8BA';
                    } 
                }
            } else {
                if (!elem.className.baseVal.includes('selectedNH')) {
                    elem.style.fill = '#AEA8BA';
                }
            }
        }
    };

    const handleClick = (e) => {
        if (filter.queryData.isSvgClear) {
            dispatch(clearSvgColor());
        }

        const elem = e.target;
        const shouldExclude = elem.getAttribute('data-exclude') === 'true';
        const selectedNeighborhood = elem.textContent;

        let area = [];
        const classArea = elem.textContent;

        if (classArea === 'Район СЕВЕР') {
            area = Array.from(document.querySelectorAll('.north'));
        } else if (classArea === 'Район ИЗТОК') {
            area = Array.from(document.querySelectorAll('.east'));
        } else if (classArea === 'Район ЗАПАД') {
            area = Array.from(document.querySelectorAll('.west'));
        } else if (classArea === 'Район ЮГ') {
            area = Array.from(document.querySelectorAll('.south'));
        }
        const areaList = area.map((a) => a.textContent);

        if (!shouldExclude) {
            if (
                filter.queryData.neighbourhood.includes(selectedNeighborhood) ||
                (area.length > 0 && areaList.every((nh) => filter.queryData.neighbourhood.includes(nh)))
            ) {
                if (area.length > 0) {
                    for (const a of area) {
                        a.className.baseVal = a.className.baseVal.slice(0, -10);
                        a.style.fill = '#5031F8';
                        setPage(1);
                        dispatch(
                            setFilterOption({ option: 'neighbourhood', value: a.textContent })
                        );
                        dispatch(updateFilterQueryData());
                    }
                } else {
                    elem.className.baseVal = elem.className.baseVal.slice(0, -10);
                    elem.style.fill = '#5031F8';
                    setPage(1);
                    dispatch(
                        setFilterOption({ option: 'neighbourhood', value: selectedNeighborhood })
                    );
                    dispatch(updateFilterQueryData());
                }
            } else {
                if (area.length === 0) {
                    elem.style.fill = '#6B63FF';
                    setPage(1);
                    dispatch(
                        setFilterOption({ option: 'neighbourhood', value: selectedNeighborhood })
                    );
                    dispatch(updateFilterQueryData());
                } else {
                    for (const a of area) {
                        if (!filter.queryData.neighbourhood.includes(a.textContent)) {
                            a.style.fill = '#6B63FF';
                            setPage(1);
                            dispatch(
                                setFilterOption({ option: 'neighbourhood', value: a.textContent })
                            );
                            dispatch(updateFilterQueryData());
                        }
                    }
                }
            }
        }
    };

    if (filter.queryData.isSvgClear) {
        const el = document.querySelectorAll('.allPaths');
        el.forEach((e) => {
            if (e.className.baseVal.includes('selectedNH')) {
                e.className.baseVal = e.className.baseVal.slice(0, -10);
            }
        });
        el.forEach((e) => (e.style.fill = '#AEA8BA'));
    } 

    return (
        <>
            <SvgSofiaMap handleMouseEnter={handleMouseEnter} handleMouseLeave={handleMouseLeave} handleClick={handleClick} />
        </>
    );
};

export default SofiaSvgFilter;
