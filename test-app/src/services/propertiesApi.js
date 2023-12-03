import { createApi } from '@reduxjs/toolkit/query/react';

const propertiesApi = createApi({
    reducerPath: 'propertiesApi',
    
    endpoints() {
        return {};
    },
});

export { propertiesApi };

