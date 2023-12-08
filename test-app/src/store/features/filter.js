import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    queryData: {
        neighbourhood: [],
        numberOfRooms: [],
        buildingType: [],
        exposure: [],
        finish: [],
        furnishment: [],
        heating: [],
        price: [],
        space: [],
        publishedOn: [],
    },
    filter: {
        data: {
            neighbourhood: {
                buttonStartContent: 'Квартали',
                buttonContent: 'Квартали',
                options: [],
                allOptions: [],
            },
            numberOfRooms: {
                buttonStartContent: 'Тип / Брой стаи',
                buttonContent: 'Тип / Брой стаи',
                options: [],
                allOptions: [],
            },
            buildingType: {
                buttonStartContent: 'Вид строителството',
                buttonContent: 'Вид строителството',
                options: [],
                allOptions: [],
            },
            exposure: {
                buttonStartContent: 'Изложение',
                buttonContent: 'Изложение',
                options: [],
                allOptions: [],
            },
            finish: {
                buttonStartContent: 'Завършеност на имота',
                buttonContent: 'Завършеност на имота',
                options: [],
                allOptions: [],
            },
            furnishment: {
                buttonStartContent: 'Обзавеждане',
                buttonContent: 'Обзавеждане',
                options: [],
                allOptions: [],
            },
            heating: {
                buttonStartContent: 'Отопление',
                buttonContent: 'Отопление',
                options: [],
                allOptions: [],
            },
            price: {
                buttonStartContent: 'Цена',
                buttonContent: 'Цена',
                options: [],
                allOptions: [0, 500000, 100],
            },
            space: {
                buttonStartContent: 'Площ',
                buttonContent: 'Площ',
                options: [],
                allOptions: [0, 300, 10],
            },
            publishedOn: {
                buttonStartContent: 'Публикувани',
                buttonContent: 'Публикувани',
                options: [],
                allOptions: [],
            },
        },
        collected: {
            allOptions: false,
        },
    },
};

const filterSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loadAllOptions: (state, action) => {
            if (!state.filter.collected.allOptions) {
                state.filter.collected.allOptions = true;
                const optionFields = [
                    'neighbourhood',
                    'numberOfRooms',
                    'buildingType',
                    'exposure',
                    'finish',
                    'furnishment',
                    'heating',
                ];

                optionFields.forEach((field) => {
                    state.filter.data[field].allOptions = action.payload[field];
                });
                state.filter.data.publishedOn.allOptions = action.payload.publishedOn;
            }
        },
        setFilterOption(state, action) {
            const { option, value } = action.payload;
            if (option === 'price' || option === 'space') {
                if (
                    state.filter.data[option].allOptions[0] != value[0] ||
                    state.filter.data[option].allOptions[1] != value[1]
                ) {
                    state.filter.data[option].options = value;
                    state.filter.data[option].buttonContent = updateRangeContext(
                        current(state.filter.data[option])
                    );
                } else {
                    state.filter.data[option].options = [];
                    state.filter.data[option].buttonContent = updateRangeContext(
                        current(state.filter.data[option])
                    );
                }
            } else if (option == 'publishedOn') {
                state.filter.data.publishedOn.options = [value.numberOfDays];
                if (value.numberOfDays > 0) {
                    state.filter.data.publishedOn.buttonContent = `Публикувани ${value.description}`;
                } else {
                    state.filter.data.publishedOn.buttonContent =
                        state.filter.data.publishedOn.buttonStartContent;
                }
            } else {
                state.filter.data[option].options = updateOptions(
                    state.filter.data[option].options,
                    value
                );

                state.filter.data[option].buttonContent = updateButtonContext(
                    current(state.filter.data[option])
                );
            }
        },

        updateFilterQueryData(state) {
            for (const key in state.filter.data) {
                state.queryData[key] = current(state.filter.data[key].options);
            }
        },
    },
});

const updateOptions = (options, value) => {
    const idx = options.indexOf(value);

    return idx !== -1 ? [...options.slice(0, idx), ...options.slice(idx + 1)] : [...options, value];
};

const updateButtonContext = (state) => {
  
    const buttonStart = state.buttonStartContent;

    let buttonEnd = '';

    if (state.options.length == 1) {
        buttonEnd += `: ${state.options[0]}`;
    } else if (state.options.length > 1) {
        buttonEnd += `: ${state.options[0]} +${state.options.length - 1}`;
    }
    return `${buttonStart}${buttonEnd}`;
};

const updateRangeContext = (state) => {
    const buttonStart = state.buttonStartContent;

    let buttonEnd = '';
    if (state.options.length > 1) {
        buttonEnd += `: От:${state.options[0]}  До:${state.options[1]}`;
    } else {
        buttonEnd = '';
    }

    return `${buttonStart}${buttonEnd}`;
};

export default filterSlice.reducer;
export const { setFilterOption, loadAllOptions, updateFilterQueryData } = filterSlice.actions;
