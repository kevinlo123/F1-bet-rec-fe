export const getPosts = async (url) => {
    try {
        const response = await fetch(`${url}/posts`);        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostBySlug = async (slug, url) => {
    try {
        const response = await fetch(`${url}/posts/${slug}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        throw error;
    }
};