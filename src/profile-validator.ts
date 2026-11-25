// 1. Type alias for the user profile
type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

// 2. Profiles cover enabled, missing, and explicitly disabled notifications
const testUsers: UserProfile[] = [
  {
    id: 1,
    username: "alice",
    settings: {
      notifications: true,
    },
  },
  {
    id: 2,
    username: "bob",
  },
  {
    id: 3,
    username: "charlie",
    settings: {},
  },
  {
    id: 4,
    username: "dana",
    settings: {
      notifications: false,
    },
  },
];

// 3. Safely handle missing settings and notification values
function isNotified(user: UserProfile): boolean {
  return user.settings?.notifications ?? false;
}

// 4. Print each result without repeating console.log statements
for (const user of testUsers) {
  console.log(`User ${user.id}:`, isNotified(user));
}
