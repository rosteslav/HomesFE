import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useFetchPropertiesFilterOptionsQuery } from '../../services/propertiesApi';
import { ButtonFilter, ButtonReset } from '../../UI/ButtonsFilter';
import {
    loadAllOptions,
    resetFilter,
    setFilterOption,
    updateFilterQueryData,
} from '../../store/features/filter';
import RangeSlider from './RangeSlider';
import SofiaSvgFilter from './SofiaSvgFilter';

const CatalogFilter = ({ setPage }) => {
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
        if (option !== 'neighbourhood') {
            setPage(1);
            dispatch(setFilterOption({ option, value }));
            dispatch(updateFilterQueryData());
        }
    };

    const selectedOptions = (option) => {
        if (option?.multiChoice && filter.filter.data[option.multiChoice].allOptions) {
            return (
                <>
                    {option.multiChoice === 'neighbourhood' ? (
                        <SofiaSvgFilter setPage={setPage} />
                    ) : (
                        filter.filter.data[option.multiChoice].allOptions.map((x) => (
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
                        ))
                    )}
                </>
            );
        } else if (option?.rangeChoice) {
            return (
                <div>
                    <RangeSlider setPage={setPage} option={option.rangeChoice} />
                </div>
            );
        } else if (option?.singleChoice) {
            const key = option.singleChoice == 'orderBy' ? 'relatedPropName' : 'numberOfDays';
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
                        setPage(1);
                        dispatch(updateFilterQueryData());
                    }}
                    key={button[key]}
                >
                    {button.description}
                    {button.isAscending == false && (
                        <svg
                            className='ms-2.5 h-4 w-4'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                        >
                            <path
                                d='M12 6V18M12 18L7 13M12 18L17 13'
                                stroke='#000000'
                                strokeWidth='4'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                        </svg>
                    )}
                </ButtonFilter>
            ));
        }

        return <></>;
    };

    const refetchHandler = (e) => {
        const targetTagName = e.target.tagName;
        const className = e.target.className;

        if (targetTagName !== 'BUTTON' && targetTagName !== 'svg' && targetTagName !== 'path') {
            if (className?.includes('slider')) {
                return;
            }
            setOption(undefined);
        }
    };

    return (
        <>
            <div className='my-4 border-b-2 border-t-2 border-black'>
                {isSuccess && (
                    <div className='mx-8 flex flex-wrap items-center justify-between'>
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

                        <div className='flex flex-1 items-center justify-end'>
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
                                {filter.filter.data.orderBy.buttonContent}{' '}
                                {filter.queryData?.orderBy.length > 0 &&
                                    (filter.queryData.isAscending == true ? (
                                        <svg
                                            className='ms-2.5 h-4 w-4'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                        >
                                            <path
                                                d='M12 6V18M12 18L7 13M12 18L17 13'
                                                stroke='#000000'
                                                strokeWidth='4'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className='ms-2.5 h-4 w-4'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                        >
                                            <path
                                                d='M12 6V18M12 6L7 11M12 6L17 11'
                                                stroke='#000000'
                                                strokeWidth='4'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    ))}
                            </ButtonFilter>

                            <ButtonReset
                                action={() => {
                                    dispatch(resetFilter());
                                    setPage(1);
                                }}
                            >
                                Премахни филтрите
                            </ButtonReset>
                        </div>
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
