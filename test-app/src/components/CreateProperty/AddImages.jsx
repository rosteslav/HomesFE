import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-hot-toast';
import {
    useAddPropertyImageMutation,
    useDeletePropertyImageMutation,
    useFetchPropertyImagesQuery,
} from '../../services/imagesApi';
import Loader from '../../UI/Loader';
import notificationMessages from '../../services/notificationMessages';

export const AddImages = ({ responseId, setToggleForms, toggleForms, propertyId }) => {
    const [skip, setSkip] = useState(true);
    const [imageInputs, setImageInputs] = useState([{ id: 1, file: null }]);
    const [imagesUploaded, setImagesUploaded] = useState([]);
    const { data: images, isSuccess: success } = useFetchPropertyImagesQuery(
        propertyId.propertyId,
        { skip }
    );
    const [addPropertyImage, { isSuccess, isLoading }] = useAddPropertyImageMutation();
    const [deletePropertyImage] = useDeletePropertyImageMutation();
    const navigate = useNavigate();
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSizeInBytes = 32 * 1024 * 1024; // 32 MB

    const handleImageChange = (e, id) => {
        if (!allowedFileTypes.includes(e.target.files[0].type)) {
            const updatedInputs = imageInputs.filter((input) => input.id !== id);
            setImageInputs(updatedInputs);
            toast.error('Поддържани формати: png, jpeg, jpg, gif');
            return;
        }

        if (e.target.files[0].size > maxSizeInBytes) {
            const updatedInputs = imageInputs.filter((input) => input.id !== id);
            setImageInputs(updatedInputs);
            toast.error('Снимката не може да е по голяма от 32MB!');
            return;
        }

        const updatedInputs = imageInputs.map((input) => {
            if (input.id === id) {
                const formData = new FormData();
                formData.set('image', e.target.files[0]);
                return { ...input, file: e.target.files[0] };
            }
            return input;
        });
        setImageInputs(updatedInputs);
    };

    const handleAddImageInput = () => {
        const newId = imageInputs.length + 1;
        setImageInputs([...imageInputs, { id: newId, file: null }]);
    };

    const handleRemoveImageInput = (id) => {
        const updatedInputs = imageInputs.filter((input) => input.id !== id);
        setImageInputs(updatedInputs);
    };
    const handleRemoveImageUploaded = (id) => {
        const imageURL = images.filter((image) => {
            if (image.id == id) {
                console.log(image);
                return image.imageURL;
            }
        });

        deletePropertyImage({
            id,
            propertyId: +propertyId.propertyId,
            imageURL: imageURL[0].imageURL,
        });
        const updatedUploadedImages = imagesUploaded.filter((image) => image.id !== id);
        setImagesUploaded(updatedUploadedImages);
    };

    useEffect(() => {
        if (isSuccess) {
            setToggleForms('text');
            navigate('/');
        }
    });

    useEffect(() => {
        if (propertyId.propertyId) {
            setSkip(false);
            if (success) {
                setImagesUploaded([...images]);
            }
        }
    }, [setSkip, propertyId, images, success, imageInputs]);

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        const isConfirmed =
            imageInputs[0].file === null
                ? confirm(
                      'Не сте качили снимки! Имоти без снимки са по-трудно продаваеми и по-трудно се показват в препоръчани. Сигурни ли сте че искате да публикувате без снимки?'
                  )
                : true;
        if (isConfirmed) {
            try {
                const propId = responseId ? responseId.id : propertyId.propertyId;
                for (const i of imageInputs) {
                    const formData = new FormData();
                    if (i.file) {
                        formData.append('image', i.file);
                        await addPropertyImage({ propertyId: +propId, data: formData });
                    } else {
                        setToggleForms('text');
                        navigate('/');
                    }
                }
            } catch (error) {
                toast.error(notificationMessages(error?.error?.status));
            }
            setToggleForms('text');
            navigate('/');
        }
    };
    return (
        <>
            {isLoading && <Loader />}
            <h2 className={`${toggleForms === 'images' ? '' : 'visibility: hidden'} text-center`}>
                Имоти без снимки са по-трудно продаваеми и по-трудно се показват в препоръчани
            </h2>
            <div
                className={`m-5 flex justify-between ${
                    toggleForms === 'images' ? '' : 'visibility: hidden'
                }`}
            >
                <div>
                    <h2 className='text-l block font-bold text-gray-900 md:block'>
                        Добавяне на снимки:
                    </h2>
                    <form onSubmit={handleSubmitImage}>
                        {imageInputs.map((input) => (
                            <div key={input.id}>
                                <input
                                    className='w-30  my-4 text-sm text-gray-600
                        file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50
                        file:px-4 file:py-2 file:text-sm
                        file:font-semibold file:text-gray-600
                        hover:file:bg-indigo-100'
                                    type='file'
                                    onChange={(e) => handleImageChange(e, input.id)}
                                />
                            </div>
                        ))}
                        <button
                            className='text-md flex w-40 justify-center rounded-md border border-indigo-600 px-3 py-1.5 font-semibold leading-6 tracking-wider text-indigo-600 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            type='button'
                            onClick={handleAddImageInput}
                        >
                            Добави Нова снимка
                        </button>
                        <br />
                        <button
                            className='text-md flex w-40 justify-center rounded-md border border-indigo-600 bg-indigo-600 px-3 py-1.5 font-semibold leading-6 tracking-wider text-white shadow-sm hover:bg-indigo-500  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                            type='submit'
                        >
                            Публикувайте
                        </button>
                    </form>
                </div>

                <div>
                    <div className='m-5 max-sm:hidden'>
                        <ul className='grid grid-cols-2 gap-4'>
                            {imagesUploaded.map(
                                (image) =>
                                    image.imageURL && (
                                        <li className='relative my-5' key={image.id}>
                                            <div className='relative flex h-full overflow-hidden'>
                                                <img
                                                    className='flex-1 object-cover'
                                                    src={image.imageURL}
                                                    alt={`Local Image ${image.id}`}
                                                />
                                            </div>
                                            <button
                                                className='text-md absolute bottom-1 left-1 mt-1 flex w-0.5 justify-center rounded-md border border-red-600 bg-red-500 px-3 py-1 leading-6 text-white hover:font-bold'
                                                onClick={() => handleRemoveImageUploaded(image.id)}
                                            >
                                                X
                                            </button>
                                        </li>
                                    )
                            )}
                            {imageInputs.map(
                                (input) =>
                                    input.file && (
                                        <li className='relative my-5' key={input.id}>
                                            <div className='relative flex h-full overflow-hidden'>
                                                <img
                                                    className='flex-1 object-cover'
                                                    src={
                                                        URL.createObjectURL(input.file) ||
                                                        'https://fakeimg.pl/600x400'
                                                    }
                                                    alt={`Local Image ${input.id}`}
                                                />
                                            </div>
                                            <button
                                                className='text-md absolute bottom-1 left-1 mt-1 flex w-0.5 justify-center rounded-md border border-red-600 bg-red-500 px-3 py-1 leading-6 text-white hover:font-bold'
                                                onClick={() => handleRemoveImageInput(input.id)}
                                            >
                                                X
                                            </button>
                                        </li>
                                    )
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};
