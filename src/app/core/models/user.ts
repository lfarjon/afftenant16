export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  userType?: 'landlord' | 'tenant'; // To differentiate between types of users
}

export interface Landlord extends User {
  propertyIds: string[]; // Array of property document IDs
}

export interface Tenant extends User {
  propertyId: string; // Document ID of the current property
  pastPropertyIds: string[]; // Array of document IDs of past properties
}
