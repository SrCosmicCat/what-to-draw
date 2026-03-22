import './WordListInput.css';

export const WordListInput = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="word-list-input">
      <label>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={8}
      />
      <small>Una opción por línea</small>
    </div>
  );
};
