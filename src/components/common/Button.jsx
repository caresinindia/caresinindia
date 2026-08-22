function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-200';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',

    secondary:
      'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',

    outline:
      'border border-slate-300 text-slate-700 hover:bg-slate-100',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;