const Notification = ({ message,title,status }: { message: string; title: string; status: "success" | "error" }) => {
    return (    
        <div className={`notification ${status}`}>
            <h3>{title}</h3>
            <p>{message}</p>
        </div>
    );
}

export default Notification;