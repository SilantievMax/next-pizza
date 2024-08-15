'use client';

import { FC } from 'react';
import { AddressSuggestions } from 'react-dadata';

import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}

const apiKeyDadata = process.env.API_KEY_DADATA || '';

export const AdressInput: FC<Props> = ({ onChange }) => {
  return <AddressSuggestions token={apiKeyDadata} onChange={(data) => onChange?.(data?.value)} />;
};
