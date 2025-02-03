import axios from 'axios';
// import { NextResponse, NextRequest } from "next/server";


// export async function validateGitHubUsername(username: string): Promise<boolean> {
//     const response = await fetch(`/api/validate-github-username?username=${username}`);
//     const data = await response.json();
//     return data.exists;
// }

export async function validateGitHubUsername(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`, {
        headers: { Authorization: `Bearer ${process.env.GITHUB_COLLAB_TOKEN}` },
      });
      return response.status === 200;
    } catch (error) {
      if (error.response?.status === 404) {
        return false;
      }
      console.error('Error checking GitHub username:', error);
      throw new Error('Failed to validate GitHub username');
    }
  }
  

// export default async function handler(req: NextRequest, res: NextResponse) {
//   const body = await req.json();

//   if (!body.username) {
//     // stripe prevents empty field, but still
//     return NextResponse.json({ error: 'GitHub username is required' }, { status: 400 }); 
//   }

//   try {
//     const response = await axios.get(`https://api.github.com/users/${body.username}`, {
//       headers: { 'Authorization': `Bearer ${process.env.GITHUB_COLLAB_TOKEN}` }, // maybe need other token for it
//     });

//     if (response.status === 200) {
//       return NextResponse.json({ exists: true }, { status: 200 });
//     }
//   } catch (error) {
//     if (error.response?.status === 404) {
//       return NextResponse.json({ exists: false }, { status: 404 });
//     }
//     console.error('Error checking GitHub username:', error);
//     return NextResponse.json({ error: 'Failed to validate GitHub username' }, { status: 500 });
//   }
// }