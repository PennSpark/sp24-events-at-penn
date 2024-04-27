"use client"
import React, { useState, useEffect } from 'react';
import CategoryButton from "./categorybutton";
import { Tag } from '@/app/lib/types';

const CategoryFilter: React.FC<{ tags: Tag[], activeTags: Tag[], toggleTag: (t: Tag) => void }> = ({ tags, activeTags, toggleTag }) => {
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

    return (
        <div style={containerStyle}>
            {tags.map(tag => {
                const isActive = activeTags.some(t => t.name.toLowerCase() === tag.name.toLowerCase());
                return (
                    <CategoryButton
                        key={tag.name}
                        category={tag}
                        isActive={isActive}
                        onClick={() => toggleTag(tag)}
                    />
                );
            })}
        </div>
    );
};

export default CategoryFilter;
