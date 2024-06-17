export default function Input({id,title,...props}) {
  
  return (
    <div className="control">
      <label htmlFor={id}>{title}</label>
      <input id={id} name={id} required {...props} />
    </div>
  );
}
