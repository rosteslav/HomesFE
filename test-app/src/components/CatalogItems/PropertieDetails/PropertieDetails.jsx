import { useParams } from 'react-router-dom';
import { useProperties } from '../../../hooks/useProperties';
import { getRandomImage } from '../../../mock/mock';

export const PropertieDetails = () => {
    const { detailsId } = useParams();
    const { properties } = useProperties();
    const p = properties.find((p) => Number(p.id) === Number(detailsId));

    return (
        <>
            <section className='bg-white'>
                <div className='relative flex'>
                    <div className='min-h-screen lg:w-1/3'></div>
                    <div className='hidden min-h-screen w-3/4 bg-gray-100 lg:block'></div>

                    <div className='container mx-auto flex min-h-screen w-full flex-col justify-center px-6 py-10 lg:absolute lg:inset-x-0'>
                        <h1 className='text-2xl font-semibold capitalize text-gray-800 lg:text-3xl'>
                            District: <span className=' text-indigo-600'>{p.district}</span> <br />
                        </h1>

                        <div className='mt-10 lg:mt-20 lg:flex lg:items-center'>
                            <img
                                className='h-96 w-full rounded-lg object-cover object-center lg:w-[32rem]'
                                src={getRandomImage()}
                                alt=''
                            />

                            <div className='mt-8 lg:mt-0 lg:px-10'>
                                <h1 className='text-2xl font-semibold text-gray-800 lg:w-72'>
                                    Title: {p.type} with {p.numberOfRooms} rooms.
                                </h1>

                                <h3 className='mt-6 text-lg font-medium  text-indigo-600'>
                                    Space: {p.space}
                                </h3>
                                <p className='text-gray-600'>Floor: {p.floor}</p>
                                <p className='mt-6 max-w-lg text-gray-500'>
                                    Description: “ Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Tempore quibusdam ducimus libero ad tempora
                                    doloribus expedita laborum saepe voluptas perferendis delectus
                                    assumenda rerum, culpa aperiam dolorum, obcaecati corrupti
                                    aspernatur a. ”
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
