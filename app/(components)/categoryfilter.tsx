import React, { useState } from 'react';

interface Category {
    name: string;
    emoji: string;
}

const CategoryFilter: React.FC = () => {
    const [activeCategories, setActiveCategories] = useState<string[]>([]);

    const categories: Category[] = [
        { name: 'Bakery', emoji: '🥐' },
        { name: 'Coffee', emoji: '☕' },
        { name: 'Boba', emoji: '☕' },
        { name: 'Restaurant', emoji: '🍲' },
        { name: 'Party', emoji: '🎉' },
        { name: 'Promos', emoji: '🎟️' },
        { name: 'Miscellaneous', emoji: '🔮' },
    ];

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '25px',
    };

    const buttonStyle = (isActive: boolean): React.CSSProperties => ({
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
    });

    const toggleCategory = (category: string): void => {
        const isAlreadyActive = activeCategories.includes(category);

        if (isAlreadyActive) {
            setActiveCategories(activeCategories.filter(c => c !== category));
        } else {
            setActiveCategories([...activeCategories, category]);
        }
    };

    return (
        <div style={containerStyle}>
            {categories.map(category => {
                const isActive = activeCategories.includes(category.name);
                return (
                    <button
                        key={category.name}
                        style={buttonStyle(isActive)}
                        onClick={() => toggleCategory(category.name)}
                    >
                        {category.emoji} {category.name}
                    </button>
                );
            })}
        </div>
    );
};

export default CategoryFilter;
