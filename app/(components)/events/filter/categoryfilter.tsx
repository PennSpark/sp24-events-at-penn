import React, { useState, useEffect } from 'react';
import CategoryButton from "./categorybutton";
import TagList from './tags'

interface Category {
    name: string;
    emoji: string;
}

const CategoryFilter: React.FC<{ setActiveCategories: (categories: string[]) => void }> = ({ setActiveCategories }) => {
    const [activeCategories, setActiveCategoriesLocal] = useState<string[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const onTagsFetched = (fetchedTags: Category[]) => {
        setCategories(fetchedTags);
    };
    // useEffect(() => {
    //     const cookie = Cookies.get('interestsCookie');
    //     if (cookie) {
    //         console.log('Found interestsCookie:', cookie);
    //         const categories = JSON.parse(cookie);
    //         setActiveCategories(categories);
    //         setActiveCategoriesLocal(categories.map((cat: { name: String }) => cat.name));
    //     }
    // }, [setActiveCategories]);
/*
    const categories: Category[] = [
        { name: 'Food', emoji: '🍔' },
        { name: 'Sports', emoji: '🏀' },
        { name: 'Bakery', emoji: '🥐' },
        { name: 'Coffee', emoji: '☕' },
        { name: 'Boba', emoji: '🧋' },
        { name: 'Restaurant', emoji: '🍲' },
        { name: 'Party', emoji: '🎉' },
        { name: 'Promos', emoji: '🎟️' },
        { name: 'Miscellaneous', emoji: '🔮' },

    ];
*/

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '25px',
    };



    const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const toggleCategory = (category: string): void => {
        const categoryLowerCase = category.toLowerCase();
        const updatedCategories = activeCategories.includes(categoryLowerCase)
            ? activeCategories.filter(c => c !== categoryLowerCase)
            : [...activeCategories, categoryLowerCase];

        setActiveCategoriesLocal(updatedCategories);
        setActiveCategories(updatedCategories);
    };

    return (
        <div style={containerStyle}>
            <TagList onTagsFetched={onTagsFetched} />

            {categories.map(category => {
                const isActive = activeCategories.includes(category.name.toLowerCase());
                return (
                    <CategoryButton
                        key={category.name}
                        category={{ ...category, name: capitalizeFirstLetter(category.name) }}
                        isActive={isActive}
                        onClick={() => toggleCategory(category.name)}
                    />
                );
            })}
        </div>
    );
};

export default CategoryFilter;
