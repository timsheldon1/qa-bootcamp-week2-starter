// 1. Type alias for the user profile
type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

// 2. Three test users covering each edge case
const userWithNotifications: UserProfile = {
  id: 1,
  username: "alice",
  settings: {
    notifications: true,
  },
};

const userWithoutSettings: UserProfile = {
  id: 2,
  username: "bob",
};

const userWithEmptySettings: UserProfile = {
  id: 3,
  username: "charlie",
  settings: {},
};

// 3. Safe function using optional chaining (?.) and nullish coalescing (??)
function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

// 4. Print the result for each user
console.log("User 1 (notifications set):", isNotified(userWithNotifications)); // true
console.log("User 2 (no settings):", isNotified(userWithoutSettings)); // false
console.log("User 3 (empty settings):", isNotified(userWithEmptySettings)); // false
