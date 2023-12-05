import { useFetchPropertiesFilterOptionsQuery } from '../../services/propertiesApi';
import { MainButton, OptionButton } from '../../UI/ButtonsFilter';
import { useState } from 'react';

const CatalogFilter = ({ refetch, setFetchData }) => {
    const { data: propertiesFilterOptions } = useFetchPropertiesFilterOptionsQuery();
    const [option, setOption] = useState();
    const [buttonValues, setButtonValues] = useState({
        neighbourhood: ['Квартали'],
        numberOfRooms: ['Тип / Брой стаи'],
        buildingType: ['Вид строителството'],
        exposure: ['Изложение'],
        finish: ['Завършеност на имота'],
        furnishment: ['Обзавеждане'],
        heating: ['Отопление'],
    });

    const optionsHandler = (option, value) => {
        setButtonValues((prevButtonValues) => {
            const data = prevButtonValues[option].slice();
            const index = data.indexOf(value);

            if (index !== -1) {
                data.splice(index, 1);
            } else {
                data.push(value);
            }
            return {
                ...prevButtonValues,
                [option]: [...data],
            };
        });
    };

    const buttonsContainer = (option) => {
        if (option == undefined) {
            return <></>;
        }

        if (option && propertiesFilterOptions[option]) {
            return (
                <>
                    {propertiesFilterOptions[option].map((x) => (
                        <OptionButton action={() => optionsHandler(option, x)} key={x}>
                            {x}
                        </OptionButton>
                    ))}
                </>
            );
        }
        return <></>;
    };

    const refetchHandler = (e) => {
        const targetTagName = e.target.tagName;
        if (targetTagName !== 'BUTTON') {
            // console.log(option);
            setOption(undefined);
            setFetchData(buttonValues)
        }
    };

    return (
        <>
            <div className='my-4 border-b-2 border-t-2 border-black'>
                <div className='flex flex-wrap'>
                    <MainButton action={() => setOption('neighbourhood')}>
                        {buttonValues.neighbourhood}
                    </MainButton>
                    <MainButton action={() => setOption('numberOfRooms')}>
                        {buttonValues.numberOfRooms}
                    </MainButton>
                    <MainButton action={() => setOption('buildingType')}>
                        {buttonValues.buildingType}
                    </MainButton>
                    <MainButton action={() => setOption('exposure')}>
                        {buttonValues.exposure}
                    </MainButton>
                    <MainButton action={() => setOption('finish')}>
                        {buttonValues.finish}
                    </MainButton>
                    <MainButton action={() => setOption('furnishment')}>
                        {buttonValues.furnishment}
                    </MainButton>
                    <MainButton action={() => setOption('heating')}>
                        {buttonValues.heating}
                    </MainButton>
                </div>
            </div>
            <div onClick={refetchHandler}>{buttonsContainer(option)}</div>
        </>
    );
};

export default CatalogFilter;
