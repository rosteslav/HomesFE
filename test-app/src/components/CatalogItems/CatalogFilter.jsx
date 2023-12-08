import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useFetchPropertiesFilterOptionsQuery } from '../../services/propertiesApi';
import ButtonFilter from '../../UI/ButtonsFilter';
import { loadAllOptions, setFilterOption, updateFilterQueryData } from '../../store/features/filter';
import RangeSlider from './RangeSlider';

const CatalogFilter = () => {
    const dispatch = useDispatch();
    const { data: propertiesFilterOptions, isSuccess } = useFetchPropertiesFilterOptionsQuery();
    const filter = useSelector((state) => state.filter);

    const [option, setOption] = useState();
    const [rangeOption, setRangeOption] = useState();

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
                            isActive={filter.filter.data[option].options.includes(x) ? true : false}
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

    const rangeContainer = (rangeOption) => {
        if (rangeOption) {
            return (
                <div>
                    <RangeSlider option={rangeOption} />
                </div>
            );
        } else {
            return <></>;
        }
    };

    const refetchHandler = (e) => {
        const targetTagName = e.target.tagName;
        if (targetTagName !== 'BUTTON') {
            setOption(undefined);

  
            dispatch(updateFilterQueryData())
        }
    };

    const rangeRefetchHandle = () => {

        dispatch(updateFilterQueryData())

    };

    return (
        <>
            <div className='my-4 border-b-2 border-t-2 border-black'>
                {isSuccess && (
                    <div className='flex flex-wrap'>
                        <ButtonFilter
                            isActive={filter.queryData.neighbourhood.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('neighbourhood');
                            }}
                        >
                            {filter.filter.data.neighbourhood.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.numberOfRooms.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('numberOfRooms');
                            }}
                        >
                            {filter.filter.data.numberOfRooms.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.buildingType.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('buildingType');
                            }}
                        >
                            {filter.filter.data.buildingType.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.exposure.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('exposure');
                            }}
                        >
                            {filter.filter.data.exposure.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.finish.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('finish');
                            }}
                        >
                            {filter.filter.data.finish.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.furnishment.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('furnishment');
                            }}
                        >
                            {filter.filter.data.furnishment.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.queryData.heating.length > 0 ? true : false}
                            action={() => {
                                setRangeOption(undefined);
                                setOption('heating');
                            }}
                        >
                            {filter.filter.data.heating.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.filter.data.price.options.length > 1 ? true : false}
                            action={() => {
                                setOption(undefined);
                                setRangeOption('price');
                            }}
                        >
                            {filter.filter.data.price.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={filter.filter.data.space.options.length > 1 ? true : false}
                            action={() => {
                                setOption(undefined);
                                setRangeOption('space');
                            }}
                        >
                            {filter.filter.data.space.buttonContent}
                        </ButtonFilter>
                    </div>
                )}
            </div>
            <div onClick={refetchHandler}>{buttonsContainer(option)}</div>
            <div onClick={rangeRefetchHandle}>{rangeContainer(rangeOption)}</div>
        </>
    );
};

export default CatalogFilter;
