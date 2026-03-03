import './ErrorMessage.scss'
const ErrorMessage: React.FC<{ message: string ;onRetry?: () => void }> = ({ message, onRetry }) => {
    return (
        <div className="error-message">
            <p>{message}</p>
            {onRetry && <button onClick={onRetry}>Retry</button>}   
        </div>
    );
}
export default ErrorMessage;