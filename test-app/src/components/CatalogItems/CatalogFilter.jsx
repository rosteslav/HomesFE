import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useFetchPropertiesFilterOptionsQuery } from '../../services/propertiesApi';
import ButtonFilter from '../../UI/ButtonsFilter';
import {
    loadAllOptions,
    setFilterOption,
    updateFilterQueryData,
} from '../../store/features/filter';
import RangeSlider from './RangeSlider';

const CatalogFilter = () => {
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

    const selectedOptions = (option) => {
        if (option?.multiChoice && filter.filter.data[option.multiChoice].allOptions) {
            return (
                <>
                    {filter.filter.data[option.multiChoice].allOptions.map((x) => (
                        <ButtonFilter
                            isActive={
                                filter.filter.data[option.multiChoice].options.includes(x)
                                    ? true
                                    : false
                            }
                            action={() => optionsHandler(option.multiChoice, x)}
                            key={x}
                        >
                            {x}
                        </ButtonFilter>
                    ))}
                </>
            );
        } else if (option?.rangeChoice) {
            return (
                <div>
                    <RangeSlider option={option.rangeChoice} />
                </div>
            );
        } else if (option?.singleChoice) {
            const key = option.singleChoice == 'orderBy' ? 'relatedPropName' : 'numberOfDays'
            return filter.filter.data[option.singleChoice].allOptions.map((button) => (
                <ButtonFilter
                    isActive={
                        filter.filter.data[option.singleChoice].options[0] == button[key]
                            ? true
                            : false
                    }
                    action={() => {
                        optionsHandler(option.singleChoice, button);
                        setOption(undefined);
                        dispatch(updateFilterQueryData())
                    }}
                    key={button[key]}
                >
                    {button.description}
                </ButtonFilter>
            ));
        }

        return <></>;
    };

    const refetchHandler = (e) => {
        const targetTagName = e.target.tagName;
        if (targetTagName !== 'BUTTON') {
            setOption(undefined);
            dispatch(updateFilterQueryData());
        }
    };

    return (
        <>
            <div className='my-4 border-b-2 border-t-2 border-black'>
                {isSuccess && (
                    <div className='mx-8 flex flex-wrap'>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'neighbourhood' ||
                                filter.queryData.neighbourhood.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'neighbourhood' });
                            }}
                        >
                            {filter.filter.data.neighbourhood.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'numberOfRooms' ||
                                filter.queryData.numberOfRooms.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'numberOfRooms' });
                            }}
                        >
                            {filter.filter.data.numberOfRooms.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'buildingType' ||
                                filter.queryData.buildingType.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'buildingType' });
                            }}
                        >
                            {filter.filter.data.buildingType.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'exposure' ||
                                filter.queryData.exposure.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'exposure' });
                            }}
                        >
                            {filter.filter.data.exposure.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'finish' ||
                                filter.queryData.finish.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'finish' });
                            }}
                        >
                            {filter.filter.data.finish.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'furnishment' ||
                                filter.queryData.furnishment.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'furnishment' });
                            }}
                        >
                            {filter.filter.data.furnishment.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.multiChoice == 'heating' ||
                                filter.queryData.heating.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ multiChoice: 'heating' });
                            }}
                        >
                            {filter.filter.data.heating.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.rangeChoice == 'price' ||
                                filter.filter.data.price.options.length > 1
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ rangeChoice: 'price' });
                            }}
                        >
                            {filter.filter.data.price.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.rangeChoice == 'space' ||
                                filter.filter.data.space.options.length > 1
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ rangeChoice: 'space' });
                            }}
                        >
                            {filter.filter.data.space.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.singleChoice == 'publishedOn' ||
                                filter.filter.data.publishedOn.options[0] > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ singleChoice: 'publishedOn' });
                            }}
                        >
                            {filter.filter.data.publishedOn.buttonContent}
                        </ButtonFilter>
                        <ButtonFilter
                            isActive={
                                option?.singleChoice == 'orderBy' ||
                                filter.filter.data.orderBy.options.length > 0
                                    ? true
                                    : false
                            }
                            action={() => {
                                setOption({ singleChoice: 'orderBy' });
                            }}
                        >
                            {filter.filter.data.orderBy.buttonContent}
                        </ButtonFilter>
                    </div>
                )}
            </div>
            <div className='mx-8' onClick={refetchHandler}>
                {selectedOptions(option)}
            </div>
        </>
    );
};

export default CatalogFilter;
