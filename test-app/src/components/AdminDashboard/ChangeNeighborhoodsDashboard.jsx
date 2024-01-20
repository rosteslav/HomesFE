import { useEffect, useState } from 'react';
import SofiaSvgMap from './SofiaSvgMap';
import { ButtonPrimary } from '../../UI';
import {
    useFetchNeighbourhoodsRatingQuery,
    useUpdateNeighbourhoodsRatingMutation,
} from '../../store/features/Api/adminApi';

const ChangeNeighborhoodsDashboard = () => {
    const { data: neighbourhoodsRating } = useFetchNeighbourhoodsRatingQuery();
    const [updateNeighbourhoodsRating] = useUpdateNeighbourhoodsRatingMutation([[], []]);
    const [forLiving, setForLiving] = useState([[], []]);
    const [forInvestment, setForInvestment] = useState([[], []]);
    const [forBudget, setForBudget] = useState([[], []]);
    const [forLuxurious, setForLuxurious] = useState([[], []]);

    useEffect(() => {
        if (neighbourhoodsRating) {
            setForLiving([
                [...neighbourhoodsRating.for_living[0]],
                [...neighbourhoodsRating.for_living[1]],
            ]);
            setForInvestment([
                [...neighbourhoodsRating.for_investment[0]],
                [...neighbourhoodsRating.for_investment[1]],
            ]);
            setForBudget([
                [...neighbourhoodsRating.budget[0]],
                [...neighbourhoodsRating.budget[1]],
            ]);
            setForLuxurious([
                [...neighbourhoodsRating.luxury[0]],
                [...neighbourhoodsRating.luxury[1]],
            ]);
        }
    }, [neighbourhoodsRating]);

    const handleResult = () => {
        const result = {
            for_living: forLiving,
            for_investment: forInvestment,
            budget: forBudget,
            luxury: forLuxurious,
        };
        updateNeighbourhoodsRating(result);
    };

    return (
        // temporary button to show all results
        <>
            <div className='grid gap-5 pt-4 text-center text-xl font-bold lg:grid-cols-2'>
                <div>
                    <h2 className='mb-4'>За живеене</h2>
                    <SofiaSvgMap chosen={forLiving} setChosen={setForLiving} />
                </div>
                <div>
                    <h2 className='mb-4'>За инвестиция</h2>
                    <SofiaSvgMap chosen={forInvestment} setChosen={setForInvestment} />
                </div>
                <div>
                    <h2 className='mb-4'>Бюджетен</h2>
                    <SofiaSvgMap chosen={forBudget} setChosen={setForBudget} />
                </div>
                <div>
                    <h2 className='mb-4'>Луксозен</h2>
                    <SofiaSvgMap chosen={forLuxurious} setChosen={setForLuxurious} />
                </div>
            </div>
            <div className='mx-auto mb-3 w-56 pt-3'>
                <ButtonPrimary action={handleResult}>Запиши</ButtonPrimary>
            </div>
        </>
    );
};

export default ChangeNeighborhoodsDashboard;
