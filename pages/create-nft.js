import { useState, useMemo, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button, Input, Loader } from '../components';
import images from '../assets';
import { NFTContext } from '../context/NFTcontext';

const CreateNFT = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: '',
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [fileInputValidation, setFileInputValidation] = useState(false);
  const { uploadToIPFS, createNFT, isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFile) => {
    const url = await uploadToIPFS(acceptedFile[0]);
    setFileUrl(url);
    console.log({ url });
  }, []);

  const { getInputProps, getRootProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => (
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? ' border-file-active ' : ''} 
       ${isDragAccept ? ' border-file-accept ' : ''} 
       ${isDragReject ? ' border-file-reject ' : ''}`),
    [isDragActive, isDragReject, isDragAccept],
  );

  const validateName = (value) => {
    if (value.trim() === '') {
      return 'Name is required';
    }
    return null;
  };

  const validatePrice = (value) => {
    if (Number.isNaN(value) || Number(value) <= 0) {
      return 'Price must be a positive number';
    }
    return null;
  };

  const handleCreateNFT = async () => {
    setSubmitAttempted(true);
    if (!formInput.name || !formInput.price) {
      console.error('Please fill in all required fields');
    } else if (!fileUrl) {
      setFileInputValidation(true);
      console.error('Please select an image');
    } else {
      setIsLoading(true);
      setFileInputValidation(false);
      console.log(formInput, fileUrl);
      await createNFT(formInput, fileUrl, router);
      setIsLoading(false);
    }
  };

  if (isLoadingNFT) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">Create New Pokemon NFTs</h1>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">Upload Pokemon NFT File</p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">JPG, PNG, GIF, SVG, WEBM. Max 5mb.</p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    alt="file upload"
                    width={100}
                    height={100}
                    objectFit="contain"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">Drag and Drop File</p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">Or browse media on your device</p>
                {fileInputValidation && (
                <p className="text-red-500 mt-2 ml-1 text-sm">Please select an image</p>
                )}
              </div>
            </div>
            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="file_assert" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="input"
          title="Pokemon Name"
          placeholder="Pokemon Name"
          validation={validateName}
          handleClick={(e) => {
            const error = validateName(e.target.value);
            if (error) {
              console.error(error);
            } else {
              setFormInput({ ...formInput, name: e.target.value });
            }
          }}
          submitAttempted={submitAttempted}
        />
        <Input
          inputType="textarea"
          title="Pokemon Description"
          placeholder="Pokemon Description"
          handleClick={(e) => { setFormInput({ ...formInput, description: e.target.value }); }}
        />
        <Input
          inputType="number"
          title="Price for a Pokemon"
          placeholder="Pokemon TCG Price"
          validation={validatePrice}
          handleClick={(e) => {
            const error = validatePrice(e.target.value);
            if (error) {
              console.error(error);
            } else {
              setFormInput({ ...formInput, price: e.target.value });
            }
          }}
          submitAttempted={submitAttempted}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create Pokemon NFT"
            classStyles="rounded-xl"
            handleClick={handleCreateNFT}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
