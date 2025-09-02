"use client";
import { Client, Account, Databases, Storage, ID } from "appwrite";

export class AppwriteConfig {
  client: Client;
  account: Account;
  databases: Databases;
  storage: Storage;

  databaseId = "68b48a43000746da320c";      // 🔹 replace with your Appwrite DB ID
  activeCollId = "68b48f1e000a58d3f9f0";    // 🔹 replace with your Collection ID
  bannerBucketId = "68b48a12000497b1fb8";   // 🔹 replace with your Storage bucket ID

  constructor() {
    this.client = new Client()
      .setEndpoint("https://nyc.cloud.appwrite.io/v1") // 🔹 or your endpoint
      .setProject("68b097340015d3840771");             // 🔹 your Project ID

    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

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
    const successUrl = `https://task-management-main-pcgw0qc9t-rishitaa01s-projects.vercel.app/success`;
    const failureUrl = `https://task-management-main-pcgw0qc9t-rishitaa01s-projects.vercel.app/login`;
    return this.account.createOAuth2Session("google", successUrl, failureUrl);
  }

  // ✅ GitHub Login (redirects to /success)
  async githublog() {
    const successUrl = `https://task-management-main-pcgw0qc9t-rishitaa01s-projects.vercel.app/success`;
    const failureUrl = `https://task-management-main-pcgw0qc9t-rishitaa01s-projects.vercel.app/login`;
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
