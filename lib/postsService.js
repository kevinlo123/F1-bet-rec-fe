const URL = 'https://limitless-escarpment-05345-1ca012576c29.herokuapp.com//api/v1'; 

export const getPosts = async () => {
    try {
        const response = await fetch(`${URL}/posts`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};

export const getPostBySlug = async (slug) => {
    try {
        const response = await fetch(`${URL}/posts/${slug}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching post with slug ${slug}:`, error);
        throw error;
    }
};