const EditModal = ({editingItem, setEditingItem, setSowEdit, updateItem}) => {
  return (
    <div className="delete-modal">
      <div className="modal-inner">
        <h5>Kitap ismini düzenle...</h5>
        <input
          value={editingItem.title}
          type="text"

          //Elemanın düzenlenmiş ismini 
          //app'js deki state gönderme
          onChange={(e) =>
            setEditingItem({
              ...editingItem,
              title: e.target.value,
              date: new Date(),
            })
          }
          className="form-control shadow"
        />
        <div className="d-flex justify-content-between mt-4">
          <button
            onClick={() => setSowEdit(false)}
            className="btn btn-primary"
          >
            Vazgeç
          </button>
          <button 
          onClick={()=> updateItem()}
          className="btn btn-success">Kaydet</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
