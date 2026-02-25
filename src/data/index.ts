    role: 'admin',           // Lowercase to match UserRole type
    email: 'alex@fleet.com'
  }
];

export const MOCK_SHIPMENTS: Shipment[] = [
  {
    id: 's1',
    senderName: 'Global Tech',
    senderPhone: '+44 7700 900555', // Now supported by hybrid interface
    receiverName: 'Alice Henderson',
    destinationTownship: 'Springfield',
    weight: 2.5,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
];