import { useEffect } from "react"
import AuthPage from "./pages/AuthPage"
import { auth } from "./firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useState } from "react"
import Chat from "./pages/Chat"

function App() {

  const [isAuth, setIsAuth] = useState(undefined)
  const [room, setRoom] = useState(null)

  useEffect(() => {

    // auth objesinin değişimini izler
    // kullanıcı girişini ve çıkışını tetikler
    // çalıştırdığı fonksiyona aktif kullanıcı varsa gönderir
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    setRoom(e.target[0].value)
  }

  // kullanıcının otrumu kapalı ise login sayfasını ekrana bas
  if (isAuth === false) {
    return (
      <div className="container">
        <AuthPage />
      </div>
    )
  }

  // kullanıcının oturumu açık ise
  return (
    <div className="container">
      {

        room ? (
          // oda belirlediyse 
          <Chat room={room} setRoom={setRoom} />
        )
          : (
            // odayı henüz belirlemediyse
            <form onSubmit={handleSubmit} className="room-page">
              <h1>Chat Room</h1>
              <p>Hangi odaya gireceksiniz?</p>
              <input required placeholder="Örn: hafta sonu" type="text" />
              <button className="submit">Odaya Gir</button>
              <button className="button">Çıkış Yap</button>
            </form>
          )
      }
    </div>
  )
}

export default App
