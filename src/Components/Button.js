import './Button.css';

const Button = ({ label, handleClick, disabled }) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="mx-[20px] bg-slate-500 hover:bg-slate-300 text-gray-800 font-bold py-2 px-4 border-b-4 border-t-2 border-x-4 border-slate-700 hover:border-slate-500 rounded"
    >
      {label}
    </button>
  );
};

export default Button;
