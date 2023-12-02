import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { deleteImage, uploadImage } from '../../store/slices/properties/propertiesThunk';
import useThunk from '../../hooks/use-thunk';
import { useDispatch } from 'react-redux';
import {
    addImageAllProperties,
    addImageOwnProperties,
    delImageAllProperties,
    delImageOwnProperties,
} from '../../store/slices/properties/propertiesSlice';
// import Loader from '../../UI/Loader';
import { useNavigate } from 'react-router-dom';

export const AddImages = ({ responseId, setToggleForms, toggleForms, setValues }) => {
    const [imageInputs, setImageInputs] = useState([{ id: 1, file: null }]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const navigate = useNavigate();
    const allowedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    const maxSizeInBytes = 32 * 1024 * 1024; // 32 MB
    const dispatch = useDispatch();

    const [onUploadImage, isLoading, response] = useThunk(uploadImage);
    const [onDeleteImage] = useThunk(deleteImage);
    useEffect(() => {
        if (response !== null) {
            dispatch(addImageOwnProperties(response));
            dispatch(addImageAllProperties(response));
            setUploadedImages((state) => [...state, response]);
        }
    }, [response, dispatch]);

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

        imageInputs.forEach((input) => {
            if (input.id === id) {
                const formData = new FormData();
                formData.append('image', e.target.files[0]);
                onUploadImage({ responseId: responseId.id, undefined, formData });
            }
        });

        const updatedInputs = imageInputs.map((input) => {
            if (input.id === id) {
                const formData = new FormData();
                formData.append('image', e.target.files[0]);

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
        const filterArrayUpload = [...uploadedImages];

        const delEL = filterArrayUpload.splice(id - 1, 1, {
            ...filterArrayUpload[id - 1],
            imageUrl: 'del',
        });
        const delId = delEL[0].id;
        onDeleteImage(delId);

        setUploadedImages(filterArrayUpload);
        setImageInputs(updatedInputs);
        dispatch(delImageAllProperties(filterArrayUpload.map((i) => i.imageUrl)));
        dispatch(delImageOwnProperties(filterArrayUpload.map((i) => i.imageUrl)));
    };

    const handleSubmitImage = async (e) => {
        e.preventDefault();
        setToggleForms('text');
        setValues({
            numberOfRooms: '',
            space: '',
            description: '',
            price: '',
            floor: '',
            totalFloorsInBuilding: '',
            buildingType: '',
            finish: '',
            furnishment: '',
            garage: '',
            heating: '',
            neighbourhood: '',
        });
        navigate('/');
    };
    return (
        <>
            <div
                className={`m-5 flex justify-between ${
                    toggleForms === 'images' ? '' : 'visibility: hidden'
                }`}
            >
                <div>
                    <h2 className='text-l block font-bold text-gray-900 md:block'>
                        Добавяне на снимки:
                    </h2>
                    {/* {isLoading && <Loader />} */}
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
