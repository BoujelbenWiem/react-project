import { uiActions } from "../../redux/slices/uiSlice";
import "./Notification.scss";
import { useDispatch, useSelector } from "react-redux";

type NotificationType = {
    status: "success" | "error";
    title: string;
    message: string ;
} | null;



const Notification = () => {
        const dispatch = useDispatch();
        const notification = useSelector((state: { ui: { notification: NotificationType } }) => state.ui.notification);

     if (!notification) {
        return null;
    }
    return (
  <div className={`notification ${notification.status}`}>
    <div className="notification__content">
      <h3>{notification.title}</h3>
      
      <p dangerouslySetInnerHTML={{ __html: notification.message }}></p>
    </div>

    <button onClick={() => dispatch(uiActions.hideNotification())}>
      ✕
    </button>
  </div>
);
}

export default Notification;