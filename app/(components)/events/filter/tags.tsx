"use client";
import React, { useEffect } from 'react';

interface Tag {
    name: string;
    emoji: string;
}

interface TagListProps {
    onTagsFetched: (tags: Tag[]) => void;
}

const fetchTags = async (): Promise<Tag[]> => {
    const response = await fetch('/api/tags');
    if (!response.ok) {
        throw new Error('Failed to fetch tags');
    }
    const data = await response.json();
    return data.body;
};

const TagList: React.FC<TagListProps> = ({ onTagsFetched }) => {
    useEffect(() => {
        fetchTags().then(data => {
            onTagsFetched(data);
        }).catch(error => {
            console.error('Error fetching tags:', error);
        });
    }, [onTagsFetched]);

    return null;
};

export default TagList;
