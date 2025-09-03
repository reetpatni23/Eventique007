"use client";
import { Client, Account, Databases, Storage, ID } from "appwrite";

// app/constants/appwrite_config.ts



const PROJECT_ID = "68af42630007670eb3f0"; // e.g. 68af42630007670eb3f0
const ENDPOINT = "https://nyc.cloud.appwrite.io/v1";

const SUCCESS = typeof window !== 'undefined'
  ? `${window.location.origin}/login/success`
  : `https://eventique007.appwrite.network/login/success`; // fallback for SSR

const FAILURE = typeof window !== 'undefined'
  ? `${window.location.origin}/login/failure`
  : `https://eventique007.appwrite.network/login/failure`;

export class AppwriteConfig {
  client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  account = new Account(this.client);
  databases = new Databases(this.client);
  storage = new Storage(this.client);

  databaseId = ServerConfig.databaseId;
  activeCollId = ServerConfig.collectionId;
  bannerBucketId = ServerConfig.bucketId;

  // ✅ Get Current User
  async getCurUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }

  // ✅ Google Login (redirects to /success)
  async googlelog() {
    const successUrl = `https://eventique007.appwrite.network/login/success`;
    const failureUrl = `https://eventique007.appwrite.network/login/failure`;
    return this.account.createOAuth2Session("google", successUrl, failureUrl);
  }

  // ✅ GitHub Login (redirects to /success)
  async githublog() {
    const successUrl = `https://eventique007.appwrite.network/login/success`;
    const failureUrl = `https://eventique007.appwrite.network/login/failure`;
    return this.account.createOAuth2Session("github", successUrl, failureUrl);
  }

  // ✅ Sign Out
  async signOut() {
    try {
      await this.account.deleteSession("current");
      localStorage.removeItem("userInfo");
      return true;
    } catch (error) {
      console.error("Sign out failed:", error);
      return false;
    }
  }

  // ✅ Create Event with all fields + banner upload
  async createEvent(
    eventname: string,
    description: string,
    data: Record<string, any>,
    hostname: string,
    eventdate: string,
    email: string,
    country: string,
    address: string,
    city: string,
    state: string,
    postal: string,
    audience: string,
    type: string,
    attendees: number,
    price: number,
    tech: string,
    agenda: string,
    approval: string,
    twitter: string,
    website: string,
    linkedin: string,
    instagram: string,
    banner: File
  ) {
    try {
      // 1. Upload banner file
      let uploadedFile = null;
      if (banner && banner.size > 0) {
        uploadedFile = await this.storage.createFile(
          this.bannerBucketId,
          ID.unique(),
          banner
        );
      }

      // 2. Create event document
      const res = await this.databases.createDocument(
        this.databaseId,
        this.activeCollId,
        ID.unique(),
        {
          ...data,
          bannerId: uploadedFile ? uploadedFile.$id : null,
        }
      );

      return res;
    } catch (error) {
      console.error("Create event failed:", error);
      throw error;
    }
  }
}

// 🔹 Export singleton instance
export const ServerConfig = {
  endpoint: process.env.NEXT_PUBLIC_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_PROJECTID!,
  databaseId: process.env.NEXT_PUBLIC_DATABASEID!,
  collectionId: process.env.NEXT_PUBLIC_EVENT_COLLID!,
  bucketId: process.env.NEXT_PUBLIC_BUCKET!,
};

const appwriteConfig = new AppwriteConfig();
export default appwriteConfig;
