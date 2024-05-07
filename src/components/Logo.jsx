export default function Logo(props) {
  let style = '';
  if(props.size === 'large'){
    style = 'w-50 h-50 mt-10';
  }else{
    style = 'w-10 h-10 mt-1';
  }
  return (
    <div className={style}>
      <img src="cat.jpg" alt="" className="w-full h-full" />
    </div>
  );
}
