import * as yup from 'yup';

const errors = {
    required: {
        username: 'Моля въведете потребителско име.',
        password: 'Моля въведете парола.',
        email: 'Моля въведете електронна поща.',
        repPassword: 'Моля въведете паролата отново.',
        firstName: 'Моля въведете първото си име.',
        lastName: 'Моля въведете фамилното си име.',
        phoneNumber: 'Моля въведете телефонния си номер.',
        buildingType: 'Моля въведете вид на строителството на сградата',
        finish: 'Моля въведете нивото на завършеност на сградата',
        furnishment: 'Моля въведете информация за обзавеждането',
        garage: 'Моля въведете информация за гараж',
        heating: 'Моля въведете начин на отопление на имота',
        neighbourhood: 'Моля въведете квартал в който се намира имота',
        exposure: 'Моля въведете изложение',
        numberOfRooms: 'Моля въведете боря на стаите в имота',
        space: 'Моля въведете квадратурата на имота',
        price: 'Моля въведете цената на имота',
        floor: 'Моля въведете етажа на имота',
        totalFloorsInBuilding: 'Моля въведете броя етажи на сградата',
        description: 'Моля въведете описание на имота',
    },
    positive: {
        numberOfRooms: 'Моля въведете положително число',
        space: 'Моля въведете положително число',
        price: 'Моля въведете положително число',
        floor: 'Моля въведете положително число',
        totalFloorsInBuilding: 'Моля въведете положително число',
    },
    min: {
        password: 'Паролата трябва да е минимум 3 символа.',
        description: 'Описанието на имота трябва да е минимум 10 символа',
        space: 'Големината на имота трябва да е минимум 20',
        floor: 'Етажа трябва да е минимум 1',
        totalFloorsInBuilding: 'Брой етажи трябва да е минимум 1',
    },
    oneOf: {
        password: 'Паролите не съвпадат.',
    },
    number: {
        space: 'Големината на имота трябва да съдържа цифри',
        price: 'Цената трябва да съдържа само цифри',
        floor: 'Етаж трябва да съдържа само цифри',
        totalFloorsInBuilding: 'Брой етажи трябва да съдържа само цифри',
        all: 'Моля въведете номер',
    },
    max: {
        space: 'Максималната големина може да е 300',
        price: 'Максималната цена е 5 000 000',
        floor: 'Максималния етаж може да е 20',
        totalFloorsInBuilding: 'Максималния етаж може да е 20',
    },
    integer: {
        floor: 'Етажа трябва да е цяло число',
        totalFloorsInBuilding: 'Етажа трябва да е цяло число',
    },
};

export const validationLoginSchema = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3).required(errors.required.password),
});

export const validationRegisterSchemaStepTwo = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3, errors.min.password).required(errors.required.password),
    email: yup.string().email('Моля въведете валидна електронна поща').required(errors.required.email),
    repPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], errors.oneOf.password)
        .required(errors.required.repPassword),
});

export const validationRegisterSchemaStepThree = yup.object().shape({
    firstName: yup.string().required(errors.required.firstName),
    lastName: yup.string().required(errors.required.lastName),
    phoneNumber: yup.string().required(errors.required.phoneNumber),
});

export const validationRegisterAdminSchema = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3).required(errors.required.password),
    email: yup.string().email().required(errors.required.email),
    firstName: yup.string().required(errors.required.firstName),
    lastName: yup.string().required(errors.required.lastName),
    phoneNumber: yup.string().required(errors.required.phoneNumber),
});

export const validationCreatePropertySchema = yup.object().shape({
    numberOfRooms: yup.string().required(errors.required.numberOfRooms),
    space: yup
        .number()
        .typeError(errors.number.space)
        .positive(errors.positive.space)
        .required(errors.required.space)
        .min(20, errors.min.space)
        .max(300, errors.max.space),
    description: yup.string().min(10, errors.min.description).required(errors.required.description),
    price: yup
        .number()
        .typeError(errors.number.price)
        .positive(errors.positive.price)
        .required(errors.required.price)
        .max(5000000, errors.max.price),
    floor: yup
        .number()
        .typeError(errors.number.floor)
        .integer(errors.integer.floor)
        .positive(errors.positive.floor)
        .required(errors.required.floor)
        .min(1, errors.min.floor)
        .max(20, errors.max.floor)
        .test({
            message: 'Етажа не може да бъде по-голям от броя на етажите в сградата.',
            test: function (value) {
                return value <= this.parent.totalFloorsInBuilding;
            },
        }),
    totalFloorsInBuilding: yup
        .number()
        .typeError(errors.number.totalFloorsInBuilding)
        .integer(errors.integer.totalFloorsInBuilding)
        .required(errors.required.totalFloorsInBuilding)
        .min(1, errors.min.totalFloorsInBuilding)
        .max(20, errors.max.totalFloorsInBuilding),
    buildingType: yup.string().required(errors.required.buildingType),
    finish: yup.string().required(errors.required.finish),
    furnishment: yup.string().required(errors.required.furnishment),
    garage: yup.string().required(errors.required.garage),
    heating: yup.string().required(errors.required.heating),
    neighbourhood: yup.string().required(errors.required.neighbourhood),
    // exposure: yup.string().required(errors.required.exposure),
    // brokerId: yup.string().required(errors.required.brokerId),
});
