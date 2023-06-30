export interface GlobalValues {
  person: {
    objectType: string[];
    gender: string[];
    ethnicity: string[];
  };
  location: {
    objectType: string[];
  };
  event: {
    objectType: string[];
  };
  object: {
    objectType: string[];
    purpose: string[];
  };
  organization: {
    objectType: string[];
  };
}

export interface UserPreferences {
  globalValues: GlobalValues;
}

export interface User {
  id: number | null;
  enabled: boolean;
  email: string;
  displayName: string;
  profilePicture: string;
  joinedDate: string;
  lastActive: string;
  biography: string;
  favorites: string[];
  tapestries: string[];
  sharedTapestries: string[];
  preferences: UserPreferences;
}

export const defaultUser: User = {
  id: null,
  enabled: true,
  email: '',
  displayName: '',
  profilePicture: 'https://example.com/images/user_123.jpg',
  joinedDate: '',
  lastActive: '',
  biography: '',
  favorites: [],
  tapestries: [],
  sharedTapestries: [],
  preferences: {
    globalValues: {
      person: {
        objectType: [
          'Historic Figure',
          'Politician',
          'Military Leader',
          'Scientist',
          'Inventor',
          'Explorer',
          'Artist',
          'Writer',
          'Philosopher',
          'Religious Figure',
          'Activist',
          'Educator',
          'Athlete',
          'Entertainer',
          'Entrepreneur',
          'Royalty',
          'Criminal',
          'Healer/Medical Practitioner',
          'Scholar',
          'Mythological Figure',
        ],
        gender: ['Male', 'Female'],
        ethnicity: [
          'White / Caucasian',
          'Black / African / Afro-Caribbean',
          'Asian - East Asian (Chinese, Japanese, Korean, etc.)',
          'Asian - South Asian (Indian, Pakistani, Nepali, etc.)',
          'Asian - Southeast Asian (Thai, Vietnamese, Filipino, etc.)',
          'Hispanic',
          'Native American',
          'Pacific Islander',
          'Middle Eastern',
          'Aboriginal Australian',
          'Inuit',
          'Maori',
          'Mixed / Multiracial',
          'Other Ethnicity',
          'Unknown',
        ],
      },
      location: {
        objectType: [
          'City',
          'Town',
          'Village',
          'Country',
          'State',
          'Province',
          'Territory',
          'Continent',
          'Island',
          'Peninsula',
          'Mountain',
          'Valley',
          'River',
          'Sea',
          'Ocean',
          'Forest',
          'Desert',
          'Building',
          'Landmark',
          'Historic Site',
        ],
      },
      event: {
        objectType: [
          'Birth',
          'Death',
          'Marriage',
          'Divorce',
          'Graduation',
          'Employment',
          'Retirement',
          'Immigration',
          'Publication',
          'Invention',
          'Discovery',
          'Battle',
          'Treaty',
          'Coronation',
          'Abduction',
          'Rescue',
          'Arrest',
        ],
      },
      object: {
        objectType: ['Document', 'Vehicle', 'Weapon', 'Clothing', 'Jewelry', 'Artifact', 'Building', 'Tool', 'Book', 'Painting', 'Sculpture', 'Photograph', 'Film', 'Coin', 'Technology', 'Monument'],
        purpose: [
          'Communication',
          'Transportation',
          'Weaponry',
          'Decoration',
          'Artistic Expression',
          'Cooking',
          'Clothing',
          'Shelter',
          'Scientific Research',
          'Musical Expression',
          'Religious Practices',
          'Financial Transactions',
          'Entertainment',
          'Education',
          'Health & Medicine',
          'Sporting',
          'Farming',
        ],
      },
      organization: {
        objectType: [
          'Government',
          'Non-Profit Organization',
          'For-Profit Corporation',
          'Educational Institution',
          'Healthcare Provider',
          'Research Institution',
          'Religious Organization',
          'Political Party',
          'Sports Team',
          'Club',
          'Trade Union',
          'Charity',
          'Foundation',
          'International Organization',
          'Armed Forces',
          'News Media',
          'Artistic Group (e.g. Orchestra, Theater Company)',
          'Partnership',
          'Cooperative',
          'Social Movement',
        ],
      },
    },
  },
};
