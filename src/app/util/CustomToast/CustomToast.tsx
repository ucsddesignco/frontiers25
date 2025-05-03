'use client';

import React from 'react';
import { toast as sonnerToast } from 'sonner';
import './CustomToast.scss';
import SuccessIcon from '../../assets/SuccessIcon';
import ErrorIcon from '@/app/assets/ErrorIcon';

interface ToastProps {
  id: string | number;
  description: string;
  type?: 'default' | 'success' | 'error';
}

export function customToast(toast: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom(
    id => <Toast id={id} description={toast.description} type={toast.type} />,
    {
      className: 'custom-toast',
      style: {
        backgroundColor: 'transparent',
        borderRadius: '16px',
        border: 'none',
        outline: 'none'
      }
    }
  );
}

const getColor = (type: string) => {
  switch (type) {
    case 'success':
      return '#337E1A';
    case 'error':
      return '#AC271E';
    default:
      return '#000000';
  }
};

function Toast(props: ToastProps) {
  const { type = 'default', description } = props;
  const color = getColor(type);

  return (
    <div
      className={`${color} flex w-full items-center gap-2 overflow-hidden rounded-[16px] border-none bg-[#F5F5F5] px-4 py-3 shadow-lg outline-none ring-black/5`}
    >
      {type === 'success' && <SuccessIcon />}
      {type === 'error' && <ErrorIcon />}

      <p style={{ color }}>{description}</p>
    </div>
  );
}
