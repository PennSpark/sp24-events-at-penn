import { Category } from "../../../lib/types";

interface CategoryButtonProps {
    category: Category;
    isActive: boolean;
    onClick?: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isActive, onClick = () => {} }) => {
    const buttonStyle = {
        padding: '2px 15px',
        border: '1px solid #ccc',
        borderRadius: '15px',
        backgroundColor: isActive ? '#555' : '#fff',
        color: isActive ? '#fff' : '#000',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 'bold',
        fontSize: '0.8rem',
        outline: 'none',
        transition: 'background-color 0.3s',
    };

    return (
        <button style={buttonStyle} onClick={onClick}>
            {category.emoji} {category.name}
        </button>
    );
}

export default CategoryButton;