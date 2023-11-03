import { useState } from "react";
import { v4 as getPass } from "uuid";
import BookCard from "./components/BookCard";
import DeleteModal from "./components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditModal from "./components/EditModal";

function App() {
  const [books, setBooks] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEdit, setSowEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  /* formun gönderilme olayı */
  const handlesubmit = (e) => {
    e.preventDefault();
    /* kitap ismine erişme */
    const title = e.target[0].value;
    /* kitap ismini doğrulama */
    if (!title) {
      toast.warning("Lütfen kitap ismini giriniz", { autoClose: 2000});
      return;
    }
    /* kitap objesi */
    const newBook = {
      id: getPass(),
      title,
      date: new Date(),
      İsRead: false,
    };
    /* oluşturulan objeyi kitaplar dizisine aktarma */

    // setBooks([...books, newBook]);

    setBooks([newBook, ...books]);

    //inputu temizleme

    e.target[0].value = "";

    //Bildirim verme
    toast.success("Kitap başarıyla eklendi. ", { autoClose: 2500 });
  };
  // silme modal'ı için fonksiyon
  const handleModal = (id) => {
    //modal'ı açar
    setShowDelete(true);

    //silinecek elemanın id'sini state aktarma
    setDeleteId(id);
  };

  //silme işlemi yapar
  const handleDelete = () => {
    // id'sini bildiğimiz elemanı diziden çıkartma

    const filtred = books.filter((book) => book.id !== deleteId);
    //State'i güncelle
    setBooks(filtred);

    // modal'ı kapat
    setShowDelete(false);

    toast.error("Kitap başarıyla silindi. ", { autoClose: 2500 });
  };

  const hendleRead = (editItem) => {
    //!Dizide bir elemanı güncelleme
    //okundu değerini tersini çevirme
    const updated = { ...editItem, isRead: !editItem.isRead };

    //State'nin kopyasını alma
    const clone = [...books];

    //düzenlenecek elemanın sırasını bulma
    const index = books.findIndex((book) => book.id === updated.id);

    //clone diziyi güncelleme
    clone[index] = updated;

    //!2. yöntem
    const newBooks = books.map((item) =>
      item.id !== updated.id ? item : updated
    );

    //State'i güncelleme
    setBooks(newBooks);
  };
  /*  console.log(books) */
  const handleEditModal = (item) => {
    //modal'ı açar
    setSowEdit(true);

    //düzenlenecek elemanı state'e aktarma
    setEditingItem(item);
  };

  //Elemanı düzenle
  const updateItem = () => {
    //kitaplar dizisini dönme
    //düzenlenmeyecek eleman değilseolduğu gibi yeni diziye aktar
    //eleman düzenlenecekse yeni halini diziye aktar
    const newBooks = books.map((book) =>
      book.id !== editingItem.id ? book : editingItem
    );

    //State'i güncelleme
    setBooks(newBooks);

    // modal'ı kapatma
    setSowEdit(false)

    //Bildirim verme
    toast.info('Kitap ismi düzenlendi', { autoClose: 2000})
  };
  return (
    <div className="App">
      <header className="bg-dark text-light py-2 fs-5   text-center">
        <h1 className="">Kitap Kurdu</h1>
      </header>
      <main className="container">
        {/* form */}
        <form onSubmit={handlesubmit} className="d-flex gap-3 mt-4">
          <input
            type="text"
            className="form-control shadow"
            placeholder="Bir kitap ismi giriniz..."
          />
          <button className="btn btn-warning">Ekle</button>
        </form>

        {/* kitaplar listesi boşsa*/}
        {books.length === 0 && (
          <h4 className="mt-5 text-center">
            Henüz herhangi bir kitap eklenmedi!
          </h4>
        )}
        {/* kitaplar listesi doluysa*/}
        {books.reverse().map((book) => (
          <BookCard
            key={book.id}
            data={book}
            handleModal={handleModal}
            hendleRead={hendleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </main>

      {/* Modallar */}
      {showDelete && (
        <DeleteModal
          setShowDelete={setShowDelete}
          handleDelete={handleDelete}
        />
      )}

      {showEdit && (
        <EditModal
          editingItem={editingItem}
          setSowEdit={setSowEdit}
          setEditingItem={setEditingItem}
          updateItem={updateItem}
        />
      )}

      {/* bildirimler için  */}
      <ToastContainer />
    </div>
  );
}

export default App;
