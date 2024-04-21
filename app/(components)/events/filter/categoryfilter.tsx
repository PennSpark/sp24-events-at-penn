"use client"
import React, { useState, useEffect } from 'react';
import { Category } from '../../../lib/types';
import CategoryButton from "./categorybutton";
import Cookies from 'js-cookie';


const CategoryFilter: React.FC<{ setActiveCategories: (categories: string[]) => void }> = ({ setActiveCategories }) => {
    const [activeCategories, setActiveCategoriesLocal] = useState<string[]>([]);

    useEffect(() => {
        const cookie = Cookies.get('interestsCookie');
        if (cookie) {
            console.log('Found interestsCookie:', cookie);
            const categories = JSON.parse(cookie);
            setActiveCategories(categories);
            setActiveCategoriesLocal(categories.map((cat: { name: String }) => cat.name));
        }
    }, [setActiveCategories]);

    const categories: Category[] = [
        { name: 'Bakery', emoji: '🥐' },
        { name: 'Coffee', emoji: '☕' },
        { name: 'Boba', emoji: '🧋' },
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

    const toggleCategory = (category: string): void => {
        const updatedCategories = activeCategories.includes(category)
            ? activeCategories.filter(c => c !== category)
            : [...activeCategories, category];

        setActiveCategoriesLocal(updatedCategories);
        setActiveCategories(updatedCategories.map(cat => cat.split(' ')[0]));
    };


    return (
        <div style={containerStyle}>
            {categories.map(category => {
                const isActive = activeCategories.includes(category.name);
                return (
                    <CategoryButton
                        key={category.name}
                        category={category}
                        isActive={isActive}
                        onClick={() => toggleCategory(category.name)}
                    />
                );
            })}
        </div>
    );
};

export default CategoryFilter;
