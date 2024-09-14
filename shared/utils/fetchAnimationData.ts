export const fetchAnimationData = async (contentUrl: string) => {
    try {
        if (!contentUrl) return;

        const response = await fetch(contentUrl);
        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching animation data:', error);
    }
};
