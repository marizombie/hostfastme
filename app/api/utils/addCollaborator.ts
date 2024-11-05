import axios from 'axios';

export const addCollaborator = async (username: string, repo: string) => {
  try {
    const response = await axios.put(
      `https://api.github.com/repos/marizombie/${repo}/collaborators/${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_COLLAB_TOKEN}`,
          Accept: 'application/vnd.github+json',
        },
      }
    );
    console.log('Collaborator added:', response.data);
  } catch (error) {
    console.error('Error adding collaborator:', error);
    throw error;
  }
};