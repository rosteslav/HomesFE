import Slider from 'rc-slider';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'rc-slider/assets/index.css';
import { setFilterOption, updateFilterQueryData } from '../../store/features/filter';

const RangeSlider = ({ option }) => {
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const [rangeValues, setRangeValues] = useState([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [step, setStep] = useState(0);

    useEffect(() => {

        if (option) {
            if (filter.filter.data[option].options.length > 1) {
                setRangeValues([
                    filter.filter.data[option].options[0],
                    filter.filter.data[option].options[1],
                ]);
            } else {
                setRangeValues([
                    filter.filter.data[option].allOptions[0],
                    filter.filter.data[option].allOptions[1],
                ]);
            }
            setMin(filter.filter.data[option].allOptions[0]);
            setMax(filter.filter.data[option].allOptions[1]);
            setStep(filter.filter.data[option].allOptions[2]);
        }
    }, [filter.filter.data, option]);

    const formatText = () => {
        if (option === 'space') {
            return (
                <span>
                    m <sup>2</sup>
                </span>
            );
        } else if (option === 'price') {
            return 'Euro';
        }

        return;
    };

    const handleSliderChange = (values) => {
        setRangeValues(values);
    };

    const changeCompleteHandler = (values) => {
        dispatch(setFilterOption({ option, value: values }));
        dispatch(updateFilterQueryData())
    };

    return (
        <div className='w-full'>
            <div className='slider mx-auto  m-10 flex h-9 w-96 flex-col items-center justify-center'>
                <div className='slider mb-4 flex w-full justify-between'>
                    <p className='slider'>
                        От: {rangeValues[0]} {formatText()}
                    </p>
                    <p className='slider'>
                        До: {rangeValues[1]} {formatText()}
                    </p>
                </div>
                <Slider
                    range
                    min={min}
                    max={max}
                    value={rangeValues}
                    onChange={handleSliderChange}
                    onChangeComplete={changeCompleteHandler}
                    tipFormatter={(value) => `$${value}`}
                    step={step}
                />
            </div>
        </div>
    );
};

export default RangeSlider;
