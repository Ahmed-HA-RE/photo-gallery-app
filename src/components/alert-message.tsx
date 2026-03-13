import { IoMdAlert } from 'react-icons/io';

const AlertMessage = ({
  text,
  variant = 'default',
}: {
  text: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}) => {
  const styles = {
    default: 'bg-gray-100 border-gray-200 text-gray-700',
    success: 'bg-green-100 border-green-200 text-green-700',
    error: 'bg-red-100 border-red-200 text-red-700',
    warning: 'bg-yellow-100 border-yellow-200 text-yellow-700',
  };

  return (
    <div className='min-h-[50vh] flex items-center'>
      <span
        className={`${styles[variant]} py-4 px-2 w-full max-w-lg mx-auto flex items-center gap-2`}
      >
        <IoMdAlert className='size-5' />
        {text}
      </span>
    </div>
  );
};

export default AlertMessage;
