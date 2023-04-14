import { Alert } from '@/hooks/useAlert';
import { Transition } from '@headlessui/react';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from './Icon';
import { AiOutlineClose } from 'react-icons/ai';

export default function SingleAlert({
  alert,
  index,
  removeAlert,
}: {
  alert: Alert;
  index: number;
  removeAlert: (id: string) => void;
}) {
  const [show, setShow] = useState(false);

  const { id, message, type, duration } = alert;

  const removeSelf = useCallback(() => {
    setShow(false);
    setTimeout(() => {
      removeAlert(id);
    }, 300);
  }, [id, removeAlert]);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      removeSelf();
    }, duration);
  }, [duration, removeSelf]);

  return (
    <Transition
      appear={true}
      show={show}
      enter="transition-all duration-200"
      enterFrom="opacity-0 translate-x-[100%]"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-200"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-[100%]"
      key={id}
      style={{
        top: 20 + index * 60 + 'px',
      }}
      className={classNames(
        `fixed  w-full md:w-[400px] 0 right-2 z-50 p-4 rounded-md`,
        {
          'bg-green-200 text-green-900': type === 'success',
          'bg-red-200 text-red-900': type === 'error',
        }
      )}
    >
      <div className="flex items-center justify-between">
        <p>{message}</p>
        <button onClick={() => removeSelf()}>
          <AiOutlineClose size={18} />
        </button>
      </div>
    </Transition>
  );
}
