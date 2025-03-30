'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from 'imagekitio-next';
import config from '@/lib/config';
import { toast } from 'sonner';

const {
  env: {
    apiEndpoint,
    // prodApiEndpoint,
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    // const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    const response = await fetch(`${apiEndpoint}/api/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { signature, expire, token } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const FileUpload = ({
  onFileChange,
}: {
  onFileChange: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (err: any) => {
    console.log('Error', err);
    console.log(err);
    toast.error(`Image upload failed`, {
      description: `Your image could not be uploaded. Please try again.`,

      action: {
        label: 'X',
        onClick: () => console.log('Toast dismissed'),
      },
    });
  };

  const onSuccess = (res: any) => {
    console.log('Success', res);
    setFile(res);
    onFileChange(res.filePath);
    toast.success(`Image uploaded successfully`, {
      description: `${res.filePath} uploaded successfully!`,
      action: {
        label: 'X',
        onClick: () => console.log('Toast dismissed'),
      },
    });
  };
  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="test.png"
        folder={'/smart-library'}
        validateFile={(file) => {
          const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/jpg',
          ];
          const maxSize = 2 * 1024 * 1024; // 2MB
          return allowedTypes.includes(file.type) && file.size <= maxSize;
        }}
      />
      <button
        className="upload-btn cursor-pointer"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a file</p>

        {file && <p className="upload-filename">{file.filePath}</p>}
      </button>
      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default FileUpload;
