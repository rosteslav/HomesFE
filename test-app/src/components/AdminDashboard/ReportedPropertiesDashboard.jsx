import { useFetchAllReportsQuery } from '../../services/adminApi';
import ReportedProperty from './reportedProperty';

const ReportedPropertiesDashboard = () => {
    const { data: reportedProperties } = useFetchAllReportsQuery();
    return (
        <div className='mx-5 mt-4 grid gap-10  pb-10 md:grid-cols-2 lg:grid-cols-3'>
            {reportedProperties && reportedProperties.length > 0 ? (
                reportedProperties.map((prop) => (
                    <ReportedProperty
                        key={prop.propertyId}
                        propertyId={prop.propertyId}
                        reports={prop.reports}
                    />
                ))
            ) : (
                <h1>Няма намерени проблемни имоти</h1>
            )}
        </div>
    );
};

export default ReportedPropertiesDashboard;
