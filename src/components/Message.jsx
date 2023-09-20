import {auth} from "../firebase/firebaseConfig"
const Message = ({msg}) => {

    // mesajı gönderen kişi ile oturumu açık olan kişi eşleşirse msg ekrana bas
    if(msg.user?.uid === auth.currentUser.uid){
        return <p className="msg-user">{msg.text}</p>
    }

    console.log(msg)

    // mesajı başkası yolladı ise
  return (
    <div className="msg-other">
        <p className="user-info">
            <img src={msg.user.photo}/>
            <span>{msg.user.name}: </span>
        </p>
        <p className="msg-text">{msg.text}</p>
    </div>
  )
}

export default Message