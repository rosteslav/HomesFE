import { useState } from 'react';

// RTK Queries
import { useFetchAllRegionsQuery } from '../../store/features/Api/adminApi';

import CustomPath from './CustomPath';

const SofiaSvgMap = ({ chosen, setChosen }) => {
    const [activeRegion, setActiveRegion] = useState();
    const { data: regions } = useFetchAllRegionsQuery();
    const [clickedRegion, setClickedRegion] = useState({ Изток: 0, Запад: 0, Север: 0, Юг: 0 });
    const styles = {
        region: 'fill-gray-200',
        greenArea: 'fill-green-700',
        others: 'fill-gray-700',
    };

    const handleMouseEnter = (e) => {
        if (e.target.textContent === 'Район ЮГ') {
            setActiveRegion('south');
        } else if (e.target.textContent === 'Район ИЗТОК') {
            setActiveRegion('east');
        } else if (e.target.textContent === 'Район СЕВЕР') {
            setActiveRegion('north');
        } else if (e.target.textContent === 'Район ЗАПАД') {
            setActiveRegion('west');
        } else {
            setActiveRegion('');
        }
    };

    const handleMouseLeave = () => {
        setActiveRegion('');
    };

    const handleRegionClick = (e) => {
        const targetRegionFullName = e.target.textContent.split(' ')[1];
        const targetName = targetRegionFullName[0] + targetRegionFullName.slice(1).toLowerCase();
        setClickedRegion((prevClickedRegion) => {
            const currentState = prevClickedRegion[targetName];
            const newState = currentState === 2 ? 0 : currentState + 1;
            return {
                ...prevClickedRegion,
                [targetName]: newState,
            };
        });

        let highChosen = chosen[0].filter((n) => !regions[targetName].includes(n));
        let lowerChosen = chosen[1].filter((n) => !regions[targetName].includes(n));
        if (clickedRegion[targetName] === 0) {
            regions[targetName].forEach((n) => highChosen.push(n));
        } else if (clickedRegion[targetName] === 1) {
            regions[targetName].forEach((n) => lowerChosen.push(n));
        }
        setChosen([[...highChosen], [...lowerChosen]]);
    };

    const handleClick = (e) => {
        const currTarget = e.target.textContent;
        const classNames = e.target.className;
        const currChosen = [...chosen];

        if (
            classNames.baseVal.includes('south') ||
            classNames.baseVal.includes('north') ||
            classNames.baseVal.includes('west') ||
            classNames.baseVal.includes('east') ||
            currTarget === 'Център'
        ) {
            if (currChosen[0].includes(currTarget)) {
                const indexOf = chosen[0].indexOf(currTarget);
                currChosen[0].splice(indexOf, 1);
                currChosen[1].push(currTarget);
            } else {
                if (currChosen[1].includes(currTarget)) {
                    const indexOf = currChosen[1].indexOf(currTarget);
                    currChosen[1].splice(indexOf, 1);
                } else {
                    currChosen[0].push(currTarget);
                }
            }
        }
        setChosen(currChosen);
    };

    return (
        <div className='m-auto max-h-fit max-w-3xl'>
            <svg
                height='100%'
                width='100%'
                xmlns='http://www.w3.org/2000/svg'
                version='1.1'
                viewBox='0 80 510 370'
            >
                <defs id='defs4'>
                    <rect width='100%' height='100%' fill='none' />
                </defs>

                <path
                    data-exclude='false'
                    className={styles.region}
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='M43,80 L900,0 L255,250 Z'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleRegionClick}
                >
                    <title>Район СЕВЕР</title>
                </path>
                <path
                    data-exclude='false'
                    className={styles.region}
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='M510,150 L617,525 L255,250 Z'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleRegionClick}
                >
                    <title>Район ИЗТОК</title>
                </path>
                <path
                    data-exclude='false'
                    className={styles.region}
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='M-268,510 L617,525 L255,250 Z'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleRegionClick}
                >
                    <title>Район ЮГ</title>
                </path>

                <path
                    data-exclude='false'
                    className={styles.region}
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='M0,45 L0,377 L255,250 Z'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleRegionClick}
                >
                    <title>Район ЗАПАД</title>
                </path>

                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 220.8,292.2 -1.1,-4.5 3.9,-0.4 2.7,-0.4 1.2,0.2 1.3,0.3 1.8,0.7 10,-16.8 2.8,-0.4 2.4,-0.9 4.3,-1.8 0.6,3 1.1,7 -3.7,1.2 -12.1,8.8 -0.9,0.4 h -1 l 0.5,0.8 -4.9,3.5 -0.2,0.3 -0.2,0.5 v 0.7 l 0.1,0.2 3.2,1.6 1.9,0.7 -0.5,0.1 -0.1,0.3 v 0.7 l -0.2,0.3 -0.1,0.6 -0.8,1.6 -0.1,0.7 1.4,0.6 -0.6,1.1 -0.2,1.4 0.3,0.2 -0.1,1.1 -1.1,3.5 -2.6,0.5 -1,1.2 -0.7,0.3 v 0.3 l 1.5,4.9 0.2,0.2 2.4,-0.1 0.8,0.3 1.3,0.9 1.2,0.3 1.2,1.3 0.3,0.3 -0.4,6.9 -0.6,2.8 -1.3,0.4 -2,0.5 -2.1,-0.1 -1.5,-0.4 -1.2,-0.4 -1,-0.6 -0.9,-0.7 -0.8,-0.8 -0.5,-0.7 -5.8,-10 -0.5,-1.1 -0.5,-1.6 0.4,-2.8 z'
                >
                    <title>Южен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 206.8,116.5 1.9,-0.2 26.2,12.5 -0.5,2 -7.5,-4.5 -6.5,2.5 -1.6,0.3 -0.1,2.9 0.4,2.2 -0.4,0.2 0.4,2.7 -7.4,-2.1 -1.4,-0.7 -1.4,-1.1 -3.9,-10.6 -2.4,-5.2 0.6,-1 1.1,-2.5 z'
                >
                    <title>Северен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 152.3,345 -0.7,-9.2 2.1,-6.1 3.7,0.6 0.3,-3.5 5.6,2.7 18.8,9.2 -1.3,1.8 -8.5,7.5 -1,0.7 -1.4,0.7 -2.6,0.8 -10.8,0.6 -1.5,-0.4 -3.6,-1.6 z'
                >
                    <title>Резиденция Бояна</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 256.5,188.3 8.1,-15.2 5.7,4.3 1.2,-2.4 11.2,8.3 2,3 -6.1,12.7 -0.8,0.8 -1.3,2 -1.8,-0.9 -2.5,-2.2 -8.3,-6.5 z'
                >
                    <title>Парк Централни софийски гробища</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 342.4,181.9 1.1,4.2 0.2,0.8 -8.7,3.5 -6.2,-0.4 -7.5,-2 4.8,-4.8 -4,-4.5 8.7,-5.7 3.9,2.4 3,1.9 3,2.2 z'
                >
                    <title>Парк Малашевски гробища</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 102.8,193.9 11.4,8.6 2.5,1.5 2.2,0.7 3.7,0.5 5,-0.1 7,-0.9 2.8,-0.8 2.4,-0.3 3,-0.4 1.7,0.1 12.9,-1.9 3.2,-1.8 5.3,-3.1 2,-2.1 0.5,-0.6 6.6,-10.3 1.8,1.3 16,11.3 -9.5,3.8 -14.5,5.8 0.7,0.3 -1.4,1.7 1.8,13.4 -0.4,1.2 0.2,1.3 -3.8,0.5 -0.4,-1.3 -3.3,0.3 -0.9,0.6 -0.6,1.3 0.2,4.2 -0.3,2.2 -5.9,1.6 -0.5,-1.5 -3.9,0.4 -5.2,-4.9 -5.7,4.4 -2.1,-2.6 0.1,-1.6 -0.2,-0.4 -1.8,-0.9 -1.2,-0.4 -4,3.9 -3.9,-1 -1.7,5.6 2.8,3.7 -4.5,0.9 -17.3,-2 -1.5,-0.1 -5,0.6 -11,-0.6 v -8.2 l 0.1,-22.9 0.2,-5.6 1,-5.9 z'
                >
                    <title>Парк Западен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 282.9,230.5 0.9,-0.3 13,0.7 -0.5,4.1 -7.6,-0.4 -7.9,-0.4 0.1,-4.2 1.1,0.1 z'
                >
                    <title>Парк Заимов</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 327.8,264.2 0.9,-0.7 0.6,-0.6 -2,-0.8 0.4,-1.4 -9.2,-3.2 0.2,-1.1 -0.5,-1.7 2.7,0.7 4.1,1.4 0.9,0.1 1.2,0.1 1.7,-0.2 0.8,-0.3 0.8,-0.4 3.4,-1.8 3.3,1.8 1.4,3.4 0.4,3.9 1.8,3.4 v 1.1 l -1.9,3.7 -4.4,-2.4 -0.6,-0.3 0.5,-1.7 -0.6,-0.5 z'
                >
                    <title>Парк Гео Милев</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 329,354.1 -0.6,-1.8 0.7,-1 v -3.4 l -0.5,-0.4 1.7,-3.6 0.1,-1.3 -0.7,-5.7 -1.4,-3.2 1.3,-0.6 1,-0.9 1.8,-2.2 -0.3,-3 0.3,-0.5 -0.2,-2 1.7,-2 2,-1.8 0.3,-0.5 -0.7,-2.1 -1.1,-7.9 v -2.3 l -0.1,-0.7 -0.2,-0.8 0.3,-1.3 1.8,0.3 1,-1.2 1.9,1.8 -0.8,0.9 -0.7,1.3 v 3.8 l 2.2,0.9 0.1,2.7 H 339 l -0.2,2.2 h 1.2 l -0.4,1.7 -1.3,3.4 -0.4,0.6 -0.1,1 0.7,0.9 0.7,0.3 -0.2,1 -1.4,2.5 0.3,1.3 -0.9,1 -0.8,-0.3 -0.2,0.4 -0.1,1.6 -0.5,2 -0.7,0.9 -0.4,0.5 -0.8,1.1 -0.3,2.8 -0.2,0.5 0.1,5.2 -0.9,2.2 2.1,0.1 -0.3,4.4 -1.3,4.6 -1.5,2 -1,2.3 -0.2,1.8 0.6,4.2 -1.7,1.7 -0.2,1.6 v 1.4 l 0.4,0.6 -0.1,3 0.6,2.8 1.2,1.4 2.2,1.3 -1,1.3 -1,0.8 -0.5,1.3 -0.9,1.7 -1.5,0.2 -0.6,0.3 -0.4,0.3 -0.3,0.5 0.1,0.9 -0.3,1.2 0.2,0.8 0.3,0.5 -0.5,0.9 0.3,1.4 -0.3,3.2 -3.7,-0.4 0.9,-0.9 0.3,-1.2 -0.7,-4.9 -3.7,0.5 0.6,4.3 -2.6,1.7 -0.8,0.3 -1.8,-3.5 -1.3,-3.9 v 0 l -0.6,-3.1 -0.9,-1.2 0.1,-0.6 0.4,0.4 1.6,-2 -1,-0.7 -0.9,-0.9 0.1,-1.2 0.6,-1.7 1.3,-0.7 -2.3,-4.6 -0.5,-0.7 -2.5,-1.6 0.2,-2.7 -0.2,-1.4 2.3,-1.6 -0.1,-0.8 1.8,-0.2 1,-0.4 -0.1,-3.8 -0.8,-2.3 4.1,-3.9 1.7,1.2 3.5,1.5 5.6,1 z'
                >
                    <title>Парк Въртопо</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 212.2,373.7 -0.7,0.6 -5.3,0.7 -4.2,-5.6 -1.4,-1.1 6.3,-15.9 4.2,2.3 9,5 -6.3,11 -1.3,-0.5 v 1.5 z'
                >
                    <title>Парк Ботаническа градина</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 279.9,307.3 -1.4,18.3 -3.4,-0.2 -0.4,-0.2 0.1,-0.8 -0.8,-2.6 -5.8,-0.5 h -4.7 l -0.6,0.3 0.3,-0.9 -4,-1.3 0.5,-1.2 -1.3,-0.9 -0.5,0.5 -1,-0.9 -0.4,-1.3 10.3,-4.6 -0.2,-0.6 0.1,-1.6 -0.5,-1.8 3.4,-1.4 0.4,-0.8 -1.6,-3.5 2.3,-1.1 6.8,-7.4 -3.1,-5.2 -0.3,-5.7 -2.9,-8.2 5.7,-1.8 2.9,-0.2 -11.3,-12.6 11.6,-9.9 9.6,9.1 20.8,20.1 -1.5,1.8 -9.2,8.4 -0.2,0.6 -2.3,2 -4.5,4 -0.3,0.6 -2.4,13.4 -1,0.4 -1.2,-2 -0.6,-0.4 -0.8,-0.2 z'
                >
                    <title>Парк Борисова градина</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 183.8,139.1 -2.2,2.3 2.8,2.7 -0.6,3 -0.5,0.4 -2.1,10.3 -20.9,-12.4 -2.5,-1.9 12.8,-16.6 0.7,-0.7 2.7,-2.2 7.6,-2.6 2.7,-0.1 0.6,-0.4 3.9,4.8 -1.5,1 -1.3,6.6 -1.6,4.6 z'
                >
                    <title>Парк Бакърени гробища</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 287.9,307.6 1.2,2 1.3,2.2 -0.8,1.2 v 0.5 l 0.2,0.9 -0.5,1.8 -0.1,1.3 -0.9,2.6 -0.8,1 -2,2.9 v 0.1 l -1.3,2.2 -0.1,0.4 -0.6,0.3 -1.2,2.5 -1.5,0.1 -2.6,-0.2 0.3,-3.8 1.4,-18.3 6.6,-0.3 0.8,0.2 z'
                >
                    <title>Ловен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 365.2,407.8 3.4,-1.7 0.4,-1 -0.5,-0.8 -1.5,-0.5 -1,0.4 -0.1,-0.8 -0.6,-1 -1.6,-1.8 -0.8,-1.8 -1,-2 -0.2,-0.8 h 1.2 l 1.2,-0.6 0.2,-0.9 -2.2,-3.4 -1.6,-2 v -1.3 l 1,-3.2 2.3,-4 4.2,-6.8 0.6,-2.2 -0.1,-1 -2.6,-10 -1.4,-2.3 0.3,-1.4 13.7,4.6 -3.5,0.9 v 18.1 l -4.4,2.2 -0.9,0.7 1.6,1.7 0.1,1.2 -1,1.3 v 0.5 l 1.4,0.9 1.8,4.7 4.4,2.6 4.1,5.7 0.8,3.2 -0.3,2.8 -1.1,2.5 v 2.4 l -0.2,1.1 -16.3,-0.7 0.9,-2.9 0.1,-1.1 z'
                >
                    <title>Източен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    className={styles.greenArea}
                    data-exclude='true'
                    d='m 272.1,333.8 -1.8,-0.1 -0.7,-0.6 -1,-0.1 -4.6,-4.3 h -0.3 l 0.2,-0.2 0.1,-1 -0.2,-0.6 -0.6,-0.7 -0.5,-0.4 -0.5,-0.2 -0.3,-0.5 1,-3.5 0.6,-0.3 h 4.7 l 5.8,0.5 0.8,2.6 -0.1,0.8 0.4,0.2 -0.4,2.9 -1.2,3.4 0.1,0.7 z'
                >
                    <title>Зоопарк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 231.3,293.7 0.9,0.7 0.6,-0.5 0.2,0.2 h 0.6 l 0.5,0.2 0.5,0.3 1.4,0.9 1.8,1.8 0.1,3.6 0.2,2.3 -0.3,4.7 -0.2,2.3 -0.3,3.9 -0.3,5.4 -0.3,-0.3 -1.2,-1.3 -1.2,-0.3 -1.3,-0.9 -0.8,-0.3 -2.4,0.1 -0.2,-0.2 -1.5,-4.9 v -0.3 l 0.7,-0.3 1,-1.2 2.6,-0.5 1.1,-3.5 0.1,-1.1 -0.3,-0.2 0.2,-1.4 0.6,-1.1 -1.4,-0.6 0.1,-0.7 0.8,-1.6 0.1,-0.6 0.2,-0.3 v -0.7 l 0.1,-0.3 0.5,-0.1 -1.9,-0.7 -3.2,-1.6 -0.1,-0.2 v -0.7 l 0.2,-0.5 0.2,-0.3 0.2,0.4 0.4,0.2 0.7,0.1 z'
                    className={styles.greenArea}
                    data-exclude='true'
                >
                    <title>ж.гр.Южен парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 276.2,330.2 -1,0.7 -1.6,1.5 -0.1,-0.7 1.2,-3.4 0.4,-2.9 3.4,0.2 -0.3,3.8 -1.2,0.4 z'
                    className={styles.greenArea}
                    data-exclude='true'
                >
                    <title>ж.гр.Зоопарк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 109.2,253.4 -0.9,0.5 -0.9,0.7 -0.5,0.5 -2.4,3.6 -0.4,1.4 0.2,1.2 0.2,0.6 0.5,0.6 0.8,0.9 1.4,1.8 -0.1,0.6 -0.6,1.2 -8.6,-5.9 v -1.1 -0.8 l 0.1,-1 0.2,-1 0.5,-1.1 3.3,-6.8 0.6,-0.9 0.7,-0.8 0.9,-0.9 1.4,-1 0.9,-0.6 1.2,-0.5 1.5,-0.4 1.2,-0.2 h 1.2 l 2,0.2 9.5,1.5 2.1,0.1 1.3,-0.2 3.1,-0.7 0.6,2.2 0.7,2.4 -8.7,1.5 -11.5,2 z'
                    className={styles.greenArea}
                    data-exclude='true'
                >
                    <title>Парк гора</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 99.1,236.6 5,-0.6 1.5,0.1 17.3,2 4.5,-0.9 2.2,7.7 -3.1,0.7 -1.3,0.2 -2.1,-0.1 -9.5,-1.5 -2,-0.2 h -1.2 l -1.2,0.2 -1.5,0.4 -1.2,0.5 -0.9,0.6 -1.4,1 -0.9,0.9 -0.7,0.8 -0.6,0.9 -3.3,6.8 -0.5,1.1 -0.2,1 -0.1,1 v 0.8 1.1 l -6,-4.2 -1,-0.9 -0.9,-1.2 -0.7,-1.2 -0.4,-0.7 -0.4,-1.2 -0.4,-1.9 V 236 Z'
                    className={styles.greenArea}
                    data-exclude='true'
                >
                    <title>м-т Парк</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 387.4,286.1 -5.3,8.8 -0.6,-0.2 -22.5,-5.5 -9.7,-2.4 1.4,-3.5 1.5,-0.9 1.2,-1.1 0.9,-1.3 2.1,-4.5 0.9,-2.8 0.5,-2.6 V 269 l -0.1,-1.3 -0.3,-1.2 -0.4,-1.2 -0.7,-1.5 -2.7,-3.7 0.3,-0.3 18.4,16.9 6.1,-5.5 3.3,-5.5 1.3,-9.2 11,3.1 -3.5,11.6 -1.6,10.7 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>СПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 140.7,122.9 8.2,10.1 6.3,7.8 2.6,2.7 -13.1,17.2 -25.4,-19.6 14.9,-26.5 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>СПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 266.2,307 0.5,1.8 -0.1,1.6 0.2,0.6 -10.3,4.6 0.4,1.3 1,0.9 0.5,-0.5 1.3,0.9 -0.5,1.2 4,1.3 -0.3,0.9 -1,3.5 0.3,0.5 0.5,0.2 0.5,0.4 0.6,0.7 0.2,0.6 -0.1,1 -0.2,0.2 H 263 l -0.1,2.8 -9.5,-0.2 -17.3,-0.4 -0.1,-1.7 6.5,-4 2,-13.8 23.9,-10.1 1.6,3.5 -0.4,0.8 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>ПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 277.8,199.8 0.8,-0.8 6.1,-12.7 6.2,9.2 1.2,1.2 1.2,0.7 3,1.2 4.1,1.3 -3.2,0.6 -11.2,8.2 v 2 l 4.4,2.9 4,3.3 -0.6,1.5 7.6,2.2 1.3,0.8 1.2,1 -2.3,6.3 -3.9,-0.8 -4,-1 -12.2,-6.8 -9,-6.2 -1.1,-1.4 -1,-4.8 0.9,-0.7 0.4,-0.5 h 1.7 l 3.1,-4.7 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>НПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 166.4,261.6 0.8,-1.5 5.9,-10.5 v 0 l 1.2,-1.5 3.1,-2.9 7.1,8 2.3,-1 3,-2.1 2,1.3 -0.4,0.7 -0.8,1.4 -0.8,4.8 -1,1.9 -3,3.4 -8.3,7.4 -4.9,-4.8 -2,-1.8 -1.4,-1.1 -1.4,-1 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>НПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 402.3,373.7 4.2,8.4 -6.2,3.2 v -0.4 l -2.4,-2.7 -7.3,0.5 -3.3,-2.1 -12.3,-0.1 v -18.1 l 3.5,-0.9 h 0.1 l 10.1,3.3 1,1.1 2,-0.9 0.8,-0.9 0.6,0.4 1.9,0.6 0.7,0.8 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>НПЗ</title>
                </path>
                <path
                    stroke='rgb(255, 255, 255)'
                    strokeWidth='0.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit='10'
                    d='m 371.6,242.7 -0.7,-0.2 -1.2,0.1 -1.9,-0.5 -1.3,-0.8 -0.8,-1.7 -0.4,-1.8 -1.2,-2.2 v -3.5 l 0.7,-1.4 0.8,-1.5 7.1,-5.3 2.2,-2.1 1.1,-1.7 1,-1.9 0.8,-2.2 9.8,-2.5 4.9,1.4 v 0 l 25.7,7.7 3.6,4.4 4.2,0.4 -0.1,3.1 13.8,1.2 -1.3,16.8 -18.7,17 -0.1,3.1 -25.6,-9 -11,-3.1 -1.4,-0.9 z'
                    className={styles.others}
                    data-exclude='true'
                >
                    <title>Летище София</title>
                </path>
                <CustomPath
                    d='m 267.3,405.8 -0.1,0.5 0.2,0.6 1.1,1.2 0.5,2.9 4.1,5.3 1.3,3.1 2.1,3.4 -2.2,1.6 -0.5,-0.5 -1.6,1.9 -1.5,3.6 -0.2,0.9 -0.4,0.8 -0.2,1.1 -0.4,1.1 -0.4,0.7 -0.6,0.8 -1.6,0.7 -6.5,-1.2 -3.3,0.6 -1.6,5 -1.7,-0.8 -0.5,-0.7 -0.4,0.3 h -0.7 l -0.9,-0.2 -1.2,-0.9 -0.8,-1.3 -0.1,-0.6 0.3,-0.4 -1.6,-0.4 -0.8,-1.4 0.6,-3.4 -0.3,-0.9 -6.1,-2.8 -4.6,-1.5 -0.9,0.5 -1,-0.6 2.2,-2.3 1.4,-1.8 h 0.3 l 0.2,-0.1 0.1,-0.4 0.9,-0.6 0.5,-0.7 0.5,-0.3 1.9,-1.8 1.3,-0.9 3.4,-1.9 1.6,-0.6 0.9,-1.2 3.2,-2.6 1.3,-1.4 2.6,-3.6 10.2,-18.7 6,3.3 -0.8,10.8 -0.6,1.2 -4.3,3.8 z'
                    regionTitle='в.з.Симеоново - Драгалевци'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 352.7,424.1 -2.3,3.1 -1.5,1 -0.6,0.8 -0.5,1.1 -3.2,2.3 -3.8,1.7 -0.9,0.4 -1.2,0.4 -1.8,1.1 -1.7,1.4 -4,2.8 -1.8,-0.6 -1.2,1.8 -0.5,0.5 -0.6,0.3 -0.4,0.2 -0.2,0.2 -0.1,0.3 -0.1,0.4 -1,0.5 -3.2,2.4 -2.1,0.7 -0.6,1.3 -0.6,0.4 -0.3,0.8 -2.4,3.4 -2.2,4 -1.2,0.7 -4,-0.4 -13.4,-9.3 -1.7,-1.5 -1.7,-0.5 1.7,-4.4 0.7,-0.7 1.5,-2 2.6,-2.3 1.8,-1.2 1.3,-1.6 2.3,-1.6 1.9,-1.8 1.8,-2.1 3,-7.2 2.7,-1.9 -0.6,-0.6 h -3.1 l -0.7,-0.5 -6.4,-0.6 -3,-2.2 -0.2,1 -1.4,-0.2 0.1,-3 -0.5,-3.6 -9.8,-6.6 2.7,-4.1 13.8,7.6 2.7,1.3 2.2,1 2,0.6 1.6,0.5 2.2,0.5 5,0.8 6.7,0.5 38.5,1.9 -1.8,3.2 -7.8,3.2 -1.7,2.5 z'
                    regionTitle='в.з.Малинова долина'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 189,365.9 0.1,-1.9 -1.7,-4 -0.4,-2.1 0.2,-2.8 0.4,-1.9 5.5,-8.4 13.8,7.6 -6.3,15.9 -1.4,-1 -2.4,-1.1 z'
                    regionTitle='в.з.Киноцентъра 3 част'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 227.8,375.7 -0.2,3.7 -0.4,0.1 v 1.2 l 0.4,1.9 -0.2,0.6 -0.4,0.7 -2,2.2 -0.2,0.7 -0.1,1.4 -0.1,1 -3.1,4.3 -1.6,1.3 -0.3,0.6 -0.2,0.6 -0.1,0.6 v 0.5 0.4 l 0.3,0.7 2.7,4.3 -2.3,3.7 -1.1,1 -2.7,-0.3 -0.7,-0.6 -0.6,-1.4 -2.7,-2.7 -0.3,0.8 -1.3,0.5 -1.9,5 -5.2,-2.9 -0.7,-0.7 0.8,-0.8 h 2.4 l 1,-1.7 -0.2,-0.4 0.1,-0.9 0.9,-1.2 -2.1,-2 -1.1,-2.6 -1.1,-0.1 -0.5,1.8 -0.4,0.8 -0.3,0.4 -1,0.6 -0.5,0.5 -1.3,0.1 1,1.4 0.2,1.3 -0.8,0.3 -0.9,-0.7 -6.1,-8.6 1.1,-0.4 1.3,-0.7 1.1,0.7 1,0.3 h 0.7 l 0.1,-0.6 -1.8,-2.1 2.1,-2 -1.8,-1.8 -1.5,1.8 -1.5,-1.5 3.6,-4.5 3.1,-1.7 2.6,-0.6 0.7,-1 3.9,-2.1 -1.4,-1.9 5.3,-0.7 0.7,-0.6 0.3,-2 v -1.5 l 1.3,0.5 9.9,3.9 1.3,-2.8 2.6,0.7 z'
                    regionTitle='в.з.Киноцентъра'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 96.8,352.7 -0.3,0.7 -0.5,0.2 -2.7,0.8 0.8,4.5 -1.5,1.3 -0.3,1 -1.5,0.8 -1.3,-0.3 -1.2,-0.6 -0.7,0.2 -0.5,0.4 h -0.8 -0.7 l -1.2,-1.2 -4.6,-2.7 -0.9,0.3 -1.5,-0.5 -0.6,-0.5 -1.3,-0.1 -0.9,-0.6 -3.8,0.8 -1.3,-0.4 -0.9,-0.5 -1.1,-1.5 -1.6,-5 0.1,-1.1 2.4,-1.2 1.2,-0.5 1,-0.5 1.3,-0.2 -0.1,1.1 2.6,0.3 0.7,-0.4 -0.3,-0.7 0.1,-0.7 0.6,-0.5 0.9,-0.3 0.9,0.2 1,-0.6 0.4,-0.9 2.7,-2.1 0.3,-0.9 1.1,-1.2 1.3,-0.6 1.3,-0.3 0.6,0.4 0.6,0.5 1.2,0.4 0.7,-1.4 0.5,-0.2 1.9,0.5 1.2,0.1 0.9,1.6 0.4,1 1,0.3 1.1,0.9 0.4,2.6 1.6,1.9 1.2,0.4 -1.1,0.3 -0.6,1.8 v 1.9 z'
                    regionTitle='в.з.Килиите'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 116.3,323.1 3.1,-1.3 21.7,-11 3,4.1 1.8,4.5 1.7,2 1.3,1.1 8.8,4.3 -0.3,3.5 -3.7,-0.6 -2.1,6.1 0.7,9.2 -0.9,3.8 -3,-1.8 -1.9,-0.6 -1.6,-0.3 -1.7,2.3 -0.5,-0.1 -0.4,-1.2 -1.5,-1.4 -1.7,-0.9 -1.7,-0.5 -2.1,-2.3 -2.8,-1.8 -0.6,-0.3 -0.5,0.1 -1,0.4 -1,0.1 -0.8,-0.3 -0.3,-1.1 -0.4,-0.6 -3.8,-1.7 -1.2,-0.4 -1.5,0.1 -0.7,-1.3 -1.9,-2.1 -0.6,-0.4 -1.8,-0.7 0.5,-1.1 v -0.5 -4.3 z'
                    regionTitle='м-т Гърдова глава'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 169.1,365.4 -0.7,0.9 h -0.6 l -0.7,-0.4 1.2,-7.6 -1.7,-0.2 3.8,-1.4 v -1.4 l 0.5,-1.8 h 1.4 v -2.2 l -2.8,0.6 -1.2,0.8 -1,-2.5 2.6,-0.8 1.4,-0.7 1,-0.7 8.5,-7.5 1.3,-1.8 11,6.1 -5.5,8.4 -0.4,1.9 -0.2,2.8 0.4,2.1 1.7,4 -0.1,1.9 -2.9,-0.1 -1.6,-0.2 -4.7,-1.6 -1.1,3.2 -1.6,1.5 -1.7,1.2 -2.1,-0.4 -0.8,-0.5 -3,-3.7 z'
                    regionTitle='в.з.Бояна'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 128.9,357.8 -0.7,0.7 -0.9,-0.8 -0.6,-0.4 -0.5,1.1 -2.1,0.4 -2,-0.3 -2.3,-1 -1.1,-0.1 -4,0.2 -0.4,0.5 -0.6,2.2 h -1.3 l -1.6,-0.8 -0.7,0.5 -0.9,-0.2 -0.6,-0.5 -0.7,-0.1 -0.5,-0.1 -0.8,-3.7 0.8,-0.7 -0.7,-3.4 2,-1.1 v -1.3 l 0.8,-0.7 0.9,0.2 1.1,0.8 1.3,0.3 1.3,-0.2 -0.1,-1.5 0.3,-1 -0.4,-3.1 0.9,-1.5 1.6,-3.7 0.7,-2.2 -1.2,-0.2 -1.4,0.2 -0.7,-0.4 0.3,-0.7 0.6,-0.5 0.9,-0.1 0.6,0.3 0.4,-0.1 v -1.4 l -0.2,-1.4 1.8,0.7 0.6,0.4 1.9,2.1 0.7,1.3 1.5,-0.1 1.2,0.4 3.8,1.7 0.4,0.6 0.3,1.1 0.8,0.3 1,-0.1 1,-0.4 0.5,-0.1 0.6,0.3 -1,3.4 4.6,1.7 0.6,0.9 0.1,0.4 -1.4,1 -0.9,0.1 -1.5,2.7 -1,3.5 -0.9,0.4 -0.6,1.6 z'
                    regionTitle='в.з.Беловодски път'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 329.3,397.2 2.8,2.3 3.6,1.3 -9.2,10.6 -6.7,-0.5 -5,-0.8 1.2,-5.2 6.9,-8.4 3.7,0.4 z'
                    regionTitle='в.з.Американски колеж'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 310.7,266.8 1,1.1 3.4,4.8 -4.6,5.7 -20.8,-20.1 4.1,-4.7 1.4,0.9 8,6.4 z'
                    regionTitle='Яворов'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 215,219.3 4.7,1.1 1.1,-5.3 0.2,-0.8 0.3,-0.5 0.5,-0.8 0.5,-0.5 0.8,-0.9 -2.9,-0.4 1,-4.7 -0.6,-0.9 1.7,-0.9 0.9,-0.7 0.6,1 0.2,0.6 v 3.6 l 4,-0.1 v 0 l 3.7,0.4 0.6,-4.2 0.6,0.1 0.1,-0.7 3.4,1.1 -0.6,2 3.5,1 -0.9,3 6.2,0.5 1.2,-9.5 -4.5,-0.6 1.9,-6.1 4,2.6 0.6,-1 4.7,2.4 0.7,-1.2 5.2,2.6 7.5,1.9 2,1.2 3.4,2.4 -0.9,0.7 1,4.8 1.1,1.4 9,6.2 12.2,6.8 4,1 -0.3,1.5 v 0 l -0.1,1.4 -0.1,0.2 h -0.3 l -0.1,-0.1 -13,-0.7 -0.9,0.3 -0.9,-0.4 -1.1,-0.1 -0.1,4.2 -4.3,-0.2 -0.4,0.6 -1.7,8 2.8,3.3 1.4,-2.2 3.9,1.5 4.5,-1.3 0.2,-1.2 5.4,1.6 -1.4,1.2 -9.9,3 -1.2,0.7 -11.6,9.9 -0.3,0.3 -18.1,8.8 -4.3,1.8 -2.4,0.9 -2.8,0.4 -9.1,-0.2 -2.7,0.5 -2.4,0.8 -5.7,2.6 -3.3,1.4 -2.6,-12.4 15.7,-5.6 1.4,-0.7 -7.5,-7.9 -11.7,8.2 -4.7,-6.9 -0.6,-0.8 15,-6.4 6.5,-4.6 5.7,-3.9 -0.1,-0.7 2,-1.5 1.5,0.3 0.3,-1.3 -0.9,-0.1 -0.9,-1.3 -6.2,-1.3 -12.1,-2.5 -10.1,-2.1 1.4,-7 z'
                    regionTitle='Център'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                />
                <CustomPath
                    d='m 347.5,235.5 h 3.6 l 4.4,-0.7 -0.5,-1.5 4.4,-1.3 5.4,-1.3 -0.7,1.4 v 3.5 l 1.2,2.2 0.4,1.8 0.8,1.7 1.3,0.8 1.9,0.5 1.2,-0.1 0.7,0.2 10,12.9 1.4,0.9 -1.3,9.2 -3.3,5.5 -6.1,5.5 -18.4,-16.9 -0.3,0.3 -1.4,-1.8 2.8,-3.5 -10,-19.3 z'
                    regionTitle='Христо Ботев'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 236.6,326.4 0.4,-6.9 0.3,-5.4 7.2,-2.7 -2,13.8 -6.5,4 z'
                    regionTitle='Хладилника'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 214.3,261.5 0.5,2.5 2.6,12.4 -3.5,0.8 -1.4,0.4 -1.2,0.7 -0.7,0.7 -0.8,-0.5 -2.4,1.3 -0.8,0.1 -1,-0.1 -8.4,-2.7 -0.8,-0.2 -1.1,-0.1 -1.5,0.1 -1.9,0.3 -4.9,1.9 -1.4,-1.4 27.1,-19.7 0.9,1.4 0.3,0.7 z'
                    regionTitle='Хиподрума'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 290.4,213.6 -4.4,-2.9 v -2 l 11.2,-8.2 3.2,-0.6 16.9,-2.3 2.5,0.1 2.4,0.7 9.8,4.6 2.7,1.5 -1,-0.1 -1.7,0.3 -1.3,0.4 -1.3,0.7 -4.8,4.2 -2,1.3 -14,6.7 -3.4,2.4 -2.5,1 -1.3,-0.8 -7.6,-2.2 0.6,-1.5 z'
                    regionTitle='Хаджи Димитър'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 222,184.2 0.2,1.4 3.8,6.8 -11.9,6.7 -5.5,-9.7 7.7,-3 4.1,-1.6 z'
                    regionTitle='Фондови жилища'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 139.3,247.4 -2.4,0.1 v -1 l -0.8,0.3 -1.6,-0.1 -1.1,-0.1 -3.2,0.5 -0.6,-2.2 -2.2,-7.7 -2.8,-3.7 1.7,-5.6 3.9,1 4,-3.9 1.2,0.4 1.8,0.9 0.2,0.4 -0.1,1.6 2.1,2.6 5.7,-4.4 5.2,4.9 3.9,-0.4 0.5,1.5 5.9,-1.6 0.3,-2.2 -0.2,-4.2 0.6,-1.3 0.9,-0.6 3.3,-0.3 0.4,1.3 3.8,-0.5 1,4.9 -1.6,0.4 1,2.2 0.1,0.7 0.1,0.5 0.2,0.4 1.1,0.4 0.2,9.1 v 0.1 l -0.3,3.5 2.8,2.8 -1.2,1.5 v 0 l -5.9,10.5 -7.6,-7.1 -4.5,-0.8 -1.7,-0.7 -3.3,-0.5 -1.9,-0.3 -2.3,-0.8 -1.8,-0.8 -3.6,-2.1 z'
                    regionTitle='Факултета'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 223.1,168.5 6.6,8.1 -0.7,3.7 -4.4,-0.2 -1.5,-1.3 -12.5,-6.4 -7.1,-2.4 0.4,-1 7.7,0.1 10.9,-1.3 z'
                    regionTitle='Триъгълника'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 233.6,168 -0.6,2.7 -4.7,-2.3 -0.6,-0.2 -4.6,0.3 -0.6,-0.7 2.5,-1.8 7.4,-20.6 4.5,3.2 z'
                    regionTitle='Толстой'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 308.6,218 14,-6.7 2,-1.3 4.8,-4.2 1.3,-0.7 1.3,-0.4 1.7,-0.3 1,0.1 2.6,0.5 1.3,5 3.6,5.6 0.9,2.3 0.9,6.6 3.6,-1 0.6,1.7 -0.6,6.8 v 0.1 l -0.1,3.4 H 345 l 10,19.3 -2.8,3.5 -15.1,-13.6 v 0 l -5.3,-4.5 -2.8,-2.3 -1.8,-1 v 0 l -5.8,-2.4 -3.1,-0.8 -2.3,0.2 -5.1,-0.2 -0.7,-1.5 -1.2,-1.2 -1.4,-0.8 -1.2,-0.5 -4.8,-1 2.3,-6.3 -1.2,-1 2.5,-1 z'
                    regionTitle='Сухата река'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 317.9,318.1 0.2,0.5 0.2,1 0.7,14 1,6.8 -0.1,1.4 -0.5,1.4 -5.1,7.6 3.1,2.4 -4.1,3.9 0.8,2.3 0.1,3.8 -1,0.4 -1.8,0.2 -3.2,0.5 -2,0.7 -1.3,0.8 -1.3,1.1 0.2,1.6 v 0.7 l -0.6,2 -0.6,0.4 -0.3,0.3 -0.1,0.6 -2.4,1.4 -7.7,-4.3 -1.3,2.2 -10.6,-0.4 0.2,-6.4 -0.3,-0.7 -1.1,-3.3 0.3,-3.9 0.2,-1.1 1.3,-3.1 v -1 l 0.4,-7.2 3.2,-6.7 5.8,-4.7 -0.7,-5.8 6.4,-1.8 20,-10.5 1.5,1.9 z'
                    regionTitle='Студентски град'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 209.7,280 0.9,-1 0.7,-0.7 1.2,-0.7 1.4,-0.4 3.5,-0.8 2.3,11.3 1.1,4.5 -2.5,18.7 -2.7,-2.4 -12.8,-14.3 1.6,-2.6 z'
                    regionTitle='Стрелбище'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 330.4,278.6 1.1,-1.9 2.9,-7.5 4.4,2.4 1.9,-3.7 v -1.1 l -1.8,-3.4 -0.4,-3.9 -1.4,-3.4 -3.3,-1.8 1.3,-0.6 -2.3,-3.6 -1.5,-2.2 -0.3,-0.1 -2,0.2 0.2,-1.3 0.7,-2 1.6,0.3 1,-0.2 -0.7,-4.6 5.3,4.5 v 0 l 15.1,13.6 1.4,1.8 2.7,3.7 0.7,1.5 0.4,1.2 0.3,1.2 0.1,1.3 v 1.1 l -0.5,2.6 -0.9,2.8 -2.1,4.5 -0.9,1.3 -1.2,1.1 -1.5,0.9 -1.4,3.5 -4.5,-1 -3,-0.8 -1.3,-0.6 z'
                    regionTitle='Слатина'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 158.6,288.5 0.9,-1.6 2.9,-10.6 0.5,-0.8 2.2,-2.6 2.3,-1.8 5.2,-4.9 4.9,4.8 1,1.3 7.1,5.4 -9.7,7.5 -12.2,9.5 -5.8,-5.3 z'
                    regionTitle='Славия'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 295.6,452.5 4.7,2.9 -0.7,2.2 -3,0.4 -12.2,-13.1 -2.9,3.1 -1.3,-0.2 -1.2,-3.5 -1.7,-0.8 -2.9,-0.4 -6.1,3 -0.3,-1.4 1.3,-6.1 -1.8,-1.2 -0.6,-1.9 1.6,-0.7 0.6,-0.8 0.4,-0.7 0.4,-1.1 0.2,-1.1 0.4,-0.8 0.2,-0.9 1.5,-3.6 1.6,-1.9 0.5,0.5 2.2,-1.6 -2.1,-3.4 -1.3,-3.1 -4.1,-5.3 -0.5,-2.9 -1.1,-1.2 -0.2,-0.6 0.1,-0.5 0.3,-0.8 4.3,-3.8 0.6,-1.2 0.8,-10.8 17,9.4 -2.7,4.1 9.8,6.6 0.5,3.6 -0.1,3 1.4,0.2 0.2,-1 3,2.2 6.4,0.6 0.7,0.5 h 3.1 l 0.6,0.6 -2.7,1.9 -3,7.2 -1.8,2.1 -1.9,1.8 -2.3,1.6 -1.3,1.6 -1.8,1.2 -2.6,2.3 -1.5,2 -0.7,0.7 -1.7,4.4 1.7,0.5 1.7,1.5 -1.6,2.1 0.4,0.4 0.3,0.4 z'
                    regionTitle='Симеоново'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 196.9,246 6.6,-5.2 5.8,-4.4 6,-3.8 v 0 l 1,-0.8 0.9,-0.9 0.6,-1.3 -0.9,5 0.7,3.1 0.6,-0.6 2.7,0.5 -0.4,2 0.8,0.2 -0.4,1.5 1.5,2.6 -15,6.4 0.6,0.8 -4.2,3.1 -1.1,-1.4 -2,0.7 -0.7,0.5 -1,0.1 -2,0.6 -1.9,1.9 -3.7,-4.5 0.4,-0.7 -2,-1.3 4.2,-1.9 z'
                    regionTitle='Сердика'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 218.7,134.4 0.4,-0.2 -0.4,-2.2 0.1,-2.9 1.6,-0.3 6.5,-2.5 7.5,4.5 v 4.7 l 0.2,1 0.8,0.4 -3,8.5 -2,-1.3 -10,-6.5 -1.3,-0.5 z'
                    regionTitle='Свобода'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 194.8,197 -2,-1.4 15.8,-6.2 5.5,9.7 4.2,7.9 2.3,-1.4 0.6,0.9 -1,4.7 -3.5,-0.5 -1.7,8.6 -5.5,-1.4 1,-4.4 -8.2,-1.9 -12.2,-7.5 z'
                    regionTitle='Света Троица'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 327.1,257 -1.2,-0.1 -0.9,-0.1 -4.1,-1.4 -2.7,-0.7 -7.1,-1.6 0.1,-0.4 -2.5,-1.1 2.9,-6.4 0.3,-1.7 -0.1,-6.8 -0.5,-2.2 -0.4,-0.8 5.1,0.2 2.3,-0.2 3.1,0.8 5.8,2.4 v 0 l 1.8,1 2.8,2.3 0.7,4.6 -1,0.2 -1.6,-0.3 -0.7,2 -0.2,1.3 2,-0.2 0.3,0.1 1.5,2.2 2.3,3.6 -1.3,0.6 -3.4,1.8 -0.8,0.4 -0.8,0.3 z'
                    regionTitle='Редута'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 206,234.7 -2.5,6.1 -6.6,5.2 -2.9,2.2 -4.2,1.9 -1,-2.3 -3.5,-3.7 5.2,-4.8 -0.2,-2.9 -2.3,-12.8 -0.5,-3.1 20.6,4.4 z'
                    regionTitle='Разсадника'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 364.5,330.6 -25.4,-24.6 -1.9,-1.8 -2.7,-2.6 14.8,-14.8 9.7,2.4 -0.4,2.2 1.6,4.5 0.9,1.7 14.7,21.9 -7.6,8.3 -0.9,0.9 -2.1,1.5 z'
                    regionTitle='Полигона'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 309,231 1.2,1.2 0.7,1.5 0.4,0.8 0.5,2.2 0.1,6.8 -0.3,1.7 -2.9,6.4 -2.8,6.3 -0.7,0.9 -2,2.1 -8,-6.4 -1.4,-0.9 -4.1,4.7 -9.6,-9.1 1.2,-0.7 9.9,-3 1.4,-1.2 2.9,-2.5 0.4,-0.6 0.2,-0.7 0.2,-5.5 0.5,-4.1 0.1,0.1 h 0.3 l 0.1,-0.2 0.1,-1.4 v 0 l 0.3,-1.5 3.9,0.8 4.8,1 1.2,0.5 z'
                    regionTitle='Подуяне'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 168.3,311.2 -4,12.4 -1,5.9 -5.6,-2.7 -8.8,-4.3 -1.3,-1.1 -1.7,-2 -1.8,-4.5 -3,-4.1 5.2,-2.8 6.2,-4.7 -0.1,1.8 z'
                    regionTitle='Павлово'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 271.9,81.8 12.7,3.8 -2.2,7.7 -7,-2.1 -10.7,32.5 5.7,6.5 6.6,3.3 -2.4,5.1 -21.4,-10.2 -2.3,7.9 -6.4,-1.9 v -1 l -9.6,-4.6 -26.2,-12.5 -1.9,0.2 -2.5,-2.6 4.5,-2.4 0.3,-1 2.3,-4.2 1.3,-1 0.8,-1.5 0.1,-1.3 3.1,-2.9 1.2,-1.8 2.3,-2 5,-2.5 10.2,-17 h 11.9 l 6,1 1,-2.9 3.9,-7.7 11.7,2.8 -5,18.3 0.4,0.2 1,-1.5 z'
                    regionTitle='Илиянци'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 307.9,186.1 -0.4,1 -0.8,1.1 -10.4,10.4 -3,-1.2 -1.2,-0.7 -1.2,-1.2 -6.2,-9.2 -2,-3 -11.2,-8.3 -1.2,2.4 -5.7,-4.3 1.1,-2.4 1.9,-9.3 5.8,0.4 1.7,-8.4 5.9,-11.7 5.9,3 9,5.7 15.2,9.8 -4.9,9.7 -0.1,4.6 z'
                    regionTitle='Орландовци'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 125.6,265.7 -0.4,0.5 -0.5,0.5 -0.6,1.1 -0.7,0.8 -0.9,0.8 -0.8,0.4 -0.8,-0.1 -3.4,5 -11,-7.7 0.6,-1.2 0.1,-0.6 -1.4,-1.8 -0.8,-0.9 -0.5,-0.6 -0.2,-0.6 -0.2,-1.2 0.4,-1.4 2.4,-3.6 0.5,-0.5 0.9,-0.7 0.9,-0.5 1.5,-0.4 11.5,-2 2.4,13.2 0.8,0.6 0.2,0.5 z'
                    regionTitle='Овча купел 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 144.3,260 -0.6,0.7 -0.3,0.7 v 0.7 l 1.6,1.7 -0.7,0.2 -1,0.6 -3.9,1.9 -2.8,2.1 -1.1,-1.1 -2.1,0.8 0.1,-1 -2.5,-0.9 -1.3,0.5 -1.6,1 -2,-0.9 -0.9,-0.8 0.4,-0.5 v -0.4 l -0.2,-0.5 -0.8,-0.6 -2.4,-13.2 8.7,-1.5 -0.7,-2.4 3.2,-0.5 1.1,0.1 1.6,0.1 0.8,-0.3 v 1 l 2.4,-0.1 1.2,-0.4 3.6,2.1 1.8,0.8 2.3,0.8 -0.1,4.7 -1.5,1.7 -1,1.7 z'
                    regionTitle='Овча купел 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 125.5,293.8 -0.5,-0.7 -0.5,-1 -0.8,-1.8 -0.4,-1.6 -0.8,-6.7 -0.5,-1.8 -0.3,-0.8 -1.1,-1.9 -0.6,-0.7 -1.2,-1.2 -1.3,-0.9 3.4,-5 0.8,0.1 0.8,-0.4 0.9,-0.8 0.7,-0.8 0.6,-1.1 0.5,-0.5 0.9,0.8 2,0.9 1.6,-1 1.3,-0.5 2.5,0.9 -0.1,1 2.1,-0.8 1.1,1.1 2.8,-2.1 3.9,-1.9 1,-0.6 0.7,-0.2 -1.6,-1.7 v -0.7 l 0.3,-0.7 0.6,-0.7 1.3,-1.2 1,-1.7 1.5,-1.7 0.1,-4.7 1.9,0.3 3.3,0.5 1.7,0.7 4.5,0.8 7.6,7.1 -0.8,1.5 1.4,0.7 1.4,1 1.4,1.1 2,1.8 -5.2,4.9 -2.3,1.8 -2.2,2.6 -0.5,0.8 -2.9,10.6 -0.9,1.6 -0.7,0.9 5.8,5.3 -11.2,8.6 -6.2,4.7 -5.2,2.8 z'
                    regionTitle='Овча купел'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 295.9,241.2 -0.4,0.6 -2.9,2.5 -5.4,-1.6 1.5,-8.1 7.6,0.4 -0.2,5.5 z'
                    regionTitle='Оборище'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 184.9,120.9 -0.6,0.4 -2.7,0.1 -7.6,2.6 -0.3,-0.4 -1.1,-1 -0.7,-0.6 -0.8,-0.4 -0.7,-0.1 -1,-0.2 h -3.9 l 0.2,-0.7 1.3,-2.4 -3.7,-2.3 -1.4,2.2 -5.3,-3.2 -0.9,-0.3 -0.7,-0.2 h -1 l -0.1,-3.4 4.3,-2.9 16.6,0.2 8.8,11 z'
                    regionTitle='Обеля 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 165.5,121.3 h 3.9 l 1,0.2 0.7,0.1 0.8,0.4 0.7,0.6 1.1,1 0.3,0.4 -2.7,2.2 -0.7,0.7 -12.8,16.6 -2.6,-2.7 -6.3,-7.8 0.3,-1.2 12.4,-10.1 0.3,-0.4 z'
                    regionTitle='Обеля 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 153.9,111 0.1,3.4 h 1 l 0.7,0.2 0.9,0.3 5.3,3.2 1.4,-2.2 3.7,2.3 -1.3,2.4 -0.2,0.7 h -3.6 l -0.3,0.4 -12.4,10.1 -0.3,1.2 -8.2,-10.1 0.2,-4.9 1,-2.9 9.4,-4.6 z'
                    regionTitle='Обеля'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 211.7,135 7.4,2.1 1.3,0.5 10,6.5 -20.1,0.9 -2.1,0.8 -1.9,1.5 -6.1,-7.5 8.7,-6.6 1.4,1.1 z'
                    regionTitle='Надежда 4'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 188.4,149 11.8,-9.2 6.1,7.5 -14.9,16.2 -9.9,-5.5 4.9,-4.9 z'
                    regionTitle='Надежда 3'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 230.4,144.1 2,1.3 -7.4,20.6 -2.5,1.8 -16.2,-20.5 1.9,-1.5 2.1,-0.8 z'
                    regionTitle='Надежда 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 211.6,169.1 -7.7,-0.1 -0.4,1 -12.1,-6.5 14.9,-16.2 16.2,20.5 z'
                    regionTitle='Надежда 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 336.2,305.4 -1.8,-0.3 -0.3,1.3 0.2,0.8 0.1,0.7 v 2.3 l 1.1,7.9 0.7,2.1 -0.3,0.5 -2,1.8 -1.7,2 0.2,2 -0.3,0.5 0.3,3 -5.4,-4.1 -2.3,-2.1 -3.3,-3.4 -1.6,-1 -1.7,-0.8 -0.2,-0.5 -0.5,-1 -1.5,-1.9 9,-5 9.6,-8.6 2.7,2.6 z'
                    regionTitle='Мусагеница'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 144.7,160.7 13.1,-17.2 2.5,1.9 20.9,12.4 0.3,0.2 9.9,5.5 12.1,6.5 -0.7,1.7 -15.2,9.6 -0.9,0.8 -1.4,0.5 h -3.4 l -1.9,-0.3 -2.5,1 -0.7,1 -1.8,-1.3 -9.6,-7.1 -11.1,-8.1 z'
                    regionTitle='Модерно предградие'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 326.8,390.9 -0.2,-0.8 0.3,-1.2 -0.1,-0.9 0.3,-0.5 0.4,-0.3 0.6,-0.3 1.5,-0.2 0.9,-1.7 0.5,-1.3 1,-0.8 1,-1.3 -2.2,-1.3 -1.2,-1.4 3.7,1.3 5.2,-0.5 0.4,-1 1.3,0.3 7,-0.3 v -0.4 l 9.2,-0.1 7.4,2.4 -2.3,4 -1,3.2 v 1.3 l 1.6,2 2.2,3.4 -0.2,0.9 -1.2,0.6 h -1.2 l 0.2,0.8 1,2 0.8,1.8 1.6,1.8 0.6,1 0.1,0.8 1,-0.4 1.5,0.5 0.5,0.8 -0.4,1 -3.4,1.7 0.8,1.5 -0.1,1.1 -0.9,2.9 -38.5,-1.9 9.2,-10.6 -3.6,-1.3 -2.8,-2.3 -2.7,-0.3 0.3,-3.2 -0.3,-1.4 0.5,-0.9 z'
                    regionTitle='Младост 4'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 365.9,360.6 2.6,10 0.1,1 -0.6,2.2 -4.2,6.8 -7.4,-2.4 -9.2,0.1 v 0.4 l -7,0.3 -1.3,-0.3 11.8,-26.2 14.1,4.4 -0.3,1.4 z'
                    regionTitle='Младост 3'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 338.9,378.7 -0.4,1 -5.2,0.5 -3.7,-1.3 -0.6,-2.8 0.1,-3 -0.4,-0.6 v -1.4 l 0.2,-1.6 1.7,-1.7 -0.6,-4.2 0.2,-1.8 1,-2.3 1.5,-2 1.3,-4.6 0.3,-4.4 5.2,0.6 2.4,0.5 8.8,2.9 z'
                    regionTitle='Младост 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 360.3,338.8 8.1,8.4 0.1,0.5 -0.1,0.4 1.1,1.2 -1.1,0.9 -0.4,1.5 -3.2,5.2 -14.1,-4.4 7.5,-15.9 0.7,-1.2 2.5,2.4 z'
                    regionTitle='Младост 1А'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 358.2,336.6 -7.5,15.9 -8.8,-2.9 -2.4,-0.5 -5.2,-0.6 -2.1,-0.1 0.9,-2.2 -0.1,-5.2 0.2,-0.5 0.3,-2.8 0.8,-1.1 0.4,-0.5 0.7,-0.9 0.5,-2 0.1,-1.6 0.2,-0.4 0.8,0.3 0.9,-1 -0.3,-1.3 1.4,-2.5 0.2,-1 -0.7,-0.3 -0.7,-0.9 0.1,-1 0.4,-0.6 1.3,-3.4 0.4,-1.7 h -1.2 l 0.2,-2.2 h 0.9 l -0.1,-2.7 -2.2,-0.9 v -3.8 l 0.7,-1.3 0.8,-0.9 25.4,24.6 -3,1.9 -1.2,1.1 -1.4,1.8 z'
                    regionTitle='Младост 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 214.8,264 -0.5,-2.5 -0.4,-1.4 -0.3,-0.7 -0.9,-1.4 11.7,-8.2 7.5,7.9 -1.4,0.7 z'
                    regionTitle='Медицинска академия'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 163.3,329.5 1,-5.9 4,-12.4 2,-6.2 0.9,-4.9 1,0.5 2.5,1.8 1,0.7 0.8,0.5 14.8,6.9 27.7,18.8 -0.3,2.2 -1.5,-0.2 -0.8,0.1 -0.5,0.4 0.2,1.5 -0.3,1 v 1.9 l -0.6,2.5 -1.9,6.8 -1.9,5.3 -0.3,3.9 -4.2,-2.3 -13.8,-7.6 -11,-6.1 z'
                    regionTitle='Манастирски ливади'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 309.2,370.3 2.5,1.6 0.5,0.7 2.3,4.6 -1.3,0.7 -0.6,1.7 -0.1,1.2 0.9,0.9 1,0.7 -1.6,2 -0.4,-0.4 -0.1,0.6 0.9,1.2 0.6,3.1 v 0 l 1.3,3.9 1.8,3.5 0.8,-0.3 2.6,-1.7 -0.6,-4.3 3.7,-0.5 0.7,4.9 -0.3,1.2 -0.9,0.9 -6.9,8.4 -1.2,5.2 -2.2,-0.5 -1.6,-0.5 -2,-0.6 -2.2,-1 -2.7,-1.3 -13.8,-7.6 -17,-9.4 1.7,-21.5 -0.3,-1.5 5.4,-1.9 0.3,0.7 -0.2,6.4 10.6,0.4 1.3,-2.2 7.7,4.3 2.4,-1.4 0.1,-0.6 0.3,-0.3 0.6,-0.4 0.6,-2 v -0.7 l -0.2,-1.6 1.3,-1.1 1.3,-0.8 2,-0.7 3.2,-0.5 0.1,0.8 -2.3,1.6 0.2,1.4 z'
                    regionTitle='Малинова долина'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 321.3,188 7.5,2 6.2,0.4 8.7,-3.5 3.9,15.9 -8.1,2.1 -0.9,0.2 -1.3,-0.1 -2.6,-0.5 -2.7,-1.5 -9.8,-4.6 -2.4,-0.7 -2.5,-0.1 -16.9,2.3 -4.1,-1.3 10.4,-10.4 0.8,-1.1 0.4,-1 -1.8,-11.6 0.1,-4.6 4.9,-9.7 19.7,12.8 -8.7,5.7 4,4.5 z'
                    regionTitle='Малашевци'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 165.4,175.9 -3.5,4.6 -2.6,1.3 -7.6,10.6 -7,-5.3 -2.5,-1.7 12.1,-17.6 z'
                    regionTitle='Люлин 9'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 154.3,167.8 -12.1,17.6 -10.2,-7.4 6.8,-9.4 5.9,-7.9 z'
                    regionTitle='Люлин 8'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 143.1,189 0.3,-0.3 1.3,-1.6 7,5.3 8.9,6.7 -3.2,1.8 -12.9,1.9 -1.7,-0.1 -3,0.4 -1.8,-12.8 3.3,-0.4 0.6,-0.2 0.5,-0.3 z'
                    regionTitle='Люлин 7'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 130.2,190.5 0.9,0.4 0.8,0.1 h 1.2 l 4.9,-0.7 1.8,12.8 -2.4,0.3 -2.8,0.8 -7,0.9 -5,0.1 -3.7,-0.5 -2.2,-0.7 -2.5,-1.5 5.4,-7.5 5.7,-7.9 3.8,2.8 z'
                    regionTitle='Люлин 6'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 101.4,179.8 2.7,-0.9 -0.5,1.2 5.1,3.9 0.5,0.5 0.3,0.5 0.6,2.2 0.2,0.6 0.8,0.8 8.5,6.4 -5.4,7.5 -11.4,-8.6 -13.4,-0.5 0.6,-1.3 5.3,-9.2 2.5,-4.3 z'
                    regionTitle='Люлин 5'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 111.1,188.6 -0.8,-0.8 -0.2,-0.6 -0.6,-2.2 -0.3,-0.5 -0.5,-0.5 -5.1,-3.9 0.5,-1.2 -2.7,0.9 -3.6,-1.2 4.8,-8.3 22.7,16.8 -5.7,7.9 z'
                    regionTitle='Люлин 4'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 102.6,170.3 5.5,-9.6 23.9,17.3 -6.7,9.1 z'
                    regionTitle='Люлин 3'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 108.1,160.7 5.8,-10 24.9,17.9 -6.8,9.4 z'
                    regionTitle='Люлин 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 165.4,175.9 9.6,7.1 -6.6,10.3 -0.5,0.6 -2,2.1 -5.3,3.1 -8.9,-6.7 7.6,-10.6 2.6,-1.3 z'
                    regionTitle='Люлин 10'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 138.8,168.6 -24.9,-17.9 5.4,-9.6 25.4,19.6 z'
                    regionTitle='Люлин 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 143.4,188.7 -0.3,0.3 -0.7,0.4 -0.5,0.3 -0.6,0.2 -3.3,0.4 -4.9,0.7 h -1.2 l -0.8,-0.1 -0.9,-0.4 -1.1,-0.6 -3.8,-2.8 6.7,-9.1 10.2,7.4 2.5,1.7 z'
                    regionTitle='Люлин - център'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 274.1,281.9 0.3,5.7 3.1,5.2 -6.8,7.4 -2.3,1.1 -23.9,10.1 -7.2,2.7 0.3,-3.9 0.2,-2.3 0.3,-4.7 -0.2,-2.3 -0.1,-3.6 -1.8,-1.8 -1.4,-0.9 -0.5,-0.3 -0.5,-0.2 H 233 l -0.2,-0.2 -0.6,0.5 -0.9,-0.7 -0.3,-0.1 -0.7,-0.1 -0.4,-0.2 -0.2,-0.4 4.9,-3.5 -0.5,-0.8 h 1 l 0.9,-0.4 12.1,-8.8 3.7,-1.2 -1.1,-7 -0.6,-3 18.1,-8.8 0.3,-0.3 11.3,12.6 -2.9,0.2 -5.7,1.8 z'
                    regionTitle='Лозенец'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 363.3,199.9 -1.8,-0.1 -2.4,0.2 -11.5,2.8 -3.9,-15.9 -0.2,-0.8 14.7,0.1 18.1,3.3 1.6,12.8 z'
                    regionTitle='Левски Г'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 377.9,202.3 1.7,9.3 -2.4,0.5 0.6,3.9 -9.5,2.5 -0.8,-3.3 -0.2,-0.6 -0.8,-1 -0.3,-0.3 -5.4,-3.6 -1.7,-0.7 -0.9,-0.2 -2.5,-0.2 -6.9,0.6 -1.2,-6.4 11.5,-2.8 2.4,-0.2 1.8,0.1 z'
                    regionTitle='Левски В'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 372.7,223.9 -7.1,5.3 -0.8,1.5 -5.4,1.3 -4.4,1.3 0.5,1.5 -4.4,0.7 h -3.6 l 0.1,-3.4 V 232 l 0.6,-6.8 -0.6,-1.7 -3.6,1 -0.9,-6.6 -0.9,-2.3 -3.6,-5.6 -1.3,-5 1.3,0.1 0.9,-0.2 8.1,-2.1 1.2,6.4 6.9,-0.6 2.5,0.2 0.9,0.2 1.7,0.7 5.4,3.6 0.3,0.3 0.8,1 0.2,0.6 0.8,3.3 9.5,-2.5 -0.8,2.2 -1,1.9 -1.1,1.7 z'
                    regionTitle='Левски'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 188.8,260.2 1,-1.9 0.8,-4.8 0.8,-1.4 3.7,4.5 1.9,-1.9 2,-0.6 1,-0.1 0.7,-0.5 2,-0.7 1.1,1.4 4.2,-3.1 4.7,6.9 -27.1,19.7 -7.1,-5.4 -1,-1.3 8.3,-7.4 z'
                    regionTitle='Лагера'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 213.3,345.5 1.9,-6.8 0.6,-2.5 v -1.9 l 0.3,-1 -0.2,-1.5 0.5,-0.4 0.8,-0.1 1.5,0.2 0.3,-2.2 1.1,0.2 -0.1,-2.4 -0.4,-2 0.5,-2.9 -1.2,-5.8 5.8,10 0.5,0.7 0.8,0.8 0.9,0.7 1,0.6 1.2,0.4 1.5,0.4 2.1,0.1 2,-0.5 1.3,-0.4 0.1,1.7 17.3,0.4 -2,6.6 -1.9,10.6 -0.4,6.9 -5.1,17.6 -23.9,-13.3 -9,-5 0.3,-3.9 z'
                    regionTitle='Кръстова вада'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 187,279.1 5.6,5.3 -3.8,5.3 -10.8,10.5 -2.3,2.9 -1,-0.7 -2.5,-1.8 -1,-0.5 0.6,-2.8 4.1,-12.1 9.7,-7.5 z'
                    regionTitle='Красно село'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 190.5,239.3 -5.2,4.8 3.5,3.7 1,2.3 -3,2.1 -2.3,1 -7.1,-8 9,-8.5 1.1,-0.4 2.8,0.1 z'
                    regionTitle='Красна поляна 3'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 171.8,241.8 v -0.1 l -0.2,-9.1 7.5,2.7 6,0.6 1.3,0.8 -9,8.5 -3.1,2.9 -2.8,-2.8 z'
                    regionTitle='Красна поляна 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 179.1,235.3 -7.5,-2.7 -1.1,-0.4 -0.2,-0.4 -0.1,-0.5 -0.1,-0.7 -1,-2.2 1.6,-0.4 4,-1 4.2,-0.2 v 0 l 6.4,-1.3 -0.2,-1.4 2.9,-0.5 2.3,12.8 -2.8,-0.1 -1.1,0.4 -1.3,-0.8 z'
                    regionTitle='Красна поляна 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 55.3,353.2 -2.8,-0.3 -2.7,-0.8 21.4,-13.6 8,-5.9 5.8,-2.3 9.4,-3.4 2.4,-2.1 1.4,0.4 0.5,0.4 0.9,-0.2 0.7,-0.6 5.4,-3.4 1.2,-1.3 0.6,0.1 1.4,-0.7 1.2,0.8 0.4,-0.2 0.6,1.5 0.6,-0.6 2,-3 5,0.1 0.7,3.7 -3.1,1.3 0.6,3 v 4.3 0.5 l -0.5,1.1 -4.5,-1.3 -7.7,-0.9 0.1,0.9 -0.1,0.2 -2.2,1.1 -1,1.2 1,1 1.2,1.8 1.8,4.1 0.2,2.1 -0.6,0.5 -2.6,1.8 -1.9,2.2 -0.6,0.6 -0.5,0.3 -0.3,0.1 -1.2,-0.4 -1.6,-1.9 -0.4,-2.6 -1.1,-0.9 -1,-0.3 -0.4,-1 -0.9,-1.6 -1.2,-0.1 -1.9,-0.5 -0.5,0.2 -0.7,1.4 -1.2,-0.4 -0.6,-0.5 -0.6,-0.4 -1.3,0.3 -1.3,0.6 -1.1,1.2 -0.3,0.9 -2.7,2.1 -0.4,0.9 -1,0.6 -0.9,-0.2 -0.9,0.3 -0.6,0.5 -0.1,0.7 0.3,0.7 -0.7,0.4 -2.6,-0.3 0.1,-1.1 -1.3,0.2 -1,0.5 -1.2,0.5 -2.4,1.2 -0.1,1.1 -1.3,0.8 -2,0.1 -3.1,1.7 z'
                    regionTitle='Княжево'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 125,293.1 0.5,0.7 15.6,17 -21.7,11 -0.7,-3.7 -5,-0.1 -2,3 -0.6,0.6 -0.6,-1.5 -0.4,0.2 -1.2,-0.8 -1.4,0.7 -0.6,-0.1 -1.2,1.3 -5.4,3.4 -1.8,-0.6 -0.3,-1.6 6.3,-10.5 3.6,-16.7 0.6,0.2 6.5,-3.8 9.3,0.3 z'
                    regionTitle='Карпузица'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 184,204.3 0.1,-0.4 -0.1,-1.9 -0.7,-2.6 9.5,-3.8 2,1.4 -4.7,7.1 12.2,7.5 8.2,1.9 -1,4.4 -1.4,7 -20.6,-4.4 -1.5,-8.6 -1.3,-7.6 -0.5,0.1 z'
                    regionTitle='Илинден'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 310.5,278.4 24,23.2 -9.6,8.6 -9,5 -2.2,-2.5 -4,-4.9 -0.8,-1.1 -0.7,-1.3 -2,-6.8 -1.2,-2.1 -1.2,-1.4 -1.2,-0.9 -3.4,-1.7 -1.4,-1 -0.5,-0.3 2.3,-2 0.2,-0.6 9.2,-8.4 z'
                    regionTitle='Изток'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 299.7,306.4 -2.1,0.1 -1.1,0.3 -6.4,2.4 2.4,-13.4 0.3,-0.6 4.5,-4 0.5,0.3 1.4,1 3.4,1.7 1.2,0.9 1.2,1.4 1.2,2.1 2,6.8 -2.3,0.4 -0.9,0.3 -2.4,0.3 z'
                    regionTitle='Изгрев'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 226.3,286.9 -2.7,0.4 -3.9,0.4 -2.3,-11.3 3.3,-1.4 5.7,-2.6 2.4,-0.8 2.7,-0.5 9.1,0.2 -10,16.8 -1.8,-0.7 -1.3,-0.3 z'
                    regionTitle='Иван Вазов'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 236.5,230.8 0.9,1.3 0.9,0.1 -0.3,1.3 -1.5,-0.3 -2,1.5 0.1,0.7 -5.7,3.9 -0.2,-0.9 v -1 l 1.6,-7.9 z'
                    regionTitle='Зона Б-5-3'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 228.7,238.4 0.2,0.9 -6.5,4.6 -1.5,-2.6 0.4,-1.5 -0.8,-0.2 0.4,-2 -2.7,-0.5 -0.6,0.6 -0.7,-3.1 0.9,-5 0.4,-2.6 12.1,2.5 -1.6,7.9 z'
                    regionTitle='Зона Б-5'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 215.3,232.6 v 0 l -6,3.8 -5.8,4.4 2.5,-6.1 2.1,-9.8 10.1,2.1 -0.4,2.6 -0.6,1.3 -0.9,0.9 z'
                    regionTitle='Зона Б-19'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 222.3,212.5 -0.5,0.5 -0.5,0.8 -0.3,0.5 -0.2,0.8 -1.1,5.3 -4.7,-1.1 1.7,-8.6 3.5,0.5 2.9,0.4 z'
                    regionTitle='Зона Б-18'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 181.9,182.6 h 3.4 l 1.4,-0.5 0.9,-0.8 15.2,-9.6 0.7,-1.7 1.1,1.9 1.5,2.7 0.5,3.2 12.5,4.4 -1.2,2.4 -1.7,1.4 0.1,0.4 -7.7,3 -15.8,6.2 -16,-11.3 0.7,-1 2.5,-1 z'
                    regionTitle='Захарна фабрика'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 169.5,205.5 16.5,6.4 1.5,8.6 0.5,3.1 -2.9,0.5 0.2,1.4 -6.4,1.3 v 0 l -4.2,0.2 -4,1 -1,-4.9 -0.2,-1.3 0.4,-1.2 -1.8,-13.4 z'
                    regionTitle='Западен парк'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 382.6,408 0.3,-2.8 -0.8,-3.2 -4.1,-5.7 -4.4,-2.6 -1.8,-4.7 -1.4,-0.9 v -0.5 l 1,-1.3 -0.1,-1.2 -1.6,-1.7 0.9,-0.7 4.4,-2.2 12.3,0.1 3.3,2.1 7.3,-0.5 2.4,2.7 v 0.4 l 1.2,4.7 -2.6,2.8 -2.8,-0.9 -5,-0.7 -0.6,1.5 -1.9,2.1 -0.4,1.3 1.6,2.2 3.8,1.8 -3.8,4.6 -2.1,1.7 v 1.1 l 0.2,1.3 0.7,1.9 0.9,3.7 -8.2,-0.4 0.2,-1.1 v -2.4 z'
                    regionTitle='Експериментален'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 329.7,336.9 0.7,5.7 -0.1,1.3 -1.7,3.6 0.5,0.4 v 3.4 l -0.7,1 0.6,1.8 -0.8,2.8 -5.6,-1 -3.5,-1.5 -1.7,-1.2 -3.1,-2.4 5.1,-7.6 0.5,-1.4 0.1,-1.4 -1,-6.8 -0.7,-14 -0.2,-1 1.7,0.8 1.6,1 3.3,3.4 2.3,2.1 5.4,4.1 -1.8,2.2 -1,0.9 -1.3,0.6 z'
                    regionTitle='Дървеница'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 422.4,362.4 7.4,0.6 -4.4,16.7 -4.9,-0.8 -2.1,-0.7 -25,-15.1 -4,-15.9 -0.5,-0.7 -3.3,-2.5 -1.1,-1.3 -0.5,-1 -0.3,-1.6 v -3.2 l -0.2,-0.6 -1.9,-3.3 -0.3,-1.3 v -2.1 l 4.2,2.2 8,5.2 8.8,7.6 z'
                    regionTitle='Дружба 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 380.4,329.1 -1.7,-2.1 -2.9,-7.5 -14.7,-21.9 -0.9,-1.7 -1.6,-4.5 0.4,-2.2 22.5,5.5 0.6,0.2 1.9,0.7 20.1,13.7 -3.2,8.3 -5.6,11.2 11.2,5.5 -4.2,10.3 -8.8,-7.6 -8,-5.2 -4.2,-2.2 z'
                    regionTitle='Дружба 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 257.1,404.6 -2.6,3.6 -1.3,1.4 -3.2,2.6 -0.9,1.2 -1.6,0.6 -3.4,1.9 -1.3,0.9 -1.9,1.8 -0.5,0.3 -0.5,0.7 -0.9,0.6 -0.1,0.4 -0.2,0.1 h -0.3 l -1.4,1.8 -2.2,2.3 -1.5,-2.2 -1.6,-0.8 -0.7,-0.7 -0.8,-0.4 0.3,1.1 -0.1,0.7 -0.5,-0.2 -1.6,-0.1 -0.7,-0.6 -0.1,-0.5 -0.6,-0.4 -0.9,0.1 h -1.3 l -0.9,-0.1 -0.5,-0.8 -0.2,-0.8 0.4,-0.8 1.7,-0.9 0.8,-0.2 h 0.2 l 0.8,1.2 0.3,0.5 0.4,0.1 0.2,-0.3 0.1,-0.6 0.4,-0.8 0.2,-0.8 0.8,-1.8 -5.8,-2.3 0.8,-2.6 -5.5,-2.6 1.1,-1 2.3,-3.7 -2.7,-4.3 -0.3,-0.7 v -0.4 -0.5 l 0.1,-0.6 0.2,-0.6 0.3,-0.6 1.6,-1.3 3.1,-4.3 0.1,-1 0.1,-1.4 0.2,-0.7 2,-2.2 0.4,-0.7 0.2,-0.6 -0.4,-1.9 v -1.2 l 0.4,-0.1 0.2,-3.7 -0.2,-3.2 -2.6,-0.7 -1.3,2.8 -9.9,-3.9 6.3,-11 23.9,13.3 23.3,12.9 z'
                    regionTitle='Драгалевци'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 282.5,245.2 -3.9,-1.5 -1.4,2.2 -2.8,-3.3 1.7,-8 0.4,-0.6 4.3,0.2 7.9,0.4 -1.5,8.1 -0.2,1.2 z'
                    regionTitle='Докторски паметник'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='M 285.5,324.1 V 324 l 2,-2.9 0.8,-1 0.9,-2.6 0.1,-1.3 0.5,-1.8 -0.2,-0.9 V 313 l 0.8,-1.2 -1.3,-2.2 1,-0.4 6.4,-2.4 1.1,-0.3 2.1,-0.1 h 2.9 l 2.4,-0.3 0.9,-0.3 2.3,-0.4 0.7,1.3 0.8,1.1 4,4.9 2.2,2.5 -20,10.5 -6.4,1.8 -6.7,1.9 -0.5,0.1 1.2,-2.5 0.6,-0.3 0.1,-0.4 z'
                    regionTitle='Дианабад'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 217.9,313.7 0.5,1.6 0.5,1.1 1.2,5.8 -0.5,2.9 0.4,2 0.1,2.4 -1.1,-0.2 -27.7,-18.8 11.5,-16.3 12.8,14.3 2.7,2.4 z'
                    regionTitle='Гоце Делчев'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 425.4,379.7 -0.4,1.3 -0.4,3.1 -1.3,2.9 3,3.3 0.5,1.5 -1.7,6 2.7,7.8 -0.1,1.1 -0.4,0.9 -5.4,8.3 -12.5,-0.7 -1.4,2.5 -0.8,0.1 -2.3,-0.4 -1.6,0.5 -1.1,2.9 -3.3,-1.2 2.2,-4.7 -11.6,-0.5 -0.9,-3.7 -0.7,-1.9 -0.2,-1.3 v -1.1 l 2.1,-1.7 3.8,-4.6 -3.8,-1.8 -1.6,-2.2 0.4,-1.3 1.9,-2.1 0.6,-1.5 5,0.7 2.8,0.9 2.6,-2.8 -1.2,-4.7 6.2,-3.2 -4.2,-8.4 -6.6,-7.8 -0.7,-0.8 -1.9,-0.6 -0.6,-0.4 0.9,-1 25,15.1 2.1,0.7 z'
                    regionTitle='Горубляне'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 82.6,273.7 v -0.8 l 0.3,-0.3 1.7,0.2 -0.7,-1.7 v -2 l 0.1,-1 0.8,-1.6 0.2,-0.3 1.1,-0.6 2,0.4 h 0.5 l 0.8,-0.1 0.6,-0.2 -0.3,-1.1 0.6,-0.2 0.1,0.5 0.3,0.3 1.3,-0.7 -0.3,-0.5 2.3,-1.9 1.3,1.4 2.6,-2.4 8.6,5.9 11,7.7 1.3,0.9 1.2,1.2 0.6,0.7 1.1,1.9 0.3,0.8 0.5,1.8 0.8,6.7 0.4,1.6 0.8,1.8 -9.3,-0.3 -6.5,3.8 -0.6,-0.2 -0.9,-0.3 -1.1,1.9 -2.1,-0.8 -0.4,-0.4 -1.6,-2.8 -2.2,-1.7 -1.3,-1.8 -3.8,-1 1,-2.8 -1.5,-0.3 -1.2,1.8 -1.3,1.3 -0.3,0.9 -0.4,0.2 h -2.3 l -1.2,-0.4 0.3,-0.5 0.3,-1.9 -2,-0.6 0.5,-0.7 1.1,-0.6 -2.9,-0.3 0.2,-1 0.1,-1.6 -0.9,-2.6 -1.2,-2.6 0.3,-2.2 -0.2,-0.4 z'
                    regionTitle='Горна баня'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 327.3,262.1 2,0.8 -0.6,0.6 -0.9,0.7 5.9,2.5 0.6,0.5 -0.5,1.7 0.6,0.3 -2.9,7.5 -1.1,1.9 10.1,5.8 1.3,0.6 3,0.8 4.5,1 -14.8,14.8 -24,-23.2 4.6,-5.7 -3.4,-4.8 -1,-1.1 -7.5,-5.9 2,-2.1 0.7,-0.9 2.8,-6.3 2.5,1.1 -0.1,0.4 7.1,1.6 0.5,1.7 -0.2,1.1 9.2,3.2 z'
                    regionTitle='Гео Милев'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
                <CustomPath
                    d='m 184.1,203.9 -0.1,0.4 0.2,0.1 0.5,-0.1 1.3,7.6 -16.5,-6.4 -0.7,-0.3 14.5,-5.8 0.7,2.6 z'
                    regionTitle='Гевгелийски'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'west'}
                />
                <CustomPath
                    d='m 188.6,115.6 2.5,3.9 0.5,-0.2 0.2,-1.4 1.4,-0.9 1.7,2.3 0.5,2.6 0.8,1.1 4.4,-1.4 0.8,0.3 0.8,1.7 2.8,-1 3.9,10.6 -8.7,6.6 -11.4,-14.1 -3.9,-4.8 -1.3,-1.6 z'
                    regionTitle='Връбница 2'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 181.6,141.4 2.2,-2.3 0.6,-1.2 1.6,-4.6 1.3,-6.6 1.5,-1 11.4,14.1 -11.8,9.2 -2,4.1 -4.9,4.9 -0.3,-0.2 2.1,-10.3 0.5,-0.4 0.6,-3 z'
                    regionTitle='Връбница 1'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 235.4,136.9 -0.8,-0.4 -0.2,-1 v -4.7 l 0.5,-2 9.6,4.6 v 1 l 6.4,1.9 2.3,-7.9 21.4,10.2 6.4,3.1 -5.9,11.7 -1.7,8.4 -5.8,-0.4 -1.9,9.3 -1.1,2.4 -8.1,15.2 -24.5,-12.8 1,-4.8 0.6,-2.7 3.3,-19.4 -4.5,-3.2 z'
                    regionTitle='Военна рампа'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 270.3,333.7 1.8,0.1 1.5,-1.4 1.6,-1.5 1,-0.7 0.8,-0.4 1.2,-0.4 2.6,0.2 1.5,-0.1 0.5,-0.1 6.7,-1.9 0.7,5.8 -5.8,4.7 -3.2,6.7 -0.4,7.2 v 1 l -1.3,3.1 -0.2,1.1 -0.3,3.9 1.1,3.3 -5.4,1.9 0.3,1.5 -1.7,21.5 -6,-3.3 -23.3,-12.9 5.1,-17.6 0.4,-6.9 1.9,-10.6 2,-6.6 9.5,0.2 0.1,-2.8 h 0.7 0.3 l 4.6,4.3 1,0.1 z'
                    regionTitle='Витоша'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 171.2,300.1 -0.9,4.9 -2,6.2 -15.9,-6.1 0.1,-1.8 11.2,-8.6 12.2,-9.5 -4.1,12.1 z'
                    regionTitle='Бъкстон'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 168.3,352.7 1.2,-0.8 2.8,-0.6 v 2.2 h -1.4 l -0.5,1.8 v 1.4 l -3.8,1.4 1.7,0.2 -1.2,7.6 -0.2,1.1 -2.1,0.4 -2.7,-0.2 -2.1,-0.4 h -1.3 l -4.7,-1.1 -1.7,0.1 -2.2,0.4 -1.7,-0.1 -0.9,0.1 -1.9,0.1 -1.5,-0.8 -1.6,-1.3 0.4,-0.7 1.5,-0.9 0.9,0.4 0.8,-2.1 -0.5,-1.6 -1.9,-3.6 -0.5,-2.6 -2.1,3 -0.6,0.5 -1.3,0.2 -2.3,-0.2 -1,0.1 -0.9,0.5 -0.3,-0.3 V 355 l -1.6,-1.2 -0.1,-3.4 1.5,-2.7 0.9,-0.1 1.4,-1 -0.1,-0.4 -0.6,-0.9 -4.6,-1.7 1,-3.4 2.8,1.8 2.1,2.3 1.7,0.5 1.7,0.9 1.5,1.4 0.4,1.2 0.5,0.1 1.7,-2.3 1.6,0.3 1.9,0.6 3,1.8 3.6,1.6 1.5,0.4 10.8,-0.6 z'
                    regionTitle='Бояна'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 175.7,303.1 2.3,-2.9 10.8,-10.5 3.8,-5.3 10.2,9.8 -11.5,16.3 -14.8,-6.9 z'
                    regionTitle='Борово'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 193.8,276.9 1.5,-0.1 1.1,0.1 0.8,0.2 8.4,2.7 1,0.1 0.8,-0.1 2.4,-1.3 0.8,0.5 -0.9,1 -5.3,11.6 -1.6,2.6 -10.2,-9.8 -5.6,-5.3 4.9,-1.9 z'
                    regionTitle='Белите брези'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'south'}
                />
                <CustomPath
                    d='m 235.3,191.6 2.4,1.1 2.1,1.1 3.4,2.3 -1.9,6.1 4.5,0.6 -1.2,9.5 -6.2,-0.5 0.9,-3 -3.5,-1 0.6,-2 -3.4,-1.1 -0.1,0.7 -0.6,-0.1 -0.6,4.2 -3.7,-0.4 v 0 l -4,0.1 v -3.6 l -0.2,-0.6 -0.6,-1 -0.9,0.7 -1.7,0.9 -2.3,1.4 -4.2,-7.9 11.9,-6.7 2.7,-1.5 2,-2.1 1.6,2 z'
                    regionTitle='Банишора'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'north'}
                />
                <CustomPath
                    d='m 381.3,331.7 0.3,1.3 1.9,3.3 0.2,0.6 v 3.2 l 0.3,1.6 0.5,1 1.1,1.3 3.3,2.5 0.5,0.7 4,15.9 -0.9,1 -0.8,0.9 -2,0.9 -1,-1.1 -10.1,-3.3 h -0.1 l -13.7,-4.6 3.2,-5.2 0.4,-1.5 1.1,-0.9 -1.1,-1.2 0.1,-0.4 -0.1,-0.5 -8.1,-8.4 1.1,-1 -2.5,-2.4 1.4,-1.8 1.2,-1.1 3,-1.9 0.7,-0.4 2.1,-1.5 0.9,-0.9 7.6,-8.3 2.9,7.5 1.7,2.1 0.9,0.5 z'
                    regionTitle='7-ми 11-ти километър'
                    cursor='pointer'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    activeRegion={activeRegion}
                    chosen={chosen}
                    region={'east'}
                />
            </svg>
        </div>
    );
};

export default SofiaSvgMap;
