import * as yup from 'yup';

const errors = {
    required: {
        username: 'Моля въведете потребителско име.',
        password: 'Моля въведете парола.',
        email: 'Моля въведете емаил.',
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
        // brokerId: 'Моля въведете информация за брокера',
        numberOfRooms:'Моля въведете боря на стаите в имота',
        space:'Моля въведете квадратурата на имота',
        price:'Моля въведете цената на имота',
        floor:'Моля въведете етажа на имота',
        totalFloorsInBuilding:'Моля въведете броя етажи на сградата',
        description: 'Моля въведете описание на имота',
    },
    positive: {
        numberOfRooms:'Моля въведете позитивно число',
        space:'Моля въведете позитивно число',
        price:'Моля въведете позитивно число',
        floor:'Моля въведете позитивно число',
        totalFloorsInBuilding:'Моля въведете позитивно число',
    },
    min: {
        password: 'Паролата трябва да е минимум 3 символа.',
        description: 'Описанието на имота трябва да е минимум 10 символа'
    },
    oneOf: {
        password: 'Паролите не съвпадат.',
    },
    
};

export const validationLoginSchema = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3).required(errors.required.password),
});

export const validationRegisterSchemaStepTwo = yup.object().shape({
    username: yup.string().required(errors.required.username),
    password: yup.string().min(3, errors.min.password).required(errors.required.password),
    email: yup.string().email().required(errors.required.email),
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
    space: yup.number().positive(errors.positive.space).required(errors.required.space),
    description: yup.string().min(10, errors.min.description).required(errors.required.description),
    price: yup.number().positive(errors.positive.price).required(errors.required.price),
    floor: yup.number().positive(errors.positive.floor).required(errors.required.floor),
    totalFloorsInBuilding: yup.number().positive(errors.positive.totalFloorsInBuilding).required(errors.required.totalFloorsInBuilding),
    buildingType: yup.string().required(errors.required.buildingType),
    finish: yup.string().required(errors.required.finish),
    furnishment: yup.string().required(errors.required.furnishment),
    garage: yup.string().required(errors.required.garage),
    heating: yup.string().required(errors.required.heating),
    neighbourhood: yup.string().required(errors.required.neighbourhood),
    // brokerId: yup.string().required(errors.required.brokerId),
});
