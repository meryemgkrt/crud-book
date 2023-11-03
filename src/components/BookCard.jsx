const BookCard = ({ data, handleModal,  hendleRead,  handleEditModal }) => {
  return (
    <div className="d-flex justify-content-between border shadow rounded p-3 mt-5 align-items-center">
      <div className="">
        <h5 className={data.isRead ? 'text-decoration-line-through' : ''}>{data.title}</h5>
        <p className="">{new Date(data.date).toLocaleString()} </p>
      </div>
 
      <div className="btn-group">
        <button onClick={() => handleModal(data.id)} className="btn btn-danger">
          Sil
        </button>
        <button 
        onClick={()=>handleEditModal(data)}
        className="btn btn-primary">Düzenle</button>
        <button
        onClick={()=>hendleRead(data)}
        className="btn btn-success">{data.isRead ? 'Okundu ' : 'Okunmadı ' }</button>
      </div>
    </div>
  );
};

export default BookCard;
