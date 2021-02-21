
export interface ProviderData {
      uid: string;
      displayName: string;
      photoURL: string;
      email: string;
      phoneNumber?: any;
      providerId: string;
  }

export interface StsTokenManager {
      apiKey: string;
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
  }

export interface MultiFactor {
      enrolledFactors: any[];
  }

export interface FirebaseUser {
      uid: string;
      displayName: string;
      photoURL: string;
      email: string;
      emailVerified: boolean;
      phoneNumber?: any;
      isAnonymous: boolean;
      tenantId?: any;
      providerData: ProviderData[];
      apiKey: string;
      appName: string;
      authDomain: string;
      stsTokenManager: StsTokenManager;
      redirectEventId?: any;
      lastLoginAt: string;
      createdAt: string;
      multiFactor: MultiFactor;
  }

export interface AuthUserType {
			signOut: any
      id: string;
      email: string;
      emailVerified: boolean;
      clientInitialized: boolean;
      firebaseUser: FirebaseUser;
  }

export interface UserFromDBType {
  email: string
  username: string
  favTeam: string
}

