const Button = ({ classStyles, btnName, handleClick, disabled }) => (
  <button
    type="button"
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white ${classStyles}`}
    onClick={handleClick}
    disabled={disabled}
    style={{ opacity: disabled ? 0.5 : 1 }}
  >
    {btnName}
  </button>
);

export default Button;
