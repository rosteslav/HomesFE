import { useDispatch, useSelector } from 'react-redux';
import { useFetchPropertiesFilterOptionsQuery } from '../../services/propertiesApi';
import ButtonFilter from '../../UI/ButtonsFilter';
import { useEffect, useState } from 'react';
import { loadAllOptions, setFilterOption } from '../../store/features/filter';

const CatalogFilter = ({ setFetchData }) => {
    const dispatch = useDispatch();
    const { data: propertiesFilterOptions, isSuccess } = useFetchPropertiesFilterOptionsQuery();
    const filter = useSelector((state) => state.filter);

    const [option, setOption] = useState();

    useEffect(() => {
        if (isSuccess) {
            dispatch(loadAllOptions(propertiesFilterOptions));
        }
    });

    const optionsHandler = (option, value) => {
        dispatch(setFilterOption({ option, value }));
    };

    const buttonsContainer = (option) => {
        if (option == undefined) {
            return <></>;
        }

        if (option && filter.filter.data[option].allOptions) {
            return (
                <>
                    {filter.filter.data[option].allOptions.map((x) => (
                        <ButtonFilter
                            isActive={filter.queryData[option].includes(x) ? true : false}
                            action={() => optionsHandler(option, x)}
                            key={x}
                        >
                            {x}
                        </ButtonFilter>
                    ))}
                </>
            );
        }
        return <></>;
    };

    const refetchHandler = (e) => {
        const targetTagName = e.target.tagName;
        if (targetTagName !== 'BUTTON') {
            setOption(undefined);
            setFetchData(filter.queryData);
        }
    };

    return (
        <>
            <div className='my-4 border-b-2 border-t-2 border-black'>
                {isSuccess && (
                    <div className='flex flex-wrap'>
                        <ButtonFilter
                            isActive={filter.queryData.neighbourhood.length > 0 ? true : false}
                            action={() => setOption('neighbourhood')}
                        >
                            {filter.filter.data.neighbourhood.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.numberOfRooms.length > 0 ? true : false}
                            action={() => setOption('numberOfRooms')}
                        >
                            {filter.filter.data.numberOfRooms.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.buildingType.length > 0 ? true : false}
                            action={() => setOption('buildingType')}
                        >
                            {filter.filter.data.buildingType.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.exposure.length > 0 ? true : false}
                            action={() => setOption('exposure')}
                        >
                            {filter.filter.data.exposure.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.finish.length > 0 ? true : false}
                            action={() => setOption('finish')}
                        >
                            {filter.filter.data.finish.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.furnishment.length > 0 ? true : false}
                            action={() => setOption('furnishment')}
                        >
                            {filter.filter.data.furnishment.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.heating.length > 0 ? true : false}
                            action={() => setOption('heating')}
                        >
                            {filter.filter.data.heating.buttonContent}
                        </ButtonFilter>
                    </div>
                )}
            </div>
            <div onClick={refetchHandler}>{buttonsContainer(option)}</div>
        </>
    );
};

export default CatalogFilter;
