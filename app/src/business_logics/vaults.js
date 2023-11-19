export const getVaultsUsers = async () => {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/get_vaults_users`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
    }
};
