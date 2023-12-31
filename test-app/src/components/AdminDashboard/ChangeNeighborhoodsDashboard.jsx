import { useState } from 'react';
import SofiaSvgMap from './SofiaSvgMap';
import { ButtonPrimary } from '../../UI';

const ChangeNeighborhoodsDashboard = () => {
    const [forLiving, setForLiving] = useState([[], []]);
    const [forInvestment, setForInvestment] = useState([[], []]);
    const [forBudget, setForBudget] = useState([[], []]);
    const [forLuxurious, setForLuxurious] = useState([[], []]);

    const handleResult = () => {
        const result = {
            for_living: forLiving,
            for_investment: forInvestment,
            budget: forBudget,
            luxury: forLuxurious,
        };
        console.log(result);
    };

    return (
        // temporary button to show all results
        <>
            <div className='w-56 m-auto pt-3'>
                <ButtonPrimary action={handleResult}>Резултат</ButtonPrimary>
            </div>
            <div className='grid gap-5 pt-4 text-center lg:grid-cols-2'>
                <div>
                    <h2>За живеене</h2>
                    <SofiaSvgMap chosen={forLiving} setChosen={setForLiving} />
                </div>
                <div>
                    <h2>За инвестиция</h2>
                    <SofiaSvgMap chosen={forInvestment} setChosen={setForInvestment} />
                </div>
                <div>
                    <h2>Бюджетен</h2>
                    <SofiaSvgMap chosen={forBudget} setChosen={setForBudget} />
                </div>
                <div>
                    <h2>Луксозен</h2>
                    <SofiaSvgMap chosen={forLuxurious} setChosen={setForLuxurious} />
                </div>
            </div>
        </>
    );
};

export default ChangeNeighborhoodsDashboard;
