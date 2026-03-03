import './Pagination.scss';
const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;   
}> = ({ currentPage, totalPages, onPageChange }) => {
    console.log("Rendering Pagination: ");
    const getVisiblePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }   
        if (currentPage === 1) return [1, 2, 3];
        if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
        return [currentPage - 1, currentPage, currentPage + 1];
    }
    const visiblePages = getVisiblePages();
    return (
        <div className="pagination">    
            <button
                className="arrow"
                onClick={() => onPageChange(currentPage - 1)}       
                disabled={currentPage === 1}
            >
                ‹
            </button>       
            {visiblePages.map(page => (
                <button
                    key={page}  
                    className={`page-btn ${page === currentPage ? "active" : ""}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}  
                </button>   
            ))}
            <button
                className="arrow"       
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >       

                ›

            </button>
        </div>
    );
}
export default Pagination ;